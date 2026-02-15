import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { getBooks } from "@/lib/db-queries"
import { ExternalLink } from "lucide-react"

export const dynamic = "force-dynamic"
import Image from "next/image"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Books | Dr. John Tor Tsuwa",
  description: "Published books and authored works by Dr. John Tor Tsuwa on peace, conflict, and governance studies.",
}

export default async function BooksPage() {
  const books = await getBooks()

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-primary/5 via-background to-accent/5 border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Published Books</h1>
            <p className="text-xl text-foreground/80 leading-relaxed">
              Explore my published works on peace and conflict studies, governance, security, and African politics.
              Each book represents years of research and scholarly contribution to understanding complex political
              dynamics in Nigeria and across Africa.
            </p>
          </div>
        </div>
      </section>

      {/* Books Grid */}
      <section className="py-20 md:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {books.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {books.map((book) => (
                <Card
                  key={book.id}
                  className="border-border hover:shadow-lg transition-all duration-300 overflow-hidden"
                >
                  {book.cover_image_url && (
                    <div className="relative h-64 w-full bg-muted">
                      <Image
                        src={book.cover_image_url}
                        alt={book.title}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                    </div>
                  )}
                  <CardHeader>
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <CardTitle className="text-primary text-lg mb-2 line-clamp-2">{book.title}</CardTitle>
                        <p className="text-sm text-muted-foreground">{book.author}</p>
                        <p className="text-sm text-muted-foreground">{book.publication_year}</p>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {book.description && (
                      <p className="text-foreground/80 text-sm line-clamp-3">{book.description}</p>
                    )}

                    {book.publisher && (
                      <p className="text-sm text-muted-foreground">
                        <span className="font-semibold">Publisher:</span> {book.publisher}
                      </p>
                    )}

                    {book.isbn && (
                      <p className="text-xs text-muted-foreground font-mono">ISBN: {book.isbn}</p>
                    )}

                    {book.purchase_link && (
                      <a
                        href={book.purchase_link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-sm font-medium text-accent hover:text-accent/80 transition-colors"
                      >
                        View Details
                        <ExternalLink size={14} />
                      </a>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <Card className="border-border text-center py-12">
              <p className="text-muted-foreground">No books available at this time.</p>
            </Card>
          )}
        </div>
      </section>
    </div>
  )
}
