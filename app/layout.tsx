import type React from "react"
import type { Metadata, Viewport } from "next"
import { Analytics } from "@vercel/analytics/next"
import { siteConfig } from "@/config/site"
import "./globals.css"
import { Navbar } from "@/components/navbar"

export const metadata: Metadata = {
  title: "Prof. John Tor Tsuwa | Political Science Scholar & Governance Expert",
  description: siteConfig.description,
  keywords: [
    "Political Science",
    "Peace Studies",
    "Conflict Resolution",
    "Governance",
    "Electoral Studies",
    "Security Studies",
    "African Politics",
  ],
  authors: [{ name: "John Tor Tsuwa" }],
  openGraph: {
    title: "Prof. John Tor Tsuwa | Political Science Scholar & Governance Expert",
    description: siteConfig.description,
    url: siteConfig.url,
    siteName: siteConfig.name,
    images: [
      {
        url: siteConfig.ogImage,
        width: 1200,
        height: 630,
        alt: "Prof. John Tor Tsuwa",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Prof. John Tor Tsuwa",
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
    <html lang="en">
      <body className={`font-sans antialiased flex flex-col min-h-screen`}>
        <Navbar />
        <main className="flex-1">{children}</main>
        <Toaster />
        <Analytics />
      </body>
    </html>
  )
}
