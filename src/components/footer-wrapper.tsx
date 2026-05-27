// app/(external)/_components/FooterWrapper.tsx
"use client"

import { usePathname, useSearchParams } from "next/navigation"
import Footer from "@/components/Footer"

export default function FooterWrapper() {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const from = searchParams.get("from")

  const isWaitlistFlow = from === "waitlist" || pathname.startsWith("/waitlist")

  return <Footer key={isWaitlistFlow ? "waitlist" : "default"} />
}
