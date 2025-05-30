import NextAuth from "next-auth"
import GitHubProvider from "next-auth/providers/github"

declare module "next-auth" {
  interface Session {
    accessToken?: string
  }
}

export const authOptions = {
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_CLIENT_ID || "dummy_client_id",
      clientSecret: process.env.GITHUB_CLIENT_SECRET || "dummy_client_secret",
    }),
  ],
  callbacks: {
    async jwt({ token, account }: any) {
      if (account) {
        token.accessToken = account.access_token
      }
      return token
    },
    async session({ session, token }: any) {
      if (token) {
        session.accessToken = token.accessToken as string
      }
      return session
    },
  },
  secret: process.env.NEXTAUTH_SECRET || "fallback_secret_for_development",
}

export default NextAuth(authOptions)
