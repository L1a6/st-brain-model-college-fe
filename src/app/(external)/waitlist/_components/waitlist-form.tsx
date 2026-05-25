import React, { useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { useJoinWaitlist } from "../_hooks/use-waitlist"
import Image from "next/image"
import { cn } from "@/lib/utils"
import { getErrorMessage } from "@/lib/errors"

const WaitlistFormModal: React.FC<{
  isOpen: boolean
  onClose: () => void
}> = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
  })

  const [submitted, setSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [localError, setLocalError] = useState<string | null>(null)

  const email = formData.email
  const fullName = formData.fullName

  // Mutation: Join waitlist
  const joinMutation = useJoinWaitlist()

  // Controlled input handler
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLocalError(null) // clear local errors
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  // Handle submit
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    setLocalError(null)
    setIsSubmitting(true)

    // const [first_name, last_name] = fullName.trim().split(" ")
    const [firstName, lastName] = fullName.trim().split(" ")

    try {
      await joinMutation.mutateAsync({ email, firstName, lastName })
      setSubmitted(true)

      // Reset UI after 2 seconds
      setTimeout(() => {
        setSubmitted(false)
        setFormData({ email: "", fullName: "" })
        onClose()
      }, 2000)
    } catch (err) {
      setLocalError(getErrorMessage(err))
    }

    setIsSubmitting(false)
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="rounded-2xl p-8 sm:max-w-md">
        <DialogHeader className={cn("space-y-3 text-left", submitted ? "sr-only" : "")}>
          <DialogTitle className="text-2xl font-bold text-gray-900">
            Secure Your Spot Now
          </DialogTitle>
          <DialogDescription className="text-sm text-gray-600">
            Get monthly updates, early access to beta testing, and be the first to know
            when we launch.
          </DialogDescription>
        </DialogHeader>

        {submitted ? (
          <div className="py-8 text-center">
            <div className="mx-auto mb-4 flex aspect-square w-[250px] items-center justify-center">
              <Image
                src="/assets/icons/verify.svg"
                alt="Success"
                width={250}
                height={250}
                className="w-full object-contain"
              />
            </div>
            <h3 className="mb-2 text-xl font-bold text-gray-900">
              You&apos;re on the list!
            </h3>
            <p className="text-gray-600">We&apos;ll notify you when we launch.</p>
          </div>
        ) : (
          <>
            <form className="mt-4 space-y-3" onSubmit={handleSubmit}>
              {!!localError && (
                <p className="rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-600">
                  {localError || "Something went wrong."}
                </p>
              )}

              {/* Full Name */}
              <div>
                <label
                  htmlFor="fullName"
                  className="mb-2 block text-sm font-semibold text-gray-900"
                >
                  Full Name
                </label>
                <input
                  type="text"
                  id="fullName"
                  name="fullName"
                  required
                  value={fullName}
                  onChange={handleChange}
                  placeholder="Enter your full name"
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm placeholder-gray-400 focus:ring-2 focus:ring-red-500 focus:outline-none"
                />
              </div>

              {/* Email */}
              <div>
                <label
                  htmlFor="email"
                  className="mb-2 block text-sm font-semibold text-gray-900"
                >
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  value={email}
                  onChange={handleChange}
                  placeholder="Enter your email address"
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm placeholder-gray-400 focus:ring-2 focus:ring-red-500 focus:outline-none"
                />
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                disabled={isSubmitting || !email || !fullName}
                className="mt-6 w-full"
              >
                {isSubmitting ? (
                  <>
                    <div className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
                    Joining...
                  </>
                ) : (
                  <>Join The Waitlist</>
                )}
              </Button>
            </form>
          </>
        )}
      </DialogContent>
    </Dialog>
  )
}

export default WaitlistFormModal
