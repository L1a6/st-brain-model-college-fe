import Events from "../_components/events"
import CTASection from "../_components/cta-section"
import ScrollReveal from "@/components/ScrollReveal"

export default function EventsPage() {
  return (
    <div className="min-h-screen">
      <Events />
      <CTASection />
      <ScrollReveal />
    </div>
  )
}