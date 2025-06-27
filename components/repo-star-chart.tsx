"use client"

import type React from "react"

import { useEffect, useState } from "react"
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts"

import { Card } from "@/components/ui/card"

interface RepoStarChartProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string
}

// Sample data - in a real app, this would come from the GitHub API
const sampleData = [
  {
    name: "Jan",
    "next.js": 95000,
    react: 180000,
    v0: 10000,
  },
  {
    name: "Feb",
    "next.js": 98000,
    react: 184000,
    v0: 15000,
  },
  {
    name: "Mar",
    "next.js": 102000,
    react: 186000,
    v0: 22000,
  },
  {
    name: "Apr",
    "next.js": 105000,
    react: 190000,
    v0: 28000,
  },
  {
    name: "May",
    "next.js": 108000,
    react: 194000,
    v0: 35000,
  },
  {
    name: "Jun",
    "next.js": 112345,
    react: 198000,
    v0: 42000,
  },
]

export function RepoStarChart({ className, ...props }: RepoStarChartProps) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <div
        className={`${className} flex items-center justify-center bg-gray-50`}
      >
        <p className="text-muted-foreground">Loading chart...</p>
      </div>
    )
  }

  return (
    <div className={`${className} w-full h-full min-h-[350px]`} {...props}>
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          data={sampleData}
          margin={{
            top: 20,
            right: 30,
            left: 20,
            bottom: 20,
          }}
        >
          <defs>
            <linearGradient id="colorNextjs" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#0070f3" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#0070f3" stopOpacity={0.1} />
            </linearGradient>
            <linearGradient id="colorReact" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#61dafb" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#61dafb" stopOpacity={0.1} />
            </linearGradient>
            <linearGradient id="colorV0" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#000000" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#000000" stopOpacity={0.1} />
            </linearGradient>
          </defs>
          <CartesianGrid
            strokeDasharray="3 3"
            stroke="#374151"
            strokeWidth={1}
          />
          <XAxis
            dataKey="name"
            tick={{ fill: "#111827", fontSize: 12, fontWeight: "bold" }}
            axisLine={{ stroke: "#374151", strokeWidth: 2 }}
            tickLine={{ stroke: "#374151", strokeWidth: 2 }}
          />
          <YAxis
            tick={{ fill: "#111827", fontSize: 12, fontWeight: "bold" }}
            axisLine={{ stroke: "#374151", strokeWidth: 2 }}
            tickLine={{ stroke: "#374151", strokeWidth: 2 }}
          />
          <Tooltip
            content={({ active, payload, label }) => {
              if (active && payload && payload.length) {
                return (
                  <Card className="p-3 shadow-xl border bg-white/90 backdrop-blur-md">
                    <div className="font-bold text-gray-900 mb-2">{label}</div>
                    {payload.map((entry, index) => (
                      <div
                        key={`item-${index}`}
                        style={{ color: entry.color }}
                        className="font-semibold"
                      >
                        {entry.name}: {entry.value?.toLocaleString()} stars
                      </div>
                    ))}
                  </Card>
                )
              }
              return null
            }}
          />
          <Area
            type="monotone"
            dataKey="next.js"
            stroke="#0070f3"
            strokeWidth={3}
            fillOpacity={1}
            fill="url(#colorNextjs)"
          />
          <Area
            type="monotone"
            dataKey="react"
            stroke="#61dafb"
            strokeWidth={3}
            fillOpacity={1}
            fill="url(#colorReact)"
          />
          <Area
            type="monotone"
            dataKey="v0"
            stroke="#000000"
            strokeWidth={3}
            fillOpacity={1}
            fill="url(#colorV0)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  )
}
