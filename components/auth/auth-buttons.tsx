"use client"

import { useSession, signIn, signOut } from "next-auth/react"
import { Button } from "@/components/ui/button"

export function AuthButtons() {
  const { data: session, status } = useSession()

  if (status === "loading") {
    return <div>Loading...</div>
  }

  if (session) {
    return (
      <div className="flex items-center gap-4">
        <p>{session.user?.name ?? "ゲスト"}</p>
        <Button variant="outline" type="button" onClick={() => signOut()}>
          Logout
        </Button>
      </div>
    )
  }

  return (
    <Button type="button" onClick={() => signIn("github")}>
      Sign in with GitHub
    </Button>
  )
}
