import React from "react"
import Image from "next/image"
import ScrollReveal from "./ScrollReveal"

export default function CTASection() {
  return (
    <section className="relative overflow-hidden py-20 lg:py-24">
      <div className="absolute inset-0">
        <Image
          src="https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=1800&q=90&auto=format&fit=crop"
          alt="students in a school setting"
          fill
          sizes="100vw"
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(11,18,32,0.82)_0%,rgba(11,18,32,0.68)_52%,rgba(11,18,32,0.58)_100%)]" />
      </div>

      <div className="relative container text-white">
        <ScrollReveal>
          <div className="max-w-3xl">
            <div className="mb-6 flex items-center gap-3">
              <div className="h-px w-10 bg-white/40" />
              <span className="text-2xs font-semibold tracking-[0.2em] text-white/60 uppercase">
                Get started
              </span>
            </div>

            <h2 className="font-display mb-5 max-w-xl text-3xl leading-tight sm:text-4xl lg:text-5xl">
              Ready to take the next step?
            </h2>

            <p className="mb-8 max-w-lg text-base leading-relaxed text-white/74">
              Admissions, visits, and school contact in one place.
            </p>

            <div className="flex flex-wrap gap-4">
              <a
                href="/enroll"
                className="text-crimson rounded-2xl bg-white px-8 py-4 text-sm font-semibold"
              >
                Enroll
              </a>
              <a
                href="#events"
                className="rounded-2xl border border-white/35 px-8 py-4 text-sm font-semibold text-white transition-colors hover:bg-white/10"
              >
                Book a visit
              </a>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}
