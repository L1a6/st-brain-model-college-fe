import ContactForm from "../_components/contact-form"
import { Mail, MapPin, Phone } from "lucide-react"
import ScrollReveal from "@/components/ScrollReveal"

const contactPoints = [
  {
    icon: MapPin,
    label: "Address",
    value: "14 Brains Avenue, Surulere, Lagos State, Nigeria",
  },
  {
    icon: Phone,
    label: "Phone",
    value: "+234 801 234 5678",
  },
  {
    icon: Mail,
    label: "Email",
    value: "info@stbrains.edu.ng",
  },
]

export default function ContactPage() {
  return (
    <div className="bg-canvas min-h-screen py-20 lg:py-28">
      <div className="mx-auto grid max-w-7xl gap-10 px-5 lg:grid-cols-[1.1fr_0.9fr] lg:px-8">
        <section className="reveal">
          <span className="section-eyebrow mb-5">Contact Us</span>
          <h1 className="font-display text-navy mb-5 text-4xl leading-tight lg:text-6xl">
            Talk to St. Brain&apos;s
            <br />
            <span className="text-crimson italic">about admissions.</span>
          </h1>
          <p className="text-ink-3 mb-8 max-w-xl text-lg leading-relaxed">
            Ask about school tours, admission requirements, tuition, or the student
            portal. We respond quickly and point you to the right team.
          </p>

          <div className="grid gap-4 sm:grid-cols-3">
            {contactPoints.map(({ icon: Icon, label, value }) => (
              <div
                key={label}
                className="bg-canvas-white border-canvas-border border p-5"
              >
                <div className="bg-crimson-soft mb-4 flex h-10 w-10 items-center justify-center">
                  <Icon size={16} className="text-crimson" />
                </div>
                <p className="text-2xs text-ink-3 mb-1 font-semibold tracking-widest uppercase">
                  {label}
                </p>
                <p className="text-ink-2 text-sm leading-relaxed">{value}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="bg-canvas-white border-canvas-border reveal border p-6 delay-2 lg:p-8">
          <h2 className="font-display text-navy mb-2 text-3xl">Send a Message</h2>
          <p className="text-ink-3 mb-6 text-sm">
            Use the form below and we’ll reply during school hours.
          </p>
          <ContactForm />
        </section>
      </div>

      <ScrollReveal />
    </div>
  )
}
