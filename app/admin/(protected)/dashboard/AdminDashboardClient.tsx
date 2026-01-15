"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import { Button } from "@/components/ui/button"

interface AdminDashboardClientProps {
  publications: any[]
  leads: any[]
  messages: any[]
  courses: any[]
  grants: any[]
  books: any[]
  resources: any[]
  submissions: any[]
}

export default function AdminDashboardClient({
  publications,
  leads,
  messages,
  courses,
  grants,
  books,
  resources,
  submissions,
}: AdminDashboardClientProps) {

  const unreadLeads = leads.filter((l) => !l.read).length
  const unreadMessages = messages.filter((m) => !m.read).length

  const stats = [
    { label: "Total Publications", value: publications.length, href: "/admin/publications" },
    { label: "Books", value: books.length, href: "/admin/books" },
    { label: "Unread Leads", value: unreadLeads, href: "/admin/leads", highlight: unreadLeads > 0 },
    { label: "Unread Messages", value: unreadMessages, highlight: unreadMessages > 0 },
    { label: "Student Resources", value: resources.length, href: "/admin/resources" },
    { label: "Student Submissions", value: submissions.length, href: "/admin/assignments" },
  ]

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold mb-2">Dashboard</h1>
        <p className="text-foreground/80">Manage content and view site analytics</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        {stats.map((stat, i) => (
          <Card
            key={i}
            className={`border-border ${stat.highlight ? "border-accent" : ""} ${stat.href ? "cursor-pointer hover:shadow-lg transition-shadow" : ""}`}
            onClick={() => {
              if (stat.href) {
                window.location.href = stat.href
              }
            }}
          >
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">{stat.label}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-primary">{stat.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Quick Actions */}
      <Card className="border-border">
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Link href="/admin/publications">
              <Button className="w-full bg-primary hover:bg-primary/90">Manage Publications</Button>
            </Link>
            <Link href="/admin/books">
              <Button className="w-full bg-primary hover:bg-primary/90">Manage Books</Button>
            </Link>
            <Link href="/admin/resources">
              <Button className="w-full bg-primary hover:bg-primary/90">Upload Resources</Button>
            </Link>
            <Link href="/admin/assignments">
              <Button className="w-full bg-primary hover:bg-primary/90">View Assignments</Button>
            </Link>
          </div>
        </CardContent>
      </Card>

      {/* Recent Leads */}
      {unreadLeads > 0 && (
        <Card className="border-accent">
          <CardHeader>
            <CardTitle className="text-accent">New Leads ({unreadLeads})</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 max-h-64 overflow-y-auto">
              {leads
                .filter((l) => !l.read)
                .slice(0, 5)
                .map((lead) => (
                  <div key={lead.id} className="p-3 bg-accent/5 rounded border border-accent/20">
                    <p className="font-semibold text-primary">{lead.full_name}</p>
                    <p className="text-sm text-muted-foreground">{lead.email}</p>
                    <p className="text-xs text-foreground/70 mt-1">{lead.service_interest}</p>
                  </div>
                ))}
            </div>
            <Link href="/admin/leads" className="mt-4 inline-block">
              <Button variant="outline" size="sm">
                View All Leads
              </Button>
            </Link>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
