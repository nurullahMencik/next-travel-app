import NextAuth from "next-auth";
import { authOptions } from "./auth";

// Prisma ve bcrypt Node.js calisma zamani gerektirir.
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
