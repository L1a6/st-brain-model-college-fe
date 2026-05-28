import type { Metadata } from "next"
import FooterWrapper from "@/components/footer-wrapper"
import NavBarWrapper from "@/components/navbar-wrapper"

export const metadata: Metadata = {
  title: "St. Brian's Model College",
  description:
    "St. Brian's Model College is a modern school website for admissions, academics, events, and portal access.",
}

export default function ExternalLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <NavBarWrapper />
      <main className="pt-16 md:pt-22 lg:pt-26">{children}</main>
      <FooterWrapper />
    </>
  )
}
