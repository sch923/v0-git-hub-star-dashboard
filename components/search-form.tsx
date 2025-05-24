"use client"

import type React from "react"

import { useState } from "react"
import { SearchIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

interface SearchFormProps extends React.HTMLAttributes<HTMLFormElement> {
  className?: string
}

export function SearchForm({ className, ...props }: SearchFormProps) {
  const [query, setQuery] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // In a real app, this would trigger a search
    console.log("Searching for:", query)
  }

  return (
    <form onSubmit={handleSubmit} className={`flex w-full max-w-sm items-center space-x-2 ${className}`} {...props}>
      <Input
        type="search"
        placeholder="Search repositories..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="w-full bg-white/10 backdrop-blur-sm border-white/20 text-gray-700 placeholder:text-gray-500 focus:bg-white/20 transition-all duration-300"
      />
      <Button type="submit" size="icon" className="glass-button text-gray-700 hover:text-gray-800">
        <SearchIcon className="h-4 w-4" />
        <span className="sr-only">Search</span>
      </Button>
    </form>
  )
}
