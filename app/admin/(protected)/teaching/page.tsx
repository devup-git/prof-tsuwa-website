import { getCourses } from "@/lib/db-queries"
import TeachingManagerClient from "./TeachingManagerClient"

export const metadata = {
    title: "Manage Teaching | Admin",
}

export const dynamic = "force-dynamic"

export default async function TeachingAdminPage() {
    const courses = await getCourses()

    return (
        <div className="space-y-8">
            <TeachingManagerClient initialCourses={courses} />
        </div>
    )
}
