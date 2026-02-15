import { PublicationsClient } from "./publications-client"
import { getPublications } from "@/lib/db-queries"

export const dynamic = "force-dynamic"

export const metadata = {
  title: "Publications | Dr. John Tor Tsuwa",
  description:
    "Explore Dr. John Tor Tsuwa's research publications in strategic management, organizational development, and business transformation.",
}

export default async function PublicationsPage() {
  const publications = await getPublications()

  return <PublicationsClient initialPublications={publications} />
}
