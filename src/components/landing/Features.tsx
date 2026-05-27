import React from "react"
import Image from "next/image"
import ScrollReveal from "./ScrollReveal"

export default function Features() {
  return (
    <section className="bg-canvas-white py-14 lg:py-20 overflow-hidden">
      <div className="container">
        <ScrollReveal>
          <div className="grid grid-cols-1 lg:grid-cols-[0.92fr_1.08fr] gap-10 lg:gap-16 items-start mb-12">
            <div className="max-w-xl">
              <span className="section-eyebrow mb-5">Academics</span>
              <h2 className="font-display text-4xl lg:text-5xl text-navy leading-tight">
                Academics made
                <span className="block text-[#2563EB]/80">clear and structured.</span>
              </h2>
              <p className="mt-5 text-ink-3 text-base leading-relaxed max-w-xl">
                Clean delivery, focused teaching, and environments that make it easy to stay engaged.
              </p>
            </div>
            <div className="relative overflow-hidden rounded-[34px] aspect-16/10 border border-canvas-border bg-canvas-white lg:mt-8">
              <Image
                src="https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=1800&q=90"
                alt="students reading together"
                fill
                sizes="(max-width:1024px) 100vw, 58vw"
                className="object-cover"
              />
            </div>
          </div>

          <div className="mt-10 border-t border-canvas-border">
            {[
              ["Modern classrooms", "Bright rooms built for focus and calm learning."],
              ["Balanced curriculum", "Academics, values, and life skills kept in balance."],
              ["Student support", "Guidance that stays close and consistent."],
            ].map(([title, desc], index) => (
              <div key={title} className={`grid grid-cols-1 lg:grid-cols-[0.34fr_0.66fr] gap-4 py-6 lg:py-7 ${index !== 2 ? "border-b border-canvas-border" : ""}`}>
                <h3 className="font-display text-2xl text-navy">{title}</h3>
                <p className="text-sm text-ink-3 leading-relaxed max-w-2xl">{desc}</p>
              </div>
            ))}
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}
