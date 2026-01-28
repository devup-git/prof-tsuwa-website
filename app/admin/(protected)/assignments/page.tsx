import AssignmentsManagerClient from "./AssignmentsManagerClient"
import { getStudentSubmissions } from "@/lib/db-queries"

export const metadata = {
    title: "Student Submissions | Admin",
}

export const dynamic = "force-dynamic"

export default async function AssignmentsPage() {
    const submissions = await getStudentSubmissions()

    return <AssignmentsManagerClient submissions={submissions} />
}
