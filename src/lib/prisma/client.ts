// Prisma client — requires database setup and `npx prisma@5 generate`
// Until then, API routes will fail gracefully

let prisma: any;

try {
  const { PrismaClient } = require("@prisma/client");
  const globalForPrisma = globalThis as any;
  prisma =
    globalForPrisma.prisma ??
    new PrismaClient({
      log: process.env.NODE_ENV === "development" ? ["error", "warn"] : ["error"],
    });
  if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
} catch {
  // Prisma client not generated yet — run: npx prisma@5 generate
  prisma = null;
}

export { prisma };
