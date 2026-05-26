"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { ChevronDown, Menu, X } from "lucide-react"
import clsx from "clsx"
import { usePathname } from "next/navigation"

const navLinks = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about" },
  {
    label: "Academics",
    href: "/#academics",
    children: [
      { label: "Junior Secondary", href: "/#academics" },
      { label: "Senior Secondary", href: "/#academics" },
      { label: "Co-curricular", href: "/#academics" },
    ],
  },
  { label: "Enroll", href: "/enroll" },
  { label: "Contact", href: "/contact" },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [dropdown, setDropdown] = useState<string | null>(null)
  const pathname = usePathname()

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20)
    window.addEventListener("scroll", handler)
    return () => window.removeEventListener("scroll", handler)
  }, [])

  useEffect(() => {
    setOpen(false)
  }, [pathname])

  return (
    <>
      <header
        className={clsx(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
          scrolled ? "nav-glass py-3" : "bg-transparent py-5"
        )}
      >
        <div className="max-w-7xl mx-auto px-5 lg:px-8 flex items-center justify-between gap-6">
          <Link href="/" className="flex items-center gap-3 shrink-0">
            <div className="relative w-10 h-10 shrink-0">
              <Image
                src="/logo123.jpg"
                alt="St. Brian's Model College"
                fill
                className="object-contain"
                priority
              />
            </div>
            <div className="hidden sm:block">
              <p
                className={clsx(
                  "font-display text-sm font-bold leading-tight transition-colors",
                  scrolled ? "text-navy" : "text-white"
                )}
              >
                St. Brian's
              </p>
              <p
                className={clsx(
                  "text-2xs uppercase tracking-[0.16em] font-medium transition-colors",
                  scrolled ? "text-crimson" : "text-white/70"
                )}
              >
                Model College
              </p>
            </div>
          </Link>

          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <div
                key={link.href}
                className="relative"
                onMouseEnter={() => link.children && setDropdown(link.label)}
                onMouseLeave={() => setDropdown(null)}
              >
                <Link
                  href={link.href}
                  className={clsx(
                    "nav-link flex items-center gap-1",
                    scrolled ? "" : "text-white/90 hover:text-white",
                    pathname === link.href && "active"
                  )}
                >
                  {link.label}
                  {link.children && <ChevronDown size={13} className="opacity-60" />}
                </Link>

                {link.children && dropdown === link.label && (
                  <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-52 bg-white border border-canvas-border py-2 z-50">
                    {link.children.map((child) => (
                      <Link
                        key={child.href}
                        href={child.href}
                        className="block px-5 py-2.5 text-sm text-ink-2 hover:bg-canvas hover:text-crimson transition-colors"
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </nav>

          <div className="hidden lg:flex items-center gap-3">
            <Link href="/login" className="btn-crimson text-xs px-5 py-2.5">
              Login to Portal
            </Link>
            <Link href="/enroll" className="btn-outline-white text-xs px-5 py-2.5">
              Enroll
            </Link>
          </div>

          <button
            onClick={() => setOpen(true)}
            className={clsx(
              "lg:hidden p-2 transition-colors",
              scrolled ? "text-ink" : "text-white"
            )}
            aria-label="Open menu"
          >
            <Menu size={22} />
          </button>
        </div>
      </header>

      {open && (
        <div
          className="fixed inset-0 z-60 bg-navy/60 backdrop-blur-sm lg:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      <aside
        className={clsx(
          "fixed top-0 right-0 bottom-0 z-70 w-80 max-w-[90vw] bg-white flex flex-col",
          "transition-transform duration-300 ease-out lg:hidden",
          open ? "translate-x-0" : "translate-x-full"
        )}
      >
        <div className="flex items-center justify-between px-6 py-5 border-b border-canvas-border">
          <div className="flex items-center gap-3">
            <div className="relative w-9 h-9 shrink-0">
              <Image src="/logo123.jpg" alt="St. Brian's" fill className="object-contain" />
            </div>
            <div>
              <p className="font-display text-sm font-bold text-navy leading-tight">St. Brian's</p>
              <p className="text-2xs text-crimson uppercase tracking-widest">Model College</p>
            </div>
          </div>
          <button
            onClick={() => setOpen(false)}
            className="p-1.5 text-ink-3 hover:text-ink"
            aria-label="Close menu"
          >
            <X size={20} />
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto px-4 py-6 space-y-1">
          {navLinks.map((link, i) => (
            <Link
              key={link.href}
              href={link.href}
              className={clsx(
                "flex items-center gap-3 px-4 py-3 text-base font-medium rounded-md transition-all",
                "animate-fade-up",
                pathname === link.href
                  ? "bg-crimson-soft text-crimson"
                  : "text-ink-2 hover:bg-canvas hover:text-crimson"
              )}
              style={{ animationDelay: `${i * 60}ms` }}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="p-5 border-t border-canvas-border space-y-3">
          <Link href="/login" className="btn-crimson w-full justify-center text-sm">
            Login to Portal
          </Link>
          <Link href="/enroll" className="btn-outline-white w-full justify-center text-sm">
            Enroll
          </Link>
          <p className="text-2xs text-center text-ink-4">
            © {new Date().getFullYear()} St. Brian's Model College
          </p>
        </div>
      </aside>
    </>
  )
}