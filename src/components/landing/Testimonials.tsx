"use client"

import Image from "next/image"

import ScrollReveal from "./ScrollReveal"

const testimonials = [
  {
    img: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=400&q=80&auto=format&fit=crop&face",
    name: "Mrs. Ngozi Okonkwo",
    role: "Parent · SS3 Student",
    title: "My daughter transformed here.",
    quote:
      "From the very first week, I could see the difference. The teachers genuinely care about each child\'s progress. St. Brain\'s didn\'t just prepare my daughter for WAEC — it gave her confidence, ambition and a love for learning she carries everywhere.",
  },
  {
    img: "https://images.unsplash.com/photo-1544717305-2782549b5136?w=400&q=80&auto=format&fit=crop&face",
    name: "Mr. Chukwudi Eze",
    role: "Mathematics Teacher",
    title: "Teaching here is a privilege.",
    quote:
      "The administration backs us fully. I have the tools, the time and the support to teach at the highest level. Watching students who once feared algebra go on to score A1 is why I come to work every single day.",
  },
  {
    img: "/testimonials/t-student.png",
    name: "Emeka Adeyemi",
    role: "SS3 Student",
    title: "I found myself at St. Brain\'s.",
    quote:
      "Before St. Brain\'s I was quiet, average, uncertain. Here, my teachers pushed me — not harshly, but with genuine belief in me. I captained the debate team, topped my class in Physics and earned my JAMB score. I\'m proud of who I became here.",
  },
  {
    img: "/assets/images/dashboard/avatar.svg",
    name: "Dr. Aisha Mohammed",
    role: "Parent · JSS2 Student",
    title: "A school that communicates.",
    quote:
      "What impressed me most is how informed I always am. The portal shows me my son\'s results the moment they\'re uploaded. I know his fee status, his schedule and his quiz performance. I\'ve never felt this connected to my child\'s schooling before.",
  },
]

export default function Testimonials() {
  return (
    <section className="bg-canvas-white py-14 lg:py-20 overflow-hidden">
      <div className="container">
        <ScrollReveal>
          <div className="grid grid-cols-1 lg:grid-cols-[0.96fr_1.04fr] gap-10 lg:gap-16 items-end mb-12 lg:mb-14">
            <div className="max-w-2xl">
              <span className="section-eyebrow mb-5">Testimonials</span>
              <h2 className="font-display text-3xl md:text-4xl lg:text-5xl text-navy leading-[1.08] tracking-tight mb-4 max-w-xl">
                Words from our
                <span className="block text-[#2563EB]/80">community.</span>
              </h2>
              <p className="text-ink-3 text-base lg:text-lg leading-relaxed max-w-xl">
                Real voices from parents, teachers, and students sharing what life at St. Brain's feels like.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4 sm:gap-5 items-end lg:pt-4">
              <div className="relative overflow-hidden rounded-[34px] aspect-4/5 border border-canvas-border bg-canvas-white">
                <Image
                  src="https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=400&q=80&auto=format&fit=crop&face"
                  alt="parent portrait"
                  fill
                  sizes="(max-width:1024px) 50vw, 24vw"
                  className="object-cover"
                />
              </div>
              <div className="relative overflow-hidden rounded-[34px] aspect-4/5 border border-canvas-border bg-canvas-white mt-8">
                <Image
                  src="https://images.unsplash.com/photo-1544717305-2782549b5136?w=400&q=80&auto=format&fit=crop&face"
                  alt="teacher portrait"
                  fill
                  sizes="(max-width:1024px) 50vw, 24vw"
                  className="object-cover"
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 rounded-[30px] overflow-hidden border border-canvas-border bg-canvas-border">
            {testimonials.map((testimonial, index) => (
              <div
                key={testimonial.name}
                className={`group flex gap-5 lg:gap-7 p-6 lg:p-8 bg-canvas-white transition-all duration-300 hover:bg-[#F7FAFF] hover:shadow-[0_12px_28px_rgba(37,99,235,0.06)] ${
                  index % 2 === 0 ? "lg:border-r" : ""
                } ${index < testimonials.length - 2 ? "border-b lg:border-b-0 border-canvas-border" : ""}`}
              >
                <div className="shrink-0">
                  <div className="relative w-28 lg:w-36 h-40 lg:h-52 overflow-hidden rounded-2xl ring-1 ring-black/5 bg-canvas-white">
                    <Image src={testimonial.img} alt={testimonial.name} fill sizes="144px" className="object-cover object-top" />
                  </div>
                </div>

                <div className="flex min-w-0 flex-1 flex-col gap-3">
                  <div className="text-[#2563EB]/80 text-3xl leading-none select-none transition-colors duration-300 group-hover:text-[#2563EB]">
                    &ldquo;
                  </div>

                  <div>
                    <h3 className="font-display text-base lg:text-[17px] font-semibold text-navy leading-snug tracking-tight mb-2">
                      {testimonial.title}
                    </h3>
                    <p className="text-ink-3 text-sm lg:text-[15px] leading-relaxed line-clamp-5">
                      {testimonial.quote}
                    </p>
                  </div>

                  <div className="mt-auto pt-3 border-t border-canvas-border transition-colors duration-300 group-hover:border-[#D9E8FF]">
                    <p className="font-display text-sm lg:text-[15px] font-semibold text-navy leading-none">
                      {testimonial.name}
                    </p>
                    <p className="text-xs uppercase tracking-[0.18em] text-[#2563EB] mt-1">
                      {testimonial.role}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}