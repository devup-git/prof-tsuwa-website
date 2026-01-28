import PublicationsManagerClient from "./PublicationsManagerClient"
import { getPublications } from "@/lib/db-queries"

export const metadata = {
  title: "Publications Manager | Admin",
}

export const dynamic = "force-dynamic"

export default async function PublicationsPage() {
  const publications = await getPublications()

  return <PublicationsManagerClient initialPublications={publications} />
}
