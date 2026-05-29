import Link from "next/link"
import { ArrowRight, FileCheck2, School, Users, BadgeCheck } from "lucide-react"
import ScrollReveal from "@/components/ScrollReveal"

const steps = [
  {
    icon: FileCheck2,
    title: "Submit Application",
    desc: "Complete the admissions form and provide the required student information and documents.",
  },
  {
    icon: School,
    title: "Entrance Review",
    desc: "Our team reviews the application, checks readiness, and schedules any assessment where needed.",
  },
  {
    icon: Users,
    title: "Parent Meeting",
    desc: "Meet with school leadership to confirm placement, expectations, and support needs.",
  },
  {
    icon: BadgeCheck,
    title: "Enroll and Start",
    desc: "Pay accepted fees, complete registration, and begin the St. Brian’s journey.",
  },
]

export default function AdmissionsPage() {
  return (
    <div className="bg-canvas min-h-screen py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <section className="reveal mb-14 max-w-3xl">
          <span className="section-eyebrow mb-5">Admissions</span>
          <h1 className="font-display text-navy mb-5 text-4xl leading-tight lg:text-6xl">
            Join a school
            <br />
            <span className="text-crimson italic">built for excellence.</span>
          </h1>
          <p className="text-ink-3 text-lg leading-relaxed">
            Admission is open for qualified students who are ready for strong academics,
            discipline, and a supportive learning environment.
          </p>
        </section>

        <section className="mb-14 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {steps.map((step, index) => {
            const Icon = step.icon
            return (
              <article
                key={step.title}
                className={`reveal delay-${index + 1} bg-canvas-white border-crimson border-t-4 p-6`}
              >
                <div className="bg-crimson-soft mb-5 flex h-11 w-11 items-center justify-center">
                  <Icon size={18} className="text-crimson" />
                </div>
                <p className="font-display text-canvas-border mb-2 text-3xl font-bold">
                  0{index + 1}
                </p>
                <h2 className="font-display text-navy mb-3 text-xl">{step.title}</h2>
                <p className="text-ink-3 text-sm leading-relaxed">{step.desc}</p>
              </article>
            )
          })}
        </section>

        <section className="bg-navy reveal flex flex-col items-start justify-between gap-8 p-8 lg:flex-row lg:items-center lg:p-12">
          <div className="max-w-2xl">
            <p className="text-2xs mb-3 tracking-[0.2em] text-white/45 uppercase">
              Need help?
            </p>
            <h2 className="font-display mb-2 text-3xl text-white">
              Talk to admissions today.
            </h2>
            <p className="leading-relaxed text-white/70">
              We can help with application questions, document requirements, and placement
              guidance.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link href="/contact" className="btn-crimson">
              Contact Admissions <ArrowRight size={15} />
            </Link>
            <a href="tel:+2348012345678" className="btn-outline-white">
              Call Now
            </a>
          </div>
        </section>
      </div>

      <ScrollReveal />
    </div>
  )
}
