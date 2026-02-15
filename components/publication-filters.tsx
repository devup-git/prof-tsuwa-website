"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

interface PublicationFiltersProps {
  onFilterChange: (filters: FilterState) => void
}

export interface FilterState {
  searchTerm: string
  type: "all" | "journal" | "conference"
  yearRange: { start: number; end: number }
}

export function PublicationFilters({ onFilterChange }: PublicationFiltersProps) {
  const [filters, setFilters] = useState<FilterState>({
    searchTerm: "",
    type: "all",
    yearRange: { start: 2000, end: 2026 },
  })

  const handleSearchChange = (value: string) => {
    const newFilters = { ...filters, searchTerm: value }
    setFilters(newFilters)
    onFilterChange(newFilters)
  }

  const handleTypeChange = (type: "all" | "journal" | "conference") => {
    const newFilters = { ...filters, type }
    setFilters(newFilters)
    onFilterChange(newFilters)
  }

  const handleYearStart = (value: number) => {
    const newFilters = {
      ...filters,
      yearRange: { ...filters.yearRange, start: value },
    }
    setFilters(newFilters)
    onFilterChange(newFilters)
  }

  const handleYearEnd = (value: number) => {
    const newFilters = {
      ...filters,
      yearRange: { ...filters.yearRange, end: value },
    }
    setFilters(newFilters)
    onFilterChange(newFilters)
  }

  return (
    <Card className="border-border sticky top-20 h-fit">
      <CardHeader>
        <CardTitle className="text-lg">Filter Publications</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Search */}
        <div>
          <label className="block text-sm font-semibold text-primary mb-2">Search</label>
          <input
            type="text"
            placeholder="Search by title or author..."
            value={filters.searchTerm}
            onChange={(e) => handleSearchChange(e.target.value)}
            className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-sm"
          />
        </div>

        {/* Type Filter */}
        <div>
          <label className="block text-sm font-semibold text-primary mb-3">Publication Type</label>
          <div className="space-y-2">
            {[
              { value: "all" as const, label: "All Publications" },
              { value: "journal" as const, label: "Journal Articles" },
              { value: "conference" as const, label: "Conference Papers" },
            ].map((option) => (
              <label key={option.value} className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="type"
                  value={option.value}
                  checked={filters.type === option.value}
                  onChange={() => handleTypeChange(option.value)}
                  className="w-4 h-4"
                />
                <span className="text-sm">{option.label}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Year Range */}
        <div>
          <label className="block text-sm font-semibold text-primary mb-3">Year Range</label>
          <div className="space-y-3">
            <div>
              <label className="block text-xs text-muted-foreground mb-1">From: {filters.yearRange.start}</label>
              <input
                type="range"
                min="1990"
                max="2030"
                value={filters.yearRange.start}
                onChange={(e) => handleYearStart(Number.parseInt(e.target.value))}
                className="w-full"
              />
            </div>
            <div>
              <label className="block text-xs text-muted-foreground mb-1">To: {filters.yearRange.end}</label>
              <input
                type="range"
                min="1990"
                max="2030"
                value={filters.yearRange.end}
                onChange={(e) => handleYearEnd(Number.parseInt(e.target.value))}
                className="w-full"
              />
            </div>
          </div>
        </div>

        {/* Reset Button */}
        <Button
          variant="outline"
          size="sm"
          className="w-full bg-transparent"
          onClick={() => {
            const defaultFilters: FilterState = {
              searchTerm: "",
              type: "all",
              yearRange: { start: 2000, end: 2026 },
            }
            setFilters(defaultFilters)
            onFilterChange(defaultFilters)
          }}
        >
          Reset Filters
        </Button>
      </CardContent>
    </Card>
  )
}
