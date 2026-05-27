const stats = [
  { value: "2,400+", label: "Enrolled Students", note: "JSS1 — SS3" },
  { value: "98%", label: "WAEC Pass Rate", note: "2023 / 2024 session" },
  { value: "180+", label: "Teaching Staff", note: "Qualified educators" },
  { value: "35+", label: "Years of Excellence", note: "Est. 1989" },
  { value: "12,000+", label: "Alumni Worldwide", note: "Leaders everywhere" },
]

export default function StatsBar() {
  return (
    <section className="bg-navy py-12 lg:py-16 overflow-hidden relative">
      <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: "radial-gradient(circle, rgba(218,55,67,1) 1px, transparent 1px)", backgroundSize: "40px 40px" }} />

      <div className="relative max-w-7xl mx-auto px-5 lg:px-8">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-y-8 gap-x-4 lg:gap-x-0 lg:divide-x lg:divide-white/10">
          {stats.map(({ value, label, note }) => (
            <div key={label} className="lg:px-8 first:pl-0 last:pr-0 reveal">
              <p className="font-display text-4xl lg:text-5xl text-white font-bold leading-none mb-1">{value}</p>
              <p className="text-sm font-semibold text-white/90 mt-2">{label}</p>
              <p className="text-2xs text-white/40 uppercase tracking-wider mt-1">{note}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}