import { Octokit } from "@octokit/rest"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth" // NextAuthの設定

export async function GET() {
  const session = await getServerSession(authOptions)

  const token = session?.accessToken
  if (!token) {
    return new Response("Unauthorized", { status: 401 })
  }

  const octokit = new Octokit({ auth: token })
  try {
    const response = await octokit.rest.search.repos({
      q: "typescript in:name,description",
      sort: "stars",
      order: "desc",
      per_page: 10,
    })

    const topRepos = response.data.items.map((repo) => ({
      name: repo.name,
      owner: repo.owner?.login ?? null,
      stars: repo.stargazers_count,
      language: repo.language,
    }))

    const reposWithContributors = await Promise.all(
      topRepos.map(async (repo) => {
        try {
          const contributors = await octokit.rest.repos.listContributors({
            owner: repo.owner!,
            repo: repo.name,
            per_page: 1,
          })
          return {
            ...repo,
            contributors: contributors.headers["link"]
              ? parseInt(
                  contributors.headers["link"].match(
                    /&page=(\d+)>; rel="last"/
                  )?.[1] || "1"
                )
              : contributors.data.length,
          }
        } catch {
          return { ...repo, contributors: null }
        }
      })
    )

    return Response.json(reposWithContributors)
  } catch (error) {
    return new Response("Internal Server Error", { status: 500 })
  }
}
