import CTASection from "./_components/cta-section"
import Events from "./_components/events"
import ForWho from "./_components/for-who"
import Hero from "./_components/home-hero"
import About from "./_components/about"
import Programs from "./_components/programs"
import StatsBar from "./_components/stats-bar"
import Testimonials from "./_components/testimonials"
import ScrollReveal from "@/components/ScrollReveal"

export default function Home() {
  return (
    <div className="min-h-screen">
      <Hero />
      <StatsBar />
      <About />
      <Programs />
      <Events />
      <ForWho />
      <Testimonials />
      <CTASection />
      <ScrollReveal />
    </div>
  )
}
