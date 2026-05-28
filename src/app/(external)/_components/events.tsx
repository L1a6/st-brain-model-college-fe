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
    excerpt:
      "Students from JSS1 to SS3 present innovative projects in robotics, environmental science, and software development.",
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
    excerpt:
      "The annual inter-house games bringing together all four houses in a week-long celebration of athleticism and school spirit.",
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
    excerpt:
      "A vibrant showcase of Nigeria's diverse cultures — food, fashion, music, and dance performed by students from every class.",
    location: "Main Quadrangle",
    time: "10:00 AM",
    img: "/images/features/image3.png",
    tagColor: "bg-navy-soft text-navy-mid",
  },
]

export default function Events() {
  return (
    <section className="bg-canvas overflow-hidden py-14 lg:py-18">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <div className="reveal mb-14 flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
          <div>
            <span className="section-eyebrow mb-5">School Life</span>
            <h2 className="font-display text-navy text-4xl leading-tight lg:text-5xl">
              Latest <span className="text-[#2563EB]/80">Events</span>
            </h2>
          </div>
          <Link
            href="/events"
            className="text-crimson hover:text-crimson-deep group flex items-center gap-2 text-sm font-semibold transition-colors"
          >
            View all events
            <ArrowRight
              size={15}
              className="transition-transform group-hover:translate-x-1"
            />
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {events.map((event, index) => (
            <article
              key={event.id}
              className={`reveal delay-${index + 1} bg-canvas-white border-crimson group flex flex-col overflow-hidden border-t-2 transition-all duration-300 hover:-translate-y-1`}
            >
              <div className="relative h-52 overflow-hidden">
                <Image
                  src={event.img}
                  alt={event.title}
                  fill
                  sizes="(max-width:768px) 100vw, 33vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="bg-crimson absolute top-0 left-0 flex flex-col items-center px-4 py-3 text-white">
                  <span className="font-display text-xl leading-none font-bold">
                    {event.date.split(" ")[0]}
                  </span>
                  <span className="text-2xs font-medium tracking-widest text-white/80 uppercase">
                    {event.date.split(" ")[1]}
                  </span>
                </div>
                <div className="absolute right-3 bottom-3">
                  <span
                    className={`text-2xs px-2.5 py-1 font-semibold tracking-wider uppercase ${event.tagColor}`}
                  >
                    {event.category}
                  </span>
                </div>
              </div>

              <div className="flex flex-1 flex-col gap-3 p-6">
                <h3 className="font-display text-navy group-hover:text-crimson text-lg leading-snug font-semibold transition-colors">
                  {event.title}
                </h3>
                <p className="text-ink-3 line-clamp-3 text-sm leading-relaxed">
                  {event.excerpt}
                </p>

                <div className="border-canvas-border mt-auto space-y-1.5 border-t pt-4">
                  <div className="text-ink-3 flex items-center gap-2 text-xs">
                    <MapPin
                      size={12}
                      className="text-crimson"
                      style={{ flexShrink: 0 }}
                    />
                    <span>{event.location}</span>
                  </div>
                  <div className="text-ink-3 flex items-center gap-2 text-xs">
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
