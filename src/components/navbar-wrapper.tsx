"use client"

import { usePathname, useSearchParams } from "next/navigation"
import Navbar from "./Navbar"
import WaitlistNavbar from "@/app/(external)/waitlist/_components/waitlist-navbar"

export default function NavBarWrapper() {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const from = searchParams.get("from")

  const isWaitlistFlow = from === "waitlist" || pathname.startsWith("/waitlist")

  return isWaitlistFlow ? <WaitlistNavbar /> : <Navbar />
}
