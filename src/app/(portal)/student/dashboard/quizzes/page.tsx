"use client"

import { useCallback, useEffect, useMemo, useRef, useState } from "react"
import { useStudentAuth } from "@/hooks/use-auth-user"
import { useQuery } from "@tanstack/react-query"
import { QuizAPI } from "@/lib/quiz"
import type { Quiz, QuizSubmission } from "@/types/quiz"

const SUBJECT_IMAGES: Record<string, string> = {
  mathematics:
    "https://images.unsplash.com/photo-1509228468518-180dd4864904?auto=format&fit=crop&w=1200&q=80",
  english:
    "https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&w=1200&q=80",
  physics:
    "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=1200&q=80",
  chemistry:
    "https://images.unsplash.com/photo-1532634993-15f421e42ec0?auto=format&fit=crop&w=1200&q=80",
  biology:
    "https://images.unsplash.com/photo-1530210124550-912dc1381cb8?auto=format&fit=crop&w=1200&q=80",
  economics:
    "https://images.unsplash.com/photo-1554224154-22dec7ec8818?auto=format&fit=crop&w=1200&q=80",
  history:
    "https://images.unsplash.com/photo-1507842217343-583f20270319?auto=format&fit=crop&w=1200&q=80",
  literature:
    "https://images.unsplash.com/photo-1516979187457-637abb4f9353?auto=format&fit=crop&w=1200&q=80",
  "computer-science":
    "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=1200&q=80",
  geography:
    "https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&w=1200&q=80",
}

function getSubjectImage(subject: string): string {
  const key = subject.toLowerCase().replace(/\s+/g, "-")
  return (
    SUBJECT_IMAGES[key] ||
    "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=1200&q=80"
  )
}

function TrendBadge({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-3 shadow-sm">
      <p className="text-ink-3 mb-1 text-xs">{label}</p>
      <p className="text-navy text-lg font-bold">{value}</p>
    </div>
  )
}

function StatusBadge({ isDone, isOverdue }: { isDone: boolean; isOverdue: boolean }) {
  const baseClasses = "inline-block px-3 py-1 rounded-full text-xs font-semibold"
  if (isDone)
    return (
      <span className={`${baseClasses} bg-emerald-100 text-emerald-700`}>Completed</span>
    )
  if (isOverdue)
    return <span className={`${baseClasses} bg-red-100 text-red-700`}>Overdue</span>
  return (
    <span className={`${baseClasses} bg-[#0A1F44]/10 text-[#0A1F44]`}>Available</span>
  )
}

export default function StudentQuizzesPage() {
  const { studentId } = useStudentAuth()
  const [activeQuiz, setActiveQuiz] = useState<Quiz | null>(null)
  const [answers, setAnswers] = useState<Record<string, string>>({})
  const [timeLeft, setTimeLeft] = useState(0)
  const [submitted, setSubmitted] = useState(false)
  const [score, setScore] = useState(0)
  const [maxScore, setMaxScore] = useState(0)
  const startTimeRef = useRef(0)

  useEffect(() => {
    startTimeRef.current = Date.now()
  }, [])

  const { data: quizzesData, isLoading } = useQuery({
    queryKey: ["student-quizzes", studentId],
    queryFn: () =>
      QuizAPI.getStudentQuizzes(studentId || "", {
        term_id: "First Term",
        session_id: "2024/2025",
      }),
    enabled: !!studentId,
  })

  const quizzes = useMemo(
    () => quizzesData?.data?.quizzes ?? [],
    [quizzesData?.data?.quizzes]
  )
  const submissions = useMemo(() => {
    const subs = quizzesData?.data?.submissions || {}
    return Object.keys(subs).reduce(
      (acc, key) => {
        acc[key] = subs[key]
        return acc
      },
      {} as Record<string, QuizSubmission>
    )
  }, [quizzesData?.data?.submissions])

  const completedCount = useMemo(
    () => quizzes.filter((q) => submissions[q.id]).length,
    [quizzes, submissions]
  )
  const pendingCount = quizzes.length - completedCount
  const totalQuestions = useMemo(
    () => quizzes.reduce((sum, quiz) => sum + quiz.questions.length, 0),
    [quizzes]
  )
  const courseCount = useMemo(
    () => new Set(quizzes.map((quiz) => quiz.subject)).size,
    [quizzes]
  )
  const courseSubjects = useMemo(
    () => Array.from(new Set(quizzes.map((quiz) => quiz.subject))).slice(0, 6),
    [quizzes]
  )

  const startQuiz = (quiz: Quiz) => {
    setActiveQuiz(quiz)
    setAnswers({})
    setTimeLeft(quiz.timeLimitMinutes * 60)
    setSubmitted(false)
    setScore(0)
    setMaxScore(quiz.questions.reduce((sum, q) => sum + q.points, 0))
  }

  const submitQuiz = useCallback(async () => {
    if (!activeQuiz || !studentId) return

    let correct = 0
    activeQuiz.questions.forEach((q) => {
      const ans = (answers[q.id] || "").trim()
      const expected = (q.correctAnswer || "").trim()
      if (ans.toLowerCase() === expected.toLowerCase()) correct += q.points
    })

    const timeSpent = Math.floor((Date.now() - startTimeRef.current) / 1000)
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
      console.error("Quiz submission error:", error)
    }
  }, [activeQuiz, studentId, answers])

  useEffect(() => {
    if (!activeQuiz || submitted) return
    if (timeLeft <= 0) {
      const timeout = window.setTimeout(() => {
        void submitQuiz()
      }, 0)

      return () => window.clearTimeout(timeout)
    }

    const timer = window.setInterval(() => {
      setTimeLeft((prev) => prev - 1)
    }, 1000)

    return () => window.clearInterval(timer)
  }, [activeQuiz, submitted, timeLeft, submitQuiz])

  const scoreSummary = useMemo(() => {
    const submittedScores = Object.values(submissions)
      .filter(
        (s) =>
          typeof s.score === "number" && typeof s.maxScore === "number" && s.maxScore > 0
      )
      .map((s) => Math.round(((s.score || 0) / s.maxScore) * 100))

    if (submittedScores.length === 0) return "--"
    const avg = Math.round(
      submittedScores.reduce((a, b) => a + b, 0) / submittedScores.length
    )
    return `${avg}%`
  }, [submissions])

  // QUIZ TAKING VIEW
  if (activeQuiz && !submitted) {
    const answeredCount = activeQuiz.questions.filter(
      (q) => (answers[q.id] || "").trim().length > 0
    ).length
    const progress = Math.round(
      (answeredCount / Math.max(activeQuiz.questions.length, 1)) * 100
    )
    const minutes = Math.floor(timeLeft / 60)
    const seconds = String(Math.max(timeLeft % 60, 0)).padStart(2, "0")

    return (
      <div className="mx-auto max-w-3xl bg-white p-6">
        {/* Quiz Header */}
        <div
          className="mb-6 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm"
          style={{
            backgroundImage: `linear-gradient(180deg, rgba(10,31,68,0.10), rgba(10,31,68,0.32)), url(${getSubjectImage(activeQuiz.subject)})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="p-6 text-white" style={{ minHeight: 220 }}>
            <div className="mb-4 flex items-start justify-between gap-4">
              <div>
                <h2 className="text-2xl font-bold">{activeQuiz.title}</h2>
                <p className="mt-2 text-sm opacity-90">
                  {activeQuiz.subject} · {activeQuiz.questions.length} questions
                </p>
              </div>
              <div className="shrink-0 text-right">
                <div className="text-3xl font-bold text-white">
                  {minutes}:{seconds}
                </div>
                <div className="mt-1 text-xs opacity-85">Time remaining</div>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="mt-4">
              <div className="mb-2 flex justify-between text-xs">
                <span>
                  Answered: {answeredCount}/{activeQuiz.questions.length}
                </span>
                <span>{progress}% complete</span>
              </div>
              <div className="h-2 overflow-hidden rounded-full bg-white/30">
                <div
                  className="h-full bg-white transition-all"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Questions */}
        <div className="space-y-4">
          {activeQuiz.questions.map((q, idx) => (
            <div
              key={q.id}
              className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
            >
              <div className="mb-4">
                <div className="mb-2 flex items-center gap-3">
                  <span className="inline-block rounded-full bg-[#0A1F44]/10 px-3 py-1 text-xs font-bold text-[#0A1F44]">
                    Q{idx + 1}
                  </span>
                  <span className="text-xs text-slate-500">{q.points} points</span>
                </div>
                <p className="font-semibold text-[#0A1F44]">{q.text}</p>
              </div>

              {q.type === "multiple_choice" &&
                q.options?.map((opt, i) => {
                  const selected = answers[q.id] === opt
                  return (
                    <label
                      key={i}
                      className={`mb-2 flex cursor-pointer items-center gap-3 rounded-lg p-3 transition-colors ${
                        selected
                          ? "border border-[#0A1F44]/25 bg-[#0A1F44]/8"
                          : "border border-slate-200 bg-white hover:border-[#0A1F44]/30"
                      }`}
                    >
                      <input
                        type="radio"
                        name={q.id}
                        value={opt}
                        checked={selected}
                        onChange={() => setAnswers((p) => ({ ...p, [q.id]: opt }))}
                        className="h-4 w-4"
                      />
                      <span className="text-sm">{opt}</span>
                    </label>
                  )
                })}

              {q.type === "true_false" && (
                <div className="flex gap-3">
                  {["True", "False"].map((opt) => {
                    const selected = answers[q.id] === opt
                    return (
                      <label
                        key={opt}
                        className={`flex cursor-pointer items-center gap-2 rounded-lg px-4 py-2 transition-colors ${
                          selected
                            ? "border border-[#0A1F44]/25 bg-[#0A1F44]/8"
                            : "border border-slate-200 bg-white hover:border-[#0A1F44]/30"
                        }`}
                      >
                        <input
                          type="radio"
                          name={q.id}
                          value={opt}
                          checked={selected}
                          onChange={() => setAnswers((p) => ({ ...p, [q.id]: opt }))}
                          className="h-4 w-4"
                        />
                        <span className="text-sm font-medium">{opt}</span>
                      </label>
                    )
                  })}
                </div>
              )}

              {q.type === "short_answer" && (
                <input
                  value={answers[q.id] || ""}
                  onChange={(e) => setAnswers((p) => ({ ...p, [q.id]: e.target.value }))}
                  className="w-full rounded-lg border border-slate-200 px-4 py-2 focus:border-[#0A1F44] focus:outline-none"
                  placeholder="Type your answer here"
                />
              )}
            </div>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="mt-8 flex flex-wrap gap-3">
          <button
            onClick={() => setActiveQuiz(null)}
            className="rounded-lg border border-slate-200 bg-white px-6 py-3 font-semibold text-[#0A1F44] transition-colors hover:bg-[#0A1F44]/5"
          >
            Cancel
          </button>
          <button
            onClick={() => submitQuiz()}
            className="bg-crimson hover:bg-crimson-deep min-w-[200px] flex-1 rounded-lg px-6 py-3 font-semibold text-white transition-colors"
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
    const gradeLabel =
      pct >= 90
        ? "Excellent"
        : pct >= 75
          ? "Very Good"
          : pct >= 60
            ? "Good"
            : pct >= 50
              ? "Fair"
              : "Needs Work"

    return (
      <div className="mx-auto max-w-2xl bg-white p-6">
        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-lg">
          {/* Hero Image */}
          <div
            className="flex min-h-60 items-end p-6 text-white"
            style={{
              backgroundImage: `linear-gradient(180deg, rgba(10,31,68,0.10), rgba(10,31,68,0.42)), url(${getSubjectImage(activeQuiz.subject)})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <p className="text-sm font-semibold opacity-95">Quiz Completed</p>
          </div>

          {/* Result Content */}
          <div className="p-8 text-center">
            <h2 className="mb-2 text-2xl font-bold text-[#0A1F44]">Your Result</h2>
            <p className="mb-6 text-slate-500">{activeQuiz.title}</p>

            {/* Score Display */}
            <div className="mb-8">
              <div
                className="mb-2 text-5xl font-bold"
                style={{
                  color: passed ? "#047857" : pct >= 50 ? "#1D4ED8" : "#B91C1C",
                }}
              >
                {score}/{maxScore}
              </div>
              <p className="text-lg text-slate-500">{pct}% Overall Performance</p>
            </div>

            {/* Stats */}
            <div className="mb-8 grid grid-cols-3 gap-3">
              <TrendBadge label="Grade" value={gradeLabel} />
              <TrendBadge label="Accuracy" value={`${pct}%`} />
              <TrendBadge label="Total Points" value={`${maxScore}`} />
            </div>

            {/* Feedback */}
            {passed && (
              <div className="mb-6 rounded-lg border border-emerald-200 bg-emerald-50 p-4">
                <p className="font-semibold text-emerald-700">
                  Great job! You passed this quiz.
                </p>
              </div>
            )}

            {/* Back Button */}
            <button
              onClick={() => {
                setActiveQuiz(null)
                setSubmitted(false)
              }}
              className="w-full rounded-lg bg-[#0A1F44] px-6 py-3 font-semibold text-white transition-colors hover:bg-[#0E2A59]"
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
    <div className="bg-white p-6">
      {/* Page Header */}
      <div className="mb-8">
        <div className="mb-6 flex items-start justify-between gap-6">
          <div>
            <h1 className="mb-2 text-3xl font-bold text-[#0A1F44]">Quizzes</h1>
            <p className="text-slate-500">
              {quizzes.length} quizzes available for your class
            </p>
          </div>
          <div className="grid min-w-[500px] grid-cols-5 gap-2">
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
            <span
              key={subject}
              className="rounded-full bg-[#0A1F44]/10 px-3 py-1 text-sm font-medium text-[#0A1F44]"
            >
              {subject}
            </span>
          ))}
        </div>
      </div>

      {/* Loading State */}
      {isLoading && (
        <div className="py-12 text-center">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-slate-200 border-t-[#0A1F44]"></div>
          <p className="mt-4 text-slate-500">Loading quizzes...</p>
        </div>
      )}

      {/* Empty State */}
      {!isLoading && quizzes.length === 0 && (
        <div
          className="flex min-h-[280px] items-end rounded-2xl border border-slate-200 p-8 text-white"
          style={{
            backgroundImage:
              "linear-gradient(180deg, rgba(10,31,68,0.10), rgba(10,31,68,0.58)), url(https://images.unsplash.com/photo-1509228468518-180dd4864904?auto=format&fit=crop&w=1200&q=80)",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div>
            <h3 className="mb-2 text-2xl font-bold">No Quizzes Published Yet</h3>
            <p className="text-sm opacity-90">
              Your teachers will post quizzes soon. Check back later!
            </p>
          </div>
        </div>
      )}

      {/* Quiz Cards Grid */}
      {!isLoading && quizzes.length > 0 && (
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
          {quizzes.map((quiz) => {
            const submission = submissions[quiz.id]
            const isDone = !!submission
            const isOverdue = new Date(quiz.dueDate) < new Date() && !isDone

            return (
              <div
                key={quiz.id}
                className="overflow-hidden rounded-2xl border border-slate-200 bg-white transition-shadow hover:shadow-md"
              >
                {/* Quiz Image */}
                <div
                  className="relative flex min-h-40 items-start justify-between p-4 text-white"
                  style={{
                    backgroundImage: `linear-gradient(180deg, rgba(10,31,68,0.06), rgba(10,31,68,0.44)), url(${getSubjectImage(quiz.subject)})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                >
                  <StatusBadge isDone={isDone} isOverdue={isOverdue} />
                  <span className="text-xs font-semibold opacity-95">
                    {quiz.timeLimitMinutes} mins
                  </span>
                </div>

                {/* Quiz Details */}
                <div className="p-4">
                  <h3 className="mb-2 line-clamp-2 text-lg font-bold text-[#0A1F44]">
                    {quiz.title}
                  </h3>
                  <p className="mb-4 text-sm text-slate-500">{quiz.subject}</p>

                  <div className="text-ink-3 mb-4 flex flex-wrap gap-2 text-xs">
                    <span>{quiz.questions.length} questions</span>
                    <span>Due: {new Date(quiz.dueDate).toLocaleDateString("en-NG")}</span>
                  </div>

                  <div className="mb-4 flex flex-wrap gap-2">
                    <span className="rounded bg-[#0A1F44]/10 px-2 py-1 text-xs font-medium text-[#0A1F44]">
                      {quiz.subject}
                    </span>
                    <span className="rounded bg-slate-100 px-2 py-1 text-xs font-medium text-slate-700">
                      {quiz.questions.length} items
                    </span>
                    <span className="rounded bg-emerald-100 px-2 py-1 text-xs font-medium text-emerald-700">
                      {quiz.timeLimitMinutes}m
                    </span>
                  </div>

                  {isDone && submission?.score !== undefined && (
                    <div className="mb-4 rounded border border-emerald-200 bg-emerald-50 p-2">
                      <p className="text-xs font-semibold text-emerald-700">
                        ✓ Score: {submission.score}/{submission.maxScore} ·{" "}
                        {Math.round((submission.score / submission.maxScore) * 100)}%
                      </p>
                    </div>
                  )}

                  {isOverdue && !isDone && (
                    <div className="mb-4 rounded border border-red-200 bg-red-50 p-2">
                      <p className="text-xs font-semibold text-red-700">
                        ⚠ Deadline has passed
                      </p>
                    </div>
                  )}

                  <button
                    onClick={() => {
                      if (isDone) {
                        alert("Review mode coming soon!")
                      } else {
                        startQuiz(quiz)
                      }
                    }}
                    className={`w-full rounded-lg px-4 py-2 text-sm font-semibold transition-colors ${
                      isDone
                        ? "bg-emerald-100 text-emerald-700 hover:bg-emerald-200"
                        : "bg-[#0A1F44] text-white hover:bg-[#0E2A59]"
                    }`}
                  >
                    {isDone ? "Review Quiz" : "Start Quiz"}
                  </button>
                </div>
              </div>
            )
          })}
        </div>
      )}

      {/* Footer Stats */}
      <div className="border-canvas-border text-ink-3 mt-8 border-t pt-6 text-xs">
        <p>
          Pending quizzes: {pendingCount > 0 ? pendingCount : 0} · Courses: {courseCount}{" "}
          · Questions: {totalQuestions}
        </p>
      </div>
    </div>
  )
}
