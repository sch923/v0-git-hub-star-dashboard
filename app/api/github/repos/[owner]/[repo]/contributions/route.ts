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

  const perPage = 100
  const maxPages = 2

  type DailyStats = Record<
    string,
    {
      openIssues: number
      closedIssues: number
      openPRs: number
      closedPRs: number
    }
  >

  const dailyCounts: DailyStats = {}

  function increment(date: string, field: keyof DailyStats[string]) {
    if (!dailyCounts[date]) {
      dailyCounts[date] = {
        openIssues: 0,
        closedIssues: 0,
        openPRs: 0,
        closedPRs: 0,
      }
    }
    dailyCounts[date][field]++
  }

  try {
    for (let page = 1; page <= maxPages; page++) {
      const { data: issues } = await octokit.issues.listForRepo({
        owner,
        repo,
        state: "all",
        per_page: perPage,
        page,
      })

      if (issues.length === 0) break

      for (const item of issues) {
        const createdDate = new Date(item.created_at).toISOString().slice(0, 10)
        const closedDate = item.closed_at
          ? new Date(item.closed_at).toISOString().slice(0, 10)
          : null

        const isPR = !!item.pull_request

        if (isPR) {
          increment(createdDate, "openPRs")
          if (closedDate) increment(closedDate, "closedPRs")
        } else {
          increment(createdDate, "openIssues")
          if (closedDate) increment(closedDate, "closedIssues")
        }
      }

      await sleep(500)
    }

    const sorted = Object.entries(dailyCounts)
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([date, stats]) => ({
        name: date,
        ...stats,
      }))

    return NextResponse.json(sorted)
  } catch (error) {
    console.error("Error fetching issue/PR data:", error)
    return new NextResponse("Error fetching data", { status: 500 })
  }
}
