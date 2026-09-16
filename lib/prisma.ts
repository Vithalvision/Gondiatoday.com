import { PrismaClient } from "@prisma/client";

console.log("DATABASE_URL loaded:", process.env.DATABASE_URL ? "YES" : "NO - undefined!");

const globalForPrisma = globalThis as {
  prisma?: PrismaClient;
};

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    datasourceUrl: process.env.DATABASE_URL,
  });

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}