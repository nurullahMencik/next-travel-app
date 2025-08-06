import NextAuth, { AuthOptions } from "next-auth"; // AuthOptions tipini import et
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import { prismadb } from "@/lib/db";


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
        console.log("Checking if user exists...");

        const user = await prismadb.user.findUnique({
          where: {
            email: credentials.email,
          },
        });

        if (!user) {
          throw new Error("No user found with this email");
        }
        //console.log("Prisma'dan gelen user nesnesi:", user); 
        console.log("comparing password...");
        const isCorrectPassword = await bcrypt.compare(
          credentials.password,
          user.hashedPassword
        );

        if (!isCorrectPassword) {
          throw new Error("Incorrect password");
        }
        console.log("Login successful:", user);

        return {
          id: user.id,
          email: user.email ?? '',
          username: user.username ?? '',
          firstName: user.firstName ?? '', 
          lastName: user.lastName ?? '',
        };
      },
    }),
  ],
  callbacks: {
    async jwt({token,user}){
        if(user){
            token.id = user.id;
            token.username = user.username;
            token.firstName = user.firstName;
            token.lastName = user.lastName;
        }
         //console.log("JWT callback'indeki token:", token); 
        return token
    },
    async session({session,token}){
        if(session?.user){
            session.user.id=token.id
            session.user.email=token.email
            session.user.username = token.username; 
            session.user.firstName=token.firstName
            session.user.lastName=token.lastName
            session.user.token = token
        }
        //console.log("Session callback'indeki session:", session); 
        return session;
    }
  },
  pages: {
    signIn: "/login",
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
};

export default NextAuth(authOptions);