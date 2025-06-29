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
import useSWR from "swr"
import { RepoStats } from "@/types"
import axios from "axios"

interface RepoStatsGridProps {
  owner: string
  name: string
}
const fetcher = (url: string) => axios(url).then((res) => res.data)

function useRepoStats(owner: string, name: string) {
  const { data, error } = useSWR<RepoStats>(
    `/api/github/repos/${owner}/${name}`,
    fetcher
  )
  return {
    stats: data,
    isLoading: !error && !data,
    isError: !!error,
  }
}

export function RepoStatsGrid({ owner, name }: RepoStatsGridProps) {
  const { stats, isLoading, isError } = useRepoStats(owner, name)
  if (isError) {
    return (
      <div className="flex items-center justify-center h-full">
        <p className="text-red-500">Failed to load repository stats.</p>
      </div>
    )
  }
  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-full">
        <p className="text-gray-500">Loading...</p>
      </div>
    )
  }
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
      <Card className="glass-card-yellow border-0">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Stars</CardTitle>
          <StarIcon className="h-4 w-4 text-yellow-400" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {stats?.stars?.toLocaleString() ?? "-"}
          </div>
        </CardContent>
      </Card>
      <Card className="glass-card-blue border-0">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Forks</CardTitle>
          <GitForkIcon className="h-4 w-4 text-blue-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {stats?.forks?.toLocaleString() ?? "-"}
          </div>
          <p className="text-xs text-muted-foreground">
            Fork ratio:{" "}
            {stats?.forks && stats?.stars
              ? ((stats.forks / stats.stars) * 100).toFixed(1)
              : "-"}
            %
          </p>
        </CardContent>
      </Card>
      <Card className="glass-card-orange border-0">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Issues</CardTitle>
          <IssueOpenedIcon className="h-4 w-4 text-orange-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {stats?.issues?.toLocaleString() ?? "-"}
          </div>
          <p className="text-xs text-muted-foreground">
            {stats?.pullRequests ?? "-"} open PRs
          </p>
        </CardContent>
      </Card>
      <Card className="glass-card-green border-0">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Contributors</CardTitle>
          <UsersIcon className="h-4 w-4 text-green-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {stats?.contributors?.toLocaleString() ?? "-"}
          </div>
          <p className="text-xs text-muted-foreground">Active community</p>
        </CardContent>
      </Card>
      <Card className="glass-card-purple border-0">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Commits</CardTitle>
          <CodeIcon className="h-4 w-4 text-purple-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {stats?.commits?.toLocaleString() ?? "-"}
          </div>
          <p className="text-xs text-muted-foreground">Total commits</p>
        </CardContent>
      </Card>
      <Card className="glass-card-indigo border-0">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Last Updated</CardTitle>
          <CalendarIcon className="h-4 w-4 text-indigo-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats?.lastUpdated}</div>
          <p className="text-xs text-muted-foreground">Active development</p>
        </CardContent>
      </Card>
    </div>
  )
}
