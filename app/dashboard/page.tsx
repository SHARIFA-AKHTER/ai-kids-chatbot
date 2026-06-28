
/* eslint-disable @typescript-eslint/no-explicit-any */
import { UserProgressModel } from "../models/UserProgress";
import { Level, Message } from "../types";

export const dynamic = "force-dynamic";

export default async function Dashboard() {
  const userId = "default-child"; 
  let progressData = null;


  const timeout = new Promise((_, reject) =>
    setTimeout(() => reject("Database timeout"), 10000)
  );

  try {
    progressData = await Promise.race([
      UserProgressModel.getOrCreateProgress(userId),
      timeout
    ]) as any;
  } catch (error) {
    console.error("Dashboard Load Safeguard:", error);
  }


  const currentLevel: Level = (progressData?.currentLevel as Level) || "L1";
  const currentMode = progressData?.currentMode || "Conversation";


  let chatHistory: Message[] = [];
  if (progressData?.historyJson) {
    try {
      chatHistory = JSON.parse(progressData.historyJson);
    } catch {
      chatHistory = [];
    }
  }

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
  } else if (currentMode === "Conversation") {
    emotionalState = "Happy & Chatty 💬";
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6 md:p-10 font-sans">

      <div className="max-w-6xl mx-auto mb-8 flex justify-between items-center">
        <h1 className="text-3xl font-black text-gray-800 flex items-center gap-2">
          🧸 Parent Dashboard
        </h1>
        <span className="bg-white border px-4 py-2 rounded-full text-sm font-semibold text-gray-500 shadow-sm">
          Child Profile: {progressData?.childName || "Little Friend"}
        </span>
      </div>
      

      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 transform hover:scale-[1.01] transition-transform">
          <h2 className="text-gray-400 font-bold text-sm tracking-wider uppercase">Current Learning Level</h2>
          <p className="text-2xl font-black text-orange-500 mt-3">
            {levelTextMap[currentLevel]}
          </p>
        </div>


        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 transform hover:scale-[1.01] transition-transform">
          <h2 className="text-gray-400 font-bold text-sm tracking-wider uppercase">Current Chatbot Mode</h2>
          <p className="text-2xl font-black text-purple-600 mt-3">
            {currentMode} Mode
          </p>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 transform hover:scale-[1.01] transition-transform">
          <h2 className="text-gray-400 font-bold text-sm tracking-wider uppercase">Emotional State (SEL)</h2>
          <p className="text-2xl font-black text-emerald-500 mt-3">
            {emotionalState}
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
        <h3 className="text-lg font-bold text-gray-700 mb-4 flex items-center gap-2 border-b pb-3">
          📝 Recent Conversation Log (Live Audit)
        </h3>
        {chatHistory.length === 0 ? (
          <p className="text-gray-400 text-sm py-4 text-center italic">No recent chats available. Start chatting with KidsBot!</p>
        ) : (
          <div className="space-y-4 max-h-80 overflow-y-auto pr-2">
            {chatHistory.slice(-4).map((msg, index) => (
              <div 
                key={index} 
                className={`p-3 rounded-xl max-w-[85%] text-sm ${
                  msg.role === "user" 
                    ? "bg-amber-50 border border-amber-100 ml-auto text-amber-900" 
                    : "bg-purple-50 border border-purple-100 mr-auto text-purple-900"
                }`}
              >
                <span className="block font-bold text-xs uppercase opacity-60 mb-1">
                  {msg.role === "user" ? "👶 Child" : "🤖 KidsBot"}
                </span>
                <p className="font-medium">{msg.parts?.[0]?.text || ""}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}