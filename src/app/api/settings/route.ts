import { NextResponse } from 'next/server'

export async function GET() {
  return NextResponse.json({
    settings: {
      registration_open: true,
      current_cohort: 15,
      cohort_message: 'Enrollment is open for the 2026/2027 academic session.',
    },
  })
}