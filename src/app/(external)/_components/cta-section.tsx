import Link from "next/link"
import { ArrowRight, LogIn, UserPlus } from "lucide-react"

export default function CTASection() {
  return (
    <section className="relative overflow-hidden py-0">
      <div className="bg-crimson clip-cta relative overflow-hidden py-24 lg:py-32">
        <div
          className="absolute inset-0 opacity-[0.07]"
          style={{
            backgroundImage:
              "radial-gradient(circle, rgba(255,255,255,1) 1.5px, transparent 1.5px)",
            backgroundSize: "32px 32px",
          }}
        />

        <div className="pointer-events-none absolute top-0 right-0 bottom-0 flex items-center overflow-hidden select-none">
          <span className="font-display translate-x-20 text-[280px] leading-none font-bold text-white/5">
            35
          </span>
        </div>

        <div className="relative z-10 mx-auto max-w-7xl px-5 lg:px-8">
          <div className="max-w-2xl">
            <div className="mb-6 flex items-center gap-3">
              <div className="h-px w-10 bg-white/40" />
              <span className="text-2xs font-semibold tracking-[0.2em] text-white/60 uppercase">
                Ready to join us?
              </span>
            </div>

            <h2 className="font-display mb-6 text-4xl leading-tight text-white sm:text-5xl lg:text-6xl">
              Your child&apos;s best
              <br />
              <span className="text-white/80 italic">future starts here.</span>
            </h2>

            <p className="mb-10 max-w-xl text-lg leading-relaxed text-white/75">
              Whether you&apos;re an existing student accessing your portal, or a new
              family looking to enrol — St. Brain&apos;s Model College welcomes you.
            </p>

            <div className="flex flex-wrap gap-4">
              <Link
                href="/login"
                className="text-crimson group flex items-center gap-2 bg-white px-8 py-4 text-sm font-semibold transition-all hover:bg-white/90 active:scale-[0.98]"
              >
                <LogIn size={16} />
                Login to Portal
                <ArrowRight
                  size={14}
                  className="transition-transform group-hover:translate-x-1"
                />
              </Link>

              <Link
                href="/enroll"
                className="flex items-center gap-2 border border-white/40 px-8 py-4 text-sm font-semibold text-white backdrop-blur-sm transition-all hover:bg-white/10"
              >
                <UserPlus size={16} />
                Enroll
              </Link>
            </div>

            <div className="mt-12 flex flex-wrap gap-6 border-t border-white/20 pt-8">
              {[
                {
                  label: "Student Portal",
                  href: "/login",
                  note: "Results, Payments, Quizzes",
                },
                {
                  label: "Teacher Portal",
                  href: "/staff/teacher/login",
                  note: "Classes, Results upload",
                },
                {
                  label: "Admin Portal",
                  href: "/staff/management/login",
                  note: "Full school management",
                },
              ].map((portal) => (
                <Link
                  key={portal.label}
                  href={portal.href}
                  className="group flex flex-col"
                >
                  <span className="flex items-center gap-1.5 text-sm font-semibold text-white transition-colors group-hover:text-white/80">
                    {portal.label}{" "}
                    <ArrowRight
                      size={12}
                      className="opacity-60 transition-transform group-hover:translate-x-0.5"
                    />
                  </span>
                  <span className="mt-0.5 text-xs text-white/40">{portal.note}</span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
