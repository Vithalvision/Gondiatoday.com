// NOTE: This file is the Prisma client singleton for when the Postgres
// backend is wired up (see prisma/schema.prisma + README "Swapping in real
// data"). It is NOT imported anywhere yet — the app currently runs on
// lib/api/mockData.ts — so @prisma/client is intentionally left out of
// package.json until you run `npx prisma generate`.
//
// To activate:
//   1. npm install @prisma/client
//   2. npx prisma generate
//   3. Uncomment the code below.
//   4. Update lib/api/articles.ts to call prisma.article.findMany(...) etc.

// import { PrismaClient } from '@prisma/client';
//
// const globalForPrisma = global as unknown as { prisma: PrismaClient };
//
// export const prisma = globalForPrisma.prisma || new PrismaClient();
//
// if (process.env.NODE_ENV !== 'production') {
//   globalForPrisma.prisma = prisma;
// }

export {};
import { PrismaClient } from "@prisma/client";

const globalForPrisma = globalThis as {
  prisma?: PrismaClient;
};

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient();

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}