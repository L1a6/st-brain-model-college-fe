import React from "react"
import ScrollReveal from "./ScrollReveal"

export default function ForWho() {
  const items = [
    {
      title: "Parents",
      desc: "Real-time updates, results, fee status, and notices in one place.",
    },
    {
      title: "Teachers",
      desc: "Class management, grading, schedules, and student tracking made easy.",
    },
    {
      title: "Students",
      desc: "Timetables, results, quizzes, and announcements from one portal.",
    },
    {
      title: "Management",
      desc: "School-wide oversight with controls, records, and reporting.",
    },
  ]

  return (
    <section className="bg-canvas-white overflow-hidden py-20 lg:py-28" id="forwho">
      <div className="container">
        <ScrollReveal>
          <div className="mb-14 max-w-2xl lg:mb-18">
            <span className="section-eyebrow mb-5">Who We Serve</span>
            <h2 className="font-display text-navy mb-5 text-4xl leading-tight lg:text-5xl">
              A portal shaped for
              <span className="text-navy block">every role in the school.</span>
            </h2>
            <p className="text-ink-3 text-lg leading-relaxed">
              Whether you are a parent, teacher, student, or administrator, the experience
              stays clean and focused.
            </p>
          </div>

          <div className="border-canvas-border grid grid-cols-1 gap-0 border-y lg:grid-cols-4">
            {items.map((it, index) => (
              <div
                key={it.title}
                className={`py-6 lg:py-8 ${index !== items.length - 1 ? "border-canvas-border border-b lg:border-r lg:border-b-0" : ""} ${index % 2 ? "lg:pt-12" : ""}`}
              >
                <p className="text-2xs text-navy mb-3 font-semibold tracking-[0.24em] uppercase">
                  {String(index + 1).padStart(2, "0")}
                </p>
                <h3 className="font-display text-navy mb-3 text-2xl font-semibold">
                  {it.title}
                </h3>
                <p className="text-ink-3 max-w-sm text-sm leading-relaxed">{it.desc}</p>
              </div>
            ))}
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}
