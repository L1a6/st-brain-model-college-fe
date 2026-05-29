import React from "react"
import Link from "next/link"

export default function Footer() {
  return (
    <footer className="bg-navy text-white">
      <div className="container border-t border-white/10 py-14 lg:py-16">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1.2fr_0.8fr_0.8fr] lg:items-start">
          <div className="max-w-md">
            <h4 className="font-display text-2xl leading-tight sm:text-3xl">
              St. Brain&apos;s Model College
            </h4>
            <p className="mt-4 text-sm leading-7 text-white/72">
              A calm, modern school presence with clear design, simple navigation, and
              strong academic focus.
            </p>
          </div>

          <div>
            <h5 className="mb-4 text-xs font-semibold tracking-[0.22em] text-white/55 uppercase">
              Explore
            </h5>
            <ul className="space-y-3 text-sm">
              <li>
                <Link href="#about" className="footer-link">
                  About
                </Link>
              </li>
              <li>
                <Link href="/enroll" className="footer-link">
                  Enroll
                </Link>
              </li>
              <li>
                <Link href="#events" className="footer-link">
                  Events
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h5 className="mb-4 text-xs font-semibold tracking-[0.22em] text-white/55 uppercase">
              Contact
            </h5>
            <div className="space-y-3 text-sm text-white/72">
              <div>info@stbrians.edu.ng</div>
              <div>+234 800 000 0000</div>
              <div>Uyo, Nigeria</div>
            </div>
          </div>
        </div>

        <div className="text-2xs mt-10 flex flex-col gap-3 border-t border-white/10 pt-6 text-white/55 sm:flex-row sm:items-center sm:justify-between">
          <div>© {new Date().getFullYear()} St. Brain&apos;s Model College</div>
        </div>
      </div>
    </footer>
  )
}
