
// import { BotMode, Level, Message } from "../types";
// import { db } from "../lib/db";


// export const UserProgressModel = {
//   async updateProgress(
//     userId: string,
//     newLevel: Level,
//     newMode: BotMode,
//     updatedHistory: Message[]
//   ) {
//     console.log("Saving user:", userId);

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

const getFreshDb = () => {
  const dbUrl = process.env.DATABASE_URL || "postgresql://neondb_owner:npg_uH2RlWrAt4vj@ep-tiny-salad-at1pqij7-pooler.c-9.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require";
  const sql = neon(dbUrl);
  const adapter = new PrismaNeon(sql as unknown as ConstructorParameters<typeof PrismaNeon>[0]);
  return new PrismaClient({ adapter });
};

export const UserProgressModel = {

  async getOrCreateProgress(userId: string) {
    const freshDb = getFreshDb(); 
    try {
      let progress = await freshDb.userProgress.findUnique({
        where: { id: userId },
      });

      if (!progress) {
        progress = await freshDb.userProgress.create({
          data: {
            id: userId,
            currentLevel: "L1",
            currentMode: "Conversation",
            historyJson: JSON.stringify([]),
          },
        });
      }
      return progress;
    } finally {
      await freshDb.$disconnect(); 
    }
  },


  async updateProgress(
    userId: string, 
    newLevel: Level, 
    newMode: BotMode, 
    updatedHistory: Message[]
  ) {
    const freshDb = getFreshDb(); 
    try {
      return await freshDb.userProgress.update({
        where: { id: userId },
        data: {
          currentLevel: newLevel,
          currentMode: newMode,
          historyJson: JSON.stringify(updatedHistory),
        },
      });
    } finally {
      await freshDb.$disconnect();
    }
  }
};