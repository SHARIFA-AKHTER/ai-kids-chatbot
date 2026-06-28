/* eslint-disable @typescript-eslint/no-explicit-any */
import dotenv from "dotenv";
dotenv.config();
import { PrismaClient } from "@prisma/client";
import { PrismaNeon } from "@prisma/adapter-neon";
import { neon } from "@neondatabase/serverless";

// const connectionString = process.env.DATABASE_URL!;
const connectionString = "postgresql://neondb_owner:npg_uH2RlWrAt4vj@ep-tiny-salad-at1pqij7-pooler.c-9.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require";
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