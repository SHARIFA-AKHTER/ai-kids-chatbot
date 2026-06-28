/* eslint-disable @typescript-eslint/no-explicit-any */

// import { db } from "../lib/db";
// import { BotMode, Level, Message } from "../types";

// export const UserProgressModel = {
//   async getOrCreateProgress(userId: string) {
//     return await db.userProgress.upsert({
//       where: {
//         id: userId,
//       },
//       update: {},
//       create: {
//         id: userId,
//         childName: "Little Friend",
//         currentLevel: "L1",
//         currentMode: "Conversation",
//         historyJson: JSON.stringify([]),
//       },
//     });
//   },

//   async updateProgress(
//     userId: string,
//     newLevel: Level,
//     newMode: BotMode,
//     updatedHistory: Message[]
//   ) {
//     return await db.userProgress.upsert({
//       where: {
//         id: userId,
//       },
//       update: {
//         currentLevel: newLevel,
//         currentMode: newMode,
//         historyJson: JSON.stringify(updatedHistory),
//       },
//       create: {
//         id: userId,
//         childName: "Little Friend",
//         currentLevel: newLevel,
//         currentMode: newMode,
//         historyJson: JSON.stringify(updatedHistory),
//       },
//     });
//   },
// };

import { PrismaClient } from "@prisma/client";
import { PrismaNeon } from "@prisma/adapter-neon";
import { neon } from "@neondatabase/serverless";
import { BotMode, Level, Message } from "../types";

const connectionString =
  "postgresql://neondb_owner:npg_uH2RlWrAt4vj@ep-tiny-salad-at1pqij7-pooler.c-9.us-east-1.aws.neon.tech/neondb?sslmode=require";

process.env.DATABASE_URL = connectionString;

const sql = neon(connectionString);
const adapter = new PrismaNeon(sql as any);

const globalForPrisma = globalThis as {
  prisma?: PrismaClient;
};

export const db =
  globalForPrisma.prisma ??
  new PrismaClient({
    adapter,
  });

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = db;
}

export const UserProgressModel = {
  async getOrCreateProgress(userId: string) {
    try {
      return await db.userProgress.upsert({
        where: { id: userId },
        update: {},
        create: {
          id: userId,
          childName: "Little Friend",
          currentLevel: "L1",
          currentMode: "Conversation",
          historyJson: JSON.stringify([]),
        
        },
      });
    } catch (error) {
      console.error("Database fallbacks active:", error);
      return {
        id: userId,
        childName: "Little Friend",
        currentLevel: "L1",
        currentMode: "Conversation",
        historyJson: JSON.stringify([]),
      };
    }
  },

  async updateProgress(
    userId: string,
    newLevel: Level,
    newMode: BotMode,
    updatedHistory: Message[],
  ) {
    try {
      return await db.userProgress.upsert({
        where: { id: userId },
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
    } catch (error) {
      console.error("Database update bypassed:", error);
      return null;
    }
  },
};
