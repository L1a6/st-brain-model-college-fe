import React from "react"

const stats = [
  { label: "Enrolled Students", value: "2,400+", note: "JSS1 — SS3" },
  { label: "WAEC Pass Rate", value: "98%", note: "2023 / 2024 session" },
  { label: "Teaching Staff", value: "180+", note: "Qualified educators" },
  { label: "Years of Excellence", value: "35+", note: "Est. 1989" },
  { label: "Alumni Worldwide", value: "12,000+", note: "Leaders everywhere" },
]

export default function StatsBar() {
  return (
    <section className="bg-navy py-12 lg:py-16 overflow-hidden relative">
      <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: "radial-gradient(circle, rgba(218,55,67,1) 1px, transparent 1px)", backgroundSize: "40px 40px" }} />

      <div className="relative container">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-y-8 gap-x-4 lg:gap-x-0 lg:divide-x lg:divide-white/10">
          {stats.map((s) => (
            <div key={s.label} className="lg:px-8 first:pl-0 last:pr-0">
              <p className="font-display text-4xl lg:text-5xl text-white font-bold leading-none mb-1">{s.value}</p>
              <p className="text-sm font-semibold text-white/90 mt-2">{s.label}</p>
              <p className="text-2xs text-white/40 uppercase tracking-wider mt-1">{s.note}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
