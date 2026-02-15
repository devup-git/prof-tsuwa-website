import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { FileDown } from "lucide-react"
import { getPublications, getSupervisees } from "@/lib/db-queries"

export const metadata = {
  title: "About Dr. John Tor Tsuwa | Political Science Scholar",
  description:
    "Learn about Dr. John Tor Tsuwa's background, expertise in political science, peace and conflict studies, and professional experience.",
}

export default async function About() {
  const publications = await getPublications()
  const supervisees = await getSupervisees()

  const publicationsCount = publications.length
  const totalSupervised = supervisees.length

  // Assuming start year is 1998
  const yearsExperience = new Date().getFullYear() - 1998
  const education = [
    {
      degree: "Ph.D. in Defence and Strategic Studies",
      institution: "Nigerian Defence Academy, Kaduna",
      year: "2017",
      focus: "Defence and Strategic Studies",
    },
    {
      degree: "Ph.D. in Political Science",
      institution: "Rev. Fr. Moses Orshio Adasu University, Makurdi",
      year: "2014",
      focus: "Peace and Conflict Studies",
    },
    {
      degree: "M.Sc. in International Relations and Strategic Studies",
      institution: "Rev. Fr. Moses Orshio Adasu University, Makurdi",
      year: "2005",
      focus: "International Relations and Strategic Studies",
    },
    {
      degree: "B.Sc. in Political Science",
      institution: "Rev. Fr. Moses Orshio Adasu University, Makurdi",
      year: "2001",
      focus: "Political Science",
    },
  ]

  const experience = [
    {
      title: "Deputy Director",
      organization: "Centre for Peace and Development Studies, Rev. Fr. Moses Orshio Adasu University",
      period: "September 2023 - Present",
      description:
        "Lead policy implementation direction of the Centre, design academic and professional programmes including BSc Peace Studies, MSc Humanitarian and Refugee Studies, and MA Religion and Peace Studies. Manage ADR desk, implement Grievance Redress System, coordinate external collaborations, and manage grants on behalf of the Centre.",
    },
    {
      title: "Chairman",
      organization: "Benue State Independent Electoral Commission",
      period: "2016 - 2018",
      description:
        "Served as Chief Electoral Officer managing staff at headquarters and 24 local governments. Designed and directed electoral processes, managed party primaries, oversaw voter registration, and coordinated security for free, fair and credible elections across Benue State.",
    },
    {
      title: "Lecturer/Senior Lecturer, Department of Political Science",
      organization: "Rev. Fr. Moses Orshio Adasu University, Makurdi",
      period: "2006 - 2016",
      description:
        "Taught undergraduate and postgraduate courses in peace studies, conflict resolution, defence and strategic studies, and governance. Served as Editor of Journal of Political and Administrative Studies, organized academic conferences and departmental lecture series. Supervised 32+ postgraduate and 70+ undergraduate students.",
    },
    {
      title: "Consultant on Peace, Conflict and Governance",
      organization:
        "Multiple International Organizations (SPRiNG/TETRA TECH, OSPRE, British Council, CHD, Catholic Diocese)",
      period: "2022 - 2025",
      description:
        "Conducted research on mining and violence in North Central Nigeria, developed concepts for peace and reconciliation commissions, led baseline surveys on peacebuilding and early warning systems. Facilitated dialogue processes with ethnic communities on farmer-herder conflicts and natural resource management.",
    },
  ]

  const specializations = [
    "Peace and Conflict Resolution",
    "Governance & Electoral Studies",
    "Security & Strategic Policy",
    "Defence and Strategic Studies",
    "African Politics",
    "Conflict Analysis and Mediation",
    "Electoral Integrity",
    "Humanitarian and Refugee Studies",
  ]

  const memberships = [
    "Fellow, Society for Peace Studies and Practice (SPSP)",
    "Secretary General, Society for Peace Studies and Practice (Nigeria, Sierra Leone, Cameroon)",
    "Fellow, Institute of Political Administration and Management",
    "Certified Mediator (Professional Skills Accreditation - ICMC & CMC)",
    "Member, Committee on Core Curriculum and Minimum Academic Standards (CCMAS)",
  ]

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="py-20 md:py-28 bg-gradient-to-br from-primary/5 via-background to-accent/5 border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 items-start">
            {/* Profile Image */}
            <div className="flex justify-center md:justify-start md:col-span-1">
              <div className="w-64 h-80 rounded-xl overflow-hidden shadow-xl border-2 border-primary/20">
                <img src="/images/3.png" alt="Dr. John Tor Tsuwa" className="w-full h-full object-cover" />
              </div>
            </div>

            {/* Bio Content */}
            <div className="md:col-span-2 space-y-6">
              <div>
                <h1 className="text-4xl md:text-5xl font-bold mb-2">Dr. John Tor Tsuwa</h1>
                <p className="text-2xl text-primary font-semibold">Political Science Scholar & Governance Specialist</p>
              </div>

              <p className="text-lg text-foreground/80 leading-relaxed">
                John Tor Tsuwa is a senior political scientist at Rev. Fr. Moses Orshio Adasu University,
                Makurdi, Nigeria. With over {yearsExperience} years of academic and professional experience, he specializes in peace
                and conflict resolution, governance, and strategic studies. He holds two Ph.D. degrees—one in Political
                Science (2014) and another in Defence and Strategic Studies from the Nigerian Defence Academy (2017). He
                is currently Deputy Director of the Centre for Peace and Development Studies.
              </p>

              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold text-primary mb-2">Key Achievements</h3>
                  <ul className="space-y-2 text-foreground/80">
                    <li className="flex gap-3">
                      <span className="text-accent font-bold">•</span>
                      <span>
                        Published {publicationsCount} scholarly works including journal articles and book chapters on conflict,
                        governance, and African politics
                      </span>
                    </li>
                    <li className="flex gap-3">
                      <span className="text-accent font-bold">•</span>
                      <span>
                        Served as Chairman of Benue State Independent Electoral Commission (2016-2018), ensuring
                        electoral integrity
                      </span>
                    </li>
                    <li className="flex gap-3">
                      <span className="text-accent font-bold">•</span>
                      <span>Deputy Director of Centre for Peace and Development Studies (September 2023-Present)</span>
                    </li>
                    <li className="flex gap-3">
                      <span className="text-accent font-bold">•</span>
                      <span>
                        Secretary General of Society for Peace Studies and Practice (SPSP) spanning Nigeria, Sierra
                        Leone, and Cameroon
                      </span>
                    </li>
                    <li className="flex gap-3">
                      <span className="text-accent font-bold">•</span>
                      <span>
                        Supervised {totalSupervised}+ postgraduate students and 70+ undergraduate students in political science and
                        related fields
                      </span>
                    </li>
                  </ul>
                </div>
              </div>

              <Button size="lg" className="bg-accent hover:bg-accent/90 w-full sm:w-auto" asChild>
                <a href="/John_Tor_Tsuwa_CV.pdf" target="_blank" rel="noopener noreferrer">
                  <FileDown className="mr-2 h-4 w-4" />
                  Download CV (PDF)
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Education Section */}
      <section className="py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold mb-12">Education</h2>

          <div className="space-y-6">
            {education.map((item, i) => (
              <Card key={i} className="border-border">
                <CardHeader>
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <CardTitle className="text-primary">{item.degree}</CardTitle>
                      <CardDescription className="mt-2 text-base">
                        {item.institution} • {item.year}
                      </CardDescription>
                    </div>
                    <span className="text-sm font-semibold bg-primary/10 text-primary px-3 py-1 rounded-full whitespace-nowrap">
                      {item.focus}
                    </span>
                  </div>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Professional Experience */}
      <section className="py-20 md:py-28 bg-card border-y border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold mb-12">Professional Experience</h2>

          <div className="space-y-8">
            {experience.map((item, i) => (
              <div key={i} className="border-l-4 border-primary pl-6 py-2">
                <h3 className="text-2xl font-bold text-primary mb-1">{item.title}</h3>
                <p className="text-lg font-semibold text-accent mb-2">{item.organization}</p>
                <p className="text-sm text-muted-foreground font-medium mb-3">{item.period}</p>
                <p className="text-foreground/80 leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Specializations */}
      <section className="py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold mb-12">Areas of Specialization</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {specializations.map((spec, i) => (
              <div
                key={i}
                className="p-6 rounded-lg bg-primary/5 border border-primary/20 hover:border-primary/50 transition-colors"
              >
                <p className="font-semibold text-primary">{spec}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Professional Memberships */}
      <section className="py-20 md:py-28 bg-gradient-to-br from-primary/5 to-accent/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold mb-12">Professional Memberships & Honors</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {memberships.map((membership, i) => (
              <Card key={i} className="border-primary/30 bg-card/50">
                <CardHeader>
                  <CardTitle className="text-lg text-primary">{membership}</CardTitle>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 md:py-28 bg-primary text-primary-foreground">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-6">Interested in Working Together?</h2>
          <p className="text-xl text-primary-foreground/90 mb-8">
            Explore consulting opportunities or collaborate on research initiatives.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground">
              <a href="/consultancy">Get Consulting Services</a>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground/10 bg-transparent"
            >
              <a href="mailto:contact@example.com">Send an Inquiry</a>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
