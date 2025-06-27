import { authOptions } from "@/lib/auth"
import { Octokit } from "@octokit/rest"
import { getServerSession } from "next-auth"
import { NextResponse } from "next/server"

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

function formatDate(dateStr: string) {
  return new Date(dateStr).toISOString().slice(0, 10) // "YYYY-MM-DD"
}

export async function GET(
  _req: Request,
  { params }: { params: { owner: string; repo: string } }
) {
  const session = await getServerSession(authOptions)
  const token = session?.accessToken

  if (!token) return new Response("Unauthorized", { status: 401 })

  const { owner, repo } = await params
  if (!owner || !repo)
    return NextResponse.json(
      { error: "Missing owner or repo" },
      { status: 400 }
    )

  const octokit = new Octokit({ auth: token })

  const maxPages = 1
  const perPage = 50
  const activityMap: Record<
    string,
    { commits: number; issues: number; pullRequests: number }
  > = {}

  const increment = (
    date: string,
    field: keyof (typeof activityMap)[string]
  ) => {
    if (!activityMap[date]) {
      activityMap[date] = { commits: 0, issues: 0, pullRequests: 0 }
    }
    activityMap[date][field]++
  }

  try {
    // === ① コミット ===
    for (let page = 1; page <= maxPages; page++) {
      const { data: commits } = await octokit.repos.listCommits({
        owner,
        repo,
        per_page: perPage,
        page,
      })

      if (commits.length === 0) break

      for (const commit of commits) {
        const date = formatDate(
          commit.commit.author?.date || commit.commit.committer?.date || ""
        )
        if (date) increment(date, "commits")
      }

      await sleep(300)
    }

    // === ② Issues (PR除く) ===
    for (let page = 1; page <= maxPages; page++) {
      const { data: issues } = await octokit.issues.listForRepo({
        owner,
        repo,
        state: "all",
        per_page: perPage,
        page,
      })

      if (issues.length === 0) break

      for (const issue of issues) {
        if (!issue.pull_request) {
          const date = formatDate(issue.created_at)
          increment(date, "issues")
        }
      }

      await sleep(300)
    }

    // === ③ Pull Requests (issueからPRだけ抽出) ===
    for (let page = 1; page <= maxPages; page++) {
      const { data: issues } = await octokit.issues.listForRepo({
        owner,
        repo,
        state: "all",
        per_page: perPage,
        page,
      })

      if (issues.length === 0) break

      for (const issue of issues) {
        if (issue.pull_request) {
          const date = formatDate(issue.created_at)
          increment(date, "pullRequests")
        }
      }

      await sleep(300)
    }

    const sorted = Object.entries(activityMap)
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([date, values]) => ({
        name: date,
        ...values,
      }))

    return NextResponse.json(sorted)
  } catch (error) {
    console.error("Activity summary fetch error:", error)
    return new NextResponse("Error fetching activity data", { status: 500 })
  }
}
