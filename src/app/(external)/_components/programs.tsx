import Image from "next/image"
import { BookOpen, Microscope, Trophy } from "lucide-react"

const programs = [
  {
    icon: BookOpen,
    title: "Junior Secondary School",
    range: "JSS 1 — JSS 3",
    desc: "A strong foundational curriculum covering core subjects including Mathematics, English, Basic Science, Social Studies, CRS/IRS, Creative Arts, and more.",
    img: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=600&q=80&auto=format&fit=crop",
    subjects: ["Mathematics", "English Language", "Basic Science", "Social Studies", "French"],
  },
  {
    icon: Microscope,
    title: "Senior Secondary School",
    range: "SS 1 — SS 3",
    desc: "Specialised tracks in Science, Arts, and Commercial — all preparing students for WAEC, NECO, and JAMB with distinction.",
    img: "https://images.unsplash.com/photo-1576086213369-97a306d36557?w=600&q=80&auto=format&fit=crop",
    subjects: ["Physics", "Chemistry", "Biology", "Economics", "Literature"],
  },
  {
    icon: Trophy,
    title: "Sports & Co-Curricular",
    range: "All levels",
    desc: "Football, athletics, debate, cultural dance, science olympiad, coding club — we develop the student beyond the classroom.",
    img: "https://images.unsplash.com/photo-1547347298-4074fc3086f0?w=600&q=80&auto=format&fit=crop",
    subjects: ["Football", "Athletics", "Debate Club", "Science Olympiad", "Coding Club"],
  },
]

export default function Programs() {
  return (
    <section id="academics" className="bg-canvas-white py-20 lg:py-28 overflow-hidden">
      <div className="max-w-7xl mx-auto px-5 lg:px-8">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-16 reveal">
          <div className="max-w-xl">
            <span className="section-eyebrow mb-5">Academics</span>
            <h2 className="font-display text-4xl lg:text-5xl text-navy leading-tight">
              Programmes that<br />
              <span className="text-crimson italic">shape champions.</span>
            </h2>
          </div>
          <p className="text-ink-3 text-base max-w-sm leading-relaxed">
            Every programme at St. Brain's is designed to challenge, engage, and prepare students for the highest levels of achievement.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {programs.map((program, index) => {
            const Icon = program.icon
            return (
              <div key={program.title} className={`reveal delay-${index + 1}`}>
                <div className="bg-canvas overflow-hidden group h-full flex flex-col border-t-4 border-crimson">
                  <div className="relative h-52 overflow-hidden">
                    <Image src={program.img} alt={program.title} fill sizes="(max-width:1024px) 100vw, 33vw" className="object-cover transition-transform duration-700 group-hover:scale-105" loading="lazy" />
                    <div className="absolute inset-0 bg-navy/30 group-hover:bg-navy/10 transition-all duration-500" />
                    <div className="absolute top-4 right-4 glass-pill px-3 py-1">
                      <span className="text-white text-2xs font-semibold uppercase tracking-wider">{program.range}</span>
                    </div>
                  </div>

                  <div className="p-7 flex flex-col gap-4 flex-1">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 bg-crimson-soft flex items-center justify-center flex-shrink-0">
                        <Icon size={16} className="text-crimson" />
                      </div>
                      <p className="font-display text-lg font-semibold text-navy">{program.title}</p>
                    </div>

                    <p className="text-sm text-ink-3 leading-relaxed">{program.desc}</p>

                    <div className="flex flex-wrap gap-2 mt-auto pt-3">
                      {program.subjects.map((subject) => (
                        <span key={subject} className="text-2xs bg-navy-soft text-navy-mid font-medium px-2.5 py-1 uppercase tracking-wide">
                          {subject}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}