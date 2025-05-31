import NextAuth from "next-auth"
import GitHub from "next-auth/providers/github"

declare module "next-auth" {
  interface Session {
    accessToken?: string
  }
}

export const authOptions = {
  providers: [
    GitHub({
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
    }),
  ],
  callbacks: {
    async jwt({
      token,
      account,
    }: {
      token: any
      account?: import("next-auth").Account | null
    }) {
      if (account) {
        token.accessToken = account.access_token
      }
      return token
    },
    async session({
      session,
      token,
    }: {
      session: import("next-auth").Session
      token: any
    }) {
      if (token) {
        session.accessToken = token.accessToken as string
      }
      return session
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
}

export default NextAuth(authOptions)
