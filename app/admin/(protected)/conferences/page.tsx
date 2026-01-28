import { getConferences } from "@/lib/db-queries"
import ConferencesManagerClient from "./ConferencesManagerClient"

export const metadata = {
    title: "Manage Conferences | Admin",
}

export const dynamic = "force-dynamic"

export default async function ConferencesAdminPage() {
    const conferences = await getConferences()

    return <ConferencesManagerClient initialConferences={conferences} />
}
