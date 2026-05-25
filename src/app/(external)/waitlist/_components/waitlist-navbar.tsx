"use client"

import Link from "next/link"
import React, { useState } from "react"
import { usePathname } from "next/navigation"
import { Menu, X } from "lucide-react"
import JoinWaitlistButton from "./join-waitlist-button"
import Logo from "@/components/logo"

const WaitlistNavbar = () => {
  const pathname = usePathname()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const menuBarRef = React.useRef<HTMLDivElement>(null)

  const navItems = [
    { label: "Home", path: "/waitlist" },
    { label: "How It works", path: "/how-it-works" },
  ]

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  return (
    <nav className="fixed top-0 right-0 left-0 z-50 border-b border-gray-100 bg-[#fffbfc] py-4 shadow-md md:py-6">
      <div className="relative container flex items-center justify-between">
        {/* Mobile Menu Button */}
        <button
          onClick={toggleMobileMenu}
          className="p-2 text-[#2D2D2D] transition-colors hover:text-[#535353] md:hidden"
          aria-label="Toggle menu"
        >
          {isMobileMenuOpen ? <X className="size-6" /> : <Menu className="size-6" />}
        </button>

        {/* Mobile Menu Overlay */}
        {isMobileMenuOpen && (
          <>
            <div
              className="fixed inset-0 z-40 bg-black/20 md:hidden"
              onClick={toggleMobileMenu}
            />
            <div
              className={`fixed top-0 left-0 z-50 h-full w-80 max-w-[85vw] bg-[#fffbfc] shadow-xl transition-transform duration-300 ease-out md:hidden ${
                isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
              }`}
              ref={menuBarRef}
            >
              <div className="flex h-full flex-col">
                <div className="flex items-center justify-end px-4 py-6">
                  <button
                    onClick={toggleMobileMenu}
                    className="p-2 text-[#2D2D2D] transition-colors hover:text-[#535353]"
                    aria-label="Close menu"
                  >
                    <X className="size-6" />
                  </button>
                </div>
                <div className="flex flex-1 flex-col overflow-y-auto px-4 py-6">
                  {navItems.map((item) => {
                    const isActive = pathname === item.path
                    return (
                      <Link
                        key={item.path}
                        href={item.path}
                        onClick={toggleMobileMenu}
                        className={`px-4 py-3 text-lg font-medium transition-colors ${isActive ? "text-accent" : "hover:text-accent text-[#535353]"}`}
                      >
                        {item.label}
                      </Link>
                    )
                  })}
                </div>
              </div>
            </div>
          </>
        )}

        <Link href="/waitlist" className="hidden lg:flex">
          <Logo />
        </Link>

        {/* Desktop Navigation - Centered */}
        <section className="absolute left-1/2 hidden -translate-x-1/2 gap-6 text-lg font-medium md:flex md:gap-10">
          {navItems.map((item) => {
            const isActive = pathname === item.path
            return (
              <Link
                key={item.path}
                href={item.path}
                className={`px-3 py-2 transition-colors duration-200 ${isActive ? "text-accent" : "hover:text-accent text-[#535353]"}`}
              >
                <span className="font-medium">{item.label}</span>
              </Link>
            )
          })}
        </section>

        {/* Desktop Button */}
        <div>
          <JoinWaitlistButton />
        </div>
      </div>
    </nav>
  )
}

export default WaitlistNavbar
