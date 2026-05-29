import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import ScrollReveal from "@/components/ScrollReveal"

interface FAQItem {
  id: number
  question: string
  answer: string
}

const faqData: FAQItem[] = [
  {
    id: 0,
    question: "What is St. Brain's Model College?",
    answer:
      "St. Brain's Model College is a co-educational secondary school in Lagos focused on academic excellence, character formation, and modern school communication.",
  },
  {
    id: 1,
    question: "Who can use the school portal?",
    answer:
      "Students, teachers, parents, and administrators each have access to the right school tools and information for their role.",
  },
  {
    id: 2,
    question: "How secure is the portal?",
    answer:
      "Access is role-based and protected with secure sign-in, so each user only sees what they are meant to see.",
  },
  {
    id: 3,
    question: "How does admissions work?",
    answer:
      "Families submit an application, the school reviews the details, and shortlisted candidates are guided through enrollment and onboarding.",
  },
  {
    id: 4,
    question: "How do school announcements reach parents?",
    answer:
      "We use the portal, email, and direct school communication to keep families updated on notices, events, and important dates.",
  },
  {
    id: 5,
    question: "What can parents expect from the school?",
    answer:
      "Parents can expect disciplined learning, strong academics, responsive communication, and a community focused on student growth.",
  },
  {
    id: 6,
    question: "How does the school support learning beyond the classroom?",
    answer:
      "Through co-curricular activities, mentoring, leadership opportunities, and a structured environment that develops the whole child.",
  },
  {
    id: 7,
    question: "What can parents do on the parent portal?",
    answer:
      "Parents can stay informed about results, attendance, notices, and fee-related updates without needing to call the office for every detail.",
  },
  {
    id: 8,
    question: "Is the site mobile-friendly?",
    answer:
      "Yes. The site and portal are designed to work smoothly on phones, tablets, and desktop screens.",
  },
]

const Faq = () => {
  return (
    <div className="bg-canvas min-h-screen py-20 lg:py-28">
      <div className="reveal mx-auto mb-12 max-w-7xl px-5 lg:px-8">
        <span className="section-eyebrow mb-5">FAQ</span>
        <h1 className="font-display text-navy mb-4 text-4xl leading-tight lg:text-6xl">
          Questions families ask
          <br />
          <span className="text-crimson italic">most often.</span>
        </h1>
        <p className="text-ink-3 max-w-3xl text-lg leading-relaxed">
          Answers about admissions, the portal, school communication, and daily life at
          St. Brain&apos;s Model College.
        </p>
      </div>

      <section className="mx-auto max-w-7xl px-5 md:pt-6 lg:px-8">
        <Accordion
          type="single"
          collapsible
          className="w-full space-y-4"
          defaultValue={`item-0`}
        >
          {faqData.map((faq, index) => (
            <AccordionItem
              key={index}
              value={`item-${index}`}
              className="border-canvas-border bg-canvas-white rounded-md border px-4 py-2 last:border-b"
            >
              <AccordionTrigger
                className="text-ink-2 flex w-full flex-row items-center py-2 text-left font-normal transition-colors duration-200"
                style={{ fontSize: "clamp(16px, 2vw, 20px)" }}
              >
                <span className="block w-full sm:text-lg md:text-2xl">
                  {faq.question}
                </span>
              </AccordionTrigger>

              <AccordionContent className="flex flex-col gap-4">
                <p
                  className="text-ink-3 leading-relaxed"
                  style={{ fontSize: "clamp(14px, 2vw, 16px)" }}
                >
                  <span className="text-sm md:text-xl">{faq.answer}</span>
                </p>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </section>

      <ScrollReveal />
    </div>
  )
}

export default Faq
