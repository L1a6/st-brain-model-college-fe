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
    <div className="bg-canvas min-h-screen py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <section className="reveal mb-14 max-w-3xl">
          <span className="section-eyebrow mb-5">How It Works</span>
          <h1 className="font-display text-navy mb-5 text-4xl leading-tight lg:text-6xl">
            A clear path from inquiry
            <br />
            <span className="text-crimson italic">to enrollment.</span>
          </h1>
          <p className="text-ink-3 text-lg leading-relaxed">
            St. Brain&apos;s keeps the admissions journey simple: apply, review, enroll,
            and begin learning.
          </p>
        </section>

        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {steps.map((step, index) => (
            <article
              key={step.title}
              className={`reveal delay-${index + 1} bg-canvas-white border-crimson border-t-2 p-6`}
            >
              <p className="font-display text-canvas-border mb-3 text-4xl font-bold">
                0{index + 1}
              </p>
              <h2 className="font-display text-navy mb-3 text-xl">{step.title}</h2>
              <p className="text-ink-3 text-sm leading-relaxed">{step.desc}</p>
            </article>
          ))}
        </div>
      </div>

      <ScrollReveal />
    </div>
  )
}
