import React from "react"
import Image from "next/image"
import ScrollReveal from "./ScrollReveal"

const events = [
  {
    title: "Annual Science Fair",
    date: "June 12, 2026",
    desc: "Visit and meet our staff.",
    img: "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=1200&q=90&auto=format&fit=crop",
  },
  {
    title: "Sports Week",
    date: "July 5 - 9",
    desc: "Inter-house competitions.",
    img: "https://images.unsplash.com/photo-1517649763962-0c623066013b?w=1200&q=90&auto=format&fit=crop",
  },
  {
    title: "Prize Giving",
    date: "Oct 20, 2026",
    desc: "Celebrate achievements.",
    img: "https://images.unsplash.com/photo-1509062522246-3755977927d7?w=1200&q=90&auto=format&fit=crop",
  },
]

export default function Events() {
  return (
    <section
      className="bg-canvas-white overflow-hidden pt-10 pb-14 lg:pt-12 lg:pb-18"
      id="events"
    >
      <div className="container">
        <ScrollReveal>
          <div className="mb-14 flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
            <div>
              <span className="section-eyebrow mb-5">School Life</span>
              <h2 className="font-display text-navy text-4xl leading-tight lg:text-5xl">
                Moments that feel
                <span className="block text-[#2563EB]/80">alive and memorable.</span>
              </h2>
            </div>
            <a
              href="#admissions"
              className="text-navy hover:text-navy-mid text-sm font-semibold transition-colors"
            >
              View all events
            </a>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-12 lg:gap-5">
            {events.map((e) => (
              <article key={e.title} className="group md:col-span-4">
                <div className="border-canvas-border bg-canvas-white relative aspect-16/11 overflow-hidden rounded-[30px] border">
                  <Image
                    src={e.img}
                    alt={e.title}
                    fill
                    sizes="(max-width:768px) 100vw, 33vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-[linear-gradient(to_top,rgba(11,18,32,0.58)_0%,rgba(11,18,32,0.12)_58%,transparent_100%)]" />
                  <div className="absolute right-5 bottom-5 left-5">
                    <div className="text-ink-4 inline-flex items-center rounded-full bg-white/82 px-4 py-2 text-xs tracking-[0.24em] uppercase backdrop-blur-md">
                      {e.date}
                    </div>
                  </div>
                </div>

                <div className="max-w-xs pt-4">
                  <h3 className="font-display text-navy mb-2 text-2xl leading-snug">
                    {e.title}
                  </h3>
                  <p className="text-ink-3 text-sm leading-relaxed">{e.desc}</p>
                </div>
              </article>
            ))}
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}
