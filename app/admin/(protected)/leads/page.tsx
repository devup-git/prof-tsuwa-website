import LeadsManagerClient from "./LeadsManagerClient"
import { getConsultancyLeads, getContactMessages } from "@/lib/db-queries"

export const metadata = {
  title: "Leads Manager | Admin",
}

export default async function LeadsPage() {
  const [leads, messages] = await Promise.all([getConsultancyLeads(), getContactMessages()])

  return <LeadsManagerClient initialLeads={leads} initialMessages={messages} />
}
