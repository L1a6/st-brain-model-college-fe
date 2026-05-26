import Link from "next/link"
import { ArrowRight, LogIn, UserPlus } from "lucide-react"

export default function CTASection() {
  return (
    <section className="relative overflow-hidden py-0">
      <div className="relative bg-crimson py-24 lg:py-32 overflow-hidden clip-cta">
        <div className="absolute inset-0 opacity-[0.07]" style={{ backgroundImage: "radial-gradient(circle, rgba(255,255,255,1) 1.5px, transparent 1.5px)", backgroundSize: "32px 32px" }} />

        <div className="absolute right-0 top-0 bottom-0 flex items-center pointer-events-none select-none overflow-hidden">
          <span className="font-display text-[280px] font-bold text-white/5 leading-none translate-x-20">35</span>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-5 lg:px-8">
          <div className="max-w-2xl">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-px bg-white/40" />
              <span className="text-white/60 text-2xs font-semibold uppercase tracking-[0.2em]">Ready to join us?</span>
            </div>

            <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl text-white leading-tight mb-6">
              Your child's best<br />
              <span className="text-white/80 italic">future starts here.</span>
            </h2>

            <p className="text-white/75 text-lg leading-relaxed max-w-xl mb-10">
              Whether you're an existing student accessing your portal, or a new family looking to enrol — St. Brain's Model College welcomes you.
            </p>

            <div className="flex flex-wrap gap-4">
              <Link href="/portal/student/login" className="bg-white text-crimson font-semibold text-sm px-8 py-4 flex items-center gap-2 hover:bg-white/90 transition-all active:scale-[0.98] group">
                <LogIn size={16} />
                Login to Portal
                <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
              </Link>

              <Link href="/admissions" className="border border-white/40 text-white font-semibold text-sm px-8 py-4 flex items-center gap-2 hover:bg-white/10 transition-all backdrop-blur-sm">
                <UserPlus size={16} />
                Apply for Admission
              </Link>
            </div>

            <div className="mt-12 pt-8 border-t border-white/20 flex flex-wrap gap-6">
              {[
                { label: "Student Portal", href: "/portal/student/login", note: "Results, Payments, Quizzes" },
                { label: "Teacher Portal", href: "/staff/teacher/login", note: "Classes, Results upload" },
                { label: "Admin Portal", href: "/staff/management/login", note: "Full school management" },
              ].map((portal) => (
                <Link key={portal.label} href={portal.href} className="flex flex-col group">
                  <span className="text-white text-sm font-semibold group-hover:text-white/80 transition-colors flex items-center gap-1.5">
                    {portal.label} <ArrowRight size={12} className="opacity-60 group-hover:translate-x-0.5 transition-transform" />
                  </span>
                  <span className="text-white/40 text-xs mt-0.5">{portal.note}</span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}