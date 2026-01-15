import AdminDashboardClient from "./AdminDashboardClient"
import {
  getPublications,
  getConsultancyLeads,
  getContactMessages,
  getCourses,
  getResearchGrants,
  getBooks,
  getAllStudentResources,
  getStudentSubmissions,
} from "@/lib/db-queries"

export default async function AdminDashboardPage() {
  const [publications, leads, messages, courses, grants, books, resources, submissions] = await Promise.all([
    getPublications(),
    getConsultancyLeads(100),
    getContactMessages(100),
    getCourses(),
    getResearchGrants(),
    getBooks(),
    getAllStudentResources(),
    getStudentSubmissions(),
  ])

  return (
    <AdminDashboardClient
      publications={publications}
      leads={leads}
      messages={messages}
      courses={courses}
      grants={grants}
      books={books}
      resources={resources}
      submissions={submissions}
    />
  )
}
