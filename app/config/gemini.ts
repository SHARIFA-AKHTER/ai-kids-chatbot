import { GoogleGenerativeAI } from "@google/generative-ai";

if (!process.env.GEMINI_API_KEY) {
  console.warn("Warning: GEMINI_API_KEY is not defined.");
}

export const genAI = new GoogleGenerativeAI(
  process.env.GEMINI_API_KEY || ""
);