import type { Metadata } from "next"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { getResearchProjects, getResearchGrants } from "@/lib/db-queries"

export const metadata: Metadata = {
  title: "Research | Dr. John Tor Tsuwa",
  description: "Research interests, projects, and funded research grants in political science and governance",
}

export const dynamic = "force-dynamic"

export default async function ResearchPage() {
  const projects = await getResearchProjects()
  const grants = await getResearchGrants()

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 md:py-32 bg-gradient-to-br from-primary/5 via-background to-accent/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-balance">Research & Scholarship</h1>
          </div>
        </div>
      </section>


      {/* Active Research Projects */}
      <section className="py-20 md:py-32 border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold mb-12">Research Projects</h2>

          {projects.length > 0 ? (
            <div className="space-y-8">
              {projects.map((project) => (
                <Card key={project.id} className="border-border overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Image */}
                    {project.image_url && (
                      <div className="md:col-span-1 h-48 md:h-full">
                        <img
                          src={project.image_url || "/placeholder.svg"}
                          alt={project.title}
                          className="w-full h-full object-cover"
                          crossOrigin="anonymous"
                        />
                      </div>
                    )}

                    {/* Content */}
                    <div className={project.image_url ? "md:col-span-2" : "md:col-span-3"}>
                      <div className="p-6">
                        <div className="flex items-start justify-between gap-4 mb-4">
                          <div className="flex-1">
                            <h3 className="text-xl font-bold text-primary mb-2">{project.title}</h3>
                            <Badge className={project.status === "ongoing" ? "bg-blue-500" : "bg-green-500"}>
                              {project.status === "ongoing" ? "Ongoing" : "Completed"}
                            </Badge>
                          </div>
                          <span className="text-sm text-muted-foreground whitespace-nowrap">
                            {project.start_date}
                            {project.end_date && ` - ${project.end_date}`}
                          </span>
                        </div>

                        <p className="text-foreground/80 mb-4 leading-relaxed">{project.abstract}</p>

                        {/* Collaborators */}
                        {project.collaborators && project.collaborators.length > 0 && (
                          <div className="mb-4">
                            <h4 className="text-sm font-semibold text-primary mb-2">Collaborators</h4>
                            <div className="flex flex-wrap gap-2">
                              {project.collaborators.map((collab: string, i: number) => (
                                <Badge key={i} variant="outline" className="bg-accent/5">
                                  {collab}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* Research Areas */}
                        {project.research_areas && project.research_areas.length > 0 && (
                          <div>
                            <h4 className="font-semibold text-primary mb-2">Research Areas</h4>
                            <div className="flex flex-wrap gap-2">
                              {project.research_areas?.map((area: string, i: number) => (
                                <Badge key={i} variant="outline">
                                  {area}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          ) : (
            <Card className="border-border text-center py-12">
              <p className="text-muted-foreground">No research projects available.</p>
            </Card>
          )}
        </div>
      </section>

      {/* Funded Grants */}
      <section className="py-20 md:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold mb-12">Funded Research Grants</h2>

          {grants.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {grants.map((grant) => (
                <Card key={grant.id} className="border-border hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <CardTitle className="text-lg text-primary">{grant.title}</CardTitle>
                      <Badge
                        className={
                          grant.status === "awarded"
                            ? "bg-green-500"
                            : grant.status === "pending"
                              ? "bg-yellow-500"
                              : "bg-gray-500"
                        }
                      >
                        {grant.status === "awarded" ? "Awarded" : grant.status === "pending" ? "Pending" : "Completed"}
                      </Badge>
                    </div>
                    <CardDescription>
                      <span className="font-semibold text-foreground">{grant.funding_agency}</span>
                      {" • "}
                      <span className="text-accent font-bold">${grant.amount}</span>
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <p className="text-sm text-foreground/80">{grant.description}</p>
                    <div className="flex items-center justify-between pt-2 border-t border-border">
                      <span className="text-xs text-muted-foreground">Grant Year</span>
                      <span className="text-sm font-semibold text-primary">{grant.year}</span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <Card className="border-border text-center py-12">
              <p className="text-muted-foreground">No grants available.</p>
            </Card>
          )}
        </div>
      </section>


    </div>
  )
}
