import ResourcesManagerClient from "./ResourcesManagerClient"
import { getAllStudentResources } from "@/lib/db-queries"

export const metadata = {
    title: "Student Resources | Admin",
}

export const dynamic = "force-dynamic"

export default async function ResourcesPage() {
    const resources = await getAllStudentResources()

    return <ResourcesManagerClient initialResources={resources} />
}
