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
    <section className="bg-canvas-white overflow-hidden py-14 lg:py-20">
      <div className="container">
        <ScrollReveal>
          <div className="mb-12 grid grid-cols-1 items-end gap-10 lg:mb-14 lg:grid-cols-[0.96fr_1.04fr] lg:gap-16">
            <div className="max-w-2xl">
              <span className="section-eyebrow mb-5">Testimonials</span>
              <h2 className="font-display text-navy mb-4 max-w-xl text-3xl leading-[1.08] tracking-tight md:text-4xl lg:text-5xl">
                Words from our
                <span className="block text-[#2563EB]/80">community.</span>
              </h2>
              <p className="text-ink-3 max-w-xl text-base leading-relaxed lg:text-lg">
                Real voices from parents, teachers, and students sharing what life at St.
                Brain&apos;s feels like.
              </p>
            </div>

            <div className="grid grid-cols-2 items-end gap-4 sm:gap-5 lg:pt-4">
              <div className="border-canvas-border bg-canvas-white relative aspect-4/5 overflow-hidden rounded-[34px] border">
                <Image
                  src="https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=400&q=80&auto=format&fit=crop&face"
                  alt="parent portrait"
                  fill
                  sizes="(max-width:1024px) 50vw, 24vw"
                  className="object-cover"
                />
              </div>
              <div className="border-canvas-border bg-canvas-white relative mt-8 aspect-4/5 overflow-hidden rounded-[34px] border">
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

          <div className="border-canvas-border bg-canvas-border grid grid-cols-1 gap-0 overflow-hidden rounded-[30px] border lg:grid-cols-2">
            {testimonials.map((testimonial, index) => (
              <div
                key={testimonial.name}
                className={`group lg:bg-canvas-white flex gap-5 bg-[#F7FAFF] p-6 transition-all duration-300 hover:shadow-[0_12px_28px_rgba(37,99,235,0.06)] lg:gap-7 lg:p-8 lg:hover:bg-[#F7FAFF] ${
                  index % 2 === 0 ? "lg:border-r" : ""
                } ${index < testimonials.length - 2 ? "border-canvas-border border-b lg:border-b-0" : ""}`}
              >
                <div className="shrink-0">
                  <div className="bg-canvas-white relative h-40 w-28 overflow-hidden rounded-2xl ring-1 ring-black/5 lg:h-52 lg:w-36">
                    <Image
                      src={testimonial.img}
                      alt={testimonial.name}
                      fill
                      sizes="144px"
                      className="object-cover object-top"
                    />
                  </div>
                </div>

                <div className="flex min-w-0 flex-1 flex-col gap-3">
                  <div className="text-3xl leading-none text-[#2563EB]/80 transition-colors duration-300 select-none group-hover:text-[#2563EB]">
                    &ldquo;
                  </div>

                  <div>
                    <h3 className="font-display text-navy mb-2 text-base leading-snug font-semibold tracking-tight lg:text-[17px]">
                      {testimonial.title}
                    </h3>
                    <p className="text-ink-3 line-clamp-5 text-sm leading-relaxed lg:text-[15px]">
                      {testimonial.quote}
                    </p>
                  </div>

                  <div className="border-canvas-border mt-auto border-t pt-3 transition-colors duration-300 group-hover:border-[#D9E8FF]">
                    <p className="font-display text-navy text-sm leading-none font-semibold lg:text-[15px]">
                      {testimonial.name}
                    </p>
                    <p className="mt-1 text-xs tracking-[0.18em] text-[#2563EB] uppercase">
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
