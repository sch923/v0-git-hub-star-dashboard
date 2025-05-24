"use client"

import {
  CalendarIcon,
  CodeIcon,
  GitForkIcon,
  FolderOpenIcon as IssueOpenedIcon,
  StarIcon,
  UsersIcon,
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface RepoStatsGridProps {
  owner: string
  name: string
}

// Sample data - in a real app, this would come from the GitHub API
const getRepoStats = (owner: string, name: string) => {
  // This is mock data
  return {
    stars: name === "next.js" ? 112345 : 42000,
    forks: name === "next.js" ? 24680 : 5678,
    issues: name === "next.js" ? 1234 : 456,
    pullRequests: name === "next.js" ? 567 : 123,
    contributors: name === "next.js" ? 2468 : 789,
    commits: name === "next.js" ? 35791 : 12345,
    starsGrowth: name === "next.js" ? "+1,200 this week" : "+500 this week",
    lastUpdated: "2 hours ago",
  }
}

export function RepoStatsGrid({ owner, name }: RepoStatsGridProps) {
  const stats = getRepoStats(owner, name)

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Stars</CardTitle>
          <StarIcon className="h-4 w-4 text-yellow-400" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.stars.toLocaleString()}</div>
          <p className="text-xs text-muted-foreground">{stats.starsGrowth}</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Forks</CardTitle>
          <GitForkIcon className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.forks.toLocaleString()}</div>
          <p className="text-xs text-muted-foreground">Fork ratio: {((stats.forks / stats.stars) * 100).toFixed(1)}%</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Issues</CardTitle>
          <IssueOpenedIcon className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.issues.toLocaleString()}</div>
          <p className="text-xs text-muted-foreground">{stats.pullRequests} open PRs</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Contributors</CardTitle>
          <UsersIcon className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.contributors.toLocaleString()}</div>
          <p className="text-xs text-muted-foreground">Active community</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Commits</CardTitle>
          <CodeIcon className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.commits.toLocaleString()}</div>
          <p className="text-xs text-muted-foreground">Total commits</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Last Updated</CardTitle>
          <CalendarIcon className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.lastUpdated}</div>
          <p className="text-xs text-muted-foreground">Active development</p>
        </CardContent>
      </Card>
    </div>
  )
}
