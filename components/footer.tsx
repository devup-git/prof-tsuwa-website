import Link from "next/link"
import { Mail, Phone, MapPin } from "lucide-react"
import { siteConfig } from "@/config/site"

export function Footer() {
  const currentYear = new Date().getFullYear()
  const { contact } = siteConfig

  return (
    <footer className="bg-primary text-primary-foreground border-t border-border mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* About Section */}
          <div>
            <h3 className="text-lg font-bold mb-4">Prof. John Tor Tsuwa</h3>
            <p className="text-primary-foreground/90 text-sm leading-relaxed">{siteConfig.description}</p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-bold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              {siteConfig.navigation.slice(0, 6).map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="hover:underline">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Section - using centralized contact config */}
          <div>
            <h4 className="text-lg font-bold mb-4">Contact</h4>
            <ul className="space-y-2 text-sm">
              <li className="flex items-start gap-2">
                <MapPin size={16} className="flex-shrink-0 mt-1" />
                <span>
                  {contact.office.name}
                  <br />
                  {contact.office.university}
                  <br />
                  {contact.office.address}
                </span>
              </li>
              <li className="flex items-center gap-2">
                <Mail size={16} />
                <a href={`mailto:${contact.email}`} className="hover:underline">
                  {contact.email}
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Phone size={16} />
                <a href={`tel:${contact.phone}`} className="hover:underline">
                  {contact.phone}
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-primary-foreground/30 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center text-sm text-primary-foreground/80">
            <p>&copy; {currentYear} Prof. John Tor Tsuwa. All rights reserved.</p>
            <div className="mt-4 md:mt-0">
              <p>Crafted by Stan</p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
