"use client"

import { ExternalLink, GitForkIcon, StarIcon } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

interface RepoHeaderProps {
  owner: string
  name: string
}

// Sample data - in a real app, this would come from the GitHub API
const getRepoData = (owner: string, name: string) => {
  // This is mock data
  return {
    name,
    owner: {
      login: owner,
      avatar_url: `https://github.com/${owner}.png`,
    },
    description: name === "next.js" ? "The React Framework for the Web" : "Sample repository description for " + name,
    stars: name === "next.js" ? 112345 : 42000,
    forks: name === "next.js" ? 24680 : 5678,
    language: "TypeScript",
    license: "MIT",
    homepage: `https://${name}.org`,
    topics: ["react", "javascript", "framework", "web"],
  }
}

export function RepoHeader({ owner, name }: RepoHeaderProps) {
  const repo = getRepoData(owner, name)

  return (
    <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <h1 className="text-2xl font-bold tracking-tight">
            {repo.owner.login}/{repo.name}
          </h1>
          <Badge variant="outline">{repo.language}</Badge>
          {repo.license && <Badge variant="outline">{repo.license}</Badge>}
        </div>
        <p className="text-muted-foreground">{repo.description}</p>
        <div className="flex flex-wrap gap-2">
          {repo.topics.map((topic) => (
            <Badge key={topic} variant="secondary">
              {topic}
            </Badge>
          ))}
        </div>
      </div>
      <div className="flex items-center gap-2">
        <Button variant="outline" className="gap-1">
          <StarIcon className="h-4 w-4 text-yellow-400" />
          Star
          <span className="ml-1 text-xs text-muted-foreground">{repo.stars.toLocaleString()}</span>
        </Button>
        <Button variant="outline" className="gap-1">
          <GitForkIcon className="h-4 w-4" />
          Fork
          <span className="ml-1 text-xs text-muted-foreground">{repo.forks.toLocaleString()}</span>
        </Button>
        {repo.homepage && (
          <Button variant="outline" size="icon" asChild>
            <a href={repo.homepage} target="_blank" rel="noopener noreferrer">
              <ExternalLink className="h-4 w-4" />
              <span className="sr-only">Visit homepage</span>
            </a>
          </Button>
        )}
      </div>
    </div>
  )
}
