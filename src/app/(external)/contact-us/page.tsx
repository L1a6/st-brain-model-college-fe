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
    <div className="min-h-screen bg-canvas py-20 lg:py-28">
      <div className="max-w-7xl mx-auto px-5 lg:px-8 grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
        <section className="reveal">
          <span className="section-eyebrow mb-5">Contact Us</span>
          <h1 className="font-display text-4xl lg:text-6xl text-navy leading-tight mb-5">
            Talk to St. Brain&apos;s<br />
            <span className="text-crimson italic">about admissions.</span>
          </h1>
          <p className="text-ink-3 text-lg leading-relaxed max-w-xl mb-8">
            Ask about school tours, admission requirements, tuition, or the student portal. We respond quickly and point you to the right team.
          </p>

          <div className="grid gap-4 sm:grid-cols-3">
            {contactPoints.map(({ icon: Icon, label, value }) => (
              <div key={label} className="bg-canvas-white border border-canvas-border p-5">
                <div className="w-10 h-10 bg-crimson-soft flex items-center justify-center mb-4">
                  <Icon size={16} className="text-crimson" />
                </div>
                <p className="text-2xs font-semibold uppercase tracking-widest text-ink-3 mb-1">{label}</p>
                <p className="text-sm text-ink-2 leading-relaxed">{value}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="bg-canvas-white border border-canvas-border p-6 lg:p-8 reveal delay-2">
          <h2 className="font-display text-3xl text-navy mb-2">Send a Message</h2>
          <p className="text-sm text-ink-3 mb-6">Use the form below and we’ll reply during school hours.</p>
          <ContactForm />
        </section>
      </div>

      <ScrollReveal />
    </div>
  )
}
