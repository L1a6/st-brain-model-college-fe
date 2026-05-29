"use client"
import React, { useState } from "react"
import Link from "next/link"
import Image from "next/image"

export default function Navbar() {
  const [open, setOpen] = useState(false)

  return (
    <header className="nav-glass fixed top-0 left-0 z-40 w-full">
      <div className="container flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center gap-3">
          <Image
            src="/logo123.jpg"
            alt="logo"
            width={40}
            height={40}
            className="rounded-sm"
          />
          <span className="text-sm font-semibold">St. Brain&apos;s Model College</span>
        </Link>

        <nav className="hidden items-center gap-6 md:flex">
          <Link href="#about" className="nav-link">
            About
          </Link>
          <Link href="/enroll" className="nav-link">
            Enroll
          </Link>
          <Link href="#events" className="nav-link">
            Events
          </Link>
          <Link href="#contact" className="nav-link">
            Contact
          </Link>
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <Link href="/portal" className="btn-outline-white">
            Sign in
          </Link>
          <Link href="/enroll" className="btn-crimson">
            Enroll
          </Link>
        </div>

        <button
          aria-label="menu"
          onClick={() => setOpen(!open)}
          className="rounded bg-white/10 p-2 md:hidden"
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
          >
            <path
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
      </div>

      {open && (
        <div className="bg-canvas border-t py-6 md:hidden">
          <div className="container flex flex-col gap-4">
            <Link href="#about" onClick={() => setOpen(false)} className="nav-link">
              About
            </Link>
            <Link href="/enroll" onClick={() => setOpen(false)} className="nav-link">
              Enroll
            </Link>
            <Link href="#events" onClick={() => setOpen(false)} className="nav-link">
              Events
            </Link>
            <div className="mt-2 flex gap-3">
              <Link href="/portal" className="btn-outline-white">
                Sign in
              </Link>
              <Link href="/enroll" className="btn-crimson">
                Enroll
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
