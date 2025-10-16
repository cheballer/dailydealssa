import { PrismaClient } from '@prisma/client'

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

export const db = globalForPrisma.prisma ?? new PrismaClient()
export const prisma = db // Export as prisma for compatibility

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = db
