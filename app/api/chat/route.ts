/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prefer-const */

// import { NextRequest, NextResponse } from "next/server";
// import { GoogleGenerativeAI } from "@google/generative-ai";
// import { Level, Message, BotMode } from "@/app/types";
// import { UserProgressModel } from "@/app/models/UserProgress";

// export const dynamic = "force-dynamic";

// const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

// export async function POST(req: NextRequest) {
//   let userSelectedLevel: Level = "L1";
//   let currentUserId = "default-child";
//   let currentHistory: Message[] = [];

//   try {
//     if (!process.env.GEMINI_API_KEY) {
//       return NextResponse.json(
//         { error: "Missing GEMINI_API_KEY" },
//         { status: 500 }
//       );
//     }

//     const body = await req.json();

//     const {
//       message,
//       currentLevel,
//       history = [],
//       userId = "default-child",
//     }: {
//       message: string;
//       currentLevel: Level;
//       history: Message[];
//       userId?: string;
//     } = body;

//     userSelectedLevel = currentLevel;
//     currentUserId = userId;
//     currentHistory = history;

//     const systemInstruction = `
// You are an AI-powered English Learning Chatbot named KidsBot, designed for children under 7 years old.

// Current Child Learning Level: ${currentLevel}.

// Strictly adhere to these linguistic level rules:

// - L1 (Words & Phonics): Focus on isolated words, basic letter sounds, or repetitive phonics.
// - L2 (Phrases): Use basic 2–3 word phrases.
// - L3 (Simple Sentences): Use short complete sentences.

// Always encourage the child positively.

// Return ONLY valid JSON:

// {
//   "reply": "",
//   "mode": "Learning",
//   "suggestedLevel": "L1"
// }
// `;

//     const model = genAI.getGenerativeModel({
//       model: "gemini-2.5-flash",
//       systemInstruction,
//       generationConfig: {
//         responseMimeType: "application/json",
//       },
//     });

//     const chat = model.startChat({
//       history: history.map((msg) => ({
//         role: msg.role,
//         parts: msg.parts,
//       })),
//     });

//     let text = "";

//     try {
//       const result = await chat.sendMessage(message);
//       text = result.response.text();
//     } catch {
//       let reply = "A for Apple! 🍎 Can you say Apple?";
//       let mode: BotMode = "Learning";

//       if (userSelectedLevel === "L2") {
//         reply = "Look! A happy little bird is singing! 🐦";
//         mode = "Engagement";
//       }

//       if (userSelectedLevel === "L3") {
//         reply = "The butterfly sits on a beautiful flower. 🦋";
//         mode = "Conversation";
//       }

//       text = JSON.stringify({
//         reply,
//         mode,
//         suggestedLevel: userSelectedLevel,
//       });
//     }

//     let parsed: {
//       reply: string;
//       mode: BotMode;
//       suggestedLevel: Level;
//     };

//     try {
//       parsed = JSON.parse(text);
//     } catch {
//       parsed = {
//         reply: text,
//         mode: "Conversation",
//         suggestedLevel: currentLevel,
//       };
//     }

//     const updatedHistory: Message[] = [
//       ...history,
//       {
//         role: "user",
//         parts: [{ text: message }],
//       },
//       {
//         role: "model",
//         parts: [{ text: parsed.reply }],
//       },
//     ];

//     try {
//       await UserProgressModel.updateProgress(
//         userId,
//         parsed.suggestedLevel,
//         parsed.mode,
//         updatedHistory
//       );
//     } catch (error) {
//       console.error("Database save failed:", error);
//     }

//     return NextResponse.json(parsed);
//   } catch {
//     let reply = "Great job! 🌟";
//     let mode: BotMode = "Conversation";

//     if (userSelectedLevel === "L1") {
//       reply = "A for Apple! 🍎";
//       mode = "Learning";
//     }

//     if (userSelectedLevel === "L2") {
//       reply = "Happy little bird! 🐦";
//       mode = "Engagement";
//     }

//     if (userSelectedLevel === "L3") {
//       reply = "The butterfly is flying. 🦋";
//       mode = "Conversation";
//     }

//     const offlineHistory: Message[] = [
//       ...currentHistory,
//       {
//         role: "user",
//         parts: [{ text: "Offline Message" }],
//       },
//       {
//         role: "model",
//         parts: [{ text: reply }],
//       },
//     ];

//     try {
//       await UserProgressModel.updateProgress(
//         currentUserId,
//         userSelectedLevel,
//         mode,
//         offlineHistory
//       );
//     } catch {
//       // Ignore database errors in fallback
//     }

//     return NextResponse.json({
//       reply,
//       mode,
//       suggestedLevel: userSelectedLevel,
//     });
//   }
// }

import { NextRequest, NextResponse } from "next/server";
import { GoogleGenerativeAI, HarmBlockThreshold, HarmCategory } from "@google/generative-ai";
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
        { status: 500 }
      );
    }

    const body = await req.json();
    const { message, currentLevel, history = [] } = body;

    userSelectedLevel = currentLevel;
    currentHistory = history;

    const systemInstruction = `
You are an AI-powered English Learning Chatbot named KidsBot, designed for children under 7 years old.
Current Child Learning Level: ${currentLevel}.

Strictly adhere to these linguistic level rules:
- L1 (Words & Phonics): Focus on isolated words, basic letter sounds, or repetitive phonics.
- L2 (Phrases): Use basic 2–3 word phrases.
- L3 (Simple Sentences): Use short complete sentences.

[EMOTIONAL SEL & MODE SWITCHING RULES]:
1. If the child expresses sadness, anger, negative emotions, or says things like "I hate my parents" or "don't want to talk":
   - IMMEDIATELY set "mode" to "Support".
   - For "reply", provide comforting words or condolences FIRST (e.g., "Oh, big hugs! ❤️ KidsBot loves you! It is okay to feel sad."). 
   - THEN, gently transition back to a comforting learning prompt in the SAME reply (e.g., "Let's breathe together. Can you say 'Calm'?").
   - Set "suggestedLevel" to the current level (${currentLevel}).

2. If the child is happy or responsive, set "mode" to "Learning" or "Engagement" and focus on regular English learning.

Return ONLY valid JSON:
{
  "reply": "",
  "mode": "Support",
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
          threshold: HarmBlockThreshold.BLOCK_NONE 
        },
        { 
          category: HarmCategory.HARM_CATEGORY_HATE_SPEECH, 
          threshold: HarmBlockThreshold.BLOCK_NONE 
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
      let reply = "Oh, big hugs! ❤️ KidsBot loves you! Let's say 'Happy' together!";
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
        updatedHistory
      );
    } catch (dbError) {
      console.error("Database sync ignored in api route:", dbError);
    }

    return NextResponse.json(parsed);

  } catch (globalError) {
    console.error("Global API Error Catch:", globalError);
    return NextResponse.json({
      reply: "Oh, look at the stars! 🌟 Let's try saying 'Star'!",
      mode: "Support",
      suggestedLevel: userSelectedLevel,
    });
  }
}