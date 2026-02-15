import type React from "react"
import type { Metadata, Viewport } from "next"
import { Analytics } from "@vercel/analytics/next"
import { siteConfig } from "@/config/site"
import "./globals.css"
import { Navbar } from "@/components/navbar"
import { Toaster } from "@/components/ui/sonner"
import BirthdayOverlay from "@/components/birthday-overlay"

export const metadata: Metadata = {
  title: "Dr. John Tor Tsuwa | Political Science Scholar & Governance Expert",
  description: siteConfig.description,
  alternates: {
    canonical: siteConfig.url,
  },
  keywords: [
    "John Tor Tsuwa",
    "Dr. John Tor Tsuwa",
    "Political Scientist Nigeria",
    "Peace and Conflict Resolution Scholar",
    "Governance Expert Nigeria",
    "Security Studies Africa",
    "Rev. Fr. Moses Orshio Adasu University",
    "Electoral Studies Nigeria",
    "Conflict Management Expert",
  ],
  authors: [{ name: "John Tor Tsuwa" }],
  openGraph: {
    title: "Dr. John Tor Tsuwa | Political Science Scholar & Governance Expert",
    description: siteConfig.description,
    url: siteConfig.url,
    siteName: siteConfig.name,
    images: [
      {
        url: siteConfig.ogImage,
        width: 1200,
        height: 630,
        alt: "Dr. John Tor Tsuwa",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Dr. John Tor Tsuwa",
    description: siteConfig.description,
    images: [siteConfig.ogImage],
  },
  generator: 'v0.app'
}

export const viewport: Viewport = {
  themeColor: "#544fa0",
  userScalable: true,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`font-sans antialiased flex flex-col min-h-screen`}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              "name": "Dr. John Tor Tsuwa",
              "url": siteConfig.url,
              "image": siteConfig.ogImage,
              "jobTitle": "Professor of Political Science",
              "affiliation": {
                "@type": "CollegeOrUniversity",
                "name": "Rev. Fr. Moses Orshio Adasu University, Makurdi"
              },
              "description": siteConfig.description,
              "sameAs": [
                siteConfig.contact.social.scholar,
                siteConfig.contact.social.researchgate,
                siteConfig.contact.social.orcid,
                siteConfig.contact.social.linkedin
              ]
            })
          }}
        />
        <Navbar />
        <main className="flex-1">{children}</main>
        <BirthdayOverlay />
        <Toaster />
        <Analytics />
      </body>
    </html>
  )
}
