import Image from "next/image"
import { ArrowRight } from "lucide-react"

const personas = [
  {
    id: 1,
    title: "Students",
    tagline: "Learn, grow & thrive",
    desc: "Access your timetable, check results, track fee payments, and engage with quizzes — all from one student portal.",
    img: "/images/home/for-who/image1.png",
    alt: "Students studying together",
    offset: false,
  },
  {
    id: 2,
    title: "Teachers",
    tagline: "Teach, inspire & record",
    desc: "Upload results, create assessments, manage your assigned classes and track each student's progress in real time.",
    img: "/images/home/for-who/image2.png",
    alt: "Teacher in class",
    offset: true,
  },
  {
    id: 3,
    title: "Parents",
    tagline: "Stay informed, stay close",
    desc: "Monitor your child's academic performance, fee status, attendance, and school announcements without stepping in.",
    img: "/images/home/for-who/image3.png",
    alt: "Parent and child",
    offset: false,
  },
  {
    id: 4,
    title: "Management",
    tagline: "Oversee, decide & lead",
    desc: "Full administrative oversight — student records, payment ledgers, teacher assignments, results locking, and school settings.",
    img: "/images/home/for-who/image4.png",
    alt: "School administrator",
    offset: true,
  },
]

export default function ForWho() {
  return (
    <section className="bg-canvas-white overflow-hidden py-12 lg:py-16">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <div className="reveal mb-10 max-w-2xl lg:mb-12">
          <span className="section-eyebrow mb-5">Who We Serve</span>
          <h2 className="font-display text-navy mb-5 text-4xl leading-tight lg:text-5xl">
            A portal built for
            <br />
            <span className="text-crimson italic">every stakeholder.</span>
          </h2>
          <p className="text-ink-3 text-lg leading-relaxed">
            Whether you&apos;re studying in JSS1 or running the school from the
            principal&apos;s chair, our platform has a tailored experience designed just
            for you.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-5 lg:grid-cols-4 lg:gap-6">
          {personas.map((persona, index) => (
            <div
              key={persona.id}
              className={`reveal flex flex-col gap-5 delay-${index + 1}`}
              style={{ marginTop: persona.offset ? "60px" : "0" }}
            >
              <div className="group relative overflow-hidden">
                <div className="relative aspect-4/5">
                  <Image
                    src={persona.img}
                    alt={persona.alt}
                    fill
                    sizes="(max-width:768px) 50vw, 25vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="bg-crimson/0 group-hover:bg-crimson/15 absolute inset-0 transition-all duration-500" />
                </div>
                <div className="bg-crimson absolute top-4 left-4 flex h-8 w-8 items-center justify-center">
                  <span className="text-xs font-bold text-white">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </div>
              </div>

              <div>
                <p className="text-2xs text-crimson mb-1 font-semibold tracking-widest uppercase">
                  {persona.tagline}
                </p>
                <h3 className="font-display text-navy mb-2 text-xl font-semibold">
                  {persona.title}
                </h3>
                <p className="text-ink-3 text-sm leading-relaxed">{persona.desc}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="border-canvas-border reveal mt-12 flex flex-col items-start justify-between gap-5 border-t pt-6 sm:flex-row sm:items-center">
          <p className="text-ink-3 max-w-lg text-sm">
            All roles are securely separated with role-based access control. Students see
            only their data; teachers manage only their classes.
          </p>
          <a href="/login" className="btn-outline-crimson shrink-0">
            Access Portal <ArrowRight size={15} />
          </a>
        </div>
      </div>
    </section>
  )
}
