import Link from "next/link"
import Image from "next/image"
import { ArrowRight, Award, BookOpen, GraduationCap } from "lucide-react"

const floatingStats = [
  { icon: GraduationCap, value: "2,400+", label: "Enrolled Students" },
  { icon: Award, value: "98%", label: "WAEC Pass Rate" },
  { icon: BookOpen, value: "35+", label: "Years of Excellence" },
]

export default function Hero() {
  return (
    <section className="relative w-full min-h-[60vh] sm:min-h-[68vh] lg:min-h-screen flex flex-col overflow-hidden">
      <div className="absolute inset-0 z-0">
          <Image
            src="/images/home/about/image1.png"
            alt="School campus"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(11,18,32,0.95)_0%,rgba(11,18,32,0.85)_40%,rgba(27,59,111,0.70)_70%,rgba(218,55,67,0.35)_100%)]" />
        <div className="absolute bottom-0 left-0 right-0 h-48" style={{ background: "linear-gradient(to top, rgba(11,18,32,0.6) 0%, transparent 100%)" }} />
      </div>

      <div className="relative z-10 flex-1 flex flex-col justify-center max-w-7xl mx-auto px-5 lg:px-8 pt-28 pb-16 lg:pt-36 lg:pb-24 w-full">
        <div className="max-w-3xl">
          <div className="flex items-center gap-3 mb-6 animate-fade-up">
            <div className="w-12 h-px bg-crimson" />
            <span className="text-crimson text-2xs font-semibold uppercase tracking-[0.25em]">Lagos · Nigeria</span>
          </div>

          <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl xl:text-8xl text-white leading-[1.06] animate-fade-up delay-100" style={{ animationFillMode: "both" }}>
            Excellence in<br />
            <span className="text-crimson italic">Education,</span><br />
            Excellence in Life.
          </h1>

          <p className="mt-6 text-white/70 text-lg lg:text-xl max-w-xl leading-relaxed font-light animate-fade-up delay-200" style={{ animationFillMode: "both" }}>
            St. Brain's Model College is where young minds are shaped into tomorrow's leaders — through rigorous academics, strong values, and a nurturing community.
          </p>

          <div className="mt-10 flex flex-wrap gap-4 animate-fade-up delay-300" style={{ animationFillMode: "both" }}>
            <Link href="/login" className="btn-crimson group">
              Login to Portal
              <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
            </Link>
            <Link href="/enroll" className="btn-outline-white">Enroll</Link>
          </div>

          <div className="mt-16 grid grid-cols-3 gap-3 max-w-lg animate-fade-up delay-400" style={{ animationFillMode: "both" }}>
            {floatingStats.map(({ icon: Icon, value, label }) => (
              <div key={label} className="glass-pill px-4 py-3 flex flex-col gap-1.5">
                <Icon size={15} className="text-crimson" />
                <p className="font-display text-xl text-white font-bold">{value}</p>
                <p className="text-2xs text-white/60 leading-tight">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 z-10 overflow-hidden leading-none">
        <svg viewBox="0 0 1440 80" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" className="w-full h-12 lg:h-16">
          <path d="M0,80 C360,0 1080,0 1440,80 L1440,80 L0,80 Z" fill="#F8F6F2" />
        </svg>
      </div>

      <div className="absolute right-8 top-1/2 -translate-y-1/2 z-10 hidden xl:flex flex-col items-center gap-3">
        <div className="w-px h-16 bg-white/20" />
        <p className="text-white/30 text-2xs uppercase tracking-[0.3em] font-medium" style={{ writingMode: "vertical-rl", letterSpacing: "0.3em" }}>
          Est. 1989 — Lagos, Nigeria
        </p>
        <div className="w-px h-16 bg-white/20" />
      </div>
    </section>
  )
}
