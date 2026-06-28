import { db } from "../lib/db";
import { BotMode, Level, Message } from "../types";

export const UserProgressModel = {
  async getOrCreateProgress(userId: string) {
    return await db.userProgress.upsert({
      where: {
        id: userId,
      },
      update: {},
      create: {
        id: userId,
        childName: "Little Friend",
        currentLevel: "L1",
        currentMode: "Conversation",
        historyJson: JSON.stringify([]),
      },
    });
  },

  async updateProgress(
    userId: string,
    newLevel: Level,
    newMode: BotMode,
    updatedHistory: Message[]
  ) {
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