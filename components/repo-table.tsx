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

interface RepoTableProps {
  sortBy?: "stars" | "growth"
}

// Sample data - in a real app, this would come from the GitHub API
const repositories = [
  {
    name: "next.js",
    owner: "vercel",
    stars: 112345,
    growth: 1200,
    language: "TypeScript",
  },
  {
    name: "react",
    owner: "facebook",
    stars: 198000,
    growth: 800,
    language: "JavaScript",
  },
  {
    name: "v0",
    owner: "vercel",
    stars: 42000,
    growth: 1234,
    language: "TypeScript",
  },
  {
    name: "svelte",
    owner: "sveltejs",
    stars: 68000,
    growth: 500,
    language: "TypeScript",
  },
  {
    name: "tailwindcss",
    owner: "tailwindlabs",
    stars: 71000,
    growth: 600,
    language: "CSS",
  },
]

export function RepoTable({ sortBy = "stars" }: RepoTableProps) {
  const sortedRepos = [...repositories].sort((a, b) => {
    if (sortBy === "stars") {
      return b.stars - a.stars
    } else {
      return b.growth - a.growth
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
            <TableHead className="text-right text-gray-900 font-bold drop-shadow-sm">
              Stars
            </TableHead>
            {sortBy === "growth" && (
              <TableHead className="text-right text-gray-900 font-bold drop-shadow-sm">
                Growth
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
              <TableCell className="text-right">
                <div className="flex items-center justify-end gap-1">
                  <span className="text-gray-900 font-bold drop-shadow-sm">
                    {repo.stars.toLocaleString()}
                  </span>
                  <StarIcon className="h-4 w-4 text-yellow-600 drop-shadow-sm" />
                </div>
              </TableCell>
              {sortBy === "growth" && (
                <TableCell className="text-right">
                  <Badge
                    variant="outline"
                    className="bg-green-50/80 border-green-300/80 text-green-900 font-medium"
                  >
                    +{repo.growth.toLocaleString()} this week
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
