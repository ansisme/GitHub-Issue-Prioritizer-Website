// import { prisma } from "./prisma";
// import { PrismaAdapter} from '@next-auth/prisma-adapter'
// import type { NextAuthOptions } from "next-auth";
// import GitHubProvider from "next-auth/providers/github";

// export const authOptions: NextAuthOptions = {
//   // This is a temporary fix for prisma client.
//   // @see https://github.com/prisma/prisma/issues/16117
//   adapter: PrismaAdapter(prisma as any),
//   pages: {
//     signIn: "/login",
//   },
//   session: {
//     strategy: "jwt",
//   },
//   providers: [
//     GitHubProvider({
//       clientId: process.env.GITHUB_ID as string,
//       clientSecret: process.env.GITHUB_SECRET as string,
//     })
//   ],
//   callbacks: {
//     session: ({ session, token }) => {
//       return {
//         ...session,
//         user: {
//           ...session.user,
//           id: token.id,
//           randomKey: token.randomKey,
//         },
//       };
//     },
//     jwt: ({ token, user }) => {
//       if (user) {
//         const u = user as unknown as any;
//         return {
//           ...token,
//           id: u.id,
//           randomKey: u.randomKey,
//         };
//       }
//       return token;
//     },
//   },
// };

// const handler = NextAuth(authOptions);
// export { handler as GET, handler as POST };


import NextAuth from "next-auth";
import type { NextAuthOptions } from "next-auth";
import GitHubProvider from "next-auth/providers/github";

export const authOptions: NextAuthOptions = {
  pages: {
    signIn: "/login",
  },
  session: {
    strategy: "jwt",
  },
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string,
    }),
    
  ],
  callbacks: {
    session: ({ session, token }) => {
      return {
        ...session,
        user: {
          ...session.user,
          id: token.id,
          randomKey: token.randomKey,
        },
      };
    },
    jwt: ({ token, user }) => {
      if (user) {
        const u = user as unknown as any;
        return {
          ...token,
          id: u.id,
          randomKey: u.randomKey,
        };
      }
      return token;
    },
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };

