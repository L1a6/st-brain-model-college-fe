// components/back-button.tsx

"use client"

import { useRouter } from "next/navigation"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function BackButton() {
  const router = useRouter()

  return (
    <Button
      variant="link"
      className="flex items-center gap-2"
      onClick={() => router.back()}
    >
      <ArrowLeft className="h-4 w-4" />
      Back
    </Button>
  )
}
