import { PrismaClient } from "@prisma/client";

declare global {
    var prisma: PrismaClient | undefined
}

// configuración para evitar conexiones innecesarias
export const prisma = global.prisma || new PrismaClient()

if (process.env.NODE != "production") global.prisma = prisma