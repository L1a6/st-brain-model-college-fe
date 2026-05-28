const stats = [
  { value: "2,400+", label: "Enrolled Students", note: "JSS1 — SS3" },
  { value: "98%", label: "WAEC Pass Rate", note: "2023 / 2024 session" },
  { value: "180+", label: "Teaching Staff", note: "Qualified educators" },
  { value: "35+", label: "Years of Excellence", note: "Est. 1989" },
  { value: "12,000+", label: "Alumni Worldwide", note: "Leaders everywhere" },
]

export default function StatsBar() {
  return (
    <section className="bg-navy relative overflow-hidden py-12 lg:py-16">
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "radial-gradient(circle, rgba(218,55,67,1) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      <div className="relative mx-auto max-w-7xl px-5 lg:px-8">
        <div className="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 lg:grid-cols-5 lg:gap-x-0 lg:divide-x lg:divide-white/10">
          {stats.map(({ value, label, note }) => (
            <div key={label} className="reveal first:pl-0 last:pr-0 lg:px-8">
              <p className="font-display mb-1 text-4xl leading-none font-bold text-white lg:text-5xl">
                {value}
              </p>
              <p className="mt-2 text-sm font-semibold text-white/90">{label}</p>
              <p className="text-2xs mt-1 tracking-wider text-white/40 uppercase">
                {note}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
