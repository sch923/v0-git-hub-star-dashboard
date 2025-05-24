"use client"
import { GitCommitIcon } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

interface RepoContributorsProps {
  owner: string
  name: string
}

// Sample data - in a real app, this would come from the GitHub API
const getContributors = (owner: string, name: string) => {
  // This is mock data
  return [
    {
      login: "contributor1",
      avatar_url: "https://github.com/shadcn.png",
      contributions: 1234,
      url: "https://github.com/contributor1",
    },
    {
      login: "contributor2",
      avatar_url: "https://github.com/vercel.png",
      contributions: 987,
      url: "https://github.com/contributor2",
    },
    {
      login: "contributor3",
      avatar_url: "https://github.com/github.png",
      contributions: 876,
      url: "https://github.com/contributor3",
    },
    {
      login: "contributor4",
      avatar_url: "https://github.com/tailwindlabs.png",
      contributions: 765,
      url: "https://github.com/contributor4",
    },
    {
      login: "contributor5",
      avatar_url: "https://github.com/facebook.png",
      contributions: 654,
      url: "https://github.com/contributor5",
    },
    {
      login: "contributor6",
      avatar_url: "https://github.com/google.png",
      contributions: 543,
      url: "https://github.com/contributor6",
    },
    {
      login: "contributor7",
      avatar_url: "https://github.com/microsoft.png",
      contributions: 432,
      url: "https://github.com/contributor7",
    },
    {
      login: "contributor8",
      avatar_url: "https://github.com/apple.png",
      contributions: 321,
      url: "https://github.com/contributor8",
    },
    {
      login: "contributor9",
      avatar_url: "https://github.com/twitter.png",
      contributions: 210,
      url: "https://github.com/contributor9",
    },
    {
      login: "contributor10",
      avatar_url: "https://github.com/netflix.png",
      contributions: 109,
      url: "https://github.com/contributor10",
    },
  ]
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
                  <AvatarImage src={contributor.avatar_url || "/placeholder.svg"} alt={contributor.login} />
                  <AvatarFallback>{contributor.login.slice(0, 2).toUpperCase()}</AvatarFallback>
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
                <Progress value={(contributor.contributions / maxContributions) * 100} className="h-2" />
                <span className="text-xs text-muted-foreground">
                  {((contributor.contributions / maxContributions) * 100).toFixed(1)}%
                </span>
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
