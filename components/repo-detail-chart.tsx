"use client"

import type React from "react"

import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts"

import { Card } from "@/components/ui/card"
import axios from "axios"
import useSWR from "swr"

interface RepoDetailChartProps extends React.HTMLAttributes<HTMLDivElement> {
  owner: string
  name: string
  type: "stars" | "forks" | "issues" | "activity"
  className?: string
}

interface Star {
  [name: string]: number
}
interface Fork {
  [name: string]: number
}
interface Contribution {
  name: string
  openIssues: number
  closedIssues: number
  openPRs: number
  closedPRs: number
}
interface Activity {
  name: string
  commits: number
  issues: number
  pullRequests: number
}

const fetcher = (url: string) => axios(url).then((res) => res.data)

function useStars(owner: string, name: string) {
  const { data, error } = useSWR<Star[]>(
    `/api/github/repos/${owner}/${name}/stars`,
    fetcher
  )
  return {
    stars: data ?? [],
    isLoading: !error && !data,
    isError: !!error,
  }
}
function useForks(owner: string, name: string) {
  const { data, error } = useSWR<Fork[]>(
    `/api/github/repos/${owner}/${name}/forks`,
    fetcher
  )
  return {
    forks: data ?? [],
    isLoading: !error && !data,
    isError: !!error,
  }
}
function useContributions(owner: string, name: string) {
  const { data, error } = useSWR<Contribution[]>(
    `/api/github/repos/${owner}/${name}/contributions`,
    fetcher
  )
  return {
    contributions: data ?? [],
    isLoading: !error && !data,
    isError: !!error,
  }
}
function useActivity(owner: string, name: string) {
  const { data, error } = useSWR<Activity[]>(
    `/api/github/repos/${owner}/${name}/activities`,
    fetcher
  )
  return {
    activity: data ?? [],
    isLoading: !error && !data,
    isError: !!error,
  }
}

function useRepoDetailChartData(
  owner: string,
  name: string,
  type: RepoDetailChartProps["type"]
) {
  const {
    stars,
    isLoading: isStarsLoading,
    isError: isStarsError,
  } = useStars(owner, name)
  const {
    forks,
    isLoading: isForksLoading,
    isError: isForksError,
  } = useForks(owner, name)
  const {
    contributions,
    isLoading: isContributionsLoading,
    isError: isContributionsError,
  } = useContributions(owner, name)
  const {
    activity,
    isLoading: isActivityLoading,
    isError: isActivityError,
  } = useActivity(owner, name)

  let data: Star[] | Fork[] | Contribution[] | Activity[] = []
  let isLoading = false
  let isError = false

  switch (type) {
    case "stars":
      data = stars
      isLoading = isStarsLoading
      isError = isStarsError
      break
    case "forks":
      data = forks
      isLoading = isForksLoading
      isError = isForksError
      break
    case "issues":
      data = contributions
      isLoading = isContributionsLoading
      isError = isContributionsError
      break
    case "activity":
      data = activity
      isLoading = isActivityLoading
      isError = isActivityError
      break
    default:
      data = []
      isLoading = false
      isError = true
      break
  }

  return { data, isLoading, isError }
}

export function RepoDetailChart({
  owner,
  name,
  type,
  className,
  ...props
}: RepoDetailChartProps) {
  const { data, isLoading, isError } = useRepoDetailChartData(owner, name, type)

  const axisProps = {
    tick: { fill: "#111827", fontSize: 12, fontWeight: "bold" },
    axisLine: { stroke: "#374151", strokeWidth: 2 },
    tickLine: { stroke: "#374151", strokeWidth: 2 },
  }

  const gridProps = {
    strokeDasharray: "3 3",
    stroke: "#374151",
    strokeWidth: 1,
  }

  const tooltipContent = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <Card className="p-3 shadow-xl border bg-white/70">
          <div className="font-bold text-gray-900 mb-2">{label}</div>
          {payload.map((entry: any, index: number) => (
            <div
              key={`item-${index}`}
              style={{ color: entry.color }}
              className="font-semibold"
            >
              {entry.name}: {entry.value?.toLocaleString()}
            </div>
          ))}
        </Card>
      )
    }
    return null
  }

  if (isError) {
    return (
      <div
        className={`${className} flex items-center justify-center bg-white/25 backdrop-blur-lg`}
      >
        <p className="text-red-500">Error loading chart data</p>
      </div>
    )
  }
  if (isLoading) {
    return (
      <div
        className={`${className} flex items-center justify-center bg-white/25 backdrop-blur-lg`}
      >
        <p className="text-muted-foreground">Loading chart...</p>
      </div>
    )
  }

  const renderChart = () => {
    switch (type) {
      case "stars":
        return (
          <AreaChart
            data={data}
            margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
          >
            <defs>
              <linearGradient id="colorStars" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#0070f3" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#0070f3" stopOpacity={0.1} />
              </linearGradient>
            </defs>
            <CartesianGrid {...gridProps} />
            <XAxis dataKey="name" {...axisProps} />
            <YAxis {...axisProps} />
            <Tooltip content={tooltipContent} />
            <Area
              type="monotone"
              dataKey="stars"
              stroke="#0070f3"
              strokeWidth={3}
              fillOpacity={1}
              fill="url(#colorStars)"
            />
          </AreaChart>
        )
      case "forks":
        return (
          <AreaChart
            data={data}
            margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
          >
            <defs>
              <linearGradient id="colorForks" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#2563eb" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#2563eb" stopOpacity={0.1} />
              </linearGradient>
            </defs>
            <CartesianGrid {...gridProps} />
            <XAxis dataKey="name" {...axisProps} />
            <YAxis {...axisProps} />
            <Tooltip content={tooltipContent} />
            <Area
              type="monotone"
              dataKey="forks"
              stroke="#2563eb"
              strokeWidth={3}
              fillOpacity={1}
              fill="url(#colorForks)"
            />
          </AreaChart>
        )
      case "issues":
        return (
          <LineChart
            data={data}
            margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
          >
            <CartesianGrid {...gridProps} />
            <XAxis dataKey="name" {...axisProps} />
            <YAxis {...axisProps} />
            <Tooltip content={tooltipContent} />
            <Legend
              wrapperStyle={{
                color: "#111827",
                fontWeight: "bold",
                fontSize: "12px",
              }}
            />
            <Line
              type="monotone"
              dataKey="openIssues"
              stroke="#f97316"
              strokeWidth={3}
              name="Open Issues"
            />
            <Line
              type="monotone"
              dataKey="closedIssues"
              stroke="#84cc16"
              strokeWidth={3}
              name="Closed Issues"
            />
            <Line
              type="monotone"
              dataKey="openPRs"
              stroke="#8b5cf6"
              strokeWidth={3}
              name="Open PRs"
            />
            <Line
              type="monotone"
              dataKey="closedPRs"
              stroke="#14b8a6"
              strokeWidth={3}
              name="Closed PRs"
            />
          </LineChart>
        )
      case "activity":
        return (
          <BarChart
            data={data}
            margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
          >
            <CartesianGrid {...gridProps} />
            <XAxis dataKey="name" {...axisProps} />
            <YAxis {...axisProps} />
            <Tooltip
              content={tooltipContent}
              cursor={{ fill: "transparent" }}
            />
            <Legend
              wrapperStyle={{
                color: "#111827",
                fontWeight: "bold",
                fontSize: "12px",
              }}
            />
            <Bar dataKey="commits" fill="#0070f3" name="Commits" />
            <Bar dataKey="issues" fill="#f97316" name="Issues" />
            <Bar dataKey="pullRequests" fill="#8b5cf6" name="Pull Requests" />
          </BarChart>
        )
      default:
        return null
    }
  }

  return (
    <div className={`${className} w-full h-full min-h-[350px]`} {...props}>
      <ResponsiveContainer width="100%" height="100%">
        {renderChart() ?? <div />}
      </ResponsiveContainer>
    </div>
  )
}
