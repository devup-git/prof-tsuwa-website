import type { Metadata } from "next"

export const dynamic = "force-dynamic"
import ClientStudentResourcesPage from "./client-page"

export const metadata: Metadata = {
  title: "Student Resources | Prof. John Tor Tsuwa",
  description: "Course materials, lecture notes, reading lists, and student resources",
}

export default async function StudentResourcesPage() {
  const { getStudentResources, getCourses } = await import("@/lib/db-queries")
  const dbResources = await getStudentResources()
  const courses = await getCourses()

  return <ClientStudentResourcesPage dbResources={dbResources} courses={courses} />
}
