import type { Metadata } from "next"
import ClientStudentResourcesPage from "./client-page"

export const metadata: Metadata = {
  title: "Student Resources | Prof. John Tor Tsuwa",
  description: "Course materials, lecture notes, reading lists, and student resources",
}

export default async function StudentResourcesPage() {
  const dbResources = await import("@/lib/db-queries").then((mod) => mod.getStudentResources())

  return <ClientStudentResourcesPage dbResources={dbResources} />
}
