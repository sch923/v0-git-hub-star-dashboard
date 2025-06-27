"use client"
import { GitCommitIcon } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import axios from "axios"
import useSWR from "swr"

interface RepoContributorsProps {
  owner: string
  name: string
}

interface Contributor {
  login: string
  avatar_url: string
  contributions: number
  url: string
}

const fetcher = (url: string) => axios(url).then((res) => res.data)

function useContributors(owner: string, name: string) {
  const { data, error } = useSWR<Contributor[]>(
    `/api/github/repos/${owner}/${name}/contributors`,
    fetcher
  )
  return {
    contributors: data ?? [],
    isLoading: !error && !data,
    isError: !!error,
  }
}

const getContributors = (owner: string, name: string) => {
  const { contributors, isLoading, isError } = useContributors(owner, name)
  if (isLoading) {
    return [
      {
        login: "loading",
        avatar_url: "/placeholder.svg",
        contributions: 0,
        url: "#",
      },
    ]
  }
  if (isError) {
    return [
      {
        login: "error",
        avatar_url: "/placeholder.svg",
        contributions: 0,
        url: "#",
      },
    ]
  }
  if (contributors.length === 0) {
    return [
      {
        login: "no-contributors",
        avatar_url: "/placeholder.svg",
        contributions: 0,
        url: "#",
      },
    ]
  }

  return contributors
}

export function RepoContributors({ owner, name }: RepoContributorsProps) {
  const contributors = getContributors(owner, name)
  const maxContributions = Math.max(...contributors.map((c) => c.contributions))

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Contributor</TableHead>
          <TableHead>Commits</TableHead>
          <TableHead className="hidden md:table-cell">Contribution %</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {contributors.map((contributor) => (
          <TableRow key={contributor.login}>
            <TableCell>
              <div className="flex items-center gap-2">
                <Avatar className="h-8 w-8">
                  <AvatarImage
                    src={contributor.avatar_url || "/placeholder.svg"}
                    alt={contributor.login}
                  />
                  <AvatarFallback>
                    {contributor.login.slice(0, 2).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <a
                  href={contributor.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium hover:underline"
                >
                  {contributor.login}
                </a>
              </div>
            </TableCell>
            <TableCell>
              <div className="flex items-center gap-1">
                <GitCommitIcon className="h-4 w-4 text-muted-foreground" />
                <span>{contributor.contributions.toLocaleString()}</span>
              </div>
            </TableCell>
            <TableCell className="hidden md:table-cell">
              <div className="flex items-center gap-2">
                <Progress
                  value={(contributor.contributions / maxContributions) * 100}
                  className="h-2"
                />
                <span className="text-xs text-muted-foreground">
                  {(
                    (contributor.contributions / maxContributions) *
                    100
                  ).toFixed(1)}
                  %
                </span>
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
