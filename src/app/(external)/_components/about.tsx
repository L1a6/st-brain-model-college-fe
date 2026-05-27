import Image from "next/image"
import Link from "next/link"
import { CheckCircle, ArrowRight } from "lucide-react"

const pillars = [
  "Academic rigor rooted in the Nigerian curriculum",
  "A culture of discipline, respect and character",
  "State-of-the-art science labs and ICT centres",
  "Experienced, TRCN-certified teaching staff",
  "Extracurricular programs that build whole persons",
  "Transparent, digital communication with parents",
]

export default function About() {
  return (
    <section id="about" className="bg-canvas py-16 lg:py-20 overflow-hidden">
      <div className="max-w-7xl mx-auto px-5 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 lg:gap-20 items-center">
          <div className="relative grid grid-cols-2 gap-5 reveal">
            <div className="flex flex-col gap-5">
              <div className="relative overflow-hidden aspect-[4/5]">
                <Image src="/images/home/for-who/image1.png" alt="Students in class" fill sizes="(max-width:1024px) 40vw, 20vw" className="object-cover" loading="lazy" />
              </div>
              <div className="bg-crimson p-6 flex flex-col gap-2">
                <p className="font-display text-4xl text-white font-bold">35+</p>
                <p className="text-white/80 text-xs uppercase tracking-widest">Years shaping futures</p>
              </div>
            </div>

            <div className="flex flex-col gap-5 mt-12">
              <div className="bg-navy p-6 flex flex-col gap-2">
                <p className="font-display text-4xl text-white font-bold">98%</p>
                <p className="text-white/60 text-xs uppercase tracking-widest">WAEC pass rate 2024</p>
              </div>
              <div className="relative overflow-hidden aspect-[4/5]">
                <Image src="/images/home/for-who/image2.png" alt="School campus" fill sizes="(max-width:1024px) 40vw, 20vw" className="object-cover" loading="lazy" />
              </div>
            </div>

            <div className="absolute -bottom-6 -left-6 w-24 h-24 border-2 border-crimson/20 pointer-events-none" />
          </div>

          <div className="reveal delay-2">
            <span className="section-eyebrow mb-5">About Us</span>
            <h2 className="font-display text-4xl lg:text-5xl text-navy leading-tight mb-6">
              Building minds that<br />
              <span className="text-crimson italic">lead Nigeria forward.</span>
            </h2>

            <p className="text-ink-3 text-base lg:text-lg leading-relaxed mb-5">
              St. Brain's Model College is a co-educational secondary school founded in 1989 in Lagos, Nigeria. Since inception, we have been dedicated to academic excellence, moral development, and the holistic nurturing of every student who walks through our gates.
            </p>
            <p className="text-ink-3 text-base lg:text-lg leading-relaxed mb-8">
              Our school bridges classical values with a thoroughly modern approach to learning — equipping students not just to pass examinations, but to think critically, lead boldly, and serve with integrity.
            </p>

            <ul className="space-y-3 mb-10">
              {pillars.map((pillar) => (
                <li key={pillar} className="flex items-start gap-3">
                  <CheckCircle size={16} className="text-crimson flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-ink-2">{pillar}</span>
                </li>
              ))}
            </ul>

            <Link href="/about" className="btn-navy group">
              Explore Our Story
              <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}