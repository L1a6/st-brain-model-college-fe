"use client"

import { useQuery } from "@tanstack/react-query"
import { Mail, Phone, MessageSquareText, CalendarDays } from "lucide-react"

import { DashboardAPI } from "@/lib/dashboard"

export default function EnrollmentsPage() {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["enrollments"],
    queryFn: () => DashboardAPI.getEnrollments(1, 20),
    select: (response) => response.data,
  })

  const enrollments = data?.data ?? []

  return (
    <section className="px-4 py-6 sm:px-6 lg:px-8">
      <div className="mb-6 flex items-end justify-between gap-4">
        <div>
          <p className="text-xs tracking-[0.22em] text-neutral-400 uppercase">
            Admissions
          </p>
          <h1 className="mt-2 text-2xl font-semibold text-neutral-900 dark:text-white">
            Enrollments
          </h1>
          <p className="mt-1 text-sm text-neutral-500">
            Recent form submissions from the public enroll page.
          </p>
        </div>
      </div>

      {isLoading && (
        <div className="rounded-2xl border border-dashed border-neutral-200 p-8 text-sm text-neutral-500">
          Loading enrollments...
        </div>
      )}

      {isError && (
        <div className="rounded-2xl border border-red-200 bg-red-50 p-6 text-sm text-red-700">
          {error?.message || "Failed to load enrollments."}
        </div>
      )}

      {!isLoading && !isError && (
        <div className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            <div className="rounded-2xl border border-neutral-200 bg-white p-4 shadow-sm dark:border-white/10 dark:bg-white/5">
              <p className="text-xs tracking-[0.18em] text-neutral-400 uppercase">
                Total
              </p>
              <p className="mt-2 text-2xl font-semibold text-neutral-900 dark:text-white">
                {data?.total ?? enrollments.length}
              </p>
            </div>
            <div className="rounded-2xl border border-neutral-200 bg-white p-4 shadow-sm dark:border-white/10 dark:bg-white/5">
              <p className="text-xs tracking-[0.18em] text-neutral-400 uppercase">
                Current page
              </p>
              <p className="mt-2 text-2xl font-semibold text-neutral-900 dark:text-white">
                {data?.page ?? 1}
              </p>
            </div>
            <div className="rounded-2xl border border-neutral-200 bg-white p-4 shadow-sm dark:border-white/10 dark:bg-white/5">
              <p className="text-xs tracking-[0.18em] text-neutral-400 uppercase">
                Per page
              </p>
              <p className="mt-2 text-2xl font-semibold text-neutral-900 dark:text-white">
                {data?.limit ?? 20}
              </p>
            </div>
            <div className="rounded-2xl border border-neutral-200 bg-white p-4 shadow-sm dark:border-white/10 dark:bg-white/5">
              <p className="text-xs tracking-[0.18em] text-neutral-400 uppercase">
                Pages
              </p>
              <p className="mt-2 text-2xl font-semibold text-neutral-900 dark:text-white">
                {data?.total_pages ?? 1}
              </p>
            </div>
          </div>

          <div className="overflow-hidden rounded-3xl border border-neutral-200 bg-white shadow-sm dark:border-white/10 dark:bg-white/5">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-neutral-200 text-left dark:divide-white/10">
                <thead className="bg-neutral-50 dark:bg-white/5">
                  <tr>
                    <th className="px-5 py-4 text-xs font-semibold tracking-[0.16em] text-neutral-500 uppercase">
                      Applicant
                    </th>
                    <th className="px-5 py-4 text-xs font-semibold tracking-[0.16em] text-neutral-500 uppercase">
                      Contact
                    </th>
                    <th className="px-5 py-4 text-xs font-semibold tracking-[0.16em] text-neutral-500 uppercase">
                      Message
                    </th>
                    <th className="px-5 py-4 text-xs font-semibold tracking-[0.16em] text-neutral-500 uppercase">
                      Submitted
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-200 dark:divide-white/10">
                  {enrollments.map((entry) => (
                    <tr key={entry.id} className="align-top">
                      <td className="px-5 py-4">
                        <div className="font-medium text-neutral-900 dark:text-white">
                          {entry.full_name}
                        </div>
                        <div className="mt-1 text-xs tracking-[0.18em] text-neutral-400 uppercase">
                          {entry.school_name || "St. Brian's Model College"}
                        </div>
                        <div className="bg-crimson/10 text-crimson mt-2 inline-flex rounded-full px-2.5 py-1 text-xs font-medium">
                          {entry.status}
                        </div>
                      </td>
                      <td className="px-5 py-4 text-sm text-neutral-600 dark:text-neutral-300">
                        <div className="flex items-center gap-2">
                          <Mail className="h-4 w-4 shrink-0 text-neutral-400" />
                          <span>{entry.email}</span>
                        </div>
                        <div className="mt-2 flex items-center gap-2">
                          <Phone className="h-4 w-4 shrink-0 text-neutral-400" />
                          <span>{entry.phone || "Not provided"}</span>
                        </div>
                      </td>
                      <td className="px-5 py-4 text-sm text-neutral-600 dark:text-neutral-300">
                        <div className="flex items-start gap-2">
                          <MessageSquareText className="mt-0.5 h-4 w-4 shrink-0 text-neutral-400" />
                          <p className="max-w-xl leading-relaxed whitespace-pre-line">
                            {entry.message}
                          </p>
                        </div>
                      </td>
                      <td className="px-5 py-4 text-sm text-neutral-600 dark:text-neutral-300">
                        <div className="flex items-center gap-2">
                          <CalendarDays className="h-4 w-4 shrink-0 text-neutral-400" />
                          <span>{new Date(entry.created_at).toLocaleString()}</span>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {enrollments.length === 0 && (
              <div className="border-t border-neutral-200 p-8 text-sm text-neutral-500 dark:border-white/10">
                No enrollments have been submitted yet.
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  )
}
