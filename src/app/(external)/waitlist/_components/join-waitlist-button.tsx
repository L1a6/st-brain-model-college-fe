"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import WaitlistFormModal from "./waitlist-form"
import { ArrowRightIcon } from "lucide-react"

interface JoinWaitlistButtonProps {
  label?: string
  showArrow?: boolean
  className?: string
  variant?: "default" | "outline" | "secondary" | "ghost" | "destructive"
}

const JoinWaitlistButton = ({
  label = "Join the Waitlist",
  showArrow = false,
  className = "",
  variant = "default",
}: JoinWaitlistButtonProps) => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <Button variant={variant} className={className} onClick={() => setIsOpen(true)}>
        {label}
        {showArrow && <ArrowRightIcon className="ml-2 h-5 w-5" />}
      </Button>

      <WaitlistFormModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  )
}

export default JoinWaitlistButton
