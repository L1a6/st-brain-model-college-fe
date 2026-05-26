'use client'

import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import Image from 'next/image'

import { safeJsonFetch } from '@/lib/safeJsonFetch'

interface SiteSettings {
  registration_open: boolean
  current_cohort: number
  cohort_message: string
}

function getOrdinalSuffix(n: number): string {
  const suffixes = ['th', 'st', 'nd', 'rd']
  const value = n % 100
  return suffixes[(value - 20) % 10] || suffixes[value] || suffixes[0]
}

export default function EnrollPage() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    message: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitSuccess, setSubmitSuccess] = useState<boolean | 'no-email'>(false)
  const [submitError, setSubmitError] = useState('')
  const [settings, setSettings] = useState<SiteSettings | null>(null)
  const [loadingSettings, setLoadingSettings] = useState(true)

  useEffect(() => {
    void fetchSettings()
  }, [])

  const fetchSettings = async () => {
    try {
      const data = await safeJsonFetch<{ settings?: SiteSettings }>('/api/settings')
      if (data.settings) {
        setSettings(data.settings)
      }
    } catch (error) {
      console.error('Error fetching settings:', error)
      setSettings({
        registration_open: true,
        current_cohort: 15,
        cohort_message: '',
      })
    } finally {
      setLoadingSettings(false)
    }
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setIsSubmitting(true)
    setSubmitError('')

    try {
      const data = await safeJsonFetch<{
        emailsSent?: boolean
        emailError?: string
        error?: string
        details?: string
      }>('/api/enroll', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      if (data.error || data.details) {
        const message = data.details || data.error || 'Submission failed'
        throw new Error(message)
      }

      setSubmitSuccess(data.emailsSent ? true : 'no-email')
      setFormData({ fullName: '', email: '', phone: '', message: '' })

      if (!data.emailsSent && data.emailError) {
        console.warn('Enrollment email notification failed:', data.emailError)
      }

      setTimeout(() => setSubmitSuccess(false), 8000)
    } catch (error) {
      console.error('Enrollment error:', error)
      setSubmitError(
        error instanceof Error
          ? error.message
          : 'Failed to submit your enrollment request. Please try again.'
      )
    } finally {
      setIsSubmitting(false)
    }
  }

  const cohortLabel = settings?.current_cohort
    ? `${settings.current_cohort}${getOrdinalSuffix(settings.current_cohort)} Cohort`
    : 'Current Cohort'

  return (
    <main className="min-h-screen bg-white dark:bg-[#0A1236] pt-24">
      <section className="relative h-[40vh] flex items-center justify-center overflow-hidden">
        <div className="brand-menu-overlay" />
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=1920&q=80&auto=format&fit=crop"
            alt="St. Brian's Model College students"
            fill
            sizes="100vw"
            className="object-cover"
            priority
          />
        </div>
        <div className="absolute inset-0 bg-[#0A1236]/58" />
        <div className="relative z-20 text-center px-6">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-sm tracking-[0.3em] uppercase text-white/90 mb-4"
          >
            2026 - 2027 Academic Session
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="font-display text-4xl md:text-6xl font-extralight text-white tracking-tight"
          >
            Enroll at St. Brian&apos;s {cohortLabel}
          </motion.h1>
        </div>
      </section>

      <section className="max-w-5xl mx-auto px-6 py-20">
        <AnimatePresence>
          {!loadingSettings && settings && !settings.registration_open && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative overflow-hidden rounded-3xl bg-[#0A1236] p-8 md:p-12 mb-12 shadow-2xl"
            >
              <div className="absolute top-0 right-0 w-64 h-64 bg-[#2563EB]/10 rounded-full blur-3xl" />
              <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full blur-2xl" />

              <div className="relative z-10 text-center max-w-2xl mx-auto">
                <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center">
                  <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>

                <h2 className="font-display text-3xl md:text-4xl font-extralight text-white mb-4">
                  Enrollment Temporarily Closed
                </h2>

                <p className="text-white/80 text-lg leading-relaxed mb-8">
                  {settings.cohort_message || 'We are not currently accepting new enrollment requests. Please check back soon or contact the school office for updates.'}
                </p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <a
                    href="/"
                    className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-white text-[#0A1236] font-medium hover:bg-gray-100 transition-all duration-300 hover:-translate-y-0.5 shadow-lg"
                  >
                    <span>Back to Home</span>
                  </a>
                  <a
                    href="/contact"
                    className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-white/10 backdrop-blur-sm border border-white/30 text-white font-medium hover:bg-white/20 transition-all duration-300"
                  >
                    <span>Contact School</span>
                  </a>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {(loadingSettings || (settings && settings.registration_open)) && (
          <div className="grid md:grid-cols-2 gap-16">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="font-display text-3xl font-light text-gray-900 dark:text-white mb-6">
                Ready to join St. Brian&apos;s Model College?
              </h2>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-8">
                Take the next step toward disciplined learning and strong academic support. Fill out the form and our admissions team will get back to you promptly.
              </p>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-[#0A1236]/10 dark:bg-white/10 flex items-center justify-center flex-shrink-0">
                    <svg className="w-6 h-6 text-[#0A1236] dark:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-display text-lg font-medium text-gray-900 dark:text-white mb-2">
                      Experienced Teachers
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 text-sm">
                      Learn from dedicated staff committed to academic excellence and character.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-[#0A1236]/10 dark:bg-white/10 flex items-center justify-center flex-shrink-0">
                    <svg className="w-6 h-6 text-[#0A1236] dark:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-display text-lg font-medium text-gray-900 dark:text-white mb-2">
                      Small Class Sizes
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 text-sm">
                      Personalized attention in a calm and focused learning environment.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-[#0A1236]/10 dark:bg-white/10 flex items-center justify-center flex-shrink-0">
                    <svg className="w-6 h-6 text-[#0A1236] dark:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-display text-lg font-medium text-gray-900 dark:text-white mb-2">
                      Academic Records
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 text-sm">
                      Receive proper academic records, progress tracking, and onboarding support.
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
                  <label className="block text-sm font-medium text-gray-900 dark:text-white mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.fullName}
                    onChange={(event) => setFormData({ ...formData, fullName: event.target.value })}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#0A1236] dark:focus:ring-white transition-all"
                    placeholder="Enter your full name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-900 dark:text-white mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(event) => setFormData({ ...formData, email: event.target.value })}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#0A1236] dark:focus:ring-white transition-all"
                    placeholder="you@example.com"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-900 dark:text-white mb-2">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(event) => setFormData({ ...formData, phone: event.target.value })}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#0A1236] dark:focus:ring-white transition-all"
                    placeholder="+234 xxx xxx xxxx"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-900 dark:text-white mb-2">
                    Your Message
                  </label>
                  <textarea
                    value={formData.message}
                    onChange={(event) => setFormData({ ...formData, message: event.target.value })}
                    rows={4}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#0A1236] dark:focus:ring-white transition-all resize-none"
                    placeholder="Tell us about the class you want to join and anything we should know..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full px-8 py-4 rounded-full text-sm font-medium text-white bg-[#0A1236] dark:bg-white dark:text-[#0A1236] hover:bg-[#0A1236]/90 dark:hover:bg-gray-100 transition-all duration-400 hover:-translate-y-0.5 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? 'Submitting...' : 'Submit Enrollment'}
                </button>

                {submitSuccess && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-6 rounded-lg bg-emerald-50 dark:bg-emerald-900/20 border-2 border-emerald-500 dark:border-emerald-600 shadow-lg"
                  >
                    <div className="flex items-start gap-3">
                      <svg className="w-6 h-6 text-emerald-600 dark:text-emerald-400 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <div>
                        <p className="text-emerald-800 dark:text-emerald-200 font-medium mb-1">
                          Enrollment submitted successfully!
                        </p>
                        <p className="text-emerald-700 dark:text-emerald-300 text-sm">
                          {submitSuccess === 'no-email'
                            ? 'We have received your request. Our team will contact you soon.'
                            : 'Check your email for confirmation. Our team will reach out within 24 hours.'}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                )}

                {submitError && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-4 rounded-lg bg-slate-50 dark:bg-slate-900/20 border border-slate-200 dark:border-slate-800"
                  >
                    <p className="text-blue-800 dark:text-blue-200 text-sm">{submitError}</p>
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