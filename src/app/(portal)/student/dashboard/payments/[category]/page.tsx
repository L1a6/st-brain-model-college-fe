"use client"

import Image from "next/image"
import { useState } from "react"
import Link from "next/link"
import { useParams } from "next/navigation"
import { useStudentAuth } from "@/hooks/use-auth-user"
import { useQuery } from "@tanstack/react-query"
import { FeesAPI } from "@/lib/fees"
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

type PaymentRecord = {
  payment_date?: string
  date?: string
  created_at?: string
  createdAt?: string
  transaction_reference?: string
  reference?: string
  paystackReference?: string
  amount_paid?: number
  paidAmount?: number
}

function getPaymentDate(payment: PaymentRecord): string {
  const rawDate =
    payment.payment_date || payment.date || payment.created_at || payment.createdAt
  return rawDate
    ? new Date(rawDate).toLocaleDateString("en-NG", {
        day: "numeric",
        month: "short",
        year: "numeric",
      })
    : "Pending"
}

function getPaymentReference(payment: PaymentRecord): string {
  return (
    payment.transaction_reference ||
    payment.reference ||
    payment.paystackReference ||
    "No reference"
  )
}

export default function PaymentDetailPage() {
  const params = useParams<{ category?: string }>()
  const rawCategory = Array.isArray(params?.category)
    ? params.category[0]
    : params?.category
  const category = (
    rawCategory && rawCategory in PAYMENT_CATEGORIES ? rawCategory : null
  ) as PaymentCategory | null

  const { studentId } = useStudentAuth()
  const [term] = useState("First Term")
  const [academicYear] = useState("2024/2025")

  const { data: feeDetails, isLoading } = useQuery({
    queryKey: ["student-fees", studentId, term, academicYear],
    queryFn: () =>
      FeesAPI.getStudentFeeDetails(studentId || "", {
        term_id: term,
        session_id: academicYear,
      }),
    enabled: !!studentId,
  })

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white p-6">
        <div className="animate-pulse space-y-4">
          <div className="h-8 w-1/4 rounded bg-gray-200" />
          <div className="h-72 rounded-3xl bg-gray-100" />
        </div>
      </div>
    )
  }

  if (!category || !feeDetails) {
    return (
      <div className="min-h-screen bg-white p-6">
        <div className="mb-6">
          <h1 className="mb-2 text-2xl font-bold text-[#0A1F44]">Payment details</h1>
          <p className="text-slate-500">The selected fee could not be found</p>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <p className="mb-4 text-slate-500">
            Use the payments page to pick a fee category.
          </p>
          <Link
            href="/student/dashboard/payments"
            className="font-semibold text-[#0A1F44] hover:underline"
          >
            Back to payments
          </Link>
        </div>
      </div>
    )
  }

  const categoryInfo = PAYMENT_CATEGORIES[category]
  const feeBreakdown = (feeDetails.data?.data?.fee_breakdown || []) as Array<{
    component_name: string
    amount?: number
    amount_paid?: number
    status?: string
  }>
  const normalizedCategory = category.replace(/_/g, " ")
  const feeItem = feeBreakdown.find(
    (item: { component_name: string }) =>
      item.component_name.toLowerCase() === normalizedCategory
  )
  const amount = feeItem?.amount || 0
  const paid = feeItem?.amount_paid || 0
  const remaining = Math.max(amount - paid, 0)
  const isPaid = amount > 0 ? remaining <= 0 : false
  const paymentHistory = (
    (feeDetails.data?.data?.payment_history || []) as Array<{ fee_component?: string }>
  ).filter((item) =>
    (item.fee_component || "").toLowerCase().includes(normalizedCategory)
  ) as PaymentRecord[]

  const details = {
    info: categoryInfo,
    amount,
    paid,
    remaining,
    isPaid,
    paymentHistory,
    pct: amount > 0 ? Math.round((paid / amount) * 100) : 0,
    status: feeItem?.status,
  }

  return (
    <div className="mx-auto min-h-screen max-w-6xl bg-white p-6 md:p-8 lg:p-10">
      <div className="mb-6 flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="mb-3 text-xs tracking-[0.32em] text-slate-500 uppercase">
            Payment category
          </p>
          <h1 className="font-display text-3xl font-semibold text-[#0A1F44] md:text-5xl">
            {details.info.label}
          </h1>
          <p className="mt-3 max-w-2xl text-sm text-slate-600 md:text-base">
            {details.info.description}
          </p>
        </div>
        <Link
          href="/student/dashboard/payments"
          className="shrink-0 rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-[#0A1F44] shadow-sm transition-colors hover:bg-[#0A1F44]/5"
        >
          ← Back to payments
        </Link>
      </div>

      <div className="mb-6 overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-[0_14px_36px_rgba(15,23,42,0.06)]">
        <div className="relative min-h-72 md:min-h-[360px]">
          <Image
            src={CATEGORY_IMAGES[category]}
            alt={details.info.label}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 1200px"
            priority
          />
          <div className="absolute inset-0 bg-linear-to-b from-transparent via-[#0A1F44]/35 to-[#0A1F44]/86" />
          <div className="absolute top-5 left-5 flex flex-wrap gap-2">
            <span
              className={`rounded-full px-3 py-1 text-xs font-semibold ${details.isPaid ? "bg-emerald-500 text-white" : details.paid > 0 ? "bg-amber-500 text-white" : "bg-slate-500 text-white"}`}
            >
              {details.isPaid ? "Paid" : details.paid > 0 ? "Partial" : "Pending"}
            </span>
            <span className="rounded-full bg-white/12 px-3 py-1 text-xs font-semibold text-white backdrop-blur-sm">
              {details.pct}% complete
            </span>
          </div>
          <div className="absolute bottom-5 left-5 text-white">
            <div className="text-4xl font-bold md:text-5xl">
              ₦{details.amount.toLocaleString()}
            </div>
            <div className="mt-1 text-sm text-white/85 md:text-base">
              Total fee for this category
            </div>
          </div>
        </div>

        <div className="p-4 md:p-6">
          <div className="mb-5 grid gap-3 md:grid-cols-3">
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-3.5">
              <p className="mb-1 text-xs tracking-[0.2em] text-slate-500 uppercase">
                Paid
              </p>
              <p className="text-xl font-bold text-[#0A1F44]">
                ₦{details.paid.toLocaleString()}
              </p>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-3.5">
              <p className="mb-1 text-xs tracking-[0.2em] text-slate-500 uppercase">
                Remaining
              </p>
              <p className="text-xl font-bold text-[#0A1F44]">
                ₦{details.remaining.toLocaleString()}
              </p>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-3.5">
              <p className="mb-1 text-xs tracking-[0.2em] text-slate-500 uppercase">
                Progress
              </p>
              <p className="text-xl font-bold text-[#0A1F44]">{details.pct}%</p>
            </div>
          </div>

          <div className="mb-6 h-3 overflow-hidden rounded-full bg-slate-200">
            <div
              className={`h-full rounded-full ${details.isPaid ? "bg-emerald-500" : details.paid > 0 ? "bg-amber-500" : "bg-[#0A1F44]"}`}
              style={{ width: `${details.pct}%` }}
            />
          </div>

          <div className="mb-6 flex flex-wrap gap-3">
            <span className="inline-flex rounded-full bg-[#0A1F44]/8 px-3 py-1 text-xs font-semibold text-[#0A1F44]">
              {details.paymentHistory.length} payment record
              {details.paymentHistory.length === 1 ? "" : "s"}
            </span>
            <span
              className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${details.isPaid ? "bg-emerald-100 text-emerald-700" : details.paid > 0 ? "bg-amber-100 text-amber-700" : "bg-slate-100 text-slate-700"}`}
            >
              {details.isPaid ? "Fully settled" : "Still open"}
            </span>
          </div>

          <div className="flex flex-wrap gap-3">
            {!details.isPaid && (
              <button className="rounded-2xl bg-[#0A1F44] px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#0E2A59]">
                Pay ₦{details.remaining.toLocaleString()}
              </button>
            )}
            <Link
              href="/student/dashboard/payments"
              className="rounded-2xl border border-slate-200 bg-white px-6 py-2.5 text-sm font-semibold text-[#0A1F44] transition-colors hover:bg-[#0A1F44]/5"
            >
              Back to overview
            </Link>
          </div>
        </div>
      </div>

      <div className="grid gap-4">
        <h3 className="text-xs font-extrabold tracking-[0.18em] text-[#0A1F44] uppercase">
          Payment history
        </h3>
        {details.paymentHistory.length === 0 ? (
          <div className="rounded-2xl border border-slate-200 bg-white p-6 text-slate-500 shadow-sm">
            No payments recorded yet for this fee.
          </div>
        ) : (
          details.paymentHistory.map((payment: PaymentRecord, idx: number) => (
            <div
              key={`${getPaymentDate(payment)}-${getPaymentReference(payment)}-${idx}`}
              className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
            >
              <div>
                <p className="text-base font-bold text-[#0A1F44]">
                  ₦{(payment.amount_paid || payment.paidAmount || 0).toLocaleString()}
                </p>
                <p className="mt-1 text-xs text-slate-500">
                  {getPaymentDate(payment)} · {getPaymentReference(payment)}
                </p>
              </div>
              <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-700">
                Paid
              </span>
            </div>
          ))
        )}
      </div>
    </div>
  )
}
