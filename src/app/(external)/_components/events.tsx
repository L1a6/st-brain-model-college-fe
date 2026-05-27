import Image from "next/image"
import Link from "next/link"
import { MapPin, Clock, ArrowRight } from "lucide-react"

const events = [
  {
    id: 1,
    category: "Academic",
    date: "15 JUN",
    year: "2025",
    title: "Annual Science & Technology Fair",
    excerpt: "Students from JSS1 to SS3 present innovative projects in robotics, environmental science, and software development.",
    location: "School Assembly Hall",
    time: "9:00 AM — 3:00 PM",
    img: "/images/features/image1.png",
    tagColor: "bg-navy-soft text-navy-mid",
  },
  {
    id: 2,
    category: "Sports",
    date: "22 JUN",
    year: "2025",
    title: "Inter-House Sports Competition",
    excerpt: "The annual inter-house games bringing together all four houses in a week-long celebration of athleticism and school spirit.",
    location: "School Sports Complex",
    time: "8:00 AM",
    img: "/images/features/image2.png",
    tagColor: "bg-navy-soft text-navy-mid",
  },
  {
    id: 3,
    category: "Cultural",
    date: "5 JUL",
    year: "2025",
    title: "Cultural Day & Independence Celebration",
    excerpt: "A vibrant showcase of Nigeria's diverse cultures — food, fashion, music, and dance performed by students from every class.",
    location: "Main Quadrangle",
    time: "10:00 AM",
    img: "/images/features/image3.png",
    tagColor: "bg-navy-soft text-navy-mid",
  },
]

export default function Events() {
  return (
    <section className="bg-canvas py-14 lg:py-18 overflow-hidden">
      <div className="max-w-7xl mx-auto px-5 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-5 mb-14 reveal">
          <div>
            <span className="section-eyebrow mb-5">School Life</span>
            <h2 className="font-display text-4xl lg:text-5xl text-navy leading-tight">
              Latest <span className="text-[#2563EB]/80">Events</span>
            </h2>
          </div>
          <Link href="/events" className="flex items-center gap-2 text-sm font-semibold text-crimson hover:text-crimson-deep transition-colors group">
            View all events
            <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {events.map((event, index) => (
            <article key={event.id} className={`reveal delay-${index + 1} bg-canvas-white border-t-2 border-crimson overflow-hidden group flex flex-col transition-all duration-300 hover:-translate-y-1`}>
              <div className="relative h-52 overflow-hidden">
                <Image src={event.img} alt={event.title} fill sizes="(max-width:768px) 100vw, 33vw" className="object-cover transition-transform duration-700 group-hover:scale-105" loading="lazy" />
                <div className="absolute top-0 left-0 bg-crimson text-white px-4 py-3 flex flex-col items-center">
                  <span className="font-display text-xl font-bold leading-none">{event.date.split(" ")[0]}</span>
                  <span className="text-2xs text-white/80 font-medium uppercase tracking-widest">{event.date.split(" ")[1]}</span>
                </div>
                <div className="absolute bottom-3 right-3">
                  <span className={`text-2xs font-semibold uppercase tracking-wider px-2.5 py-1 ${event.tagColor}`}>
                    {event.category}
                  </span>
                </div>
              </div>

              <div className="p-6 flex flex-col gap-3 flex-1">
                <h3 className="font-display text-lg font-semibold text-navy leading-snug group-hover:text-crimson transition-colors">{event.title}</h3>
                <p className="text-sm text-ink-3 leading-relaxed line-clamp-3">{event.excerpt}</p>

                <div className="mt-auto pt-4 border-t border-canvas-border space-y-1.5">
                  <div className="flex items-center gap-2 text-xs text-ink-3">
                    <MapPin size={12} className="text-crimson" style={{ flexShrink: 0 }} />
                    <span>{event.location}</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-ink-3">
                    <Clock size={12} className="text-crimson" style={{ flexShrink: 0 }} />
                    <span>{event.time}</span>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}