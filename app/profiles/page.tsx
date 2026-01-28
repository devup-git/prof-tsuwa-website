import type { Metadata } from "next"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ExternalLink, CheckCircle, AlertCircle } from "lucide-react"
import Image from "next/image"

export const dynamic = "force-dynamic"

export const metadata: Metadata = {
  title: "Academic Profiles | Dr. John Tor Tsuwa",
  description: "Links to academic and professional profiles across research platforms and professional networks",
}

export default function ProfilesPage() {
  const profiles = [
    {
      platform: "Google Scholar",
      description: "Track publications, citations, and h-index. View citation metrics and scholarly impact.",
      url: "https://scholar.google.com/citations?user=vpO27JwAAAAJ&hl=en",
      verified: true,
    },
    {
      platform: "ORCID",
      description: "Open Researcher and Contributor ID - persistent digital identifier for academic contributions.",
      url: "https://orcid.org/0000-0002-7090-5556",
      verified: true,
    },
    {
      platform: "AD Scientific Index",
      description: "Academic performance index tracking publications, citations, and scholarly contributions.",
      url: "https://www.adscientificindex.com/scientist/scientist-articles/john-tor-tsuwa/4920098",
      verified: true,
    },
    {
      platform: "ResearchGate",
      description:
        "Full research profile with publications, projects, and collaboration opportunities in peace and conflict studies.",
      url: "https://www.researchgate.net/profile/John-Tsuwa",
      verified: true,
    },
  ]

  const imageGallery = [
    {
      src: "/Profile Images/WhatsApp Image 2026-01-06 at 9.50.51 PM.jpeg",
      caption:
        "Prof. Tsuwa presenting to VC",
      alt: "Dr. Tsuwa presenting documents with colleague in office setting",
    },
    {
      src: "/Profile Images/WhatsApp Image 2026-01-06 at 9.51.33 PM.jpeg",
      caption: "Prof. Tsuwa with institutional officials during formal engagement",
      alt: "Dr. Tsuwa shaking hands with government official",
    },
    {
      src: "/Profile Images/WhatsApp Image 2026-01-06 at 9.52.22 PM.jpeg",
      caption: "Academic dialogue and institutional leadership",
      alt: "Dr. Tsuwa engaged in professional discussion at conference table",
    },
    {
      src: "/Profile Images/WhatsApp Image 2026-01-06 at 9.53.10 PM.jpeg",
      caption: "Professional collaboration and strategic engagement",
      alt: "Dr. Tsuwa in conversation with colleague during official meeting",
    },
    {
      src: "/Profile Images/WhatsApp Image 2026-01-06 at 9.53.12 PM.jpeg",
      caption: "Group engagement and institutional partnership with stakeholders and officials",
      alt: "Award presentation and recognition of academic contributions",
    },
    {
      src: "/Profile Images/WhatsApp Image 2026-01-06 at 9.53.13 PM.jpeg",
      caption: "Group engagement and institutional partnership with stakeholders and officials",
      alt: "Community members and officials planting tree together",
    },
    {
      src: "/Profile Images/WhatsApp Image 2026-01-06 at 9.53.15 PM.jpeg",
      caption: "Professional collaboration and strategic engagement",
      alt: "Group photo of institutional officials and professional collaborators",
    },
    {
      src: "/Profile Images/WhatsApp Image 2026-01-06 at 9.53.17 PM.jpeg",
      caption: "Prof. Tsuwa speaking during an official engagement",
      alt: "Dr. Tsuwa speaking at microphone during official address",
    },
    {
      src: "/Profile Images/WhatsApp Image 2026-01-06 at 9.53.19 PM.jpeg",
      caption: "Prof. Tsuwa speaking during an official engagement",
      alt: "Knowledge and materials exchange with colleague",
    },
    {
      src: "/Profile Images/peace_tree_planting.jpg",
      caption: "Planting the peace tree at the Peace garden of the Centre for Peace and Development Studies with Chief. Paul Harris Ogbole during the 2025 international day of Peace",
      alt: "Prof. Tsuwa and Chief Paul Harris Ogbole planting the peace tree during International Day of Peace 2025",
    },
  ]

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-primary/5 via-background to-accent/5 border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Academic & Professional Profiles</h1>
          <p className="text-xl text-foreground/80 leading-relaxed max-w-3xl">
            Connect with my research across major academic and professional networks. These profiles provide
            comprehensive views of my publications, citations, scholarly impact, and professional engagement.
          </p>
        </div>
      </section>

      <section className="py-20 md:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold mb-12">Professional Engagements & Activities</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {imageGallery.map((image, index) => (
              <div
                key={index}
                className="group overflow-hidden rounded-lg border border-border bg-background hover:shadow-lg transition-shadow duration-300"
              >
                <div className="relative h-64 w-full overflow-hidden bg-muted">
                  <Image
                    src={image.src || "/placeholder.svg"}
                    alt={image.alt}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                </div>
                <div className="p-4">
                  <p className="text-sm font-medium text-foreground leading-relaxed">{image.caption}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Profiles Grid */}
      <section className="py-20 md:py-32 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold mb-12">Research & Academic Networks</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {profiles.map((profile, i) => (
              <Card key={i} className="border-border hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between gap-4">
                    <CardTitle className="text-lg text-primary">{profile.platform}</CardTitle>
                    {profile.verified ? (
                      <CheckCircle size={20} className="text-green-500 flex-shrink-0" />
                    ) : (
                      <AlertCircle size={20} className="text-yellow-500 flex-shrink-0" />
                    )}
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm text-foreground/80">{profile.description}</p>
                  <a
                    href={profile.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-accent hover:text-accent/80 font-medium transition-colors"
                  >
                    Visit Profile
                    <ExternalLink size={16} />
                  </a>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
