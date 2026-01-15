import { PublicationsClient } from "./publications-client"
import { getPublications } from "@/lib/db-queries"

export const metadata = {
  title: "Publications | Prof. John Tor Tsuwa",
  description:
    "Explore Prof. John Tor Tsuwa's research publications in strategic management, organizational development, and business transformation.",
}

export default async function PublicationsPage() {
  const publications = await getPublications()

  return <PublicationsClient initialPublications={publications} />
}
