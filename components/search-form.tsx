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
        className="w-full bg-white/10 backdrop-blur-md border-white/30 text-white placeholder:text-white/60 focus:bg-white/20 transition-all duration-300"
      />
      <Button type="submit" size="icon" className="glass-button text-white hover:text-white">
        <SearchIcon className="h-4 w-4" />
        <span className="sr-only">Search</span>
      </Button>
    </form>
  )
}
