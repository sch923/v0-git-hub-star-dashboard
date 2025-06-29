"use client"

import { ExternalLink, GitForkIcon, StarIcon } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import axios from "axios"
import useSWR from "swr"
import { RepoStats } from "@/types"

interface RepoHeaderProps {
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

export function RepoHeader({ owner, name }: RepoHeaderProps) {
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
    <div className="glass-card-teal border-0 p-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold tracking-tight text-gray-800 drop-shadow-sm">
              {stats?.owner.login}/{stats?.name}
            </h1>
            <Badge
              variant="outline"
              className="bg-blue-50/75 border-blue-200/75 text-blue-700"
            >
              {stats?.language}
            </Badge>
            {stats?.license && (
              <Badge
                variant="outline"
                className="bg-green-50/75 border-green-200/75 text-green-700"
              >
                {stats.license}
              </Badge>
            )}
          </div>
          <p className="text-gray-700">{stats?.description}</p>
          <div className="flex flex-wrap gap-2">
            {stats?.topics?.map((topic) => (
              <Badge
                key={topic}
                variant="outline"
                className="bg-purple-50/75 border-purple-200/75 text-purple-700"
              >
                {topic}
              </Badge>
            ))}
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button className="glass-button text-gray-700 hover:text-gray-800 gap-1">
            <StarIcon className="h-4 w-4 text-yellow-500" />
            Star
            <span className="ml-1 text-xs text-gray-600">
              {stats?.stars?.toLocaleString()}
            </span>
          </Button>
          <Button className="glass-button text-gray-700 hover:text-gray-800 gap-1">
            <GitForkIcon className="h-4 w-4" />
            Fork
            <span className="ml-1 text-xs text-gray-600">
              {stats?.forks?.toLocaleString()}
            </span>
          </Button>
          {stats?.homepage && (
            <Button
              size="icon"
              className="glass-button text-gray-700 hover:text-gray-800"
              asChild
            >
              <a
                href={stats.homepage}
                target="_blank"
                rel="noopener noreferrer"
              >
                <ExternalLink className="h-4 w-4" />
                <span className="sr-only">Visit homepage</span>
              </a>
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}
