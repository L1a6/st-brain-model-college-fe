import Link from "next/link"
import Image from "next/image"
import { Mail, Phone, MapPin, Instagram, Facebook, Twitter, Youtube, ArrowUpRight } from "lucide-react"

const quickLinks = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about" },
  { label: "Academics", href: "#academics" },
  { label: "Admissions", href: "/admissions" },
  { label: "Events", href: "/events" },
  { label: "Contact", href: "/contact" },
]

const portalLinks = [
  { label: "Student Portal", href: "/login", note: "For enrolled students" },
  { label: "Teacher Portal", href: "/staff/teacher/login", note: "For teaching staff" },
  { label: "Management Portal", href: "/staff/management/login", note: "For administration" },
]

const socials = [
  { icon: Instagram, href: "#", label: "Instagram" },
  { icon: Facebook, href: "#", label: "Facebook" },
  { icon: Twitter, href: "#", label: "Twitter/X" },
  { icon: Youtube, href: "#", label: "YouTube" },
]

export default function Footer() {
  return (
    <footer style={{ background: "linear-gradient(160deg, #0B1220 0%, #0F1E38 100%)" }} className="text-white overflow-hidden relative">
      <div className="h-0.5 bg-linear-to-r from-crimson via-crimson/60 to-transparent" />

      <div className="absolute inset-0 opacity-[0.025] pointer-events-none" style={{ backgroundImage: "radial-gradient(circle, rgba(201,162,87,1) 1px, transparent 1px)", backgroundSize: "48px 48px" }} />

      <div className="relative max-w-7xl mx-auto px-5 lg:px-8 pt-16 pb-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8 mb-12 pb-12 border-b border-white/10">
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center gap-3 mb-5">
              <div className="relative w-10 h-10 shrink-0 bg-white/5 border border-white/10 p-1">
                <Image src="/logo123.jpg" alt="St. Brain's" fill className="object-contain" />
              </div>
              <div>
                <p className="font-display text-sm font-bold text-white leading-tight">St. Brain's</p>
                <p className="text-2xs text-crimson uppercase tracking-widest">Model College</p>
              </div>
            </Link>

            <p className="text-sm text-white/50 leading-relaxed mb-6 max-w-xs">
              Shaping tomorrow's leaders through academic rigour, moral values, and a community that believes in every student.
            </p>

            <div className="flex items-center gap-3">
              {socials.map(({ icon: Icon, href, label }) => (
                <a key={label} href={href} aria-label={label} className="w-9 h-9 border border-white/15 flex items-center justify-center text-white/40 hover:text-white hover:border-crimson transition-all duration-200">
                  <Icon size={15} />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-xs font-semibold uppercase tracking-[0.2em] text-white/40 mb-5">Quick Links</h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="footer-link flex items-center gap-1.5 group">
                    <span className="w-3 h-px bg-white/20 group-hover:bg-crimson group-hover:w-5 transition-all duration-200" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-semibold uppercase tracking-[0.2em] text-white/40 mb-5">Student & Staff Portals</h4>
            <ul className="space-y-4">
              {portalLinks.map((portal) => (
                <li key={portal.href}>
                    <Link href="/login" className="group">
                      <p className="text-sm text-white/80 group-hover:text-white flex items-center gap-1 transition-colors">
                        {portal.label}
                        <ArrowUpRight size={12} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                      </p>
                      <p className="text-2xs text-white/30 mt-0.5">{portal.note}</p>
                    </Link>
                </li>
              ))}
            </ul>

            <div className="mt-6 border-l-2 border-crimson pl-4 py-1">
              <p className="text-xs text-white/60 leading-relaxed">
                Admissions for <span className="text-crimson font-semibold">2025/2026</span> session are now open.
              </p>
              <Link href="/admissions" className="text-xs text-crimson hover:text-crimson-light transition-colors mt-1 inline-flex items-center gap-1">
                Apply now <ArrowUpRight size={11} />
              </Link>
            </div>
          </div>

          <div>
            <h4 className="text-xs font-semibold uppercase tracking-[0.2em] text-white/40 mb-5">Get in Touch</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin size={15} className="text-crimson shrink-0 mt-0.5" />
                <address className="not-italic text-sm text-white/60 leading-relaxed">
                  14 Brains Avenue, Surulere,<br />Lagos State, Nigeria
                </address>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={15} className="text-crimson shrink-0" />
                <a href="tel:+2348012345678" className="footer-link text-sm">+234 801 234 5678</a>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={15} className="text-crimson shrink-0" />
                <a href="mailto:info@stbrains.edu.ng" className="footer-link text-sm break-all">info@stbrains.edu.ng</a>
              </li>
            </ul>

            <div className="mt-6 bg-white/5 border border-white/10 p-4">
              <p className="text-2xs text-white/40 uppercase tracking-widest mb-2">School Hours</p>
              <p className="text-sm text-white/70">Mon – Fri: 7:30 AM – 3:30 PM</p>
              <p className="text-xs text-white/40 mt-1">Admin office: 8:00 AM – 5:00 PM</p>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-white/30">© {new Date().getFullYear()} St. Brain's Model College. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <Link href="/privacy" className="text-xs text-white/30 hover:text-white/60 transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="text-xs text-white/30 hover:text-white/60 transition-colors">Terms of Use</Link>
            <Link href="/sitemap" className="text-xs text-white/30 hover:text-white/60 transition-colors">Sitemap</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
