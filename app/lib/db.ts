/* eslint-disable @typescript-eslint/no-explicit-any */
import { PrismaClient } from "@prisma/client";
import { PrismaNeon } from "@prisma/adapter-neon";
import { Pool } from "@neondatabase/serverless";

const connectionString = process.env.DATABASE_URL!;

const pool = new Pool({
  connectionString,
});

const adapter = new PrismaNeon(pool as any);

export const db = new PrismaClient({
  adapter,
});

// import { PrismaClient, Prisma } from '@prisma/client';

// const prismaClientSingleton = () => {

//   return new PrismaClient({
//     datasources: {
//       db: {
//         url: process.env.DATABASE_URL,
//       },
//     },
//   } as Prisma.PrismaClientOptions);
// };

// declare global {
//   var prismaGlobal: ReturnType<typeof prismaClientSingleton> | undefined;
// }

// export const db = globalThis.prismaGlobal ?? prismaClientSingleton();

// if (process.env.NODE_ENV !== 'production') globalThis.prismaGlobal = db;

// import { PrismaClient } from "@prisma/client";
// import { PrismaNeon } from "@prisma/adapter-neon";
// import { neon } from "@neondatabase/serverless";

// console.log("=================================");
// console.log("🚀 Prisma DB Loading...");
// console.log("DATABASE_URL Exists:", !!process.env.DATABASE_URL);

// if (process.env.DATABASE_URL) {
//   console.log(
//     "DATABASE_URL:",
//     process.env.DATABASE_URL.substring(0, 50) + "..."
//   );
// } else {
//   console.log("❌ DATABASE_URL NOT FOUND");
// }

// const sql = neon(process.env.DATABASE_URL!);

// console.log("✅ Neon Client Created");

// const adapter = new PrismaNeon(sql);

// console.log("✅ Prisma Adapter Created");

// const globalForPrisma = globalThis as unknown as {
//   prisma?: PrismaClient;
// };

// export const db =
//   globalForPrisma.prisma ??
//   new PrismaClient({
//     adapter,
//   });

// if (process.env.NODE_ENV !== "production") {
//   globalForPrisma.prisma = db;
// }

// console.log("✅ Prisma Client Ready");
// console.log("=================================");

