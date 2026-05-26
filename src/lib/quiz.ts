import { apiFetch } from './api/client'
import type { Quiz, QuizSubmission, StudentQuizzesResponse, QuizSubmissionResponse, QuizAnswerPayload } from '@/types/quiz'

type ResponsePack<T> = {
  status_code: number
  message: string | null
  data: T
}

export const QuizAPI = {
  /**
   * Get all quizzes available for a student's class
   */
  getStudentQuizzes: (studentId: string, params?: { term_id?: string; session_id?: string; limit?: number; page?: number }) =>
    apiFetch<ResponsePack<StudentQuizzesResponse>>(
      `/quizzes/student/${studentId}`,
      {
        method: 'GET',
        params,
      },
      true
    ),

  /**
   * Get a single quiz with all questions
   */
  getQuiz: (quizId: string) =>
    apiFetch<ResponsePack<Quiz>>(
      `/quizzes/${quizId}`,
      {
        method: 'GET',
      },
      true
    ),

  /**
   * Submit quiz answers
   */
  submitQuiz: (payload: QuizAnswerPayload) =>
    apiFetch<ResponsePack<QuizSubmissionResponse>>(
      '/quiz-submissions',
      {
        method: 'POST',
        data: payload,
      },
      true
    ),

  /**
   * Get student's quiz submission details
   */
  getSubmission: (submissionId: string) =>
    apiFetch<ResponsePack<QuizSubmission>>(
      `/quiz-submissions/${submissionId}`,
      {
        method: 'GET',
      },
      true
    ),

  /**
   * Get all submissions for a student
   */
  getStudentSubmissions: (studentId: string, params?: { limit?: number; page?: number }) =>
    apiFetch<ResponsePack<{ submissions: QuizSubmission[]; total: number }>>(
      `/quiz-submissions/student/${studentId}`,
      {
        method: 'GET',
        params,
      },
      true
    ),
}
