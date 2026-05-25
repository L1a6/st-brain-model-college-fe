import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

interface FAQItem {
  id: number
  question: string
  answer: string
}

const faqData: FAQItem[] = [
  {
    id: 0,
    question: "What is SchoolBase?",
    answer:
      "SchoolBase is an open digital school management system that helps schools replace manual processes with automated tools for administration, academics, attendance, report cards, and parent engagement.",
  },
  {
    id: 1,
    question: "Who can use SchoolBase and what do they get?",
    answer:
      "SchoolBase supports Admins, Teachers, Students, and Parents, each with their own dashboard and permissions. Parents get read-only access, while teachers and admins can manage academic and administrative tasks.",
  },
  {
    id: 2,
    question: "How secure is the platform?",
    answer:
      "SchoolBase uses secure login, encrypted data, role-based access control (RBAC), and audit logs to ensure safety, privacy, and controlled access for all users.",
  },
  {
    id: 3,
    question: "How does school setup work?",
    answer:
      "Admins can create academic sessions, classes, and streams, then assign teachers and students. Everything automatically links to the active session to keep the academic structure organized.",
  },
  {
    id: 4,
    question: "How does the attendance system work?",
    answer:
      "Teachers mark attendance using NFC tap-in for fast, accurate records. Offline tap-ins sync automatically, and admins can make corrections with full audit history.",
  },
  {
    id: 5,
    question: "What does the timetable feature offer?",
    answer:
      "Admins create subjects, periods, and teacher assignments. SchoolBase detects conflicts automatically and updates timetables instantly for teachers and students.",
  },
  {
    id: 6,
    question: "How are grades and report cards handled?",
    answer:
      "Teachers enter grades digitally, the system calculates totals, and admins review before publishing. Report cards are generated instantly and available for students and parents to download.",
  },
  {
    id: 7,
    question: "What can parents do on the Parent Portal?",
    answer:
      "Parents can view their child’s profile, attendance, grades, report cards, and school notices. Their access is strictly read-only and supports multiple children under one account.",
  },
  {
    id: 8,
    question: "Is SchoolBase mobile-friendly?",
    answer:
      "Yes. SchoolBase is fully mobile-responsive and built to support 5,000+ users per school, ensuring fast performance even with heavy usage.",
  },
]

const Faq = () => {
  return (
    <div className="container flex min-h-screen flex-col gap-6 bg-white py-8 md:gap-8 md:py-12">
      <div className="mx-auto flex max-w-220 flex-col gap-4">
        <h1 className="text-center text-2xl font-semibold text-[#2d2d2d] md:text-3xl">
          Frequently Asked Question
        </h1>
        <p className="text-center text-sm text-[#535353] sm:text-xl md:text-2xl">
          Everything you need to know about how Open School Portal works for schools,
          parents, teachers, and students.
        </p>
      </div>
      <section className="md:pt-20">
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
              className="rounded-md border border-[#2D2D2D]/15 px-4 py-2 last:border-b"
            >
              <AccordionTrigger
                className="flex w-full flex-row items-center py-2 text-left font-normal text-[#535353] transition-colors duration-200"
                style={{ fontSize: "clamp(16px, 2vw, 20px)" }}
              >
                <span className="block w-full sm:text-lg md:text-2xl">
                  {faq.question}
                </span>
              </AccordionTrigger>

              <AccordionContent className="flex flex-col gap-4">
                <p
                  className="leading-relaxed text-[#535353]/80"
                  style={{ fontSize: "clamp(14px, 2vw, 16px)" }}
                >
                  <span className="text-sm md:text-xl">{faq.answer}</span>
                </p>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </section>
    </div>
  )
}

export default Faq
