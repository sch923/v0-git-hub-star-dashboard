import { authOptions } from "@/lib/auth"
import { Octokit } from "@octokit/rest"
import { getServerSession } from "next-auth"
import { NextResponse } from "next/server"

export async function GET(
  _req: Request,
  { params }: { params: { owner: string; repo: string } }
) {
  const session = await getServerSession(authOptions)

  const token = session?.accessToken
  if (!token) {
    return new Response("Unauthorized", { status: 401 })
  }

  const { owner, repo } = await params
  if (!owner || !repo) {
    return new Response("Bad Request: Missing owner or repo", { status: 400 })
  }

  const octokit = new Octokit({ auth: token })
  try {
    const res = await octokit.rest.repos.listContributors({
      owner,
      repo,
      per_page: 10,
    })

    const contributors = res.data.map((c) => ({
      login: c.login,
      avatar_url: c.avatar_url,
      contributions: c.contributions,
      url: c.html_url,
    }))

    return NextResponse.json(contributors)
  } catch (error) {
    return new Response("Internal Server Error", { status: 500 })
  }
}
