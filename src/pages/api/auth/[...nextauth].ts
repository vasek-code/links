import NextAuth, { type NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import GithubProvider from "next-auth/providers/github";
import TwitchProvider from "next-auth/providers/twitch";

import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { prisma } from "../../../server/db/client";
import { env } from "../../../server/env.mjs";
import { Link, User } from "@prisma/client";

export const authOptions: NextAuthOptions = {
  callbacks: {
    jwt: async ({ token, user }) => {
      user && (token.user = user);
      return token;
    },

    session: async ({ session, token, user }) => {
      const data = await prisma.user.findFirst({
        where: { id: user.id },
        select: {
          links: true,
          bio: true,
          email: true,
          id: true,
          name: true,
          image: true,
        },
      });

      session.user = data as any;

      return session;
    },

    redirect: async ({ url, baseUrl }) => {
      return "/";
    },
  },
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: env.GOOGLE_CLIENT_ID,
      clientSecret: env.GOOGLE_CLIENT_SECRET,
    }),
    TwitchProvider({
      clientId: env.TWITCH_CLIENT_ID,
      clientSecret: env.TWITCH_CLIENT_SECRET,
    }),
    GithubProvider({
      clientId: env.GITHUB_CLIENT_ID,
      clientSecret: env.GITHUB_CLIENT_SECRET,
    }),
  ],
  secret: env.NEXTAUTH_SECRET,
};

export default NextAuth(authOptions);
