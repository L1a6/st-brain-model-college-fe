"use client"

import Image from "next/image"
import { useMemo, useState } from "react"
import Link from "next/link"
import { useQuery } from "@tanstack/react-query"

import { FeesAPI } from "@/lib/fees"
import { useStudentAuth } from "@/hooks/use-auth-user"
import { PAYMENT_CATEGORIES, type PaymentCategory } from "@/types/portal"

const CATEGORY_IMAGES: Record<PaymentCategory, string> = {
  school_fees:
    "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=1600&q=80",
  textbooks:
    "https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=1600&q=80",
  uniform:
    "https://images.unsplash.com/photo-1523580846011-d3a5bc25702f?auto=format&fit=crop&w=1600&q=80",
  graduation:
    "https://images.unsplash.com/photo-1509099836639-18ba2b8e0d3b?auto=format&fit=crop&w=1600&q=80",
  bus_fee:
    "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=1600&q=80",
  exam_fee:
    "https://images.unsplash.com/photo-1516979187457-637abb4f9353?auto=format&fit=crop&w=1600&q=80",
}

export default function StudentPaymentsPage() {
  const { studentId } = useStudentAuth()
  const [term, setTerm] = useState("First Term")
  const [academicYear, setAcademicYear] = useState("2024/2025")

  const { data: feeDetails, isLoading } = useQuery({
    queryKey: ["student-fees", studentId, term, academicYear],
    queryFn: () =>
      FeesAPI.getStudentFeeDetails(studentId || "", {
        term_id: term,
        session_id: academicYear,
      }),
    enabled: !!studentId,
    refetchOnWindowFocus: false,
  })

  const paymentCards = useMemo(() => {
    const feeBreakdown = feeDetails?.data?.data?.fee_breakdown || []
    const feeMap = new Map(
      feeBreakdown.map((feeItem) => {
        const rawCategory = feeItem.component_name
          .toLowerCase()
          .replace(/\s+/g, "_") as PaymentCategory
        const category = rawCategory in PAYMENT_CATEGORIES ? rawCategory : "school_fees"

        return [
          category,
          {
            amount: feeItem.amount || 0,
            paid: feeItem.amount_paid || 0,
            sourceLabel: feeItem.component_name,
          },
        ] as const
      })
    )

    return (
      Object.entries(PAYMENT_CATEGORIES) as Array<
        [PaymentCategory, (typeof PAYMENT_CATEGORIES)[PaymentCategory]]
      >
    ).map(([category, info]) => {
      const feeItem = feeMap.get(category)
      const amount = feeItem?.amount || 0
      const paid = feeItem?.paid || 0
      const remaining = Math.max(amount - paid, 0)
      const pct = amount > 0 ? Math.round((paid / amount) * 100) : 0
      const isPaid = pct >= 100 && amount > 0
      const isPartial = pct > 0 && pct < 100

      return {
        category,
        info,
        amount,
        paid,
        remaining,
        pct,
        isPaid,
        isPartial,
        hasRecord: !!feeItem,
      }
    })
  }, [feeDetails])

  const totalExpected = paymentCards.reduce((sum, item) => sum + item.amount, 0)
  const totalPaid = paymentCards.reduce((sum, item) => sum + item.paid, 0)
  const totalRemaining = Math.max(totalExpected - totalPaid, 0)
  const paidCount = paymentCards.filter((item) => item.isPaid).length
  const partialCount = paymentCards.filter((item) => item.isPartial).length
  const pendingCount = paymentCards.length - paidCount - partialCount

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white p-6">
        <div className="animate-pulse space-y-4">
          <div className="h-8 w-1/4 rounded bg-gray-200" />
          <div className="h-4 w-1/3 rounded bg-gray-200" />
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white p-6 md:p-8 lg:p-10">
      <div className="mb-6 flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="mb-3 text-xs tracking-[0.3em] text-slate-500 uppercase">
            Student Payments
          </p>
          <h1 className="font-display text-3xl font-semibold text-[#0A1F44] md:text-5xl">
            Payments by category
          </h1>
          <p className="mt-3 max-w-2xl text-sm text-slate-600 md:text-base">
            Every fee category has its own card and image so students can quickly see what
            is due, what has been paid, and what is still open.
          </p>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white px-4 py-3 shadow-sm">
          <p className="mb-1 text-xs tracking-[0.2em] text-slate-500 uppercase">
            Summary
          </p>
          <p className="text-sm font-semibold text-[#0A1F44]">
            ₦{totalPaid.toLocaleString()} paid
          </p>
          <p className="text-sm text-slate-500">
            ₦{totalRemaining.toLocaleString()} remaining
          </p>
        </div>
      </div>

      <div className="mb-6 flex flex-wrap gap-3">
        <div className="rounded-full bg-[#0A1F44]/8 px-4 py-2 text-sm font-semibold text-[#0A1F44]">
          {paidCount} paid
        </div>
        <div className="rounded-full bg-amber-50 px-4 py-2 text-sm font-semibold text-amber-700">
          {partialCount} partial
        </div>
        <div className="rounded-full bg-slate-100 px-4 py-2 text-sm font-semibold text-slate-700">
          {pendingCount} pending
        </div>
      </div>

      <div className="grid gap-6">
        {paymentCards.map((item) => {
          const statusLabel = item.isPaid
            ? "Paid"
            : item.isPartial
              ? "Partial"
              : "Pending"
          const statusClass = item.isPaid
            ? "bg-emerald-500 text-white"
            : item.isPartial
              ? "bg-amber-500 text-white"
              : "bg-slate-500 text-white"
          const detailHref = `/student/dashboard/payments/${item.category}`

          return (
            <section
              key={item.category}
              className="overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-[0_14px_36px_rgba(15,23,42,0.06)] transition-transform duration-300 hover:-translate-y-1 hover:shadow-[0_20px_48px_rgba(10,31,68,0.12)]"
            >
              <div className="relative min-h-52 md:min-h-60">
                <Image
                  src={CATEGORY_IMAGES[item.category]}
                  alt={item.info.label}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 1200px"
                />
                <div className="absolute inset-0 bg-linear-to-b from-transparent via-[#0A1F44]/35 to-[#0A1F44]/82" />
                <div className="absolute top-5 left-5 flex flex-wrap items-center gap-2">
                  <span
                    className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${statusClass}`}
                  >
                    {statusLabel}
                  </span>
                  {item.hasRecord && (
                    <span className="inline-flex rounded-full bg-white/12 px-3 py-1 text-xs font-semibold text-white backdrop-blur-sm">
                      {item.pct}% complete
                    </span>
                  )}
                </div>
                <div className="absolute right-5 bottom-5 text-right text-white">
                  <div className="text-3xl font-bold md:text-4xl">
                    ₦{item.amount.toLocaleString()}
                  </div>
                  <div className="mt-1 text-xs tracking-[0.24em] text-white/75 uppercase">
                    {item.info.label}
                  </div>
                </div>
              </div>

              <div className="p-4 md:p-5">
                <div className="mb-5 flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                  <div className="max-w-2xl">
                    <h3 className="font-display mb-2 text-xl font-semibold text-[#0A1F44] md:text-2xl">
                      {item.info.label}
                    </h3>
                    <p className="line-clamp-2 text-sm leading-relaxed text-slate-600">
                      {item.info.description}
                    </p>
                  </div>
                  <div className="shrink-0 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-2 text-right">
                    <p className="mb-1 text-xs tracking-[0.2em] text-slate-500 uppercase">
                      Paid
                    </p>
                    <p className="text-lg font-bold text-[#0A1F44]">
                      ₦{item.paid.toLocaleString()}
                    </p>
                  </div>
                </div>

                <div className="mb-3 flex flex-wrap items-center justify-between gap-2 text-sm text-slate-600">
                  <span>Remaining: ₦{item.remaining.toLocaleString()}</span>
                  <span className="font-semibold text-[#0A1F44]">
                    {item.pct}% complete
                  </span>
                </div>

                <div className="flex flex-wrap gap-3">
                  <Link
                    href={detailHref}
                    className="min-w-[180px] flex-1 rounded-2xl border border-slate-200 bg-white px-4 py-2.5 text-center text-sm font-semibold text-[#0A1F44] transition-colors hover:border-[#0A1F44]/30 hover:bg-[#0A1F44]/5"
                  >
                    View details
                  </Link>
                  <button
                    className={`min-w-[220px] flex-1 rounded-2xl px-4 py-2.5 text-sm font-semibold text-white transition-colors ${item.isPaid ? "cursor-default bg-emerald-500" : "bg-[#0A1F44] hover:bg-[#0E2A59]"}`}
                    disabled={item.isPaid}
                  >
                    {item.isPaid
                      ? "Payment completed"
                      : `Pay ₦${item.remaining.toLocaleString()}`}
                  </button>
                </div>
              </div>
            </section>
          )
        })}
      </div>

      <div className="mt-6 flex flex-wrap gap-3 rounded-3xl border border-slate-200 bg-white p-4 shadow-sm">
        <label className="flex min-w-[220px] flex-1 flex-col gap-2 text-sm text-slate-600">
          Term
          <input
            value={term}
            onChange={(event) => setTerm(event.target.value)}
            className="rounded-2xl border border-slate-200 px-4 py-3 text-sm transition-colors outline-none focus:border-[#0A1F44]"
          />
        </label>
        <label className="flex min-w-[220px] flex-1 flex-col gap-2 text-sm text-slate-600">
          Academic year
          <input
            value={academicYear}
            onChange={(event) => setAcademicYear(event.target.value)}
            className="rounded-2xl border border-slate-200 px-4 py-3 text-sm transition-colors outline-none focus:border-[#0A1F44]"
          />
        </label>
      </div>
    </div>
  )
}
