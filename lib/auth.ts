import NextAuth from "next-auth"
import GitHub from "next-auth/providers/github"
import { JWT } from "next-auth/jwt"
import { Account, Session } from "next-auth"

declare module "next-auth" {
  interface Session {
    accessToken?: string
  }
}

const { GITHUB_CLIENT_ID, GITHUB_CLIENT_SECRET, NEXTAUTH_SECRET } = process.env

if (!GITHUB_CLIENT_ID) {
  throw new Error("GITHUB_CLIENT_ID is not set in environment variables.")
}
if (!GITHUB_CLIENT_SECRET) {
  throw new Error("GITHUB_CLIENT_SECRET is not set in environment variables.")
}
if (!NEXTAUTH_SECRET) {
  throw new Error("NEXTAUTH_SECRET is not set in environment variables.")
}

export const authOptions = {
  providers: [
    GitHub({
      clientId: GITHUB_CLIENT_ID!,
      clientSecret: GITHUB_CLIENT_SECRET!,
    }),
  ],
  callbacks: {
    async jwt({ token, account }: { token: JWT; account?: Account | null }) {
      if (account) {
        token.accessToken = account.access_token
      }
      return token
    },
    async session({ session, token }: { session: Session; token: JWT }) {
      if (token) {
        session.accessToken = token.accessToken as string
      }
      return session
    },
  },
  secret: NEXTAUTH_SECRET,
}

export default NextAuth(authOptions)
