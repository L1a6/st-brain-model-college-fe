// Portal payment types
export type PaymentCategory =
  | "school_fees"
  | "textbooks"
  | "uniform"
  | "graduation"
  | "bus_fee"
  | "exam_fee"

export interface PaymentCategoryInfo {
  label: string
  description: string
}

export const PAYMENT_CATEGORIES: Record<PaymentCategory, PaymentCategoryInfo> = {
  school_fees: {
    label: "School Fees",
    description: "General tuition and academic fees",
  },
  textbooks: {
    label: "Textbooks",
    description: "Course materials and textbooks",
  },
  uniform: {
    label: "Uniform",
    description: "School uniform and official wear",
  },
  graduation: {
    label: "Graduation",
    description: "Graduation ceremony and materials",
  },
  bus_fee: {
    label: "Bus Fee",
    description: "School transportation fees",
  },
  exam_fee: {
    label: "Exam Fee",
    description: "Examination and test fees",
  },
}

export interface StudentPayment {
  id: string
  studentId: string
  studentName: string
  className: string
  category: PaymentCategory
  amount: number
  paidAmount: number
  status: "paid" | "pending" | "partial"
  reference: string
  paystackReference?: string
  date: string
  term: string
  academicYear: string
}
