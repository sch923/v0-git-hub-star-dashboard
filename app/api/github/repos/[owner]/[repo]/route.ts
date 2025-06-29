import { authOptions } from "@/lib/auth"
import { Octokit } from "@octokit/rest"
import { getServerSession } from "next-auth"
import { NextRequest, NextResponse } from "next/server"

function formatTimeAgo(date: string): string {
  const diff = Date.now() - new Date(date).getTime()
  const hours = Math.floor(diff / (1000 * 60 * 60))
  if (hours < 24) return `${hours} hours ago`
  const days = Math.floor(hours / 24)
  return `${days} days ago`
}

export async function GET(
  _req: NextRequest,
  { params }: { params: { owner: string; repo: string } }
) {
  const session = await getServerSession(authOptions)
  const token = session?.accessToken

  if (!token) return new Response("Unauthorized", { status: 401 })

  const { owner, repo } = await params

  const octokit = new Octokit({ auth: token })

  try {
    // ① リポジトリの基本情報
    const { data: repoData } = await octokit.repos.get({ owner, repo })
    // ② コミット数（最新コミット取得）
    const { data: latestCommits } = await octokit.repos.listCommits({
      owner,
      repo,
      per_page: 1,
    })
    const lastUpdated = latestCommits[0]?.commit?.committer?.date
      ? formatTimeAgo(latestCommits[0].commit.committer.date)
      : "Unknown"

    // ③ コントリビューター数
    const { data: contributors } = await octokit.repos.listContributors({
      owner,
      repo,
      per_page: 1,
    })
    const contributorCount =
      contributors.length > 0 ? contributors[0].contributions : 0

    // ④ Issue/PR カウント
    const [openIssuesResp, openPRsResp] = await Promise.all([
      octokit.issues.listForRepo({
        owner,
        repo,
        state: "all",
        per_page: 100,
      }),
      octokit.pulls.list({
        owner,
        repo,
        state: "all",
        per_page: 100,
      }),
    ])

    const issues = openIssuesResp.data.filter((issue) => !issue.pull_request)
    const pullRequests = openPRsResp.data

    // ⑤ コミット数（概算）
    const { data: participation } = await octokit.repos.getParticipationStats({
      owner,
      repo,
    })
    const totalCommits = participation.all.reduce((sum, n) => sum + n, 0)

    const repoStats = {
      name: repoData.name,
      owner: {
        login: repoData.owner.login,
        avatar_url: repoData.owner.avatar_url,
      },
      description: repoData.description || "",
      stars: repoData.stargazers_count,
      forks: repoData.forks_count,
      language: repoData.language || "Unknown",
      license: repoData.license?.spdx_id || "No license",
      homepage: repoData.homepage || "",
      topics: repoData.topics ?? [],
      issues: issues.length,
      pullRequests: pullRequests.length,
      contributors: contributorCount,
      commits: totalCommits,
      lastUpdated,
    }
    return NextResponse.json(repoStats)
  } catch (error: any) {
    console.error("GitHub stats fetch error:", error)
    return new NextResponse(
      JSON.stringify({ error: error.message || "Failed to fetch stats" }),
      { status: 500 }
    )
  }
}
