import { getResearchProjects, getResearchGrants } from "@/lib/db-queries"
import ResearchManagerClient from "./ResearchManagerClient"

export const metadata = {
    title: "Manage Research | Admin",
}

export const dynamic = "force-dynamic"

export default async function ResearchAdminPage() {
    const projects = await getResearchProjects()
    const grants = await getResearchGrants()

    return (
        <div className="space-y-8">
            <ResearchManagerClient initialProjects={projects} initialGrants={grants} />
        </div>
    )
}
