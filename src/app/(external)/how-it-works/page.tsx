import ScrollReveal from "@/components/ScrollReveal"

const steps = [
  {
    title: "Apply",
    desc: "Submit the application and share the required student documents.",
  },
  {
    title: "Review",
    desc: "Our admissions team checks readiness and schedules the next step.",
  },
  {
    title: "Enroll",
    desc: "Complete payment, finalize registration, and receive onboarding details.",
  },
  {
    title: "Start Learning",
    desc: "Begin school with access to academics, communication, and support systems.",
  },
]

export default function HowItWorksPage() {
  return (
    <div className="min-h-screen bg-canvas py-20 lg:py-28">
      <div className="max-w-7xl mx-auto px-5 lg:px-8">
        <section className="max-w-3xl mb-14 reveal">
          <span className="section-eyebrow mb-5">How It Works</span>
          <h1 className="font-display text-4xl lg:text-6xl text-navy leading-tight mb-5">
            A clear path from inquiry<br />
            <span className="text-crimson italic">to enrollment.</span>
          </h1>
          <p className="text-ink-3 text-lg leading-relaxed">
            St. Brian's keeps the admissions journey simple: apply, review, enroll, and begin learning.
          </p>
        </section>

        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {steps.map((step, index) => (
            <article key={step.title} className={`reveal delay-${index + 1} bg-canvas-white border-t-2 border-crimson p-6`}>
              <p className="font-display text-4xl text-canvas-border font-bold mb-3">0{index + 1}</p>
              <h2 className="font-display text-xl text-navy mb-3">{step.title}</h2>
              <p className="text-sm text-ink-3 leading-relaxed">{step.desc}</p>
            </article>
          ))}
        </div>
      </div>

      <ScrollReveal />
    </div>
  )
}
