
import { BotMode, Level, Message } from "../types";
import { db } from "../lib/db";


export const UserProgressModel = {
  async updateProgress(
    userId: string,
    newLevel: Level,
    newMode: BotMode,
    updatedHistory: Message[]
  ) {
    console.log("Saving user:", userId);

    return await db.userProgress.upsert({
      where: {
        id: userId,
      },

      update: {
        currentLevel: newLevel,
        currentMode: newMode,
        historyJson: JSON.stringify(updatedHistory),
      },

      create: {
        id: userId,
        childName: "Little Friend",
        currentLevel: newLevel,
        currentMode: newMode,
        historyJson: JSON.stringify(updatedHistory),
      },
    });
  },
};