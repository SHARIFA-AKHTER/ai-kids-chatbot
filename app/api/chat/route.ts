
import { Level, Message } from "@/app/types";
import { NextResponse, NextRequest } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

const ai = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

export async function POST(req: NextRequest) {
  try {

    const body = await req.json();
    const { message, currentLevel, history } = body as {
      message: string;
      currentLevel: Level;
      history: Message[];
    };


    if (!process.env.GEMINI_API_KEY) {
      return NextResponse.json({ error: "API Key is missing in .env.local" }, { status: 500 });
    }

  
    const systemInstruction = `
      You are an AI-powered English Learning Chatbot named KidsBot, designed for children under 7 years old.
      Current Child Learning Level: ${currentLevel}.

      Strictly adhere to these linguistic level rules based on currentLevel:
      - L1 (Words & Phonics): Focus on isolated words, basic letter sounds, or repetitive phonics (e.g., "A for Apple! 🍎 C-A-T spells cat! 🐱").
      - L2 (Phrases): Use basic 2-3 word pairings, highly descriptive yet short (e.g., "Happy small bird! 🐦", "Run fast! 🏃‍♂️").
      - L3 (Simple Sentences): Use basic full sentences without complex grammar (e.g., "The butterfly sits on a big flower. 🦋").

      Social and Emotional Learning (SEL) & Behavioral Guidelines:
      - Maintain an unconditionally supportive, cheerful, and enthusiastic persona.
      - Praise the child's attempt immediately with excitement using expressive words ("Super!", "Magnificent! ⭐").
      - Use plenty of warm, animated emojis throughout to reinforce visual engagement.

      Output Constraints:
      Your output must be structurally clean and valid JSON. Do not enclose the output in markdown code blocks or backticks. Format exactly as:
      {
        "reply": "Your child-friendly text response here",
        "mode": "Learning" | "Conversation" | "Engagement" | "Support",
        "suggestedLevel": "L1" | "L2" | "L3"
      }

      Mode Selection Protocol:
      - 'Learning': when actively instructing mechanics or vocabulary of language.
      - 'Conversation': for friendly casual exchange (e.g., asking about their day or toys).
      - 'Engagement': for gameplay, simple riddle suggestions, or rhymes.
      - 'Support': if input implies emotional distress, hesitation, sadness, or confusion.
    `;

    // Gemini Model Configuration (Ultra-fast gemini-1.5-flash for <2s latency)
    const model = ai.getGenerativeModel({
      model: "gemini-1.5-flash",
      systemInstruction: systemInstruction,
      generationConfig: { 
        responseMimeType: "application/json" 
      }
    });

    const chat = model.startChat({ history: history });
    const result = await chat.sendMessage(message);
    const responseText = result.response.text();

    const parsedData = JSON.parse(responseText);
    
    return NextResponse.json(parsedData);

  } catch (error) {
    console.error("Chat API Error:", error);
    
    return NextResponse.json(
      { 
        reply: "Oh look! A beautiful butterfly! 🦋 Let's try saying that again together, my superstar! ⭐", 
        mode: "Support", 
        suggestedLevel: "L1" 
      },
      { status: 200 } 
    );
  }
}