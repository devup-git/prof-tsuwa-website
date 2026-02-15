import type { Metadata } from "next"
import { PhotoGallery } from "@/components/photo-gallery"
import { getGalleryItems } from "@/lib/db-queries"

export const dynamic = "force-dynamic"

export const metadata: Metadata = {
  title: "Professional Gallery | John Tsuwa, Ph.D",
  description: "A visual record of professional consultations, academic leadership, community service, and peace-building initiatives.",
}

export default async function GalleryPage() {
  const galleryItems = await getGalleryItems()

  // Group images by category if needed, or just show all
  const categories = Array.from(new Set(galleryItems.map(item => item.category)))

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-primary/5 via-background to-accent/5 border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Professional Gallery</h1>
          <p className="text-xl text-foreground/80 leading-relaxed max-w-3xl">
            A visual record of professional consultations, academic leadership, community service, and peace-building initiatives.
          </p>
        </div>
      </section>

      {/* Dynamic Image Galleries */}
      <section className="py-20 md:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-20">
            {categories.length > 0 ? (
              categories.map(category => {
                const categoryImages = galleryItems.filter(item => item.category === category)
                return (
                  <PhotoGallery
                    key={category}
                    title={category}
                    description={`Activities and engagements related to ${category}`}
                    images={categoryImages.map(img => ({
                      url: img.image_url,
                      caption: img.caption
                    }))}
                  />
                )
              })
            ) : (
              <div className="text-center py-20 bg-muted/30 rounded-lg">
                <p className="text-muted-foreground">Gallery is currently empty. Check back soon for updates.</p>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  )
}
