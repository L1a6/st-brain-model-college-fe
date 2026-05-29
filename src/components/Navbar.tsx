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

function NavbarContent({ pathname }: { pathname: string }) {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [dropdown, setDropdown] = useState<string | null>(null)

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20)
    window.addEventListener("scroll", handler)
    return () => window.removeEventListener("scroll", handler)
  }, [])

  return (
    <>
      <header
        className={clsx(
          "fixed top-0 right-0 left-0 z-50 transition-all duration-300",
          scrolled ? "nav-glass py-3" : "bg-transparent py-5"
        )}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-5 lg:px-8">
          <Link href="/" className="flex shrink-0 items-center gap-3">
            <div className="relative h-10 w-10 shrink-0">
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
                  "font-display text-sm leading-tight font-bold transition-colors",
                  scrolled ? "text-navy" : "text-white"
                )}
              >
                St. Brain&apos;s
              </p>
              <p
                className={clsx(
                  "text-2xs font-medium tracking-[0.16em] uppercase transition-colors",
                  scrolled ? "text-crimson" : "text-white/70"
                )}
              >
                Model College
              </p>
            </div>
          </Link>

          <nav className="hidden items-center gap-8 lg:flex">
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
                  <div className="border-canvas-border absolute top-full left-1/2 z-50 mt-2 w-52 -translate-x-1/2 border bg-white py-2">
                    {link.children.map((child) => (
                      <Link
                        key={child.href}
                        href={child.href}
                        className="text-ink-2 hover:bg-canvas hover:text-crimson block px-5 py-2.5 text-sm transition-colors"
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </nav>

          <div className="hidden items-center gap-3 lg:flex">
            <Link href="/login" className="btn-crimson px-5 py-2.5 text-xs">
              Login to Portal
            </Link>
            <Link href="/enroll" className="btn-outline-white px-5 py-2.5 text-xs">
              Enroll
            </Link>
          </div>

          <button
            onClick={() => setOpen(true)}
            className={clsx(
              "p-2 transition-colors lg:hidden",
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
          className="bg-navy/60 fixed inset-0 z-60 backdrop-blur-sm lg:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      <aside
        className={clsx(
          "fixed top-0 right-0 bottom-0 z-70 flex w-80 max-w-[90vw] flex-col bg-white",
          "transition-transform duration-300 ease-out lg:hidden",
          open ? "translate-x-0" : "translate-x-full"
        )}
      >
        <div className="border-canvas-border flex items-center justify-between border-b px-6 py-5">
          <div className="flex items-center gap-3">
            <div className="relative h-9 w-9 shrink-0">
              <Image
                src="/logo123.jpg"
                alt="St. Brian's"
                fill
                className="object-contain"
              />
            </div>
            <div>
              <p className="font-display text-navy text-sm leading-tight font-bold">
                St. Brain&apos;s
              </p>
              <p className="text-2xs text-crimson tracking-widest uppercase">
                Model College
              </p>
            </div>
          </div>
          <button
            onClick={() => setOpen(false)}
            className="text-ink-3 hover:text-ink p-1.5"
            aria-label="Close menu"
          >
            <X size={20} />
          </button>
        </div>

        <nav className="flex-1 space-y-1 overflow-y-auto px-4 py-6">
          {navLinks.map((link, i) => (
            <Link
              key={link.href}
              href={link.href}
              className={clsx(
                "flex items-center gap-3 rounded-md px-4 py-3 text-base font-medium transition-all",
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

        <div className="border-canvas-border space-y-3 border-t p-5">
          <Link href="/login" className="btn-crimson w-full justify-center text-sm">
            Login to Portal
          </Link>
          <Link
            href="/enroll"
            className="btn-outline-white w-full justify-center text-sm"
          >
            Enroll
          </Link>
          <p className="text-2xs text-ink-4 text-center">
            © {new Date().getFullYear()} St. Brain&apos;s Model College
          </p>
        </div>
      </aside>
    </>
  )
}

export default function Navbar() {
  const pathname = usePathname()

  return <NavbarContent key={pathname} pathname={pathname} />
}
