import { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { prismadb } from "@/lib/db";

if (!process.env.NEXTAUTH_SECRET) {
  console.error(
    "[auth] NEXTAUTH_SECRET tanimli degil. Oturum acma islemleri calismayacaktir."
  );
}

export const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Missing email or password");
        }

        // Kayit sirasinda e-posta kucuk harfe cevriliyor; burada da ayni
        // normalizasyon yapilmazsa "Admin@Gmail.com" ile giris basarisiz olur.
        const email = credentials.email.trim().toLowerCase();

        let user;
        try {
          user = await prismadb.user.findUnique({ where: { email } });
        } catch (error) {
          // Veritabanina ulasilamadiginda gercek sebebi loglayalim, aksi halde
          // kullaniciya yalnizca "Invalid email or password" donuyor ve
          // sorunun kaynagi gorunmez oluyor.
          console.error("[auth] database error:", error);
          throw new Error("Database connection failed");
        }

        if (!user || !user.hashedPassword) {
          throw new Error("No user found with this email");
        }

        const isCorrectPassword = await bcrypt.compare(
          credentials.password,
          user.hashedPassword
        );

        if (!isCorrectPassword) {
          throw new Error("Incorrect password");
        }

        return {
          id: user.id,
          email: user.email ?? "",
          username: user.username ?? "",
          firstName: user.firstName ?? "",
          lastName: user.lastName ?? "",
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.username = user.username;
        token.firstName = user.firstName;
        token.lastName = user.lastName;
      }
      return token;
    },
    async session({ session, token }) {
      if (session?.user) {
        session.user.id = token.id;
        session.user.email = token.email;
        session.user.username = token.username;
        session.user.firstName = token.firstName;
        session.user.lastName = token.lastName;
        session.user.token = token;
      }
      return session;
    },
  },
  pages: {
    signIn: "/login",
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
};
