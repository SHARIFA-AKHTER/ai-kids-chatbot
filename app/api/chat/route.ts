/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */

import { NextRequest, NextResponse } from "next/server";
import {
  GoogleGenerativeAI,
  HarmBlockThreshold,
  HarmCategory,
} from "@google/generative-ai";
import { Level, Message, BotMode } from "@/app/types";
import { UserProgressModel } from "@/app/models/UserProgress";

export const dynamic = "force-dynamic";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

export async function POST(req: NextRequest) {
  let userSelectedLevel: Level = "L1";
  let currentHistory: Message[] = [];

  try {
    if (!process.env.GEMINI_API_KEY) {
      return NextResponse.json(
        { error: "Missing GEMINI_API_KEY" },
        { status: 500 },
      );
    }

    const body = await req.json();
    const { message, currentLevel, history = [] } = body;

    userSelectedLevel = currentLevel;
    currentHistory = history;

    const systemInstruction = `
You are an AI-powered English Learning Chatbot named KidsBot for children under 7.
Current Child Learning Level: ${currentLevel}.

STRICT LINGUISTIC RULES:
- L1 (Words & Phonics): Focus on isolated words, basic letter sounds.
- L2 (Phrases): YOU MUST STRICTLY USE ONLY 2–3 WORD PHRASES. 
  NEVER use complete sentences, verbs with subjects, or periods.
  If the child asks "What next?", reply ONLY with short phrases like:
  "Learning E!", "Big letter E!", "Say E now!", "Next is E!".
  DO NOT explain, DO NOT use full grammar, DO NOT use periods.
- L3 (Simple Sentences): YOU MUST ONLY USE COMPLETE, SHORT SENTENCES. 
  NEVER teach isolated letters (like A, B, C) or single words in L3. 
  Always use full sentences. For example, instead of 'E is next', say 'Can we learn about the letter E together in a sentence? I like the letter E!'

[EMOTIONAL SEL & MODE SWITCHING RULES]:
- If child is negative (sad/angry): Set mode to "Support", provide comfort FIRST.
- IMPORTANT: If the child expresses readiness to learn (e.g., "I am ready"), IMMEDIATELY switch mode back to "Learning" or "Engagement".
- If mode is "Support" but the child is responding positively or asking to learn: Switch mode to "Learning".

Return ONLY valid JSON:
{
  "reply": "Your response here (Follow the specific level rules: L1=Words, L2=Phrases, L3=Sentences)",
  "mode": "Support" | "Learning" | "Engagement",
  "suggestedLevel": "${currentLevel}"
}
`;

    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash",
      systemInstruction,
      generationConfig: {
        responseMimeType: "application/json",
      },

      safetySettings: [
        {
          category: HarmCategory.HARM_CATEGORY_HARASSMENT,
          threshold: HarmBlockThreshold.BLOCK_NONE,
        },
        {
          category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
          threshold: HarmBlockThreshold.BLOCK_NONE,
        },
      ],
    });

    const chat = model.startChat({
      history: history.map((msg: any) => ({
        role: msg.role,
        parts: msg.parts,
      })),
    });

    let text = "";
    try {
      const result = await chat.sendMessage(message);
      text = result.response.text();
    } catch (geminiError) {
      console.error("Gemini Error:", geminiError);
      let reply =
        "Oh, big hugs! ❤️ KidsBot loves you! Let's say 'Happy' together!";
      let mode: BotMode = "Support";

      text = JSON.stringify({
        reply,
        mode,
        suggestedLevel: userSelectedLevel,
      });
    }

    let parsed: { reply: string; mode: BotMode; suggestedLevel: Level };
    try {
      parsed = JSON.parse(text);
    } catch {
      parsed = {
        reply: text,
        mode: "Support",
        suggestedLevel: userSelectedLevel,
      };
    }

    const updatedHistory: Message[] = [
      ...history,
      { role: "user", parts: [{ text: message }] },
      { role: "model", parts: [{ text: parsed.reply }] },
    ];

    try {
      await UserProgressModel.updateProgress(
        "default-child",
        parsed.suggestedLevel,
        parsed.mode,
        updatedHistory,
      );
    } catch (dbError) {
      console.error("Database sync ignored in api route:", dbError);
    }

    return NextResponse.json(parsed);
  } catch (globalError) {
    console.error("Global API Error:", globalError);
    return NextResponse.json(
      {
        reply: "Oh! Let's try again! 🌈",
        mode: "Support",
        suggestedLevel: "L1",
      },
      { status: 200 },
    );
  }
}
