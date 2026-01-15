import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { FileText } from "lucide-react"
import { getCourses } from "@/lib/db-queries"

export const metadata = {
  title: "Teaching & Courses | Dr. John Tor Tsuwa",
  description:
    "Explore the courses and teaching at Rev. Fr. Moses Orshio Adasu University with Dr. John Tor Tsuwa's expertise in political science and peace studies.",
}

export default async function Teaching() {
  const courses = await getCourses()

  const teachingPhilosophy = [
    {
      title: "Critical Scholarship",
      description:
        "Students must engage deeply with ideas, not merely absorb them. Courses emphasize critical thinking about governance, conflict, and politics.",
      icon: "thinking",
    },
    {
      title: "Real-World Focus",
      description:
        "African politics are complex and dynamic. Teaching incorporates contemporary cases, current events, and practical examples of conflict and governance.",
      icon: "practical",
    },
    {
      title: "Scholarly Rigor",
      description:
        "Grounded in peer-reviewed research and evidence. Students learn to engage with academic literature and develop evidence-based arguments.",
      icon: "academic",
    },
    {
      title: "Professional Development",
      description:
        "Beyond grades, I mentor students for careers in government, international organizations, academia, and civil society.",
      icon: "career",
    },
  ]

  const supervision = {
    doctoral: { count: 32, description: "MA and MSc Students supervised since 2006" },
    current: { count: 9, description: "Current doctoral students (4 PhD + 5 MSc)" },
    placement: { count: 85, description: "Graduate placement rate in academia and government" },
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-primary/5 via-background to-accent/5 border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Teaching & Courses</h1>
            <p className="text-xl text-foreground/80 leading-relaxed">
              As an educator, my mission is to develop students into critical thinkers equipped to understand and
              address complex political, security, and governance challenges in Nigeria and Africa. Through rigorous
              scholarship and engagement with contemporary issues, I strive to inspire excellence in academic and
              professional practice.
            </p>
          </div>
        </div>
      </section>



      {/* Supervision Stats */}
      <section className="py-16 bg-primary text-primary-foreground">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold">{supervision.doctoral.count}+</div>
              <p className="text-primary-foreground/80 mt-2">{supervision.doctoral.description}</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold">{supervision.current.count}</div>
              <p className="text-primary-foreground/80 mt-2">{supervision.current.description}</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold">{supervision.placement.count}%</div>
              <p className="text-primary-foreground/80 mt-2">{supervision.placement.description}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Current Courses */}
      <section className="py-20 md:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold mb-12">Current Courses</h2>

          {courses.length > 0 ? (
            <div className="space-y-8">
              {courses.map((course) => (
                <div key={course.id} className="border-l-4 border-primary pl-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8 mb-6">
                    <div>
                      <p className="text-sm text-muted-foreground font-semibold">Course Code</p>
                      <p className="text-2xl font-bold text-primary">{course.code}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground font-semibold">Level</p>
                      <p className="text-lg font-semibold text-foreground">{course.level}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground font-semibold">Credits</p>
                      <p className="text-2xl font-bold text-accent">{course.credits}</p>
                    </div>
                  </div>

                  <h3 className="text-2xl font-bold text-foreground mb-3">{course.title}</h3>
                  <p className="text-foreground/80 mb-6 leading-relaxed">{course.description}</p>

                  <div className="space-y-4">
                    <div>
                      <p className="text-sm text-muted-foreground font-semibold">Semester</p>
                      <p className="text-foreground">{course.semester}</p>
                    </div>
                    {course.syllabus_url && (
                      <Button variant="outline" size="sm">
                        <FileText className="mr-2 h-4 w-4" />
                        Download Syllabus
                      </Button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <Card className="border-border text-center py-12">
              <p className="text-muted-foreground">No courses available at this time.</p>
            </Card>
          )}
        </div>
      </section>



      {/* Executive Education */}
      <section className="py-20 md:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold mb-12">Executive & Professional Development Programs</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                title: "Conflict Resolution and Mediation Training",
                duration: "3-day intensive",
                audience: "Government officials, NGO staff, civil society leaders",
                description:
                  "Develop practical conflict resolution and mediation skills with frameworks applicable to community and organizational contexts.",
              },
              {
                title: "Governance and Democratic Leadership Workshop",
                duration: "2-day workshop",
                audience: "Government officials and public administrators",
                description:
                  "Enhance governance practices and democratic leadership with evidence-based approaches to institutional effectiveness.",
              },
              {
                title: "Electoral Integrity and Electoral Administration",
                duration: "2-day training",
                audience: "Electoral officials, poll observers, civil society",
                description:
                  "Comprehensive training on electoral systems, integrity mechanisms, and best practices in electoral administration.",
              },
              {
                title: "Security Studies and Strategic Analysis",
                duration: "Customized",
                audience: "Military officers, security analysts, government",
                description:
                  "Strategic thinking and security analysis applicable to national defence policy and security sector reform.",
              },
            ].map((program, i) => (
              <Card key={i} className="border-border">
                <CardHeader>
                  <CardTitle className="text-primary">{program.title}</CardTitle>
                  <CardDescription>{program.duration}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <p className="text-sm font-semibold text-muted-foreground mb-1">Target Audience</p>
                    <p className="text-foreground">{program.audience}</p>
                  </div>
                  <p className="text-foreground/80">{program.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>


    </div>
  )
}
