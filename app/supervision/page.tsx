import type { Metadata } from "next"

export const dynamic = "force-dynamic"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { getSupervisees, getConferences } from "@/lib/db-queries"

export const metadata: Metadata = {
  title: "Student Supervision & Conferences | Dr. John Tor Tsuwa",
  description: "Current and past graduate supervision, conference presentations and academic engagement",
}

export default async function SupervisionPage() {
  const supervisees = await getSupervisees()
  const conferences = await getConferences()

  // Calculate dynamic stats
  const totalCount = supervisees.length
  const completedCount = supervisees.filter(s => s.status === 'completed').length
  const ongoingCount = supervisees.filter(s => s.status === 'ongoing').length

  const phdCount = supervisees.filter(s => s.level.toLowerCase().includes('phd')).length
  const mscCount = supervisees.filter(s => s.level.toLowerCase().includes('msc') || s.level.toLowerCase().includes('postgraduate')).length
  const phdOngoing = supervisees.filter(s => s.level.toLowerCase().includes('phd') && s.status === 'ongoing').length
  const mscOngoing = supervisees.filter((s) => (s.level.toLowerCase().includes('msc') || s.level.toLowerCase().includes('postgraduate')) && s.status === 'ongoing').length

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-primary/5 via-background to-accent/5 border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Student Supervision & Conferences</h1>
          <p className="text-xl text-foreground/80 leading-relaxed max-w-3xl">
            Active engagement in graduate mentoring through supervision of {totalCount} postgraduate students since 2006.
            Currently supervising {phdOngoing} PhD and {mscOngoing} MSc students. Regular participation in national and
            international conferences on political science, peace studies, governance, and security.
          </p>
        </div>
      </section>

      {/* Graduate Supervision */}
      <section className="py-20 md:py-32 border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold mb-12">Graduate Supervision</h2>

          {supervisees.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {supervisees.map((student) => (
                <Card key={student.id} className="border-border hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex-1">
                        <CardTitle className="text-lg text-primary">{student.student_name}</CardTitle>
                        <p className="text-sm text-muted-foreground mt-2">{student.level}</p>
                      </div>
                      <Badge className={student.status === "ongoing" ? "bg-blue-500" : "bg-green-500"}>
                        {student.status === "ongoing" ? "Ongoing" : "Completed"}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <p className="text-sm font-medium text-foreground">{student.project_title}</p>
                    <p className="text-xs text-muted-foreground">
                      {student.start_year}-{student.completion_year || "Present"}
                    </p>
                    {student.research_area && <p className="text-xs text-accent">{student.research_area}</p>}
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <Card className="border-border text-center py-12">
              <p className="text-muted-foreground">No supervised students available.</p>
            </Card>
          )}
        </div>
      </section>

      {/* Conferences & Presentations */}
      <section className="py-20 md:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold mb-12">Conference Presentations</h2>

          {conferences.length > 0 ? (
            <div className="space-y-6">
              {conferences.map((conf) => (
                <Card key={conf.id} className="border-border hover:shadow-md transition-shadow">
                  <CardHeader>
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <CardTitle className="text-xl text-primary">{conf.conference_name}</CardTitle>
                        <p className="text-sm text-muted-foreground mt-2">
                          {conf.location} • {conf.conference_date}
                        </p>
                      </div>
                      <Badge variant="secondary">{conf.role}</Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-foreground/80">{conf.paper_title}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <Card className="border-border text-center py-12">
              <p className="text-muted-foreground">No conferences available.</p>
            </Card>
          )}
        </div>
      </section>
    </div>
  )
}
