"use client"
import React from "react"
import Image from "next/image"
import ScrollReveal from "./ScrollReveal"

export default function Hero() {
  return (
    <section className="bg-navy relative min-h-[62vh] overflow-hidden text-white sm:min-h-[66vh] md:min-h-[72vh] lg:min-h-[86vh]">
      <div className="pointer-events-none absolute inset-0">
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

      <div className="relative z-10 container flex min-h-[62vh] items-end py-10 sm:min-h-[66vh] sm:py-12 md:min-h-[72vh] md:py-16 lg:min-h-[86vh] lg:py-24">
        <ScrollReveal>
          <div className="max-w-2xl pb-4 sm:pb-0">
            <div className="mb-4 flex items-center gap-3 sm:mb-5">
              <div className="h-px w-10 bg-white/45" />
              <p className="text-2xs tracking-[0.28em] text-white/60 uppercase">
                Uyo, Nigeria
              </p>
            </div>

            <h1 className="font-display mb-4 max-w-2xl text-4xl leading-[0.98] tracking-[-0.05em] text-white sm:mb-5 sm:text-5xl md:text-6xl lg:text-7xl">
              Beautiful learning that feels calm and clear.
            </h1>

            <p className="mb-6 max-w-lg text-sm leading-relaxed text-white/72 sm:mb-8 sm:text-base lg:text-lg">
              A refined school experience.
            </p>

            <div className="flex flex-row flex-nowrap gap-2 sm:gap-4">
              <a href="/enroll" className="btn-crimson">
                Enroll
              </a>
              <a
                href="/login"
                className="text-navy inline-flex items-center justify-center rounded-2xl bg-[#d9e8fb] px-5 py-3.5 text-sm font-semibold transition-colors hover:bg-white sm:px-7"
              >
                Log in to portal
              </a>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}
