'use client'

import { useState } from 'react'
import Link from 'next/link'
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

export default function StudentPaymentsPage() {
  const { user, studentId } = useStudentAuth()
  const [term, setTerm] = useState('First Term')
  const [academicYear, setAcademicYear] = useState('2024/2025')

  const { data: feeDetails, isLoading } = useQuery({
    queryKey: ['student-fees', studentId, term, academicYear],
    queryFn: () => FeesAPI.getStudentFeeDetails(studentId || '', { term_id: term, session_id: academicYear }),
    enabled: !!studentId,
  })

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white p-6">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-gray-200 rounded w-1/4"></div>
          <div className="h-4 bg-gray-200 rounded w-1/3"></div>
        </div>
      </div>
    )
  }

  const feeBreakdown = feeDetails?.data?.fee_breakdown || []
  const totalExpected = feeBreakdown.reduce((sum, f) => sum + f.amount, 0)
  const totalPaid = feeBreakdown.reduce((sum, f) => sum + f.amount_paid, 0)
  const totalRemaining = totalExpected - totalPaid

  return (
    <div className="min-h-screen bg-white p-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-navy mb-2">Payments</h1>
        <p className="text-ink-3">Manage all your school fees and payment history</p>
      </div>

      {/* Summary Card */}
      <div className="bg-linear-to-r from-navy to-navy-mid rounded-2xl p-6 text-white mb-8 shadow-lg">
        <div className="grid grid-cols-3 gap-6">
          <div>
            <p className="text-white/80 text-sm mb-1">Total Due</p>
            <p className="text-2xl font-bold">₦{totalExpected.toLocaleString()}</p>
          </div>
          <div>
            <p className="text-white/80 text-sm mb-1">Paid</p>
            <p className="text-2xl font-bold text-emerald-300">✓ ₦{totalPaid.toLocaleString()}</p>
          </div>
          <div>
            <p className="text-white/80 text-sm mb-1">Remaining</p>
            <p className="text-2xl font-bold text-crimson-light">₦{totalRemaining.toLocaleString()}</p>
          </div>
        </div>
      </div>

      {/* Fee Categories */}
      <div className="grid gap-6">
        {feeBreakdown.map((feeItem) => {
          const category = (feeItem.component_name.toLowerCase().replace(/\s+/g, '_') as PaymentCategory) || 'school_fees'
          const categoryInfo = PAYMENT_CATEGORIES[category] || { label: feeItem.component_name, description: '' }
          const paid = feeItem.amount_paid || 0
          const amount = feeItem.amount || 0
          const remaining = Math.max(amount - paid, 0)
          const pct = amount > 0 ? Math.round((paid / amount) * 100) : 0
          const isPaid = pct >= 100

          return (
            <section key={feeItem.component_name} className="bg-white rounded-2xl overflow-hidden border border-canvas-border shadow-sm hover:shadow-md transition-shadow">
              <div className="relative min-h-[180px]">
                <img
                  src={CATEGORY_IMAGES[category]}
                  alt={categoryInfo.label}
                  className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-linear-to-b from-transparent via-navy/40 to-navy/70" />
                <div className="absolute left-6 top-6">
                  <div className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${
                    isPaid ? 'bg-emerald-500 text-white' : pct > 0 ? 'bg-amber-500 text-white' : 'bg-slate-500 text-white'
                  }`}>
                    {isPaid ? 'Paid' : pct > 0 ? 'Partial' : 'Pending'}
                  </div>
                </div>
                <div className="absolute right-6 bottom-6 text-white text-right">
                  <div className="text-3xl font-bold">₦{amount.toLocaleString()}</div>
                  <div className="text-sm opacity-90">Total fee</div>
                </div>
              </div>

              <div className="p-6">
                <div className="flex justify-between items-start gap-4 mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-navy">{categoryInfo.label}</h3>
                    <p className="text-sm text-ink-3 mt-1">{categoryInfo.description}</p>
                  </div>
                  <div className="text-right shrink-0">
                    <p className="text-xs text-ink-3">Paid</p>
                    <p className="text-lg font-bold text-navy">₦{paid.toLocaleString()}</p>
                  </div>
                </div>

                <div className="flex justify-between gap-2 text-sm text-ink-3 mb-3">
                  <span>Remaining: ₦{remaining.toLocaleString()}</span>
                  <span className="font-semibold">{pct}% complete</span>
                </div>

                <div className="h-2 bg-canvas-border rounded-full overflow-hidden mb-6">
                  <div 
                    className={`h-full transition-all ${isPaid ? 'bg-emerald-500' : 'bg-amber-500'}`}
                    style={{ width: `${pct}%` }}
                  />
                </div>

                <div className="flex gap-3 flex-wrap">
                  <Link
                    href={`/student/dashboard/payments/${category}`}
                    className="flex-1 min-w-40 text-center px-4 py-2.5 rounded-lg border border-canvas-border text-navy font-semibold text-sm hover:bg-canvas transition-colors"
                  >
                    View details
                  </Link>
                  {!isPaid && (
                    <button
                      className="flex-1 min-w-[200px] px-4 py-2.5 rounded-lg bg-crimson text-white font-semibold text-sm hover:bg-crimson-deep transition-colors"
                    >
                      Pay ₦{remaining.toLocaleString()}
                    </button>
                  )}
                </div>
              </div>
            </section>
          )
        })}
      </div>
    </div>
  )
}
