import React from "react"
import Link from "next/link"

export default function Footer() {
  return (
    <footer className="bg-navy text-white">
      <div className="container py-14 lg:py-16 border-t border-white/10">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1.2fr_0.8fr_0.8fr] lg:items-start">
          <div className="max-w-md">
            <h4 className="font-display text-2xl sm:text-3xl leading-tight">St. Brian's Model College</h4>
            <p className="mt-4 text-sm leading-7 text-white/72">
              A calm, modern school presence with clear design, simple navigation, and strong academic focus.
            </p>
          </div>

          <div>
            <h5 className="text-xs font-semibold uppercase tracking-[0.22em] text-white/55 mb-4">Explore</h5>
            <ul className="space-y-3 text-sm">
              <li><Link href="#about" className="footer-link">About</Link></li>
              <li><Link href="#admissions" className="footer-link">Admissions</Link></li>
              <li><Link href="#events" className="footer-link">Events</Link></li>
            </ul>
          </div>

          <div>
            <h5 className="text-xs font-semibold uppercase tracking-[0.22em] text-white/55 mb-4">Contact</h5>
            <div className="space-y-3 text-sm text-white/72">
              <div>info@stbrians.edu.ng</div>
              <div>+234 800 000 0000</div>
              <div>Uyo, Nigeria</div>
            </div>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-3 border-t border-white/10 pt-6 text-2xs text-white/55 sm:flex-row sm:items-center sm:justify-between">
          <div>© {new Date().getFullYear()} St. Brian's Model College</div>
        </div>
      </div>
    </footer>
  )
}
