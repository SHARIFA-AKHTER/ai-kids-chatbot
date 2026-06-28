/* eslint-disable @typescript-eslint/no-explicit-any */
import { UserProgressModel } from "../models/UserProgress";
import { Level } from "../types";

export const dynamic = "force-dynamic";

export default async function Dashboard() {
  const userId = "default-child"; 
  let progressData = null;


const timeout = new Promise((_, reject) =>
    setTimeout(() => reject("Database timeout"), 3000)

  );

  try {
    progressData = await Promise.race([
      UserProgressModel.getOrCreateProgress(userId),
      timeout
    ]) as any;
  } catch (error) {
    console.error("⏱️ Dashboard Load Safeguard:", error);
  }


  const currentLevel: Level = (progressData?.currentLevel as Level) || "L1";
  const currentMode = progressData?.currentMode || "Conversation";

  const levelTextMap: Record<Level, string> = {
    L1: "Level 1 (Words & Phonics) 🍎",
    L2: "Level 2 (Phrases) 🐦",
    L3: "Level 3 (Simple Sentences) 🦋",
  };

  let emotionalState = "Curious & Confident ⭐";
  if (currentMode === "Support") {
    emotionalState = "Needs Encouragement ❤️";
  } else if (currentMode === "Learning") {
    emotionalState = "Focused & Learning 🧠";
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">🧸 Parent Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200">
          <h2 className="text-gray-500 font-medium">Current Learning Level</h2>
          <p className="text-3xl font-black text-orange-500 mt-2">
            {levelTextMap[currentLevel]}
          </p>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200">
          <h2 className="text-gray-500 font-medium">Current Chatbot Mode</h2>
          <p className="text-3xl font-black text-purple-500 mt-2">
            {currentMode} Mode
          </p>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200">
          <h2 className="text-gray-500 font-medium">Emotional State (SEL)</h2>
          <p className="text-3xl font-black text-emerald-500 mt-2">
            {emotionalState}
          </p>
        </div>
      </div>
    </div>
  );
}