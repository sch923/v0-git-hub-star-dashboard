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
    <div className="glass-card border-0 p-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold tracking-tight text-white drop-shadow-lg">
              {repo.owner.login}/{repo.name}
            </h1>
            <Badge variant="outline" className="bg-blue-500/20 border-blue-400/30 text-blue-200">
              {repo.language}
            </Badge>
            {repo.license && (
              <Badge variant="outline" className="bg-green-500/20 border-green-400/30 text-green-200">
                {repo.license}
              </Badge>
            )}
          </div>
          <p className="text-white/80">{repo.description}</p>
          <div className="flex flex-wrap gap-2">
            {repo.topics.map((topic) => (
              <Badge key={topic} variant="outline" className="bg-purple-500/20 border-purple-400/30 text-purple-200">
                {topic}
              </Badge>
            ))}
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button className="glass-button text-white hover:text-white gap-1">
            <StarIcon className="h-4 w-4 text-yellow-300" />
            Star
            <span className="ml-1 text-xs text-white/70">{repo.stars.toLocaleString()}</span>
          </Button>
          <Button className="glass-button text-white hover:text-white gap-1">
            <GitForkIcon className="h-4 w-4" />
            Fork
            <span className="ml-1 text-xs text-white/70">{repo.forks.toLocaleString()}</span>
          </Button>
          {repo.homepage && (
            <Button size="icon" className="glass-button text-white hover:text-white" asChild>
              <a href={repo.homepage} target="_blank" rel="noopener noreferrer">
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
