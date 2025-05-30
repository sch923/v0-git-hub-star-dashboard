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
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
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
}

export default NextAuth(authOptions)
