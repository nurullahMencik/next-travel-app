import { PrismaClient } from "@prisma/client"

declare global {
    var prisma : PrismaClient | undefined
}

if (!process.env.DATABASE_URL) {
    console.error("[db] DATABASE_URL tanimli degil. Veritabanina baglanilamayacak.")
}

export const prismadb = globalThis.prisma || new PrismaClient()

if(process.env.NODE_ENV !== "production") globalThis.prisma = prismadb
