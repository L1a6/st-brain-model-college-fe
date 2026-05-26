import React from "react"
import ScrollReveal from "./ScrollReveal"

export default function ForWho() {
  const items = [
    { title: "Parents", desc: "Real-time updates, results, fee status, and notices in one place." },
    { title: "Teachers", desc: "Class management, grading, schedules, and student tracking made easy." },
    { title: "Students", desc: "Timetables, results, quizzes, and announcements from one portal." },
    { title: "Management", desc: "School-wide oversight with controls, records, and reporting." },
  ]

  return (
    <section className="bg-canvas-white py-20 lg:py-28 overflow-hidden" id="forwho">
      <div className="container">
        <ScrollReveal>
          <div className="max-w-2xl mb-14 lg:mb-18">
            <span className="section-eyebrow mb-5">Who We Serve</span>
            <h2 className="font-display text-4xl lg:text-5xl text-navy leading-tight mb-5">
              A portal shaped for
              <span className="block text-navy">every role in the school.</span>
            </h2>
            <p className="text-ink-3 text-lg leading-relaxed">
              Whether you are a parent, teacher, student, or administrator, the experience stays clean and focused.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-0 border-y border-canvas-border">
            {items.map((it, index) => (
              <div key={it.title} className={`py-6 lg:py-8 ${index !== items.length - 1 ? "border-b lg:border-b-0 lg:border-r border-canvas-border" : ""} ${index % 2 ? "lg:pt-12" : ""}`}>
                <p className="text-2xs uppercase tracking-[0.24em] text-navy font-semibold mb-3">
                  {String(index + 1).padStart(2, "0")}
                </p>
                <h3 className="font-display text-2xl text-navy font-semibold mb-3">{it.title}</h3>
                <p className="text-sm text-ink-3 leading-relaxed max-w-sm">{it.desc}</p>
              </div>
            ))}
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}
