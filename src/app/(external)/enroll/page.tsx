"use client"

import { useEffect, useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import Link from "next/link"
import Image from "next/image"

import { safeJsonFetch } from "@/lib/safeJsonFetch"

interface SiteSettings {
  registration_open: boolean
  current_cohort: number
  cohort_message: string
}

function getOrdinalSuffix(n: number): string {
  const suffixes = ["th", "st", "nd", "rd"]
  const value = n % 100
  return suffixes[(value - 20) % 10] || suffixes[value] || suffixes[0]
}

export default function EnrollPage() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitSuccess, setSubmitSuccess] = useState<boolean | "no-email">(false)
  const [submitError, setSubmitError] = useState("")
  const [settings, setSettings] = useState<SiteSettings | null>(null)
  const [loadingSettings, setLoadingSettings] = useState(true)

  useEffect(() => {
    void fetchSettings()
  }, [])

  const fetchSettings = async () => {
    try {
      const data = await safeJsonFetch<{ settings?: SiteSettings }>("/api/settings")
      if (data.settings) {
        setSettings(data.settings)
      }
    } catch (error) {
      console.error("Error fetching settings:", error)
      setSettings({
        registration_open: true,
        current_cohort: 15,
        cohort_message: "",
      })
    } finally {
      setLoadingSettings(false)
    }
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setIsSubmitting(true)
    setSubmitError("")

    try {
      const data = await safeJsonFetch<{
        emailsSent?: boolean
        emailError?: string
        error?: string
        details?: string
      }>("/api/enroll", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })

      if (data.error || data.details) {
        const message = data.details || data.error || "Submission failed"
        throw new Error(message)
      }

      setSubmitSuccess(data.emailsSent ? true : "no-email")
      setFormData({ fullName: "", email: "", phone: "", message: "" })

      if (!data.emailsSent && data.emailError) {
        console.warn("Enrollment email notification failed:", data.emailError)
      }

      setTimeout(() => setSubmitSuccess(false), 8000)
    } catch (error) {
      console.error("Enrollment error:", error)
      setSubmitError(
        error instanceof Error
          ? error.message
          : "Failed to submit your enrollment request. Please try again."
      )
    } finally {
      setIsSubmitting(false)
    }
  }

  const cohortLabel = settings?.current_cohort
    ? `${settings.current_cohort}${getOrdinalSuffix(settings.current_cohort)} Cohort`
    : "Current Cohort"

  return (
    <main className="min-h-screen bg-white pt-24 dark:bg-[#0A1236]">
      <section className="relative flex min-h-[52vh] items-center justify-center overflow-hidden md:min-h-[64vh] lg:min-h-[70vh]">
        <div className="brand-menu-overlay" />
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=1920&q=80"
            alt="St. Brian's Model College students"
            fill
            sizes="100vw"
            className="object-cover"
            priority
          />
        </div>
        <div className="absolute inset-0 bg-[#0A1236]/58" />
        <div className="relative z-20 px-6 text-center">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-4 text-sm tracking-[0.3em] text-white/90 uppercase"
          >
            2026 - 2027 Academic Session
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="font-display text-4xl font-extralight tracking-tight text-white md:text-6xl"
          >
            Enroll at St. Brian&apos;s {cohortLabel}
          </motion.h1>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-6 py-20">
        <AnimatePresence>
          {!loadingSettings && settings && !settings.registration_open && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative mb-12 overflow-hidden rounded-3xl bg-[#0A1236] p-8 shadow-2xl md:p-12"
            >
              <div className="absolute top-0 right-0 h-64 w-64 rounded-full bg-[#2563EB]/10 blur-3xl" />
              <div className="absolute bottom-0 left-0 h-48 w-48 rounded-full bg-white/5 blur-2xl" />

              <div className="relative z-10 mx-auto max-w-2xl text-center">
                <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-2xl border border-white/20 bg-white/10 backdrop-blur-sm">
                  <svg
                    className="h-10 w-10 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>

                <h2 className="font-display mb-4 text-3xl font-extralight text-white md:text-4xl">
                  Enrollment Temporarily Closed
                </h2>

                <p className="mb-8 text-lg leading-relaxed text-white/80">
                  {settings.cohort_message ||
                    "We are not currently accepting new enrollment requests. Please check back soon or contact the school office for updates."}
                </p>

                <div className="flex flex-col justify-center gap-4 sm:flex-row">
                  <Link
                    href="/"
                    className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-8 py-4 font-medium text-[#0A1236] shadow-lg transition-all duration-300 hover:-translate-y-0.5 hover:bg-gray-100"
                  >
                    <span>Back to Home</span>
                  </Link>
                  <a
                    href="/contact"
                    className="inline-flex items-center justify-center gap-2 rounded-full border border-white/30 bg-white/10 px-8 py-4 font-medium text-white backdrop-blur-sm transition-all duration-300 hover:bg-white/20"
                  >
                    <span>Contact School</span>
                  </a>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {(loadingSettings || (settings && settings.registration_open)) && (
          <div className="grid gap-16 md:grid-cols-2">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="font-display mb-6 text-3xl font-light text-gray-900 dark:text-white">
                Ready to join St. Brian&apos;s Model College?
              </h2>
              <p className="mb-8 leading-relaxed text-gray-600 dark:text-gray-300">
                Take the next step toward disciplined learning and strong academic
                support. Fill out the form and our admissions team will get back to you
                promptly.
              </p>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#0A1236]/10 dark:bg-white/10">
                    <svg
                      className="h-6 w-6 text-[#0A1236] dark:text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-display mb-2 text-lg font-medium text-gray-900 dark:text-white">
                      Experienced Teachers
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Learn from dedicated staff committed to academic excellence and
                      character.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#0A1236]/10 dark:bg-white/10">
                    <svg
                      className="h-6 w-6 text-[#0A1236] dark:text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                      />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-display mb-2 text-lg font-medium text-gray-900 dark:text-white">
                      Small Class Sizes
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Personalized attention in a calm and focused learning environment.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#0A1236]/10 dark:bg-white/10">
                    <svg
                      className="h-6 w-6 text-[#0A1236] dark:text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
                      />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-display mb-2 text-lg font-medium text-gray-900 dark:text-white">
                      Academic Records
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Receive proper academic records, progress tracking, and onboarding
                      support.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-900 dark:text-white">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.fullName}
                    onChange={(event) =>
                      setFormData({ ...formData, fullName: event.target.value })
                    }
                    className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-gray-900 transition-all focus:ring-2 focus:ring-[#0A1236] focus:outline-none dark:border-gray-600 dark:bg-gray-800 dark:text-white dark:focus:ring-white"
                    placeholder="Enter your full name"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-900 dark:text-white">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(event) =>
                      setFormData({ ...formData, email: event.target.value })
                    }
                    className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-gray-900 transition-all focus:ring-2 focus:ring-[#0A1236] focus:outline-none dark:border-gray-600 dark:bg-gray-800 dark:text-white dark:focus:ring-white"
                    placeholder="you@example.com"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-900 dark:text-white">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(event) =>
                      setFormData({ ...formData, phone: event.target.value })
                    }
                    className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-gray-900 transition-all focus:ring-2 focus:ring-[#0A1236] focus:outline-none dark:border-gray-600 dark:bg-gray-800 dark:text-white dark:focus:ring-white"
                    placeholder="+234 xxx xxx xxxx"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-900 dark:text-white">
                    Your Message
                  </label>
                  <textarea
                    value={formData.message}
                    onChange={(event) =>
                      setFormData({ ...formData, message: event.target.value })
                    }
                    rows={4}
                    className="w-full resize-none rounded-lg border border-gray-300 bg-white px-4 py-3 text-gray-900 transition-all focus:ring-2 focus:ring-[#0A1236] focus:outline-none dark:border-gray-600 dark:bg-gray-800 dark:text-white dark:focus:ring-white"
                    placeholder="Tell us about the class you want to join and anything we should know..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full rounded-full bg-[#0A1236] px-8 py-4 text-sm font-medium text-white shadow-lg transition-all duration-400 hover:-translate-y-0.5 hover:bg-[#0A1236]/90 disabled:cursor-not-allowed disabled:opacity-50 dark:bg-white dark:text-[#0A1236] dark:hover:bg-gray-100"
                >
                  {isSubmitting ? "Submitting..." : "Submit Enrollment"}
                </button>

                {submitSuccess && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="rounded-lg border-2 border-emerald-500 bg-emerald-50 p-6 shadow-lg dark:border-emerald-600 dark:bg-emerald-900/20"
                  >
                    <div className="flex items-start gap-3">
                      <svg
                        className="mt-0.5 h-6 w-6 shrink-0 text-emerald-600 dark:text-emerald-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                      <div>
                        <p className="mb-1 font-medium text-emerald-800 dark:text-emerald-200">
                          Enrollment submitted successfully!
                        </p>
                        <p className="text-sm text-emerald-700 dark:text-emerald-300">
                          {submitSuccess === "no-email"
                            ? "We have received your request. Our team will contact you soon."
                            : "Check your email for confirmation. Our team will reach out within 24 hours."}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                )}

                {submitError && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="rounded-lg border border-slate-200 bg-slate-50 p-4 dark:border-slate-800 dark:bg-slate-900/20"
                  >
                    <p className="text-sm text-blue-800 dark:text-blue-200">
                      {submitError}
                    </p>
                  </motion.div>
                )}
              </form>
            </motion.div>
          </div>
        )}
      </section>
    </main>
  )
}
