import type React from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { checkAdminAuth } from "@/lib/admin-auth"
import { redirect } from "next/navigation"

export const metadata = {
  title: "Admin Dashboard | Prof. John Tor Tsuwa",
  description: "Content management dashboard",
}

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const { isAdmin, user } = await checkAdminAuth()

  if (!isAdmin || !user) {
    redirect("/admin/login")
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Admin Navbar */}
      <nav className="border-b border-border bg-card sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link href="/admin/dashboard" className="font-bold text-xl text-primary">
              Admin Panel
            </Link>

            <div className="flex items-center gap-6">
              <Link href="/admin/dashboard">
                <Button variant="ghost" size="sm">
                  Dashboard
                </Button>
              </Link>
              <Link href="/admin/publications">
                <Button variant="ghost" size="sm">
                  Publications
                </Button>
              </Link>
              <Link href="/admin/books">
                <Button variant="ghost" size="sm">
                  Books
                </Button>
              </Link>
              <Link href="/admin/research">
                <Button variant="ghost" size="sm">
                  Research
                </Button>
              </Link>
              <Link href="/admin/teaching">
                <Button variant="ghost" size="sm">
                  Teaching
                </Button>
              </Link>
              <Link href="/admin/supervision">
                <Button variant="ghost" size="sm">
                  Supervision
                </Button>
              </Link>
              <Link href="/admin/conferences">
                <Button variant="ghost" size="sm">
                  Conferences
                </Button>
              </Link>
              <Link href="/admin/resources">
                <Button variant="ghost" size="sm">
                  Resources
                </Button>
              </Link>
              <Link href="/admin/leads">
                <Button variant="ghost" size="sm">
                  Leads
                </Button>
              </Link>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground hidden sm:inline">{user.email}</span>
              <form action="/api/auth/logout" method="post">
                <Button type="submit" variant="outline" size="sm">
                  Logout
                </Button>
              </form>
            </div>
          </div>
        </div>
      </nav>
      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">{children}</main>
    </div>
  )
}
