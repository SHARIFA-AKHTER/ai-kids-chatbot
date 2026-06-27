import { NextRequest, NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { Level, Message, BotMode } from "@/app/types";
import { UserProgressModel } from "@/app/models/UserProgress";

export const dynamic = "force-dynamic";

console.log("===================================");
console.log("🚀 API ROUTE LOADED - STABLE MONOLITH");
console.log("===================================");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

export async function POST(req: NextRequest) {
  console.log("\n==============================");
  console.log("📨 POST /api/chat");
  console.log("==============================");

  let userSelectedLevel: Level = "L1";

  try {
    if (!process.env.GEMINI_API_KEY) {
      console.log("❌ GEMINI_API_KEY Missing");
      return NextResponse.json(
        { error: "Missing GEMINI_API_KEY" },
        { status: 500 },
      );
    }

    const body = await req.json();
    const {
      message,
      currentLevel,
      history = [],
      userId = "default-child",
    }: {
      message: string;
      currentLevel: Level;
      history: Message[];
      userId?: string;
    } = body;

    userSelectedLevel = currentLevel;

    console.log(
      `👤 User: ${userId} | 🎯 Level: ${currentLevel} | 💬 Msg: ${message}`,
    );

    const systemInstruction = `
       You are an AI-powered English Learning Chatbot named KidsBot, designed for children under 7 years old.
       Current Child Learning Level: ${currentLevel}.

       Strictly adhere to these linguistic level rules:
       - L1 (Words & Phonics): Focus on isolated words, basic letter sounds, or repetitive phonics (e.g., "A for Apple! 🍎 C-A-T spells cat! 🐱").
       - L2 (Phrases): Use basic 2-3 word pairings, highly descriptive yet short (e.g., "Happy small bird! 🐦", "Run fast! 🏃‍♂️").
       - L3 (Simple Sentences): Use basic full sentences without subordinate clauses (e.g., "The butterfly sits on a big flower. 🦋").

       Social and Emotional Learning (SEL) & Behavioral Guidelines:
       - Maintain an unconditionally supportive, cheerful, and enthusiastic persona.
       - Praise the child's attempt immediately with excitement using expressive words ("Super!", "Magnificent! ⭐").
       - Use plenty of warm, animated emojis throughout to reinforce visual engagement.

       Output Constraints:
       Your output must be structurally clean and valid JSON. Format exactly as:
       {
         "reply": "Your child-friendly text response here",
         "mode": "Learning" | "Conversation" | "Engagement" | "Support",
         "suggestedLevel": "L1" | "L2" | "L3"
       }

       Mode Selection Protocol:
       - Use 'Learning' when actively instructing mechanics of language.
       - Use 'Conversation' for friendly casual exchange.
       - Use 'Engagement' for gameplay, simple riddle suggestions, or rhymes.
       - Use 'Support' if input implies emotional distress, performance hesitation, or operational confusion.
    `;

    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash",
      systemInstruction,
      generationConfig: { responseMimeType: "application/json" },
    });

    const formattedHistory = history.map((msg) => ({
      role: msg.role,
      parts: msg.parts,
    }));

    const chat = model.startChat({ history: formattedHistory });
    const result = await chat.sendMessage(message);
    const text = result.response.text();

    let parsed;
    try {
      parsed = JSON.parse(text);
      console.log("✅ Gemini JSON Parsed Successfully");
    } catch (err) {
      console.log("❌ JSON Parse Failed. Fallback activated.", err);
      parsed = {
        reply: text,
        mode: "Conversation",
        suggestedLevel: currentLevel,
      };
    }

    const updatedHistory: Message[] = [
      ...history,
      { role: "user" as const, parts: [{ text: message }] },
      { role: "model" as const, parts: [{ text: parsed.reply }] },
    ];

    console.log("\n==============================");
    console.log("🗄️ DATABASE SAVE START VIA FRESH MODEL");
    console.log("==============================");

    try {
      const saved = await UserProgressModel.updateProgress(
        userId,
        parsed.suggestedLevel as Level,
        parsed.mode as BotMode,
        updatedHistory,
      );
      console.log("After updateProgress");
      console.log(saved);
    } catch (dbError) {
      console.log("\n❌ DATABASE SAVE FAILED");
      console.error(dbError);
    }

    return NextResponse.json(parsed);
  } catch (error) {
    console.log("\n❌ CHAT API GLOBAL CRITICAL ERROR", error);
    return NextResponse.json(
      {
        reply: "🌈 Let's try again, my friend!",
        mode: "Support",
        suggestedLevel: userSelectedLevel,
      },
      { status: 200 },
    );
  }
}
