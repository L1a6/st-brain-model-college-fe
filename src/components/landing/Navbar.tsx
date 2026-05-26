"use client"
import React, { useState } from "react"
import Link from "next/link"
import Image from "next/image"

export default function Navbar() {
  const [open, setOpen] = useState(false)

  return (
    <header className="w-full fixed top-0 left-0 z-40 nav-glass">
      <div className="container flex items-center justify-between h-16">
        <Link href="/" className="flex items-center gap-3">
          <Image src="/logo123.jpg" alt="logo" width={40} height={40} className="rounded-sm" />
          <span className="text-sm font-semibold">St. Brian's Model College</span>
        </Link>

        <nav className="hidden md:flex items-center gap-6">
          <Link href="#about" className="nav-link">About</Link>
          <Link href="#admissions" className="nav-link">Admissions</Link>
          <Link href="#events" className="nav-link">Events</Link>
          <Link href="#contact" className="nav-link">Contact</Link>
        </nav>

        <div className="hidden md:flex items-center gap-3">
          <Link href="/portal" className="btn-outline-white">Sign in</Link>
          <Link href="/apply" className="btn-crimson">Apply</Link>
        </div>

        <button
          aria-label="menu"
          onClick={() => setOpen(!open)}
          className="md:hidden p-2 rounded bg-white/10"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>

      {open && (
        <div className="md:hidden bg-canvas border-t py-6">
          <div className="container flex flex-col gap-4">
            <Link href="#about" onClick={() => setOpen(false)} className="nav-link">About</Link>
            <Link href="#admissions" onClick={() => setOpen(false)} className="nav-link">Admissions</Link>
            <Link href="#events" onClick={() => setOpen(false)} className="nav-link">Events</Link>
            <div className="flex gap-3 mt-2">
              <Link href="/portal" className="btn-outline-white">Sign in</Link>
              <Link href="/apply" className="btn-crimson">Apply</Link>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
