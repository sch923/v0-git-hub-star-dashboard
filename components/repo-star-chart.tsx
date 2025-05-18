"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

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
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) {
    return null
  }

  return (
    <div className={className} {...props}>
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          data={sampleData}
          margin={{
            top: 20,
            right: 30,
            left: 0,
            bottom: 0,
          }}
        >
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
                        {entry.name}: {entry.value.toLocaleString()} stars
                      </div>
                    ))}
                  </Card>
                )
              }
              return null
            }}
          />
          <Area type="monotone" dataKey="next.js" stackId="1" stroke="#0070f3" fill="#0070f3" />
          <Area type="monotone" dataKey="react" stackId="2" stroke="#61dafb" fill="#61dafb" />
          <Area type="monotone" dataKey="v0" stackId="3" stroke="#000000" fill="#000000" />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  )
}
