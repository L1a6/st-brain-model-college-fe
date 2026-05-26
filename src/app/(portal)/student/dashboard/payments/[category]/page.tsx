'use client'

import { useMemo, useState } from 'react'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { useStudentAuth } from '@/hooks/use-auth-user'
import { useQuery } from '@tanstack/react-query'
import { FeesAPI } from '@/lib/fees'
import { PAYMENT_CATEGORIES, type PaymentCategory } from '@/types/portal'

const CATEGORY_IMAGES: Record<PaymentCategory, string> = {
  school_fees: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=1400&q=80',
  textbooks: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=1400&q=80',
  uniform: 'https://images.unsplash.com/photo-1523580846011-d3a5bc25702f?auto=format&fit=crop&w=1400&q=80',
  graduation: 'https://images.unsplash.com/photo-1509099836639-18ba2b8e0d3b?auto=format&fit=crop&w=1400&q=80',
  bus_fee: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=1400&q=80',
  exam_fee: 'https://images.unsplash.com/photo-1516979187457-637abb4f9353?auto=format&fit=crop&w=1400&q=80',
}

export default function PaymentDetailPage() {
  const params = useParams<{ category?: string }>()
  const rawCategory = Array.isArray(params?.category) ? params.category[0] : params?.category
  const category = (rawCategory && rawCategory in PAYMENT_CATEGORIES ? rawCategory : null) as PaymentCategory | null

  const { user, studentId } = useStudentAuth()
  const [term] = useState('First Term')
  const [academicYear] = useState('2024/2025')

  const { data: feeDetails, isLoading } = useQuery({
    queryKey: ['student-fees', studentId, term, academicYear],
    queryFn: () => FeesAPI.getStudentFeeDetails(studentId || '', { term_id: term, session_id: academicYear }),
    enabled: !!studentId,
  })

  const details = useMemo(() => {
    if (!category || !feeDetails) return null

    const categoryInfo = PAYMENT_CATEGORIES[category]
    const feeBreakdown = feeDetails.data?.fee_breakdown || []
    const feeItem = feeBreakdown.find(f => f.component_name.toLowerCase() === category.replace(/_/g, ' '))

    if (!feeItem) return null

    const amount = feeItem.amount || 0
    const paid = feeItem.amount_paid || 0
    const remaining = Math.max(amount - paid, 0)
    const isPaid = remaining <= 0 && amount > 0
    const paymentHistory = feeDetails.data?.payment_history?.filter(p => 
      p.fee_component.toLowerCase().includes(category.replace(/_/g, ' '))
    ) || []

    return {
      info: categoryInfo,
      amount,
      paid,
      remaining,
      isPaid,
      paymentHistory,
      pct: amount > 0 ? Math.round((paid / amount) * 100) : 0,
      status: feeItem.status,
    }
  }, [category, feeDetails])

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white p-6">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-gray-200 rounded w-1/4"></div>
        </div>
      </div>
    )
  }

  if (!category || !details) {
    return (
      <div className="min-h-screen bg-white p-6">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-navy mb-2">Payment details</h1>
          <p className="text-ink-3">The selected fee could not be found</p>
        </div>
        <div className="bg-white border border-canvas-border rounded-lg p-6">
          <p className="text-ink-3 mb-4">Use the payments page to pick a fee category.</p>
          <Link href="/student/dashboard/payments" className="text-crimson font-semibold hover:text-crimson-deep">
            Back to payments
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white p-6 max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex justify-between items-start gap-4 mb-6">
        <div>
          <h1 className="text-3xl font-bold text-navy">{details.info.label}</h1>
          <p className="text-ink-3 mt-2">{details.info.description}</p>
        </div>
        <Link
          href="/student/dashboard/payments"
          className="px-4 py-2 bg-canvas border border-canvas-border rounded-lg text-navy font-semibold text-sm hover:bg-gold-muted transition-colors flex-shrink-0"
        >
          ← Back
        </Link>
      </div>

      {/* Hero Image Card */}
      <div className="bg-white border border-canvas-border rounded-2xl overflow-hidden shadow-sm mb-6">
        <div className="relative min-h-[300px]">
          <img
            src={CATEGORY_IMAGES[category]}
            alt={details.info.label}
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-navy/40 to-navy/80" />
          <div className="absolute left-6 top-6">
            <div className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${
              details.isPaid ? 'bg-emerald-500 text-white' : details.paid > 0 ? 'bg-amber-500 text-white' : 'bg-slate-500 text-white'
            }`}>
              {details.isPaid ? 'Paid' : details.paid > 0 ? 'Partial' : 'Pending'}
            </div>
          </div>
          <div className="absolute left-6 bottom-6 text-white">
            <div className="text-4xl font-bold">₦{details.amount.toLocaleString()}</div>
            <div className="text-sm opacity-90 mt-1">Total fee for this category</div>
          </div>
        </div>

        <div className="p-8">
          {/* Stats Grid */}
          <div className="grid grid-cols-3 gap-4 mb-6">
            <div className="bg-canvas border border-canvas-border rounded-lg p-4">
              <p className="text-xs text-ink-3 mb-1">Paid</p>
              <p className="text-2xl font-bold text-navy">₦{details.paid.toLocaleString()}</p>
            </div>
            <div className="bg-canvas border border-canvas-border rounded-lg p-4">
              <p className="text-xs text-ink-3 mb-1">Remaining</p>
              <p className="text-2xl font-bold text-navy">₦{details.remaining.toLocaleString()}</p>
            </div>
            <div className="bg-canvas border border-canvas-border rounded-lg p-4">
              <p className="text-xs text-ink-3 mb-1">Progress</p>
              <p className="text-2xl font-bold text-navy">{details.pct}%</p>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="h-3 bg-canvas-border rounded-full overflow-hidden mb-6">
            <div 
              className={`h-full transition-all ${details.isPaid ? 'bg-emerald-500' : 'bg-amber-500'}`}
              style={{ width: `${details.pct}%` }}
            />
          </div>

          {/* Info Badges */}
          <div className="flex gap-3 mb-6 flex-wrap">
            <div className="inline-block px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-semibold">
              {details.paymentHistory.length} payment record{details.paymentHistory.length === 1 ? '' : 's'}
            </div>
            <div className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${
              details.isPaid ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'
            }`}>
              {details.isPaid ? 'Fully settled' : 'Still open'}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 flex-wrap">
            {!details.isPaid && (
              <button className="px-6 py-3 bg-crimson text-white rounded-lg font-semibold hover:bg-crimson-deep transition-colors">
                Pay ₦{details.remaining.toLocaleString()}
              </button>
            )}
            <Link
              href="/student/dashboard/payments"
              className="px-6 py-3 bg-canvas border border-canvas-border text-navy rounded-lg font-semibold hover:bg-gold-muted transition-colors"
            >
              Back to overview
            </Link>
          </div>
        </div>
      </div>

      {/* Payment History */}
      <div className="mt-8">
        <h3 className="text-lg font-bold text-navy mb-4 uppercase tracking-wide">Payment history</h3>
        {details.paymentHistory.length === 0 ? (
          <div className="bg-white border border-canvas-border rounded-lg p-6 text-center text-ink-3">
            No payments recorded yet for this fee.
          </div>
        ) : (
          <div className="space-y-3">
            {details.paymentHistory.map((payment, idx) => (
              <div key={idx} className="bg-white border border-canvas-border rounded-lg p-4 flex items-center justify-between gap-4 hover:border-canvas transition-colors">
                <div>
                  <p className="font-bold text-navy">₦{(payment.amount_paid || 0).toLocaleString()}</p>
                  <p className="text-xs text-ink-3 mt-1">
                    {new Date(payment.payment_date).toLocaleDateString('en-NG', { day: 'numeric', month: 'short', year: 'numeric' })} · {payment.transaction_reference}
                  </p>
                </div>
                <div className="px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full text-xs font-semibold flex-shrink-0">
                  Paid
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
