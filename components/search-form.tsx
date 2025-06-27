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
    <form
      onSubmit={handleSubmit}
      className={`flex w-full max-w-sm items-center space-x-2 ${className}`}
      {...props}
    >
      <Input
        type="search"
        placeholder="Search repositories..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="w-full bg-white/25 backdrop-blur-md border-white/40 text-gray-900 placeholder:text-gray-700 focus:bg-white/35 transition-all duration-300 font-medium drop-shadow-sm"
      />
      <Button
        type="submit"
        size="icon"
        className="bg-white/25 hover:bg-white/35 backdrop-blur-md border border-white/40 text-gray-900 hover:text-gray-900 transition-all duration-300 shadow-md"
      >
        <SearchIcon className="h-4 w-4" />
        <span className="sr-only">Search</span>
      </Button>
    </form>
  )
}
