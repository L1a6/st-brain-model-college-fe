import About from "../_components/about"
import CTASection from "../_components/cta-section"
import ScrollReveal from "@/components/ScrollReveal"

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      <About />
      <CTASection />
      <ScrollReveal />
    </div>
  )
}
