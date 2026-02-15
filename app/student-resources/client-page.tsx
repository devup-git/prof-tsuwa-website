"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Download, Upload, Video } from "lucide-react"

interface Resource {
  id: string
  title: string
  description: string | null
  file_url: string | null
  file_type: string | null
  category: string | null
  course_code: string | null
  virtual_class_link?: string | null
  link_type?: string | null
}

interface Course {
  id: string
  code: string
  title: string
}

interface ClientStudentResourcesPageProps {
  dbResources: Resource[]
  courses: Course[]
}

export default function ClientStudentResourcesPage({ dbResources, courses }: ClientStudentResourcesPageProps) {
  // Separate virtual class links from regular resources
  const virtualClasses = dbResources.filter((r) => r.virtual_class_link)
  const regularResources = dbResources.filter((r) => !r.virtual_class_link)

  // Get available assignments from resources
  const availableAssignments = dbResources.filter(r => r.category === 'assignments' || r.category === 'questions')

  // Group regular resources by category
  const resourcesByCategory = regularResources.reduce(
    (acc, resource) => {
      const category = resource.category || "Other"
      if (!acc[category]) {
        acc[category] = []
      }
      acc[category].push(resource)
      return acc
    },
    {} as Record<string, Resource[]>,
  )

  const officeHours = [
    { day: "Tuesday", time: "2:00 PM - 4:00 PM", location: "Office Building A, Room 301" },
    { day: "Thursday", time: "10:00 AM - 12:00 PM", location: "Office Building A, Room 301" },
    { day: "By Appointment", time: "Available", location: "Virtual or In-person" },
  ]

  const getLinkTypeColor = (linkType: string | null | undefined) => {
    switch (linkType?.toLowerCase()) {
      case "zoom":
        return "bg-blue-100 text-blue-800"
      case "google_meet":
        return "bg-green-100 text-green-800"
      case "teams":
        return "bg-purple-100 text-purple-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-primary/5 via-background to-accent/5 border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Student Resources</h1>
            <p className="text-xl text-foreground/80 leading-relaxed">
              Access lecture notes, course materials, syllabi, and reading lists for all courses. Submit assignments and
              access additional learning resources.
            </p>
          </div>
        </div>
      </section>

      {virtualClasses.length > 0 && (
        <section className="py-16 bg-accent/5 border-b border-border">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold mb-8 flex items-center gap-2">
              <Video size={32} className="text-accent" />
              Virtual Classes
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {virtualClasses.map((item) => (
                <Card key={item.id} className="border-border hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <CardTitle className="text-lg text-primary">{item.title}</CardTitle>
                        {item.course_code && (
                          <p className="text-sm text-muted-foreground mt-2">Course: {item.course_code}</p>
                        )}
                      </div>
                      <span className={`text-xs font-semibold px-2 py-1 rounded ${getLinkTypeColor(item.link_type)}`}>
                        {item.link_type?.replace("_", " ").toUpperCase() || "Virtual Class"}
                      </span>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {item.description && <p className="text-sm text-muted-foreground">{item.description}</p>}
                      <Button
                        size="sm"
                        className="w-full gap-2 bg-accent hover:bg-accent/90"
                        onClick={() => window.open(item.virtual_class_link!, "_blank")}
                      >
                        <Video size={16} />
                        Join Class
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Course Resources */}
      <section className="py-20 md:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold mb-16">Course Materials & Resources</h2>

          {Object.entries(resourcesByCategory).length > 0 ? (
            <div className="space-y-16">
              {Object.entries(resourcesByCategory).map(([category, items]) => (
                <div key={category}>
                  <h3 className="text-2xl font-bold text-primary mb-8 capitalize">{category.replace('_', ' ')}</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {items.map((item) => (
                      <Card key={item.id} className="border-border hover:shadow-lg transition-shadow">
                        <CardHeader>
                          <div className="flex items-start justify-between gap-4">
                            <div className="flex-1">
                              <CardTitle className="text-lg text-primary">{item.title}</CardTitle>
                              {item.course_code && (
                                <p className="text-sm text-muted-foreground mt-2">Course: {item.course_code}</p>
                              )}
                            </div>
                            <span className="text-xs font-semibold bg-accent/10 text-accent px-2 py-1 rounded">
                              {item.file_type || "PDF"}
                            </span>
                          </div>
                        </CardHeader>
                        <CardContent>
                          <div className="flex flex-col gap-4">
                            {item.description && <p className="text-xs text-muted-foreground">{item.description}</p>}
                            {item.file_url && (
                              <Button
                                variant="outline"
                                size="sm"
                                className="gap-2 bg-transparent self-end"
                                asChild
                              >
                                <a href={item.file_url!} target="_blank" rel="noopener noreferrer">
                                  <Download size={16} />
                                  Download
                                </a>
                              </Button>
                            )}
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <Card className="border-border text-center py-12">
              <p className="text-muted-foreground">No resources available at this time.</p>
            </Card>
          )}
        </div>
      </section>

      {/* Assignment Submission */}
      <section className="py-20 md:py-32 bg-primary/5 border-b border-border">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold mb-8 text-center">Submit Assignment</h2>
          <p className="text-lg text-foreground/80 text-center mb-12">
            Upload your completed assignments below. Please include your name and student ID.
          </p>

          <Card className="border-border">
            <CardContent className="pt-8">
              <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); alert('Submission functionality to be added.'); }}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-primary mb-2">Student Name *</label>
                    <input
                      type="text"
                      required
                      className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                      placeholder="Your name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-primary mb-2">Student ID *</label>
                    <input
                      type="text"
                      required
                      className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                      placeholder="e.g., STU-2024-001"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-primary mb-2">Course *</label>
                    <select
                      required
                      className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    >
                      <option value="">Select a course</option>
                      {courses.map(course => (
                        <option key={course.id} value={course.code}>{course.code} - {course.title}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-primary mb-2">Assignment *</label>
                    <select
                      required
                      className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    >
                      <option value="">Select assignment</option>
                      {availableAssignments.map(a => (
                        <option key={a.id} value={a.title}>{a.title}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-primary mb-2">Upload File *</label>
                  <div className="border-2 border-dashed border-border rounded-lg p-8 text-center hover:border-primary transition-colors cursor-pointer relative">
                    <Upload className="mx-auto mb-4 text-muted-foreground" size={32} />
                    <p className="text-sm font-medium mb-1">Click to upload or drag and drop</p>
                    <p className="text-xs text-muted-foreground">PDF, DOCX, or PPTX up to 20MB</p>
                    <input type="file" className="absolute inset-0 opacity-0 cursor-pointer" accept=".pdf,.docx,.pptx" />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-primary mb-2">Comments (Optional)</label>
                  <textarea
                    rows={3}
                    className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="Add any notes or comments..."
                  />
                </div>

                <Button size="lg" className="w-full bg-accent hover:bg-accent/90">
                  Submit Assignment
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  )
}
