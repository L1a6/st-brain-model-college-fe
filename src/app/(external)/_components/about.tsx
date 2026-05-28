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
    <section id="about" className="bg-canvas overflow-hidden py-16 lg:py-20">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-14 lg:grid-cols-2 lg:gap-20">
          <div className="reveal relative grid grid-cols-2 gap-5">
            <div className="flex flex-col gap-5">
              <div className="relative aspect-4/5 overflow-hidden">
                <Image
                  src="/images/home/for-who/image1.png"
                  alt="Students in class"
                  fill
                  sizes="(max-width:1024px) 40vw, 20vw"
                  className="object-cover"
                  loading="lazy"
                />
              </div>
              <div className="bg-crimson flex flex-col gap-2 p-6">
                <p className="font-display text-4xl font-bold text-white">35+</p>
                <p className="text-xs tracking-widest text-white/80 uppercase">
                  Years shaping futures
                </p>
              </div>
            </div>

            <div className="mt-12 flex flex-col gap-5">
              <div className="bg-navy flex flex-col gap-2 p-6">
                <p className="font-display text-4xl font-bold text-white">98%</p>
                <p className="text-xs tracking-widest text-white/60 uppercase">
                  WAEC pass rate 2024
                </p>
              </div>
              <div className="relative aspect-4/5 overflow-hidden">
                <Image
                  src="/images/home/for-who/image2.png"
                  alt="School campus"
                  fill
                  sizes="(max-width:1024px) 40vw, 20vw"
                  className="object-cover"
                  loading="lazy"
                />
              </div>
            </div>

            <div className="border-crimson/20 pointer-events-none absolute -bottom-6 -left-6 h-24 w-24 border-2" />
          </div>

          <div className="reveal delay-2">
            <span className="section-eyebrow mb-5">About Us</span>
            <h2 className="font-display text-navy mb-6 text-4xl leading-tight lg:text-5xl">
              Building minds that
              <br />
              <span className="text-[#2563EB]/80">lead Nigeria forward.</span>
            </h2>

            <p className="text-ink-3 mb-5 text-base leading-relaxed lg:text-lg">
              St. Brain&apos;s Model College is a co-educational secondary school founded
              in 1989 in Lagos, Nigeria. Since inception, we have been dedicated to
              academic excellence, moral development, and the holistic nurturing of every
              student who walks through our gates.
            </p>
            <p className="text-ink-3 mb-8 text-base leading-relaxed lg:text-lg">
              Our school bridges classical values with a thoroughly modern approach to
              learning — equipping students not just to pass examinations, but to think
              critically, lead boldly, and serve with integrity.
            </p>

            <ul className="mb-10 space-y-3">
              {pillars.map((pillar) => (
                <li key={pillar} className="flex items-start gap-3">
                  <CheckCircle size={16} className="text-crimson mt-0.5 shrink-0" />
                  <span className="text-ink-2 text-sm">{pillar}</span>
                </li>
              ))}
            </ul>

            <Link href="/about" className="btn-navy group">
              Explore Our Story
              <ArrowRight
                size={15}
                className="transition-transform group-hover:translate-x-1"
              />
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
