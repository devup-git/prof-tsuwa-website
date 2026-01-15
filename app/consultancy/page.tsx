import type { Metadata } from "next"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import ConsultancyClientForm from "./consultancy-client"
import { getConsultancyServices, getConsultancyCaseStudies } from "@/lib/db-queries"

export const metadata: Metadata = {
  title: "Consultancy Services | Prof. John Tor Tsuwa",
  description: "Professional consultancy services in governance, peace studies, and organizational development",
}

export default async function ConsultancyPage() {
  const services = await getConsultancyServices()
  const caseStudies = await getConsultancyCaseStudies()

  // Fallback services if database is empty
  const defaultServices = [
    {
      id: "1",
      title: "Peace and Conflict Resolution",
      description: "Expert mediation and conflict resolution services for communities and organizations",
      benefits: ["Mediation facilitation", "Conflict analysis", "Peace-building strategies", "Training programs"],
    },
    {
      id: "2",
      title: "Governance and Institutional Development",
      description: "Strategic guidance on governance structures and institutional effectiveness",
      benefits: ["Governance assessment", "Institutional design", "Policy development", "Capacity building"],
    },
    {
      id: "3",
      title: "Electoral Systems and Political Analysis",
      description: "Expertise in electoral integrity, political analysis, and democratic processes",
      benefits: [
        "Electoral system analysis",
        "Political risk assessment",
        "Electoral administration",
        "Voter education",
      ],
    },
    {
      id: "4",
      title: "Security and Strategic Planning",
      description: "Strategic insights on security challenges and policy development",
      benefits: ["Security assessment", "Strategic planning", "Defense policy", "Risk analysis"],
    },
  ]

  const displayServices = services.length > 0 ? services : defaultServices

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-primary/5 via-background to-accent/5 border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Consultancy Services</h1>
            <p className="text-xl text-foreground/80 leading-relaxed">
              Leveraging 25+ years of academic expertise and policy experience in peace, governance, and security to
              help organizations and governments address complex political and institutional challenges.
            </p>
          </div>
        </div>
      </section>

      {/* Services Overview */}
      <section className="py-20 md:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold mb-12">Core Services</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {displayServices.map((service) => (
              <Card key={service.id} className="border-border hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="text-xl text-primary">{service.title}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-foreground/80">{service.description}</p>
                  {service.benefits && (
                    <div>
                      <h4 className="text-sm font-semibold text-primary mb-2">Key Benefits</h4>
                      <ul className="space-y-1">
                        {service.benefits.map((benefit: string, i: number) => (
                          <li key={i} className="text-sm text-foreground/70 flex gap-2">
                            <span className="text-accent">✓</span>
                            {benefit}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Case Studies */}
      {caseStudies.length > 0 && (
        <section className="py-20 md:py-32 bg-card border-y border-border">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-4xl font-bold mb-12">Case Studies</h2>

            <div className="space-y-8">
              {caseStudies.map((study) => (
                <Card key={study.id} className="border-border overflow-hidden">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {study.image_url && (
                      <div className="md:col-span-1 h-48 md:h-full">
                        <img
                          src={study.image_url || "/placeholder.svg"}
                          alt={study.title}
                          className="w-full h-full object-cover"
                          crossOrigin="anonymous"
                        />
                      </div>
                    )}
                    <div className={study.image_url ? "md:col-span-2" : "md:col-span-3"}>
                      <CardHeader>
                        <div className="flex items-start justify-between gap-2 mb-2">
                          <CardTitle className="text-xl text-primary">{study.title}</CardTitle>
                          <Badge variant="secondary">{study.client_industry}</Badge>
                        </div>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <p className="text-foreground/80">{study.description}</p>
                        {study.results && (
                          <div>
                            <h4 className="text-sm font-semibold text-primary mb-3">Results Achieved</h4>
                            <p className="text-foreground/80">{study.results}</p>
                          </div>
                        )}
                      </CardContent>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Engagement Process */}
      <section className="py-20 md:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold mb-12">Our Engagement Process</h2>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              {
                number: "01",
                title: "Discovery",
                description: "Initial consultation to understand your challenges, goals, and organizational context",
              },
              {
                number: "02",
                title: "Assessment",
                description: "In-depth analysis and research to identify root causes and opportunities",
              },
              {
                number: "03",
                title: "Strategy",
                description: "Development of tailored solutions and actionable recommendations",
              },
              {
                number: "04",
                title: "Implementation",
                description: "Support throughout execution and building internal capacity",
              },
            ].map((phase, i) => (
              <Card key={i} className="border-border text-center">
                <CardHeader>
                  <div className="text-4xl font-bold text-accent mb-4">{phase.number}</div>
                  <CardTitle className="text-primary">{phase.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-foreground/80 text-sm">{phase.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Inquiry Form */}
      <section className="py-20 md:py-32 bg-primary/5 border-t border-border">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold mb-4 text-center">Request Consultancy Services</h2>
          <p className="text-lg text-foreground/80 text-center mb-12">
            Tell me about your consultancy needs. I'll review your inquiry and respond within 48 hours.
          </p>

          <ConsultancyClientForm services={displayServices} />
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary text-primary-foreground">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Transform Your Organization?</h2>
          <p className="text-lg text-primary-foreground/90">
            Let's discuss how my expertise can help you achieve your goals and navigate complex challenges.
          </p>
        </div>
      </section>
    </div>
  )
}
