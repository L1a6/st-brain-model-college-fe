"use client"

import React, { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Menu, X } from "lucide-react"
import Logo from "@/components/logo"

const WaitlistNavbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false)
  }

  return (
    <nav className="fixed top-0 right-0 left-0 z-50 border-b border-gray-100 bg-[#fffbfc] py-4 lg:py-6">
      <div className="relative container flex items-center justify-between">
        <Link href="/">
          <Logo />
        </Link>

        {/* Desktop Navigation */}
        <section className="hidden lg:flex">
          <Button variant="ghost" asChild>
            <Link href="/">Back to Home</Link>
          </Button>
        </section>

        {/* Mobile Navigation */}
        <button className="lg:hidden" onClick={toggleMobileMenu} aria-label="Toggle menu">
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="absolute top-full right-0 left-0 border-b border-gray-100 bg-[#fffbfc] p-4 lg:hidden">
            <Link href="/" onClick={closeMobileMenu} className="block py-2">
              Back to Home
            </Link>
          </div>
        )}
      </div>
    </nav>
  )
}

export default WaitlistNavbar
