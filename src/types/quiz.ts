// Quiz types for student portal
export type QuestionType = 'multiple_choice' | 'short_answer' | 'true_false'

export interface QuizQuestion {
  id: string
  text: string
  type: QuestionType
  options?: string[] // for multiple choice
  correctAnswer: string
  points: number
}

export interface Quiz {
  id: string
  title: string
  subject: string
  description?: string
  questions: QuizQuestion[]
  timeLimitMinutes: number
  dueDate: string
  createdBy: string // teacher ID
  classId: string
  term_id: string
  session_id: string
  status: 'draft' | 'published' | 'closed'
  createdAt: string
  updatedAt: string
}

export interface QuizSubmission {
  id: string
  quizId: string
  studentId: string
  studentName: string
  answers: Record<string, string>
  score: number
  maxScore: number
  status: 'in_progress' | 'submitted' | 'graded'
  submittedAt: string
  timeSpentSeconds: number
}

export interface StudentQuizzesResponse {
  quizzes: Quiz[]
  submissions: Record<string, QuizSubmission>
  total: number
  page: number
  limit: number
}

export interface QuizAnswerPayload {
  quizId: string
  studentId: string
  answers: Record<string, string>
  timeSpentSeconds: number
}

export interface QuizSubmissionResponse {
  id: string
  score: number
  maxScore: number
  percentage: number
  feedback?: string
}
