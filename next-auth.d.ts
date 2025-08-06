import { JWT } from "next-auth/jwt";
import { Session, User } from "next-auth";

declare module "next-auth" {
  interface User {
    username: string | null;
    firstName: string | null;
    lastName: string | null;
  }
  interface Session {
    user: User & {
      username: string | null;
      firstName: string | null;
      lastName: string | null;
      token: JWT;
    };
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    username: string | null;
    firstName: string | null;
    lastName: string | null;
  }
}