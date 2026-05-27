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
    <div className="min-h-screen bg-canvas py-20 lg:py-28">
      <div className="max-w-7xl mx-auto px-5 lg:px-8">
        <section className="max-w-3xl mb-14 reveal">
          <span className="section-eyebrow mb-5">Admissions</span>
          <h1 className="font-display text-4xl lg:text-6xl text-navy leading-tight mb-5">
            Join a school<br />
            <span className="text-crimson italic">built for excellence.</span>
          </h1>
          <p className="text-ink-3 text-lg leading-relaxed">
            Admission is open for qualified students who are ready for strong academics, discipline, and a supportive learning environment.
          </p>
        </section>

        <section className="grid gap-5 md:grid-cols-2 xl:grid-cols-4 mb-14">
          {steps.map((step, index) => {
            const Icon = step.icon
            return (
              <article key={step.title} className={`reveal delay-${index + 1} bg-canvas-white border-t-4 border-crimson p-6` }>
                <div className="w-11 h-11 bg-crimson-soft flex items-center justify-center mb-5">
                  <Icon size={18} className="text-crimson" />
                </div>
                <p className="font-display text-3xl text-canvas-border font-bold mb-2">0{index + 1}</p>
                <h2 className="font-display text-xl text-navy mb-3">{step.title}</h2>
                <p className="text-sm text-ink-3 leading-relaxed">{step.desc}</p>
              </article>
            )
          })}
        </section>

        <section className="bg-navy p-8 lg:p-12 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8 reveal">
          <div className="max-w-2xl">
            <p className="text-2xs uppercase tracking-[0.2em] text-white/45 mb-3">Need help?</p>
            <h2 className="font-display text-3xl text-white mb-2">Talk to admissions today.</h2>
            <p className="text-white/70 leading-relaxed">
              We can help with application questions, document requirements, and placement guidance.
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