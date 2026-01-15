import AssignmentsManagerClient from "./AssignmentsManagerClient"
import { getStudentSubmissions } from "@/lib/db-queries"

export const metadata = {
    title: "Student Submissions | Admin",
}

export default async function AssignmentsPage() {
    const submissions = await getStudentSubmissions()

    return <AssignmentsManagerClient submissions={submissions} />
}
