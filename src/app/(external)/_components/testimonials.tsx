import Image from "next/image"
import { Quote } from "lucide-react"

const testimonials = [
  {
    id: 1,
    name: "Mrs. Adaeze Okonkwo",
    role: "Parent — SS2 Student",
    type: "Parent",
    title: '"The results portal changed how I stay connected with my daughter\'s education."',
    content: "Before St. Brain's introduced the online portal, I was completely in the dark about my daughter's academic performance until report cards. Now I can check her results, her fee status, and even receive school announcements — all from my phone. It has made parenting a school child so much easier.",
    img: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=400&q=80&auto=format&fit=crop&face=true",
    accent: "bg-navy",
  },
  {
    id: 2,
    name: "Mr. Chukwuemeka Eze",
    role: "Mathematics Teacher",
    type: "Teacher",
    title: '"Uploading and managing results has never been this seamless."',
    content: "In my 14 years of teaching, I've seen many school systems come and go. St. Brain's portal is genuinely the most intuitive I've used. I can enter scores for my entire SS3A Mathematics class in under 5 minutes, and students see their results instantly. That kind of efficiency is rare.",
    img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80&auto=format&fit=crop&face=true",
    accent: "bg-crimson",
  },
  {
    id: 3,
    name: "Toluwalase Bello",
    role: "Student — JSS 3A",
    type: "Student",
    title: '"Being able to track my results and practice with quizzes is amazing!"',
    content: "I use the student portal almost every day. I love how I can see my CA and exam scores as soon as sir uploads them. The quiz section especially helps me revise — it feels like real exam practice. My grades have improved so much since I started using it consistently.",
    img: "https://images.unsplash.com/photo-1531384441138-2736e62e0919?w=400&q=80&auto=format&fit=crop&face=true",
    accent: "bg-gold",
  },
  {
    id: 4,
    name: "Dr. Folake Adeyemi",
    role: "Parent — JSS2 Student",
    type: "Parent",
    title: '"St. Brain\'s gave my son confidence and structure I didn\'t expect."',
    content: "My son Kolade struggled in his previous school. Since joining St. Brain's Model College, the turnaround has been remarkable. The teachers here actually care. The portal keeps me informed, and the school's culture of discipline has truly transformed him.",
    img: "https://images.unsplash.com/photo-1589156280159-27698a70f29e?w=400&q=80&auto=format&fit=crop&face=true",
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
    <section className="bg-canvas-white py-20 lg:py-28 overflow-hidden">
      <div className="max-w-7xl mx-auto px-5 lg:px-8">
        <div className="max-w-2xl mb-16 reveal">
          <span className="section-eyebrow mb-5">Testimonials</span>
          <h2 className="font-display text-4xl lg:text-5xl text-navy leading-tight mb-4">
            What our community<br />
            <span className="text-crimson italic">says about us.</span>
          </h2>
          <p className="text-ink-3 text-lg leading-relaxed">
            Real words from the students, teachers, and parents who live the St. Brain's experience every day.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {testimonials.map((testimonial, index) => (
            <div key={testimonial.id} className={`reveal delay-${(index % 2) + 1} bg-canvas border border-canvas-border p-6 lg:p-8 flex gap-5 lg:gap-7 group transition-all duration-300 hover:border-crimson/30`}>
              <div className="shrink-0">
                <div className="relative w-28 lg:w-36 h-36 lg:h-44 overflow-hidden">
                  <Image src={testimonial.img} alt={testimonial.name} fill sizes="160px" className="object-cover" loading="lazy" />
                  <div className={`absolute top-0 left-0 w-1 h-full ${testimonial.accent}`} />
                </div>
              </div>

              <div className="flex flex-col gap-3 flex-1 min-w-0">
                <span className={`self-start text-2xs font-semibold uppercase tracking-widest px-2.5 py-1 ${typeColors[testimonial.type]}`}>
                  {testimonial.type}
                </span>

                <Quote size={20} className="text-crimson/30" />

                <p className="font-display text-sm lg:text-base font-semibold text-navy leading-snug line-clamp-3">
                  {testimonial.title}
                </p>

                <p className="text-xs lg:text-sm text-ink-3 leading-relaxed line-clamp-4 hidden sm:block">
                  {testimonial.content}
                </p>

                <div className="mt-auto pt-3 border-t border-canvas-border">
                  <p className="text-sm font-semibold text-navy">{testimonial.name}</p>
                  <p className="text-xs text-ink-3 mt-0.5">{testimonial.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}