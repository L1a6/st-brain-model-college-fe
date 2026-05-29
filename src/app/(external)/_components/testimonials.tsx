import Image from "next/image"
import { Quote } from "lucide-react"

const testimonials = [
  {
    id: 1,
    name: "Mrs. Adaeze Okonkwo",
    role: "Parent — SS2 Student",
    type: "Parent",
    title:
      '"The results portal changed how I stay connected with my daughter\'s education."',
    content:
      "Before St. Brain's introduced the online portal, I was completely in the dark about my daughter's academic performance until report cards. Now I can check her results, her fee status, and even receive school announcements — all from my phone. It has made parenting a school child so much easier.",
    img: "/assets/images/parent.png",
    accent: "bg-navy",
  },
  {
    id: 2,
    name: "Mr. Chukwuemeka Eze",
    role: "Mathematics Teacher",
    type: "Teacher",
    title: '"Uploading and managing results has never been this seamless."',
    content:
      "In my 14 years of teaching, I've seen many school systems come and go. St. Brain's portal is genuinely the most intuitive I've used. I can enter scores for my entire SS3A Mathematics class in under 5 minutes, and students see their results instantly. That kind of efficiency is rare.",
    img: "/images/home/for-who/image1.png",
    accent: "bg-crimson",
  },
  {
    id: 3,
    name: "Toluwalase Bello",
    role: "Student — JSS 3A",
    type: "Student",
    title: '"Being able to track my results and practice with quizzes is amazing!"',
    content:
      "I use the student portal almost every day. I love how I can see my CA and exam scores as soon as sir uploads them. The quiz section especially helps me revise — it feels like real exam practice. My grades have improved so much since I started using it consistently.",
    img: "/assets/images/auth/school-logo.png",
    accent: "bg-gold",
  },
  {
    id: 4,
    name: "Dr. Folake Adeyemi",
    role: "Parent — JSS2 Student",
    type: "Parent",
    title: "\"St. Brain's gave my son confidence and structure I didn't expect.\"",
    content:
      "My son Kolade struggled in his previous school. Since joining St. Brain's Model College, the turnaround has been remarkable. The teachers here actually care. The portal keeps me informed, and the school's culture of discipline has truly transformed him.",
    img: "/assets/images/dashboard/avatar.svg",
    accent: "bg-navy",
  },
]

const typeColors: Record<string, string> = {
  Parent: "text-navy-mid bg-navy-soft",
  Teacher: "text-crimson bg-crimson-soft",
  Student: "bg-gold-muted text-yellow-700",
}

export default function Testimonials() {
  return (
    <section className="bg-canvas-white overflow-hidden py-8 lg:py-12">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <div className="reveal mb-10 max-w-2xl lg:mb-12">
          <span className="section-eyebrow mb-5">Testimonials</span>
          <h2 className="font-display text-navy mb-4 text-4xl leading-tight lg:text-5xl">
            Voices that echo our values,
            <br />
            <span className="text-[#2563EB]/80">from class to campus.</span>
          </h2>
          <p className="text-ink-3 text-lg leading-relaxed">
            Real words from the students, teachers, and parents who live the St.
            Brain&apos;s experience every day.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          {testimonials.map((testimonial, index) => (
            <div
              key={testimonial.id}
              className={`reveal delay-${(index % 2) + 1} bg-canvas border-canvas-border group hover:border-crimson/30 flex gap-5 border p-6 transition-all duration-300 lg:gap-7 lg:p-8`}
            >
              <div className="shrink-0">
                <div className="relative h-36 w-28 overflow-hidden lg:h-44 lg:w-36">
                  <Image
                    src={testimonial.img}
                    alt={testimonial.name}
                    fill
                    sizes="160px"
                    className="object-cover"
                    loading="lazy"
                  />
                  <div
                    className={`absolute top-0 left-0 h-full w-1 ${testimonial.accent}`}
                  />
                </div>
              </div>

              <div className="flex min-w-0 flex-1 flex-col gap-3">
                <span
                  className={`text-2xs self-start px-2.5 py-1 font-semibold tracking-widest uppercase ${typeColors[testimonial.type]}`}
                >
                  {testimonial.type}
                </span>

                <Quote size={20} className="text-crimson/30" />

                <p className="font-display text-navy line-clamp-3 text-sm leading-snug font-semibold lg:text-base">
                  {testimonial.title}
                </p>

                <p className="text-ink-3 line-clamp-4 hidden text-xs leading-relaxed sm:block lg:text-sm">
                  {testimonial.content}
                </p>

                <div className="border-canvas-border mt-auto border-t pt-3">
                  <p className="text-navy text-sm font-semibold">{testimonial.name}</p>
                  <p className="text-ink-3 mt-0.5 text-xs">{testimonial.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
