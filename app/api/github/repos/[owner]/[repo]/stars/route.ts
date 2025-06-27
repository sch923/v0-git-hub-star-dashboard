import { authOptions } from "@/lib/auth"
import { Octokit } from "@octokit/rest"
import { getServerSession } from "next-auth"
import { NextResponse } from "next/server"

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

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
    return NextResponse.json(
      { error: "Missing owner or repo" },
      { status: 400 }
    )
  }

  const octokit = new Octokit({ auth: token })

  const oneYearAgo = new Date()
  oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1)

  const perPage = 100
  const maxPages = 20
  const dailyCounts: Record<string, number> = {}

  try {
    for (let page = 1; page <= maxPages; page++) {
      const { data } = await octokit.activity.listStargazersForRepo({
        owner,
        repo,
        per_page: perPage,
        page,
        headers: {
          accept: "application/vnd.github.v3.star+json",
        },
      })

      if (data.length === 0) break

      for (const star of data) {
        const starredAt = new Date((star as any).starred_at)
        const dateStr = starredAt.toISOString().slice(0, 10) // YYYY-MM-DD
        dailyCounts[dateStr] = (dailyCounts[dateStr] || 0) + 1
      }

      await sleep(500)
    }

    const sortedResult = Object.entries(dailyCounts)
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([date, count]) => ({ name: date, stars: count }))
    return NextResponse.json(sortedResult)
  } catch (error) {
    console.error(error)
    return new NextResponse("Error fetching star data", { status: 500 })
  }
}
