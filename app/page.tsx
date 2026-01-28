import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ImageCarousel } from "@/components/image-carousel"
import { Footer } from "@/components/footer"
import { getPublications, getCourses } from "@/lib/db-queries"

export const dynamic = "force-dynamic"

export default async function Home() {
  const publications = await getPublications()
  const courses = await getCourses()
  const publicationsCount = publications.length
  const coursesCount = courses.length

  // Assuming start year is 1998 (25+ years as of 2023/2024)
  const entryYear = 1998
  const currentYear = new Date().getFullYear()
  const yearsExperience = currentYear - entryYear
  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex-1">
        <section className="relative w-full">
          <ImageCarousel images={["/images/5.png", "/images/4.png", "/images/2.png", "/images/3.png"]} interval={3000} />

          {/* Content Overlay on Hero */}
          <div className="absolute inset-0 flex items-center justify-center z-10">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-balance leading-tight mb-4">
                Professor John Tor Tsuwa
              </h1>
              <p className="text-xl md:text-2xl font-semibold mb-6">
                Political Scientist | Peace & Conflict Scholar | Governance and Security Consultant
              </p>
              <p className="text-lg md:text-xl text-white/90 leading-relaxed max-w-3xl mx-auto mb-8">
                Professor John Tor Tsuwa is a senior political scientist at Rev. Fr. Moses Orshio Adasu University,
                Makurdi, with scholarly and policy expertise in peace and conflict resolution, governance, electoral
                studies, and security in Nigeria and Africa.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
                <Link href="/publications">
                  <Button size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground font-semibold">
                    View Publications
                  </Button>
                </Link>
                <Link href="/consultancy">
                  <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold">
                    Request Consultancy
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-16 bg-primary text-primary-foreground">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="text-4xl md:text-5xl font-bold">{yearsExperience}+</div>
                <p className="text-primary-foreground/80 mt-2">Years of Experience</p>
              </div>
              <div className="text-center">
                <div className="text-4xl md:text-5xl font-bold">{publicationsCount}+</div>
                <p className="text-primary-foreground/80 mt-2">Research Publications</p>
              </div>
              <div className="text-center">
                <div className="text-4xl md:text-5xl font-bold">100+</div>
                <p className="text-primary-foreground/80 mt-2">Organizations Consulted</p>
              </div>
              <div className="text-center">
                <div className="text-4xl md:text-5xl font-bold">{coursesCount}+</div>
                <p className="text-primary-foreground/80 mt-2">Courses Designed</p>
              </div>
            </div>
          </div>
        </section>

        {/* Expertise Highlights */}
        <section className="py-20 md:py-32">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold mb-4">Areas of Expertise</h2>
              <p className="text-lg text-muted-foreground">Core specializations in political science and governance</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <Card className="border-border hover:shadow-lg transition-all duration-300">
                <CardHeader>
                  <CardTitle className="text-primary">Peace & Conflict Resolution</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-foreground/80">
                    Expert analysis and solutions for peace-building, conflict management, and resolution strategies in
                    African contexts.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-border hover:shadow-lg transition-all duration-300">
                <CardHeader>
                  <CardTitle className="text-primary">Governance & Electoral Studies</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-foreground/80">
                    Research and consulting on democratic governance, electoral processes, institutional development,
                    and political leadership.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-border hover:shadow-lg transition-all duration-300">
                <CardHeader>
                  <CardTitle className="text-primary">Security & Strategic Policy</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-foreground/80">
                    Policy expertise in national security, regional stability, defense strategies, and strategic
                    analysis for governments and institutions.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 md:py-32 bg-gradient-to-r from-primary/10 to-accent/10">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-4xl font-bold mb-6">Ready to Engage with Policy Expertise?</h2>
            <p className="text-xl text-foreground/80 mb-8">
              Leverage 25+ years of scholarly and policy expertise in peace, governance, and security studies.
            </p>
            <Link href="/consultancy">
              <Button size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground">
                Start Your Consultation
              </Button>
            </Link>
          </div>
        </section>
      </div>

      <Footer />
    </div>
  )
}
