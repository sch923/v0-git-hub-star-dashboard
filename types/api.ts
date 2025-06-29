export interface RepoStats {
  name: string
  owner: {
    login: string
    avatar_url: string
  }
  description: string
  stars: number
  forks: number
  language: string
  license: string
  homepage: string
  topics: string[]
  issues: number
  pullRequests: number
  contributors: number
  commits: number
  lastUpdated: string
}
