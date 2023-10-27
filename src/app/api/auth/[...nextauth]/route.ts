import { prisma } from "@/lib/prisma/client";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { DefaultSession } from "next-auth";
import { AdapterUser } from "next-auth/adapters";
import { AuthOptions } from "next-auth";
import type { Session } from "next-auth";
export const authOptions: AuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  secret:
    process.env.NODE_ENV === "production"
      ? process.env.NEXT_PUBLIC_SECRET
      : "password",
  pages: {
    signIn: "/",
  },
  session: {
    strategy: "jwt",
  },
  callbacks: {
    session: async ({ session, token }) => {
      if (session.user) {
        session.user.id = token.sub!;
      }
      return session;
    },
  },
  adapter: PrismaAdapter(prisma),
  debug: true
};
const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
