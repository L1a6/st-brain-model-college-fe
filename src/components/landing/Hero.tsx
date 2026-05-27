"use client"
import React from "react"
import Image from "next/image"
import ScrollReveal from "./ScrollReveal"

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-navy text-white min-h-[72vh] sm:min-h-[78vh] lg:min-h-[92vh]">
      <div className="absolute inset-0 pointer-events-none">
        <Image
          src="/images/home/about/image1.png"
          alt="students learning together"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center opacity-40"
        />
        <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(11,18,32,0.28)_0%,rgba(11,18,32,0.16)_48%,rgba(11,18,32,0.08)_100%)]" />
      </div>

      <div className="relative z-10 container min-h-[72vh] sm:min-h-[78vh] lg:min-h-[92vh] flex items-end py-12 sm:py-16 lg:py-28">
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
              <a href="/enroll" className="btn-crimson">Enroll</a>
              <a href="/login" className="inline-flex items-center justify-center rounded-2xl bg-[#d9e8fb] px-5 py-3.5 text-sm font-semibold text-navy transition-colors hover:bg-white sm:px-7">Log in to portal</a>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}
