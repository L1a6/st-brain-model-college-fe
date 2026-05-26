import React from "react"
import Image from "next/image"
import ScrollReveal from "./ScrollReveal"

const testimonials = [
  {
    name: "Mrs. Adaeze Okonkwo",
    role: "Parent",
    text: "The school feels calm, well organized, and easy to trust.",
    image: "/testimonials/t-parent.png",
  },
  {
    name: "Mr. Chukwuemeka Eze",
    role: "Teacher",
    text: "Everything from learning to communication feels intentional.",
    image: "/testimonials/t-teacher.png",
  },
  {
    name: "Toluwalase Bello",
    role: "Student",
    text: "It feels beautiful, simple, and serious about learning.",
    image: "/testimonials/t-student.png",
  },
]

export default function Testimonials() {
  return (
    <section className="bg-canvas py-20 lg:py-28 overflow-hidden">
      <div className="container">
        <ScrollReveal>
          <div className="grid grid-cols-1 lg:grid-cols-[0.94fr_1.06fr] gap-10 lg:gap-16 items-center mb-12 lg:mb-14">
            <div className="max-w-2xl">
              <span className="section-eyebrow mb-5">Testimonials</span>
              <h2 className="font-display text-4xl lg:text-5xl text-navy leading-tight mb-4">
                Voices from the
                <span className="block text-navy">school community.</span>
              </h2>
              <p className="text-ink-3 text-lg leading-relaxed max-w-xl">
                Short, honest words from parents, teachers, and students.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4 sm:gap-5 items-end lg:pt-4">
              <div className="relative overflow-hidden rounded-[34px] aspect-[4/5] border border-canvas-border bg-canvas-white">
                <Image src="/testimonials/t-student.png" alt="student portrait" fill sizes="(max-width:1024px) 50vw, 24vw" className="object-cover" />
              </div>
              <div className="relative overflow-hidden rounded-[34px] aspect-[4/5] border border-canvas-border bg-canvas-white mt-8">
                <Image src="/testimonials/t-parent.png" alt="parent portrait" fill sizes="(max-width:1024px) 50vw, 24vw" className="object-cover" />
              </div>
            </div>
          </div>

          <div className="border-t border-canvas-border">
            {testimonials.map((testimonial, index) => (
              <div key={testimonial.name} className={`grid grid-cols-1 lg:grid-cols-[0.42fr_0.58fr] gap-5 py-7 lg:py-8 ${index !== testimonials.length - 1 ? "border-b border-canvas-border" : ""}`}>
                <div className="flex items-center gap-4">
                  <div className="relative h-14 w-14 overflow-hidden rounded-full border border-canvas-border shrink-0 bg-canvas-white">
                    <Image src={testimonial.image} alt={testimonial.name} fill sizes="56px" className="object-cover" />
                  </div>
                  <div>
                    <p className="font-semibold text-navy">{testimonial.name}</p>
                    <p className="text-xs uppercase tracking-[0.18em] text-ink-4 mt-1">{testimonial.role}</p>
                  </div>
                </div>
                <p className="font-display text-2xl lg:text-3xl leading-snug text-navy max-w-2xl">“{testimonial.text}”</p>
              </div>
            ))}
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}