"use client"

import { usePathname, useSearchParams } from "next/navigation"
import Navbar from "./Navbar"
import WaitlistNavbar from "@/app/(external)/waitlist/_components/waitlist-navbar"
import LandingNavbar from "@/components/landing/Navbar"

export default function NavBarWrapper() {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const from = searchParams.get("from")

  const isWaitlistFlow = from === "waitlist" || pathname.startsWith("/waitlist")
  const isEnrollPage = pathname.startsWith("/enroll")

  if (isWaitlistFlow) {
    return <WaitlistNavbar />
  }

  return isEnrollPage ? <LandingNavbar /> : <Navbar />
}
