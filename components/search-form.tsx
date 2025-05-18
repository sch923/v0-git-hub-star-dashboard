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
        className="w-full"
      />
      <Button type="submit" size="icon" variant="ghost">
        <SearchIcon className="h-4 w-4" />
        <span className="sr-only">Search</span>
      </Button>
    </form>
  )
}
