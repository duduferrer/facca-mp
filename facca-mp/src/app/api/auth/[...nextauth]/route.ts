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
    strategy: "jwt", // Usa JWT para sessões //------->alterada
    maxAge: 60 * 60 * 24 * 7, // 7 dias //------->alterada
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id; //------->alterada
        token.role = user.role as Role; // Adiciona a role no token //------->alterada
        token.member = user.member;
        token.balance = user.balance;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id as string; //------->alterada
        session.user.role = token.role as Role; //------->alterada
        session.user.member = token.member as boolean;
        session.user.balance = await getUserBalance(token.id)
      }
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET, // Assina o JWT //------->alterada
  jwt: {
    secret: process.env.JWT_SECRET, // Valida o JWT //------->alterada
  },
});

export { handler as GET, handler as POST };
