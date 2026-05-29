import Link from "next/link"
import Image from "next/image"
import {
  Mail,
  Phone,
  MapPin,
  Instagram,
  Facebook,
  Twitter,
  Youtube,
  ArrowUpRight,
} from "lucide-react"

const quickLinks = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about" },
  { label: "Academics", href: "#academics" },
  { label: "Enroll", href: "/enroll" },
  { label: "Events", href: "/events" },
  { label: "Contact", href: "/contact" },
]

const portalLinks = [
  { label: "Student Portal", href: "/login", note: "For enrolled students" },
  { label: "Teacher Portal", href: "/staff/teacher/login", note: "For teaching staff" },
  {
    label: "Management Portal",
    href: "/staff/management/login",
    note: "For administration",
  },
]

const socials = [
  { icon: Instagram, href: "#", label: "Instagram" },
  { icon: Facebook, href: "#", label: "Facebook" },
  { icon: Twitter, href: "#", label: "Twitter/X" },
  { icon: Youtube, href: "#", label: "YouTube" },
]

export default function Footer() {
  return (
    <footer
      style={{ background: "linear-gradient(160deg, #0B1220 0%, #0F1E38 100%)" }}
      className="relative overflow-hidden text-white"
    >
      <div className="from-crimson via-crimson/60 h-0.5 bg-linear-to-r to-transparent" />

      <div
        className="pointer-events-none absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage:
            "radial-gradient(circle, rgba(201,162,87,1) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />

      <div className="relative mx-auto max-w-7xl px-5 pt-16 pb-8 lg:px-8">
        <div className="mb-12 grid grid-cols-1 gap-10 border-b border-white/10 pb-12 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
          <div className="lg:col-span-1">
            <Link href="/" className="mb-5 flex items-center gap-3">
              <div className="relative h-10 w-10 shrink-0 border border-white/10 bg-white/5 p-1">
                <Image
                  src="/logo123.jpg"
                  alt="St. Brain's"
                  fill
                  className="object-contain"
                />
              </div>
              <div>
                <p className="font-display text-sm leading-tight font-bold text-white">
                  St. Brain&apos;s
                </p>
                <p className="text-2xs text-crimson tracking-widest uppercase">
                  Model College
                </p>
              </div>
            </Link>

            <p className="mb-6 max-w-xs text-sm leading-relaxed text-white/50">
              Shaping tomorrow&apos;s leaders through academic rigour, moral values, and a
              community that believes in every student.
            </p>

            <div className="flex items-center gap-3">
              {socials.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="hover:border-crimson flex h-9 w-9 items-center justify-center border border-white/15 text-white/40 transition-all duration-200 hover:text-white"
                >
                  <Icon size={15} />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="mb-5 text-xs font-semibold tracking-[0.2em] text-white/40 uppercase">
              Quick Links
            </h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="footer-link group flex items-center gap-1.5"
                  >
                    <span className="group-hover:bg-crimson h-px w-3 bg-white/20 transition-all duration-200 group-hover:w-5" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="mb-5 text-xs font-semibold tracking-[0.2em] text-white/40 uppercase">
              Student & Staff Portals
            </h4>
            <ul className="space-y-4">
              {portalLinks.map((portal) => (
                <li key={portal.href}>
                  <Link href="/login" className="group">
                    <p className="flex items-center gap-1 text-sm text-white/80 transition-colors group-hover:text-white">
                      {portal.label}
                      <ArrowUpRight
                        size={12}
                        className="opacity-0 transition-opacity group-hover:opacity-100"
                      />
                    </p>
                    <p className="text-2xs mt-0.5 text-white/30">{portal.note}</p>
                  </Link>
                </li>
              ))}
            </ul>

            <div className="border-crimson mt-6 border-l-2 py-1 pl-4">
              <p className="text-xs leading-relaxed text-white/60">
                Admissions for{" "}
                <span className="text-crimson font-semibold">2025/2026</span> session are
                now open.
              </p>
              <Link
                href="/enroll"
                className="text-crimson hover:text-crimson-light mt-1 inline-flex items-center gap-1 text-xs transition-colors"
              >
                Enroll now <ArrowUpRight size={11} />
              </Link>
            </div>
          </div>

          <div>
            <h4 className="mb-5 text-xs font-semibold tracking-[0.2em] text-white/40 uppercase">
              Get in Touch
            </h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin size={15} className="text-crimson mt-0.5 shrink-0" />
                <address className="text-sm leading-relaxed text-white/60 not-italic">
                  14 Brains Avenue, Surulere,
                  <br />
                  Lagos State, Nigeria
                </address>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={15} className="text-crimson shrink-0" />
                <a href="tel:+2348012345678" className="footer-link text-sm">
                  +234 801 234 5678
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={15} className="text-crimson shrink-0" />
                <a
                  href="mailto:info@stbrains.edu.ng"
                  className="footer-link text-sm break-all"
                >
                  info@stbrains.edu.ng
                </a>
              </li>
            </ul>

            <div className="mt-6 border border-white/10 bg-white/5 p-4">
              <p className="text-2xs mb-2 tracking-widest text-white/40 uppercase">
                School Hours
              </p>
              <p className="text-sm text-white/70">Mon – Fri: 7:30 AM – 3:30 PM</p>
              <p className="mt-1 text-xs text-white/40">
                Admin office: 8:00 AM – 5:00 PM
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
          <p className="text-xs text-white/30">
            © {new Date().getFullYear()} St. Brain&apos;s Model College. All rights
            reserved.
          </p>
          <div className="flex items-center gap-6">
            <Link
              href="/privacy"
              className="text-xs text-white/30 transition-colors hover:text-white/60"
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms"
              className="text-xs text-white/30 transition-colors hover:text-white/60"
            >
              Terms of Use
            </Link>
            <Link
              href="/sitemap"
              className="text-xs text-white/30 transition-colors hover:text-white/60"
            >
              Sitemap
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
