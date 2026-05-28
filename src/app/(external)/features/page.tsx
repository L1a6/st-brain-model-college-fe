import Programs from "../_components/programs"
import ScrollReveal from "@/components/ScrollReveal"

export default function FeaturesPage() {
  return (
    <div className="bg-canvas min-h-screen py-20 lg:py-28">
      <div className="reveal mx-auto mb-10 max-w-7xl px-5 lg:px-8">
        <span className="section-eyebrow mb-5">Academics</span>
        <h1 className="font-display text-navy mb-4 text-4xl leading-tight lg:text-6xl">
          Programmes that shape
          <br />
          <span className="text-crimson italic">confident learners.</span>
        </h1>
        <p className="text-ink-3 max-w-3xl text-lg leading-relaxed">
          From junior secondary foundations to senior secondary specializations, St.
          Brain&apos;s keeps the curriculum rigorous and personal.
        </p>
      </div>
      <Programs />
      <ScrollReveal />
    </div>
  )
}
