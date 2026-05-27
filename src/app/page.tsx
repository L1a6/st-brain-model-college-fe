import React from "react"
import Navbar from "@/components/landing/Navbar"
import Hero from "@/components/landing/Hero"
import About from "@/components/landing/About"
import Features from "@/components/landing/Features"
import Events from "@/components/landing/Events"
import Testimonials from "@/components/landing/Testimonials"
import CTASection from "@/components/landing/CTASection"
import Footer from "@/components/landing/Footer"

export const revalidate = 10

export default function Page() {
  return (
    <main>
      <Navbar />
      <Hero />
      <About />
      <Features />
      <Events />
      <Testimonials />
      <CTASection />
      <Footer />
    </main>
  )
}
