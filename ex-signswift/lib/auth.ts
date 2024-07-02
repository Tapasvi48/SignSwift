import type {
  GetServerSidePropsContext,
  NextApiRequest,
  NextApiResponse,
} from "next";
import type { NextAuthOptions } from "next-auth";
import type { Adapter } from "next-auth/adapters";

// import { SupabaseAdapter } from "@auth/supabase-adapter";
import { getServerSession } from "next-auth";
import GoogleProvider from "next-auth/providers/google";

// You'll need to import and pass this
// to `NextAuth` in `app/api/auth/[...nextauth]/route.ts`
export const config = {
  providers: [
    GoogleProvider({
      clientId:
        "457383457740-dt1f5ppvjl0g10m6dv0s58a2qptaih17.apps.googleusercontent.com",
      clientSecret: "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",
    }),
  ],

  callbacks: {
    session: async ({ session, token }) => {
      console.log(token);
      if (session?.user) {
        session.user.id = token.sub;
        session.user.token = token;
      }

      return session;
    },
    jwt: async ({ user, token, account }) => {
      if (user) {
        token.jti = account?.access_token;
        token.uid = user.id;
      }
      return token;
    },
  },
  session: {
    strategy: "jwt",
  },
} satisfies NextAuthOptions;

// Use it in server contexts
export function auth(
  ...args:
    | [GetServerSidePropsContext["req"], GetServerSidePropsContext["res"]]
    | [NextApiRequest, NextApiResponse]
    | []
) {
  return getServerSession(...args, config);
}
