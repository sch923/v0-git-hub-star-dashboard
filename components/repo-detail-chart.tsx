"use client"

import type React from "react"

import { useEffect, useState } from "react"
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

interface RepoDetailChartProps extends React.HTMLAttributes<HTMLDivElement> {
  owner: string
  name: string
  type: "stars" | "forks" | "issues" | "activity"
  className?: string
}

// Sample data - in a real app, this would come from the GitHub API
const getChartData = (owner: string, name: string, type: string) => {
  // This is mock data
  const baseData = [
    { name: "Jan", value: 1000 },
    { name: "Feb", value: 1500 },
    { name: "Mar", value: 2000 },
    { name: "Apr", value: 2500 },
    { name: "May", value: 3000 },
    { name: "Jun", value: 3500 },
    { name: "Jul", value: 4000 },
    { name: "Aug", value: 5000 },
    { name: "Sep", value: 6000 },
    { name: "Oct", value: 7000 },
    { name: "Nov", value: 9000 },
    { name: "Dec", value: 11000 },
  ]

  if (type === "stars") {
    return baseData.map((item) => ({
      name: item.name,
      stars: item.value * (name === "next.js" ? 10 : 4),
    }))
  } else if (type === "forks") {
    return baseData.map((item) => ({
      name: item.name,
      forks: Math.floor(item.value * 0.2) * (name === "next.js" ? 10 : 4),
    }))
  } else if (type === "issues") {
    return baseData.map((item) => ({
      name: item.name,
      openIssues: Math.floor(item.value * 0.1) * (name === "next.js" ? 1 : 0.4),
      closedIssues: Math.floor(item.value * 0.08) * (name === "next.js" ? 1 : 0.4),
      openPRs: Math.floor(item.value * 0.05) * (name === "next.js" ? 1 : 0.4),
      closedPRs: Math.floor(item.value * 0.04) * (name === "next.js" ? 1 : 0.4),
    }))
  } else if (type === "activity") {
    return baseData.map((item) => ({
      name: item.name,
      commits: Math.floor(item.value * 0.3) * (name === "next.js" ? 10 : 4),
      issues: Math.floor(item.value * 0.1) * (name === "next.js" ? 10 : 4),
      pullRequests: Math.floor(item.value * 0.05) * (name === "next.js" ? 10 : 4),
    }))
  }

  return baseData
}

export function RepoDetailChart({ owner, name, type, className, ...props }: RepoDetailChartProps) {
  const [mounted, setMounted] = useState(false)
  const data = getChartData(owner, name, type)

  useEffect(() => {
    setMounted(true)
  }, [])

  // クライアントサイドレンダリングのためのプレースホルダー
  if (!mounted) {
    return (
      <div className={`${className} flex items-center justify-center bg-gray-50`}>
        <p className="text-muted-foreground">Loading chart...</p>
      </div>
    )
  }

  const renderChart = () => {
    switch (type) {
      case "stars":
        return (
          <AreaChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="colorStars" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#0070f3" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#0070f3" stopOpacity={0.1} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip
              content={({ active, payload, label }) => {
                if (active && payload && payload.length) {
                  return (
                    <Card className="p-2 shadow-lg border">
                      <div className="font-bold">{label}</div>
                      <div style={{ color: "#0070f3" }}>Stars: {payload[0].value.toLocaleString()}</div>
                    </Card>
                  )
                }
                return null
              }}
            />
            <Area type="monotone" dataKey="stars" stroke="#0070f3" fillOpacity={1} fill="url(#colorStars)" />
          </AreaChart>
        )
      case "forks":
        return (
          <AreaChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="colorForks" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#2563eb" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#2563eb" stopOpacity={0.1} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip
              content={({ active, payload, label }) => {
                if (active && payload && payload.length) {
                  return (
                    <Card className="p-2 shadow-lg border">
                      <div className="font-bold">{label}</div>
                      <div style={{ color: "#2563eb" }}>Forks: {payload[0].value.toLocaleString()}</div>
                    </Card>
                  )
                }
                return null
              }}
            />
            <Area type="monotone" dataKey="forks" stroke="#2563eb" fillOpacity={1} fill="url(#colorForks)" />
          </AreaChart>
        )
      case "issues":
        return (
          <LineChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip
              content={({ active, payload, label }) => {
                if (active && payload && payload.length) {
                  return (
                    <Card className="p-2 shadow-lg border">
                      <div className="font-bold">{label}</div>
                      {payload.map((entry, index) => (
                        <div key={`item-${index}`} style={{ color: entry.color }}>
                          {entry.name}: {entry.value.toLocaleString()}
                        </div>
                      ))}
                    </Card>
                  )
                }
                return null
              }}
            />
            <Legend />
            <Line type="monotone" dataKey="openIssues" stroke="#f97316" name="Open Issues" />
            <Line type="monotone" dataKey="closedIssues" stroke="#84cc16" name="Closed Issues" />
            <Line type="monotone" dataKey="openPRs" stroke="#8b5cf6" name="Open PRs" />
            <Line type="monotone" dataKey="closedPRs" stroke="#14b8a6" name="Closed PRs" />
          </LineChart>
        )
      case "activity":
        return (
          <BarChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip
              content={({ active, payload, label }) => {
                if (active && payload && payload.length) {
                  return (
                    <Card className="p-2 shadow-lg border">
                      <div className="font-bold">{label}</div>
                      {payload.map((entry, index) => (
                        <div key={`item-${index}`} style={{ color: entry.color }}>
                          {entry.name}: {entry.value.toLocaleString()}
                        </div>
                      ))}
                    </Card>
                  )
                }
                return null
              }}
            />
            <Legend />
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
        {renderChart()}
      </ResponsiveContainer>
    </div>
  )
}
