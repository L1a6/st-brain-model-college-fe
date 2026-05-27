// app/(external)/_components/FooterWrapper.tsx
"use client"

import { usePathname, useSearchParams } from "next/navigation"
import Footer from "@/components/Footer"
import LandingFooter from "@/components/landing/Footer"

export default function FooterWrapper() {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const from = searchParams.get("from")

  const isWaitlistFlow = from === "waitlist" || pathname.startsWith("/waitlist")
  const isEnrollPage = pathname.startsWith("/enroll")

  if (isEnrollPage) {
    return <LandingFooter />
  }

  return <Footer key={isWaitlistFlow ? "waitlist" : "default"} />
}
