import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { db } from "@/lib/prisma";
import { Adapter } from "next-auth/adapters";
import { Role } from "@prisma/client";
import { getUserBalance } from "@/app/utils/db/getUserBalance";

const handler = NextAuth({
  adapter: PrismaAdapter(db) as Adapter,
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
  ],
  session: {
    strategy: "jwt", // Usa JWT para sessões 
    maxAge: 60 * 60 * 24 * 7, // 7 dias
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id; 
        token.role = user.role as Role; // Adiciona a role no token 
        token.member = user.member;
        token.balance = user.balance;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id as string; 
        session.user.role = token.role as Role; 
        session.user.member = token.member as boolean;
        session.user.balance = await getUserBalance(token.id)
      }
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET, // Assina o JWT
  jwt: {
    secret: process.env.JWT_SECRET, // Valida o JWT 
  },
});

export { handler as GET, handler as POST };
