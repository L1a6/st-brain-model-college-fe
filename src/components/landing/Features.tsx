import React from "react"
import Image from "next/image"
import ScrollReveal from "./ScrollReveal"

export default function Features() {
  return (
    <section className="bg-canvas-white overflow-hidden py-14 lg:py-20">
      <div className="container">
        <ScrollReveal>
          <div className="mb-12 grid grid-cols-1 items-start gap-10 lg:grid-cols-[0.92fr_1.08fr] lg:gap-16">
            <div className="max-w-xl">
              <span className="section-eyebrow mb-5">Academics</span>
              <h2 className="font-display text-navy text-4xl leading-tight lg:text-5xl">
                Academics made
                <span className="block text-[#2563EB]/80">clear and structured.</span>
              </h2>
              <p className="text-ink-3 mt-5 max-w-xl text-base leading-relaxed">
                Clean delivery, focused teaching, and environments that make it easy to
                stay engaged.
              </p>
            </div>
            <div className="border-canvas-border bg-canvas-white relative aspect-16/10 overflow-hidden rounded-[34px] border lg:mt-8">
              <Image
                src="https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=1800&q=90"
                alt="students reading together"
                fill
                sizes="(max-width:1024px) 100vw, 58vw"
                className="object-cover"
              />
            </div>
          </div>

          <div className="border-canvas-border mt-10 border-t">
            {[
              ["Modern classrooms", "Bright rooms built for focus and calm learning."],
              [
                "Balanced curriculum",
                "Academics, values, and life skills kept in balance.",
              ],
              ["Student support", "Guidance that stays close and consistent."],
            ].map(([title, desc], index) => (
              <div
                key={title}
                className={`grid grid-cols-1 gap-4 py-6 lg:grid-cols-[0.34fr_0.66fr] lg:py-7 ${index !== 2 ? "border-canvas-border border-b" : ""}`}
              >
                <h3 className="font-display text-navy text-2xl">{title}</h3>
                <p className="text-ink-3 max-w-2xl text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}
