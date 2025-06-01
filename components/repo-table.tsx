"use client"

import Link from "next/link"
import { StarIcon } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import useSWR from "swr"
import axios from "axios"

interface RepoTableProps {
  sortBy?: "stars" | "contributors"
}

interface Repository {
  name: string
  owner: string
  stars: number
  language: string
  contributors?: number // Optional, in case contributor data is not available
}

const fetcher = (url: string) => axios(url).then((res) => res.data)

function useRepositories() {
  const { data, error } = useSWR<Repository[]>("/api/github/repos", fetcher)
  return {
    repositories: data ?? [],
    isLoading: !error && !data,
    isError: !!error,
  }
}

export function RepoTable({ sortBy = "stars" }: RepoTableProps) {
  const { repositories, isLoading, isError } = useRepositories()
  if (isLoading) {
    return <div className="text-gray-500">Loading...</div>
  }
  if (isError) {
    return <div className="text-red-500">Failed to load repositories</div>
  }
  if (repositories.length === 0) {
    return <div className="text-gray-500">No repositories found</div>
  }
  const sortedRepos = [...repositories].sort((a, b) => {
    if (sortBy === "stars") {
      return b.stars - a.stars
    } else {
      // Ensure both branches return a number
      return (b.contributors ?? 0) - (a.contributors ?? 0)
    }
  })

  return (
    <div className="glass rounded-lg overflow-hidden  shadow-lg">
      <Table>
        <TableHeader>
          <TableRow className="border-white/30 hover:bg-white/20">
            <TableHead className="text-gray-900 font-bold drop-shadow-sm">
              Repository
            </TableHead>
            {sortBy === "stars" && (
              <TableHead className="text-right text-gray-900 font-bold drop-shadow-sm">
                Stars
              </TableHead>
            )}
            {sortBy === "contributors" && (
              <TableHead className="text-right text-gray-900 font-bold drop-shadow-sm">
                Contributors
              </TableHead>
            )}
          </TableRow>
        </TableHeader>
        <TableBody>
          {sortedRepos.map((repo) => (
            <TableRow
              key={`${repo.owner}/${repo.name}`}
              className="border-white/20 hover:bg-white/25 transition-colors"
            >
              <TableCell>
                <Link
                  href={`/repo/${repo.owner}/${repo.name}`}
                  className="hover:underline"
                >
                  <div className="font-bold text-gray-900 drop-shadow-sm">
                    {repo.name}
                  </div>
                  <div className="text-sm text-gray-800 drop-shadow-sm font-medium">
                    {repo.owner}
                  </div>
                  <Badge
                    variant="outline"
                    className="mt-1 bg-blue-50/80 border-blue-300/80 text-blue-900 font-medium"
                  >
                    {repo.language}
                  </Badge>
                </Link>
              </TableCell>
              {sortBy === "stars" && (
                <TableCell className="text-right">
                  <div className="flex items-center justify-end gap-1">
                    <span className="text-gray-900 font-bold drop-shadow-sm">
                      {repo.stars.toLocaleString()}
                    </span>
                    <StarIcon className="h-4 w-4 text-yellow-600 drop-shadow-sm" />
                  </div>
                </TableCell>
              )}
              {sortBy === "contributors" && (
                <TableCell className="text-right">
                  <Badge
                    variant="outline"
                    className="bg-green-50/80 border-green-300/80 text-green-900 font-medium"
                  >
                    {(repo.contributors ?? 0).toLocaleString()} contributors
                  </Badge>
                </TableCell>
              )}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
