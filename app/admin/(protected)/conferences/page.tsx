import { getConferences } from "@/lib/db-queries"
import ConferencesManagerClient from "./ConferencesManagerClient"

export default async function ConferencesAdminPage() {
    const conferences = await getConferences()

    return <ConferencesManagerClient initialConferences={conferences} />
}
