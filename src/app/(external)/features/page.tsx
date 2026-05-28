import Programs from "../_components/programs"
import ScrollReveal from "@/components/ScrollReveal"

export default function FeaturesPage() {
  return (
    <div className="min-h-screen bg-canvas py-20 lg:py-28">
      <div className="max-w-7xl mx-auto px-5 lg:px-8 mb-10 reveal">
        <span className="section-eyebrow mb-5">Academics</span>
        <h1 className="font-display text-4xl lg:text-6xl text-navy leading-tight mb-4">
          Programmes that shape<br />
          <span className="text-crimson italic">confident learners.</span>
        </h1>
        <p className="text-ink-3 text-lg leading-relaxed max-w-3xl">
          From junior secondary foundations to senior secondary specializations, St. Brain&apos;s keeps the curriculum rigorous and personal.
        </p>
      </div>
      <Programs />
      <ScrollReveal />
    </div>
  )
}
