"use client"

import { useState, useMemo } from "react"
import { Card, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ExternalLink, Download, BookOpen } from "lucide-react"
import { PublicationFilters, type FilterState } from "@/components/publication-filters"

interface Publication {
  id: string
  title: string
  authors: string[]
  publication_year: number
  publication_type: string
  journal_name: string | null
  conference_name: string | null
  volume: number | null
  issue: number | null
  pages: string | null
  doi: string | null
  abstract: string | null
  url: string | null
}

interface PublicationsClientProps {
  initialPublications: Publication[]
}

export function PublicationsClient({ initialPublications }: PublicationsClientProps) {
  const [filters, setFilters] = useState<FilterState>({
    searchTerm: "",
    type: "all",
    yearRange: { start: 2000, end: 2026 },
  })

  const publications = initialPublications.map((pub) => ({
    id: pub.id,
    title: pub.title,
    authors: Array.isArray(pub.authors) ? pub.authors.join(", ") : pub.authors,
    year: pub.publication_year,
    type: pub.publication_type.includes("journal") ? "journal" : "book-chapter",
    journal: pub.journal_name || pub.conference_name || "",
    volume: pub.volume,
    issue: pub.issue,
    pages: pub.pages,
    doi: pub.doi,
    url: pub.url,
    abstract: pub.abstract || "No abstract available.",
  }))

  const filteredPublications = useMemo(() => {
    return publications.filter((pub) => {
      const matchesSearch =
        filters.searchTerm === "" ||
        pub.title.toLowerCase().includes(filters.searchTerm.toLowerCase()) ||
        pub.authors.toLowerCase().includes(filters.searchTerm.toLowerCase())

      const matchesType = filters.type === "all" || pub.type === filters.type

      const matchesYear = pub.year >= filters.yearRange.start && pub.year <= filters.yearRange.end

      return matchesSearch && matchesType && matchesYear
    })
  }, [filters, publications])

  const stats = [
    { label: "Total Publications", value: "124" },
    { label: "Journal Articles", value: "13+" },
    { label: "Books & Chapters", value: "10+" },
    { label: "Research Years", value: "25+" },
  ]

  const getTypeColor = (type: string) => {
    return type === "journal" ? "bg-blue-100 text-blue-700" : "bg-green-100 text-green-700"
  }

  const getTypeLabel = (type: string) => {
    if (type === "journal") return "Journal Article"
    if (type === "book-chapter") return "Book Chapter"
    return "Publication"
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-primary/5 via-background to-accent/5 border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Research & Publications</h1>
            <p className="text-xl text-foreground/80 leading-relaxed">
              Explore my 124 peer-reviewed publications in political science, peace and conflict studies, governance,
              and security studies. My scholarly work spans electoral integrity, communal conflicts, terrorism, defence
              policy, and peacebuilding in Nigeria and Africa. Each publication reflects rigorous research contributing
              to academic knowledge and policy discourse.
            </p>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-primary text-primary-foreground">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, i) => (
              <div key={i} className="text-center">
                <div className="text-3xl md:text-4xl font-bold">{stat.value}</div>
                <p className="text-primary-foreground/80 mt-2 text-sm md:text-base">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Publications with Filters */}
      <section className="py-20 md:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Filters Sidebar */}
            <div className="lg:col-span-1">
              <PublicationFilters onFilterChange={setFilters} />
            </div>

            {/* Publications List */}
            <div className="lg:col-span-3">
              {filteredPublications.length > 0 ? (
                <div className="space-y-6">
                  <p className="text-sm text-muted-foreground mb-6">
                    Showing 1 - {filteredPublications.length} of {publications.length} publications
                  </p>

                  {filteredPublications.map((pub) => (
                    <Card key={pub.id} className="border-border hover:shadow-lg transition-shadow duration-300">
                      <script
                        type="application/ld+json"
                        dangerouslySetInnerHTML={{
                          __html: JSON.stringify({
                            "@context": "https://schema.org",
                            "@type": "ScholarlyArticle",
                            "headline": pub.title,
                            "author": pub.authors.split(",").map(author => ({
                              "@type": "Person",
                              "name": author.trim()
                            })),
                            "datePublished": pub.year.toString(),
                            "publisher": {
                              "@type": "Organization",
                              "name": pub.journal || "Academic Publication"
                            },
                            "description": pub.abstract,
                            "url": pub.url || undefined,
                            "identifier": pub.doi || undefined
                          })
                        }}
                      />
                      <CardHeader>
                        <div className="space-y-4">
                          {/* Title and Type */}
                          <div className="flex items-start gap-4 justify-between">
                            <div className="flex-1">
                              <CardTitle className="text-xl md:text-2xl text-primary leading-tight">
                                {pub.title}
                              </CardTitle>
                              <p className="text-sm text-muted-foreground mt-2">
                                <span className="font-semibold">{pub.authors}</span>
                              </p>
                            </div>
                            <span
                              className={`text-xs font-bold px-3 py-1 rounded-full whitespace-nowrap flex-shrink-0 ${getTypeColor(pub.type)}`}
                            >
                              {getTypeLabel(pub.type)}
                            </span>
                          </div>

                          {/* Publication Details */}
                          <div className="text-sm text-foreground/70 space-y-1">
                            {pub.type === "journal" ? (
                              <>
                                <p>
                                  <span className="font-semibold">{pub.journal}</span>, Volume {pub.volume}, Issue{" "}
                                  {pub.issue} ({pub.year}), pp. {pub.pages}
                                </p>
                                {pub.doi && (
                                  <p>
                                    DOI: <span className="font-mono">{pub.doi}</span>
                                  </p>
                                )}
                              </>
                            ) : (
                              <>
                                <p>
                                  <span className="font-semibold">{pub.journal}</span> ({pub.year}), pp. {pub.pages}
                                </p>
                              </>
                            )}
                          </div>

                          {/* Abstract */}
                          <p className="text-foreground/80 leading-relaxed pt-2">{pub.abstract}</p>

                          {/* Action Buttons */}
                          <div className="flex flex-wrap gap-3 pt-4">
                            {pub.url && (
                              <Button asChild variant="default" size="sm" className="gap-2 shadow-sm">
                                <a href={pub.url} target="_blank" rel="noopener noreferrer">
                                  <BookOpen size={16} />
                                  Read Online
                                </a>
                              </Button>
                            )}
                            {pub.doi && (
                              <Button asChild variant="outline" size="sm" className="gap-2 bg-transparent">
                                <a href={`https://doi.org/${pub.doi}`} target="_blank" rel="noopener noreferrer">
                                  <ExternalLink size={16} />
                                  View on DOI
                                </a>
                              </Button>
                            )}
                            {pub.url && (
                              <Button asChild variant="outline" size="sm" className="gap-2 bg-transparent">
                                <a href={pub.url} target="_blank" rel="noopener noreferrer" download>
                                  <Download size={16} />
                                  Download PDF
                                </a>
                              </Button>
                            )}
                          </div>
                        </div>
                      </CardHeader>
                    </Card>
                  ))}
                </div>
              ) : (
                <Card className="border-border text-center py-12">
                  <p className="text-muted-foreground">No publications found matching your filters.</p>
                </Card>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
