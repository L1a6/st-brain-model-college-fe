import React from "react"
import Image from "next/image"
import ScrollReveal from "./ScrollReveal"

export default function About() {
  return (
    <section className="bg-canvas py-20 lg:py-28 overflow-hidden" id="about">
      <div className="container grid grid-cols-1 lg:grid-cols-[0.92fr_1.08fr] gap-10 lg:gap-16 items-center">
        <ScrollReveal>
          <div className="grid grid-cols-2 gap-4 sm:gap-5 lg:pr-10">
            <div className="relative overflow-hidden aspect-4/5 rounded-[34px] border border-canvas-border bg-canvas-white">
              <Image
                src="/images/home/about/image1.png"
                alt="students learning together"
                fill
                sizes="(max-width:1024px) 50vw, 24vw"
                className="object-cover"
              />
            </div>
            <div className="relative overflow-hidden aspect-4/5 rounded-[34px] mt-10 border border-canvas-border bg-canvas-white">
              <Image
                src="/images/home/about/image2.png"
                alt="school campus atmosphere"
                fill
                sizes="(max-width:1024px) 50vw, 24vw"
                className="object-cover"
              />
            </div>
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <div className="max-w-2xl lg:ml-auto lg:pt-6">
            <span className="section-eyebrow mb-5">About us</span>
            <h2 className="font-display text-4xl lg:text-5xl text-navy leading-tight mb-6 max-w-xl">
              Built on discipline,
              <span className="block text-[#2563EB]/80">calm, and character.</span>
            </h2>

            <p className="text-ink-3 text-base lg:text-lg leading-relaxed mb-4 max-w-xl">
              St. Brain&apos;s Model College is about focused teaching, thoughtful guidance, and spaces that feel bright and composed.
            </p>

            <p className="text-sm sm:text-base text-ink-2 leading-relaxed max-w-xl border-t border-canvas-border pt-5">
              Academic rigor, character formation, and calm school culture.
            </p>

            <a href="/about" className="mt-4 inline-flex items-center justify-center rounded-2xl bg-navy px-7 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-navy-mid">
              Explore our story
            </a>
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}
