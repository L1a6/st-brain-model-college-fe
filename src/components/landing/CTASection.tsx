import React from "react"
import Image from "next/image"
import ScrollReveal from "./ScrollReveal"

export default function CTASection() {
  return (
    <section className="relative overflow-hidden py-20 lg:py-24">
      <div className="absolute inset-0">
        <Image
          src="/images/home/about/image1.png"
          alt="classroom interior"
          fill
          sizes="100vw"
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(11,18,32,0.82)_0%,rgba(11,18,32,0.68)_52%,rgba(11,18,32,0.58)_100%)]" />
      </div>

      <div className="relative container text-white">
        <ScrollReveal>
          <div className="max-w-3xl">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-px bg-white/40" />
              <span className="text-white/60 text-2xs font-semibold uppercase tracking-[0.2em]">Get started</span>
            </div>

            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl leading-tight mb-5 max-w-xl">
              Ready to take the next step?
            </h2>

            <p className="text-white/74 text-base leading-relaxed max-w-lg mb-8">
              Admissions, visits, and school contact in one place.
            </p>

            <div className="flex flex-wrap gap-4">
              <a href="/enroll" className="bg-white text-crimson font-semibold text-sm px-8 py-4 rounded-2xl">Enroll</a>
              <a href="#events" className="border border-white/35 text-white font-semibold text-sm px-8 py-4 rounded-2xl hover:bg-white/10 transition-colors">Book a visit</a>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}
