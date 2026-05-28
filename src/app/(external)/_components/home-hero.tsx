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
    <section className="relative flex min-h-[62vh] w-full flex-col overflow-hidden sm:min-h-[66vh] md:min-h-[72vh] lg:min-h-[86vh]">
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
        <div
          className="absolute right-0 bottom-0 left-0 h-48"
          style={{
            background:
              "linear-gradient(to top, rgba(11,18,32,0.6) 0%, transparent 100%)",
          }}
        />
      </div>

      <div className="relative z-10 mx-auto flex w-full max-w-7xl flex-1 flex-col justify-center px-5 pt-20 pb-10 sm:pt-24 sm:pb-12 md:pt-28 md:pb-16 lg:px-8 lg:pt-36 lg:pb-24">
        <div className="max-w-2xl lg:max-w-3xl">
          <div className="animate-fade-up mb-6 flex items-center gap-3">
            <div className="bg-crimson h-px w-12" />
            <span className="text-crimson text-2xs font-semibold tracking-[0.25em] uppercase">
              Lagos · Nigeria
            </span>
          </div>

          <h1
            className="font-display animate-fade-up text-4xl leading-[1.06] text-white delay-100 sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl"
            style={{ animationFillMode: "both" }}
          >
            Excellence in
            <br />
            <span className="text-crimson italic">Education,</span>
            <br />
            Excellence in Life.
          </h1>

          <p
            className="animate-fade-up mt-5 max-w-xl text-base leading-relaxed font-light text-white/70 delay-200 sm:text-lg lg:mt-6 lg:text-xl"
            style={{ animationFillMode: "both" }}
          >
            St. Brain&apos;s Model College is where young minds are shaped into
            tomorrow&apos;s leaders — through rigorous academics, strong values, and a
            nurturing community.
          </p>

          <div
            className="animate-fade-up mt-10 flex flex-wrap gap-4 delay-300"
            style={{ animationFillMode: "both" }}
          >
            <Link href="/login" className="btn-crimson group">
              Login to Portal
              <ArrowRight
                size={16}
                className="transition-transform group-hover:translate-x-1"
              />
            </Link>
            <Link href="/enroll" className="btn-outline-white">
              Enroll
            </Link>
          </div>

          <div
            className="animate-fade-up mt-10 grid max-w-lg grid-cols-3 gap-3 delay-400 sm:mt-12 lg:mt-16"
            style={{ animationFillMode: "both" }}
          >
            {floatingStats.map(({ icon: Icon, value, label }) => (
              <div key={label} className="glass-pill flex flex-col gap-1.5 px-4 py-3">
                <Icon size={15} className="text-crimson" />
                <p className="font-display text-xl font-bold text-white">{value}</p>
                <p className="text-2xs leading-tight text-white/60">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="absolute right-0 bottom-0 left-0 z-10 overflow-hidden leading-none">
        <svg
          viewBox="0 0 1440 80"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
          className="h-12 w-full lg:h-16"
        >
          <path d="M0,80 C360,0 1080,0 1440,80 L1440,80 L0,80 Z" fill="#F8F6F2" />
        </svg>
      </div>

      <div className="absolute top-1/2 right-8 z-10 hidden -translate-y-1/2 flex-col items-center gap-3 xl:flex">
        <div className="h-16 w-px bg-white/20" />
        <p
          className="text-2xs font-medium tracking-[0.3em] text-white/30 uppercase"
          style={{ writingMode: "vertical-rl", letterSpacing: "0.3em" }}
        >
          Est. 1989 — Lagos, Nigeria
        </p>
        <div className="h-16 w-px bg-white/20" />
      </div>
    </section>
  )
}
