import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      name?: string;
      email?: string;
      image?: string;
      role?: string;
      balance: number;
      member: boolean;
    };
  }

  interface User {
    id: string;
    role: string;
    balance: number;
    member: boolean;
  }
}
