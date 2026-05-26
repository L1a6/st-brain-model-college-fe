"use client"
import React from "react"
import Image from "next/image"
import ScrollReveal from "./ScrollReveal"

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-navy text-white min-h-[92vh]">
      <div className="absolute inset-0 pointer-events-none">
        <Image
          src="https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=2200&q=90&auto=format&fit=crop"
          alt="students in a school setting"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center opacity-28"
        />
        <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(11,18,32,0.76)_0%,rgba(11,18,32,0.60)_48%,rgba(11,18,32,0.46)_100%)]" />
      </div>

      <div className="relative z-10 container min-h-[92vh] flex items-end py-16 sm:py-20 lg:py-28">
        <ScrollReveal>
          <div className="max-w-2xl pb-4 sm:pb-0">
            <div className="flex items-center gap-3 mb-4 sm:mb-5">
              <div className="w-10 h-px bg-white/45" />
              <p className="text-2xs uppercase tracking-[0.28em] text-white/60">Uyo, Nigeria</p>
            </div>

            <h1 className="font-display text-4xl sm:text-5xl lg:text-7xl leading-[0.98] tracking-[-0.05em] text-white mb-4 sm:mb-5 max-w-2xl">
              Beautiful learning that feels calm and clear.
            </h1>

            <p className="text-sm sm:text-base lg:text-lg text-white/72 leading-relaxed max-w-lg mb-6 sm:mb-8">
              A refined school experience.
            </p>

            <div className="flex flex-row flex-nowrap gap-2 sm:gap-4">
              <a href="#admissions" className="btn-crimson">Apply now</a>
              <a href="/student/login" className="inline-flex items-center justify-center rounded-2xl bg-[#d9e8fb] px-5 py-3.5 text-sm font-semibold text-navy transition-colors hover:bg-white sm:px-7">Log in to portal</a>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}
