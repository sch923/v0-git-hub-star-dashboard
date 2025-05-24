"use client"

import { GitCommitIcon, GitPullRequestIcon, FolderOpenIcon as IssueOpenedIcon } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"

interface RepoActivityProps {
  owner: string
  name: string
}

// Sample data - in a real app, this would come from the GitHub API
const getActivity = (owner: string, name: string) => {
  // This is mock data
  return [
    {
      type: "commit",
      title: "Fix bug in authentication flow",
      user: {
        login: "developer1",
        avatar_url: "https://github.com/shadcn.png",
      },
      date: "2 hours ago",
      url: "https://github.com/commit1",
    },
    {
      type: "issue",
      title: "Add support for dark mode",
      user: {
        login: "developer2",
        avatar_url: "https://github.com/vercel.png",
      },
      date: "5 hours ago",
      url: "https://github.com/issue1",
      status: "open",
    },
    {
      type: "pull_request",
      title: "Implement new feature XYZ",
      user: {
        login: "developer3",
        avatar_url: "https://github.com/github.png",
      },
      date: "1 day ago",
      url: "https://github.com/pr1",
      status: "open",
    },
    {
      type: "commit",
      title: "Update dependencies to latest versions",
      user: {
        login: "developer4",
        avatar_url: "https://github.com/tailwindlabs.png",
      },
      date: "2 days ago",
      url: "https://github.com/commit2",
    },
    {
      type: "issue",
      title: "Fix performance issue on mobile devices",
      user: {
        login: "developer5",
        avatar_url: "https://github.com/facebook.png",
      },
      date: "3 days ago",
      url: "https://github.com/issue2",
      status: "closed",
    },
    {
      type: "pull_request",
      title: "Refactor code for better maintainability",
      user: {
        login: "developer6",
        avatar_url: "https://github.com/google.png",
      },
      date: "4 days ago",
      url: "https://github.com/pr2",
      status: "merged",
    },
  ]
}

export function RepoActivity({ owner, name }: RepoActivityProps) {
  const activities = getActivity(owner, name)

  const getActivityIcon = (type: string) => {
    switch (type) {
      case "commit":
        return <GitCommitIcon className="h-4 w-4" />
      case "issue":
        return <IssueOpenedIcon className="h-4 w-4" />
      case "pull_request":
        return <GitPullRequestIcon className="h-4 w-4" />
      default:
        return null
    }
  }

  const getStatusBadge = (activity: any) => {
    if (!activity.status) return null

    switch (activity.status) {
      case "open":
        return (
          <Badge variant="outline" className="bg-green-50 text-green-700">
            Open
          </Badge>
        )
      case "closed":
        return (
          <Badge variant="outline" className="bg-red-50 text-red-700">
            Closed
          </Badge>
        )
      case "merged":
        return (
          <Badge variant="outline" className="bg-purple-50 text-purple-700">
            Merged
          </Badge>
        )
      default:
        return null
    }
  }

  return (
    <div className="space-y-4">
      {activities.map((activity, index) => (
        <div key={index} className="flex items-start gap-4 pb-4 border-b last:border-0">
          <Avatar className="h-8 w-8">
            <AvatarImage src={activity.user.avatar_url || "/placeholder.svg"} alt={activity.user.login} />
            <AvatarFallback>{activity.user.login.slice(0, 2).toUpperCase()}</AvatarFallback>
          </Avatar>
          <div className="flex-1 space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-muted-foreground">{getActivityIcon(activity.type)}</span>
              <a href={activity.url} target="_blank" rel="noopener noreferrer" className="font-medium hover:underline">
                {activity.title}
              </a>
              {getStatusBadge(activity)}
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <span>{activity.user.login}</span>
              <span>•</span>
              <span>{activity.date}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
