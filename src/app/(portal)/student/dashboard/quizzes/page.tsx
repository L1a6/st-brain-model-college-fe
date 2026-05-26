'use client'

import { useCallback, useEffect, useMemo, useState } from 'react'
import Link from 'next/link'
import { useStudentAuth } from '@/hooks/use-auth-user'
import { useQuery } from '@tanstack/react-query'
import { QuizAPI } from '@/lib/quiz'
import type { Quiz, QuizSubmission } from '@/types/quiz'

const SUBJECT_IMAGES: Record<string, string> = {
  mathematics: 'https://images.unsplash.com/photo-1509228468518-180dd4864904?auto=format&fit=crop&w=900&q=80',
  english: 'https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&w=900&q=80',
  physics: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&w=900&q=80',
  chemistry: 'https://images.unsplash.com/photo-1532634993-15f421e42ec0?auto=format&fit=crop&w=900&q=80',
  biology: 'https://images.unsplash.com/photo-1530210124550-912dc1381cb8?auto=format&fit=crop&w=900&q=80',
  economics: 'https://images.unsplash.com/photo-1554224154-22dec7ec8818?auto=format&fit=crop&w=900&q=80',
  history: 'https://images.unsplash.com/photo-1507842217343-583f20270319?auto=format&fit=crop&w=900&q=80',
  literature: 'https://images.unsplash.com/photo-1507842217343-583f20270319?auto=format&fit=crop&w=900&q=80',
  'computer-science': 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=900&q=80',
  geography: 'https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&w=900&q=80',
}

function getSubjectImage(subject: string): string {
  const key = subject.toLowerCase().replace(/\s+/g, '-')
  return SUBJECT_IMAGES[key] || 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=900&q=80'
}

function TrendBadge({ label, value }: { label: string; value: string }) {
  return (
    <div className="bg-canvas border border-canvas-border rounded-lg p-3">
      <p className="text-xs text-ink-3 mb-1">{label}</p>
      <p className="text-lg font-bold text-navy">{value}</p>
    </div>
  )
}

function StatusBadge({ status, isDone, isOverdue }: { status: string; isDone: boolean; isOverdue: boolean }) {
  const baseClasses = 'inline-block px-3 py-1 rounded-full text-xs font-semibold'
  if (isDone) return <span className={`${baseClasses} bg-emerald-100 text-emerald-700`}>Completed</span>
  if (isOverdue) return <span className={`${baseClasses} bg-red-100 text-red-700`}>Overdue</span>
  return <span className={`${baseClasses} bg-blue-100 text-blue-700`}>Available</span>
}

export default function StudentQuizzesPage() {
  const { studentId } = useStudentAuth()
  const [activeQuiz, setActiveQuiz] = useState<Quiz | null>(null)
  const [answers, setAnswers] = useState<Record<string, string>>({})
  const [timeLeft, setTimeLeft] = useState(0)
  const [submitted, setSubmitted] = useState(false)
  const [score, setScore] = useState(0)
  const [maxScore, setMaxScore] = useState(0)
  const [startTime] = useState<number>(Date.now())

  const { data: quizzesData, isLoading } = useQuery({
    queryKey: ['student-quizzes', studentId],
    queryFn: () => QuizAPI.getStudentQuizzes(studentId || '', { term_id: 'First Term', session_id: '2024/2025' }),
    enabled: !!studentId,
  })

  const quizzes = quizzesData?.data?.quizzes || []
  const submissions = useMemo(() => {
    const subs = quizzesData?.data?.submissions || {}
    return Object.keys(subs).reduce((acc, key) => {
      acc[key] = subs[key]
      return acc
    }, {} as Record<string, QuizSubmission>)
  }, [quizzesData])

  const completedCount = useMemo(() => quizzes.filter((q) => submissions[q.id]).length, [quizzes, submissions])
  const pendingCount = quizzes.length - completedCount
  const totalQuestions = useMemo(() => quizzes.reduce((sum, quiz) => sum + quiz.questions.length, 0), [quizzes])
  const courseCount = useMemo(() => new Set(quizzes.map((quiz) => quiz.subject)).size, [quizzes])
  const courseSubjects = useMemo(() => Array.from(new Set(quizzes.map((quiz) => quiz.subject))).slice(0, 6), [quizzes])

  const startQuiz = (quiz: Quiz) => {
    setActiveQuiz(quiz)
    setAnswers({})
    setTimeLeft(quiz.timeLimitMinutes * 60)
    setSubmitted(false)
    setScore(0)
    setMaxScore(quiz.questions.reduce((sum, q) => sum + q.points, 0))
  }

  const submitQuiz = useCallback(
    async (autoSubmitted = false) => {
      if (!activeQuiz || !studentId) return

      let correct = 0
      activeQuiz.questions.forEach((q) => {
        const ans = (answers[q.id] || '').trim()
        const expected = (q.correctAnswer || '').trim()
        if (ans.toLowerCase() === expected.toLowerCase()) correct += q.points
      })

      const timeSpent = Math.floor((Date.now() - startTime) / 1000)
      setScore(correct)
      setSubmitted(true)

      try {
        await QuizAPI.submitQuiz({
          quizId: activeQuiz.id,
          studentId,
          answers,
          timeSpentSeconds: timeSpent,
        })
      } catch (error) {
        console.error('Quiz submission error:', error)
      }
    },
    [activeQuiz, studentId, answers, startTime]
  )

  useEffect(() => {
    if (!activeQuiz || submitted) return
    if (timeLeft <= 0) {
      submitQuiz(true)
      return
    }

    const timer = window.setInterval(() => {
      setTimeLeft((prev) => prev - 1)
    }, 1000)

    return () => window.clearInterval(timer)
  }, [activeQuiz, submitted, timeLeft, submitQuiz])

  const scoreSummary = useMemo(() => {
    const submittedScores = Object.values(submissions)
      .filter((s) => typeof s.score === 'number' && typeof s.maxScore === 'number' && s.maxScore > 0)
      .map((s) => Math.round(((s.score || 0) / s.maxScore) * 100))

    if (submittedScores.length === 0) return '--'
    const avg = Math.round(submittedScores.reduce((a, b) => a + b, 0) / submittedScores.length)
    return `${avg}%`
  }, [submissions])

  // QUIZ TAKING VIEW
  if (activeQuiz && !submitted) {
    const answeredCount = activeQuiz.questions.filter((q) => (answers[q.id] || '').trim().length > 0).length
    const progress = Math.round((answeredCount / Math.max(activeQuiz.questions.length, 1)) * 100)
    const minutes = Math.floor(timeLeft / 60)
    const seconds = String(Math.max(timeLeft % 60, 0)).padStart(2, '0')

    return (
      <div className="max-w-3xl mx-auto p-6">
        {/* Quiz Header */}
        <div
          className="bg-white rounded-2xl border border-canvas-border overflow-hidden mb-6 shadow-sm"
          style={{
            backgroundImage: `linear-gradient(180deg, rgba(11,18,32,0.22), rgba(11,18,32,0.7)), url(${getSubjectImage(activeQuiz.subject)})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundAttachment: 'fixed',
          }}
        >
          <div className="p-6 text-white">
            <div className="flex justify-between items-start gap-4 mb-4">
              <div>
                <h2 className="text-2xl font-bold">{activeQuiz.title}</h2>
                <p className="text-sm opacity-90 mt-2">{activeQuiz.subject} · {activeQuiz.questions.length} questions</p>
              </div>
              <div className="text-right flex-shrink-0">
                <div className="text-3xl font-bold text-amber-400">
                  {minutes}:{seconds}
                </div>
                <div className="text-xs opacity-85 mt-1">Time remaining</div>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="mt-4">
              <div className="flex justify-between text-xs mb-2">
                <span>Answered: {answeredCount}/{activeQuiz.questions.length}</span>
                <span>{progress}% complete</span>
              </div>
              <div className="h-2 bg-white/20 rounded-full overflow-hidden">
                <div
                  className="h-full bg-blue-500 transition-all"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Questions */}
        <div className="space-y-4">
          {activeQuiz.questions.map((q, idx) => (
            <div key={q.id} className="bg-white rounded-lg border border-canvas-border p-6">
              <div className="mb-4">
                <div className="flex items-center gap-3 mb-2">
                  <span className="inline-block bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs font-bold">
                    Q{idx + 1}
                  </span>
                  <span className="text-xs text-ink-3">{q.points} points</span>
                </div>
                <p className="text-navy font-semibold">{q.text}</p>
              </div>

              {q.type === 'multiple_choice' &&
                q.options?.map((opt, i) => {
                  const selected = answers[q.id] === opt
                  return (
                    <label
                      key={i}
                      className={`flex items-center gap-3 p-3 rounded-lg mb-2 cursor-pointer transition-colors ${
                        selected
                          ? 'bg-blue-100 border border-blue-400'
                          : 'bg-canvas border border-canvas-border hover:border-canvas'
                      }`}
                    >
                      <input
                        type="radio"
                        name={q.id}
                        value={opt}
                        checked={selected}
                        onChange={() => setAnswers((p) => ({ ...p, [q.id]: opt }))}
                        className="w-4 h-4"
                      />
                      <span className="text-sm">{opt}</span>
                    </label>
                  )
                })}

              {q.type === 'true_false' && (
                <div className="flex gap-3">
                  {['True', 'False'].map((opt) => {
                    const selected = answers[q.id] === opt
                    return (
                      <label
                        key={opt}
                        className={`flex items-center gap-2 px-4 py-2 rounded-lg cursor-pointer transition-colors ${
                          selected
                            ? 'bg-blue-100 border border-blue-400'
                            : 'bg-canvas border border-canvas-border hover:border-canvas'
                        }`}
                      >
                        <input
                          type="radio"
                          name={q.id}
                          value={opt}
                          checked={selected}
                          onChange={() => setAnswers((p) => ({ ...p, [q.id]: opt }))}
                          className="w-4 h-4"
                        />
                        <span className="text-sm font-medium">{opt}</span>
                      </label>
                    )
                  })}
                </div>
              )}

              {q.type === 'short_answer' && (
                <input
                  value={answers[q.id] || ''}
                  onChange={(e) => setAnswers((p) => ({ ...p, [q.id]: e.target.value }))}
                  className="w-full px-4 py-2 border border-canvas-border rounded-lg focus:outline-none focus:border-blue-500"
                  placeholder="Type your answer here"
                />
              )}
            </div>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3 mt-8 flex-wrap">
          <button
            onClick={() => setActiveQuiz(null)}
            className="px-6 py-3 bg-canvas border border-canvas-border text-navy rounded-lg font-semibold hover:bg-gold-muted transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={() => submitQuiz(false)}
            className="flex-1 min-w-[200px] px-6 py-3 bg-crimson text-white rounded-lg font-semibold hover:bg-crimson-deep transition-colors"
          >
            Submit Quiz
          </button>
        </div>
      </div>
    )
  }

  // SUBMISSION RESULT VIEW
  if (activeQuiz && submitted) {
    const pct = maxScore > 0 ? Math.round((score / maxScore) * 100) : 0
    const passed = pct >= 75
    const gradeLabel = pct >= 90 ? 'Excellent' : pct >= 75 ? 'Very Good' : pct >= 60 ? 'Good' : pct >= 50 ? 'Fair' : 'Needs Work'

    return (
      <div className="max-w-2xl mx-auto p-6">
        <div className="bg-white rounded-2xl border border-canvas-border overflow-hidden shadow-lg">
          {/* Hero Image */}
          <div
            className="min-h-[240px] flex items-end p-6 text-white"
            style={{
              backgroundImage: `linear-gradient(180deg, rgba(11,18,32,0.18), rgba(11,18,32,0.8)), url(${getSubjectImage(activeQuiz.subject)})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          >
            <p className="text-sm font-semibold opacity-95">Quiz Completed</p>
          </div>

          {/* Result Content */}
          <div className="p-8 text-center">
            <h2 className="text-2xl font-bold text-navy mb-2">Your Result</h2>
            <p className="text-ink-3 mb-6">{activeQuiz.title}</p>

            {/* Score Display */}
            <div className="mb-8">
              <div
                className="text-5xl font-bold mb-2"
                style={{
                  color: passed ? '#047857' : pct >= 50 ? '#1D4ED8' : '#B91C1C',
                }}
              >
                {score}/{maxScore}
              </div>
              <p className="text-lg text-ink-3">{pct}% Overall Performance</p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-3 mb-8">
              <TrendBadge label="Grade" value={gradeLabel} />
              <TrendBadge label="Accuracy" value={`${pct}%`} />
              <TrendBadge label="Total Points" value={`${maxScore}`} />
            </div>

            {/* Feedback */}
            {passed && (
              <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-4 mb-6">
                <p className="text-emerald-700 font-semibold">✓ Great job! You passed this quiz.</p>
              </div>
            )}

            {/* Back Button */}
            <button
              onClick={() => {
                setActiveQuiz(null)
                setSubmitted(false)
              }}
              className="w-full px-6 py-3 bg-navy text-white rounded-lg font-semibold hover:bg-navy-mid transition-colors"
            >
              Back to Quizzes
            </button>
          </div>
        </div>
      </div>
    )
  }

  // QUIZZES LIST VIEW
  return (
    <div className="p-6">
      {/* Page Header */}
      <div className="mb-8">
        <div className="flex justify-between items-start gap-6 mb-6">
          <div>
            <h1 className="text-3xl font-bold text-navy mb-2">Quizzes</h1>
            <p className="text-ink-3">{quizzes.length} quizzes available for your class</p>
          </div>
          <div className="grid grid-cols-5 gap-2 min-w-[500px]">
            <TrendBadge label="Total" value={`${quizzes.length}`} />
            <TrendBadge label="Completed" value={`${completedCount}`} />
            <TrendBadge label="Avg Score" value={scoreSummary} />
            <TrendBadge label="Questions" value={`${totalQuestions}`} />
            <TrendBadge label="Courses" value={`${courseCount}`} />
          </div>
        </div>

        {/* Subject Tags */}
        <div className="flex flex-wrap gap-2">
          {courseSubjects.map((subject) => (
            <span key={subject} className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
              {subject}
            </span>
          ))}
        </div>
      </div>

      {/* Loading State */}
      {isLoading && (
        <div className="text-center py-12">
          <div className="inline-block animate-spin w-8 h-8 border-4 border-canvas-border border-t-blue-500 rounded-full"></div>
          <p className="text-ink-3 mt-4">Loading quizzes...</p>
        </div>
      )}

      {/* Empty State */}
      {!isLoading && quizzes.length === 0 && (
        <div
          className="rounded-2xl border border-canvas-border min-h-[280px] flex items-end p-8 text-white"
          style={{
            backgroundImage:
              'linear-gradient(180deg, rgba(11,18,32,0.12), rgba(11,18,32,0.7)), url(https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=1200&q=80)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          <div>
            <h3 className="text-2xl font-bold mb-2">No Quizzes Published Yet</h3>
            <p className="text-sm opacity-90">Your teachers will post quizzes soon. Check back later!</p>
          </div>
        </div>
      )}

      {/* Quiz Cards Grid */}
      {!isLoading && quizzes.length > 0 && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {quizzes.map((quiz) => {
            const submission = submissions[quiz.id]
            const isDone = !!submission
            const isOverdue = new Date(quiz.dueDate) < new Date() && !isDone

            return (
              <div key={quiz.id} className="bg-white rounded-2xl border border-canvas-border overflow-hidden hover:shadow-md transition-shadow">
                {/* Quiz Image */}
                <div
                  className="relative min-h-[160px] flex justify-between items-start p-4 text-white"
                  style={{
                    backgroundImage: `linear-gradient(180deg, rgba(11,18,32,0.06), rgba(11,18,32,0.6)), url(${getSubjectImage(quiz.subject)})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                  }}
                >
                  <StatusBadge status={isDone ? 'Completed' : isOverdue ? 'Overdue' : 'Available'} isDone={isDone} isOverdue={isOverdue} />
                  <span className="text-xs font-semibold opacity-95">{quiz.timeLimitMinutes} mins</span>
                </div>

                {/* Quiz Details */}
                <div className="p-4">
                  <h3 className="text-lg font-bold text-navy mb-2 line-clamp-2">{quiz.title}</h3>
                  <p className="text-sm text-ink-3 mb-4">{quiz.subject}</p>

                  <div className="flex gap-2 text-xs text-ink-3 mb-4 flex-wrap">
                    <span>📋 {quiz.questions.length} questions</span>
                    <span>📅 Due: {new Date(quiz.dueDate).toLocaleDateString('en-NG')}</span>
                  </div>

                  <div className="flex gap-2 mb-4 flex-wrap">
                    <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded font-medium">{quiz.subject}</span>
                    <span className="px-2 py-1 bg-slate-100 text-slate-700 text-xs rounded font-medium">{quiz.questions.length} items</span>
                    <span className="px-2 py-1 bg-emerald-100 text-emerald-700 text-xs rounded font-medium">{quiz.timeLimitMinutes}m</span>
                  </div>

                  {isDone && submission?.score !== undefined && (
                    <div className="mb-4 p-2 bg-emerald-50 border border-emerald-200 rounded">
                      <p className="text-xs text-emerald-700 font-semibold">
                        ✓ Score: {submission.score}/{submission.maxScore} · {Math.round((submission.score / submission.maxScore) * 100)}%
                      </p>
                    </div>
                  )}

                  {isOverdue && !isDone && (
                    <div className="mb-4 p-2 bg-red-50 border border-red-200 rounded">
                      <p className="text-xs text-red-700 font-semibold">⚠ Deadline has passed</p>
                    </div>
                  )}

                  <button
                    onClick={() => {
                      if (isDone) {
                        alert('Review mode coming soon!')
                      } else {
                        startQuiz(quiz)
                      }
                    }}
                    className={`w-full px-4 py-2 rounded-lg font-semibold text-sm transition-colors ${
                      isDone
                        ? 'bg-emerald-100 text-emerald-700 hover:bg-emerald-200'
                        : 'bg-blue-600 text-white hover:bg-blue-700'
                    }`}
                  >
                    {isDone ? 'Review Quiz' : 'Start Quiz'}
                  </button>
                </div>
              </div>
            )
          })}
        </div>
      )}

      {/* Footer Stats */}
      <div className="mt-8 pt-6 border-t border-canvas-border text-xs text-ink-3">
        <p>Pending quizzes: {pendingCount > 0 ? pendingCount : 0} · Courses: {courseCount} · Questions: {totalQuestions}</p>
      </div>
    </div>
  )
}
