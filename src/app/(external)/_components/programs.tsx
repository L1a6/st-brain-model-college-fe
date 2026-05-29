import Image from "next/image"
import { BookOpen, Microscope, Trophy } from "lucide-react"

const programs = [
  {
    icon: BookOpen,
    title: "Junior Secondary School",
    range: "JSS 1 — JSS 3",
    desc: "A strong foundational curriculum covering core subjects including Mathematics, English, Basic Science, Social Studies, CRS/IRS, Creative Arts, and more.",
    img: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=1600&q=90",
    subjects: [
      "Mathematics",
      "English Language",
      "Basic Science",
      "Social Studies",
      "French",
    ],
  },
  {
    icon: Microscope,
    title: "Senior Secondary School",
    range: "SS 1 — SS 3",
    desc: "Specialised tracks in Science, Arts, and Commercial — all preparing students for WAEC, NECO, and JAMB with distinction.",
    img: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=1600&q=90",
    subjects: ["Physics", "Chemistry", "Biology", "Economics", "Literature"],
  },
  {
    icon: Trophy,
    title: "Sports & Co-Curricular",
    range: "All levels",
    desc: "Football, athletics, debate, cultural dance, science olympiad, coding club — we develop the student beyond the classroom.",
    img: "https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&w=1600&q=90",
    subjects: ["Football", "Athletics", "Debate Club", "Science Olympiad", "Coding Club"],
  },
]

export default function Programs() {
  return (
    <section id="academics" className="bg-canvas-white overflow-hidden py-10 lg:py-14">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <div className="reveal mb-10 flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <div className="max-w-xl">
            <span className="section-eyebrow mb-5">Academics</span>
            <h2 className="font-display text-navy text-4xl leading-tight lg:text-5xl">
              Programmes that
              <br />
              <span className="text-[#2563EB]/80">shape champions.</span>
            </h2>
          </div>
          <p className="text-ink-3 max-w-sm text-base leading-relaxed">
            Every programme at St. Brain&apos;s is designed to challenge, engage, and
            prepare students for the highest levels of achievement.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {programs.map((program, index) => {
            const Icon = program.icon
            return (
              <div key={program.title} className={`reveal delay-${index + 1}`}>
                <div className="bg-canvas group border-crimson flex h-full flex-col overflow-hidden border-t-4">
                  <div className="relative h-52 overflow-hidden">
                    <Image
                      src={program.img}
                      alt={program.title}
                      fill
                      sizes="(max-width:1024px) 100vw, 33vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                      loading="lazy"
                    />
                    <div className="bg-navy/30 group-hover:bg-navy/10 absolute inset-0 transition-all duration-500" />
                    <div className="glass-pill absolute top-4 right-4 px-3 py-1">
                      <span className="text-2xs font-semibold tracking-wider text-white uppercase">
                        {program.range}
                      </span>
                    </div>
                  </div>

                  <div className="flex flex-1 flex-col gap-4 p-7">
                    <div className="flex items-center gap-3">
                      <div className="bg-crimson-soft flex h-9 w-9 shrink-0 items-center justify-center">
                        <Icon size={16} className="text-crimson" />
                      </div>
                      <p className="font-display text-navy text-lg font-semibold">
                        {program.title}
                      </p>
                    </div>

                    <p className="text-ink-3 text-sm leading-relaxed">{program.desc}</p>

                    <div className="mt-auto flex flex-wrap gap-2 pt-3">
                      {program.subjects.map((subject) => (
                        <span
                          key={subject}
                          className="text-2xs bg-navy-soft text-navy-mid px-2.5 py-1 font-medium tracking-wide uppercase"
                        >
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
