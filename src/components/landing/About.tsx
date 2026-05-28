import React from "react"
import Image from "next/image"
import ScrollReveal from "./ScrollReveal"

export default function About() {
  return (
    <section className="bg-canvas overflow-hidden py-20 lg:py-28" id="about">
      <div className="container grid grid-cols-1 items-center gap-10 lg:grid-cols-[0.92fr_1.08fr] lg:gap-16">
        <ScrollReveal>
          <div className="grid grid-cols-2 gap-4 sm:gap-5 lg:pr-10">
            <div className="border-canvas-border bg-canvas-white relative aspect-4/5 overflow-hidden rounded-[34px] border">
              <Image
                src="/images/home/about/image1.png"
                alt="students learning together"
                fill
                sizes="(max-width:1024px) 50vw, 24vw"
                className="object-cover"
              />
            </div>
            <div className="border-canvas-border bg-canvas-white relative mt-10 aspect-4/5 overflow-hidden rounded-[34px] border">
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
            <h2 className="font-display text-navy mb-6 max-w-xl text-4xl leading-tight lg:text-5xl">
              Built on discipline,
              <span className="block text-[#2563EB]/80">calm, and character.</span>
            </h2>

            <p className="text-ink-3 mb-4 max-w-xl text-base leading-relaxed lg:text-lg">
              St. Brain&apos;s Model College is about focused teaching, thoughtful
              guidance, and spaces that feel bright and composed.
            </p>

            <p className="text-ink-2 border-canvas-border max-w-xl border-t pt-5 text-sm leading-relaxed sm:text-base">
              Academic rigor, character formation, and calm school culture.
            </p>

            <a
              href="/about"
              className="bg-navy hover:bg-navy-mid mt-4 inline-flex items-center justify-center rounded-2xl px-7 py-3.5 text-sm font-semibold text-white transition-colors"
            >
              Explore our story
            </a>
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}
