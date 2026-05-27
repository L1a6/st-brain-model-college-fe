"use client"

import { useEffect, useMemo, useState } from "react"
import { useQuery, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { useAuthUser } from "@/hooks/use-auth-user"
import { useGetTeacherAssignedClasses } from "../attendance/_hooks/use-teacher-attendance"
import { QuizAPI } from "@/lib/quiz"

type QForm = {
  text: string
  type: "multiple_choice" | "short_answer"
  options: string[]
  correctAnswer: string
  points: number
}

const emptyQ = (): QForm => ({
  text: "",
  type: "multiple_choice",
  options: ["", "", "", ""],
  correctAnswer: "",
  points: 1,
})

const createBlankForm = () => ({
  title: "",
  subject: "",
  description: "",
  dueDate: "",
  timeLimitMinutes: 30,
})

const normalizeArray = <T,>(value: unknown): T[] => {
  if (Array.isArray(value)) return value as T[]
  return []
}

const getQuizItems = (value: unknown): any[] => {
  if (Array.isArray(value)) return value

  if (value && typeof value === "object") {
    const maybeValue = value as { data?: unknown; items?: unknown }

    if (Array.isArray(maybeValue.items)) return maybeValue.items as any[]

    if (maybeValue.data && typeof maybeValue.data === "object") {
      const nestedData = maybeValue.data as { items?: unknown; data?: unknown }
      if (Array.isArray(nestedData.items)) return nestedData.items as any[]
      if (Array.isArray(nestedData.data)) return nestedData.data as any[]
    }
  }

  return []
}

const TeacherQuizzesPage = () => {
  const { user } = useAuthUser()
  const queryClient = useQueryClient()
  const teacherId = (user as { teacher_id?: string; id?: string } | null)?.teacher_id ?? (user as { id?: string } | null)?.id ?? ""

  const [view, setView] = useState<"list" | "create">("list")
  const [editingQuizId, setEditingQuizId] = useState<string | null>(null)
  const [selectedClass, setSelectedClass] = useState("")
  const [form, setForm] = useState(createBlankForm)
  const [questions, setQuestions] = useState<QForm[]>([emptyQ()])
  const [saving, setSaving] = useState(false)

  const assignedClassesQuery = useGetTeacherAssignedClasses()
  const classes = useMemo(() => {
    const data = assignedClassesQuery.data as unknown
    if (Array.isArray(data)) return data

    if (data && typeof data === "object") {
      const maybeData = data as { data?: unknown; items?: unknown }
      if (Array.isArray(maybeData.items)) return maybeData.items
      if (Array.isArray(maybeData.data)) return maybeData.data

      const nestedData = maybeData.data as { items?: unknown; data?: unknown } | undefined
      if (nestedData) {
        if (Array.isArray(nestedData.items)) return nestedData.items
        if (Array.isArray(nestedData.data)) return nestedData.data
      }
    }

    return []
  }, [assignedClassesQuery.data])

  const quizzesQuery = useQuery({
    queryKey: ["teacher-quizzes", teacherId],
    queryFn: () => QuizAPI.getTeacherQuizzes(teacherId),
    enabled: !!teacherId,
    refetchOnWindowFocus: false,
  })

  const teacherQuizzes = useMemo(() => getQuizItems(quizzesQuery.data), [quizzesQuery.data])

  const publishedCount = teacherQuizzes.filter((quiz) => (quiz?.status || "published").toLowerCase() === "published").length
  const draftCount = teacherQuizzes.filter((quiz) => (quiz?.status || "published").toLowerCase() === "draft").length
  const totalPoints = questions.reduce((sum, question) => sum + (Number(question.points) || 0), 0)

  const selectedClassLabel = useMemo(() => {
    const matchedClass = classes.find((item: any) => item?.id === selectedClass)
    if (!matchedClass) return "No class selected"
    return `${matchedClass.name ?? "Class"}${matchedClass.arm ? ` (${matchedClass.arm})` : ""}`
  }, [classes, selectedClass])

  useEffect(() => {
    if (!selectedClass && classes[0]?.id) {
      setSelectedClass(classes[0].id)
    }
  }, [classes, selectedClass])

  const resetForm = () => {
    setEditingQuizId(null)
    setForm(createBlankForm())
    setQuestions([emptyQ()])
    setSelectedClass(classes[0]?.id ?? "")
  }

  const updateQuestion = (index: number, key: keyof QForm, value: string | number) => {
    setQuestions((currentQuestions) =>
      currentQuestions.map((question, questionIndex) =>
        questionIndex === index ? { ...question, [key]: value } : question
      )
    )
  }

  const updateOption = (questionIndex: number, optionIndex: number, value: string) => {
    setQuestions((currentQuestions) =>
      currentQuestions.map((question, currentIndex) => {
        if (currentIndex !== questionIndex) return question

        const nextOptions = [...question.options]
        nextOptions[optionIndex] = value
        return { ...question, options: nextOptions }
      })
    )
  }

  const addQuestion = () => setQuestions((currentQuestions) => [...currentQuestions, emptyQ()])
  const removeQuestion = (index: number) =>
    setQuestions((currentQuestions) => currentQuestions.filter((_, currentIndex) => currentIndex !== index))

  const loadQuizForEdit = async (quizId: string) => {
    try {
      const response = await QuizAPI.getQuiz(quizId)
      const quiz = (response as any)?.data ?? response

      setEditingQuizId(quizId)
      setForm({
        title: quiz?.title ?? "",
        subject: quiz?.subject ?? "",
        description: quiz?.description ?? "",
        dueDate: quiz?.dueDate ? String(quiz.dueDate).slice(0, 16) : "",
        timeLimitMinutes: Number(quiz?.timeLimitMinutes) || 30,
      })
      setSelectedClass(quiz?.classId ?? quiz?.class_id ?? classes[0]?.id ?? "")
      setQuestions(
        Array.isArray(quiz?.questions) && quiz.questions.length > 0
          ? quiz.questions.map((question: any) => ({
              text: question.text ?? "",
              type: question.type === "short_answer" ? "short_answer" : "multiple_choice",
              options: Array.isArray(question.options) ? question.options : ["", "", "", ""],
              correctAnswer: question.correctAnswer ?? question.correct_answer ?? "",
              points: Number(question.points) || 1,
            }))
          : [emptyQ()]
      )
      setView("create")
    } catch (error) {
      console.error(error)
      toast.error("Failed to load quiz")
    }
  }

  const handleCreate = async () => {
    if (!teacherId) {
      toast.error("Unable to identify the current teacher")
      return
    }

    if (!selectedClass) {
      toast.error("Please select a class")
      return
    }

    if (!form.title.trim() || !form.subject.trim()) {
      toast.error("Title and subject are required")
      return
    }

    if (questions.length === 0) {
      toast.error("Add at least one question")
      return
    }

    setSaving(true)

    try {
      const payload = {
        ...form,
        teacherId,
        classId: selectedClass,
        questions: questions.map((question) => ({
          ...question,
          options: question.options.filter((option) => option.trim().length > 0),
        })),
      }

      if (editingQuizId) {
        await QuizAPI.updateQuiz(editingQuizId, payload)
        toast.success("Quiz updated")
      } else {
        await QuizAPI.createQuiz(payload)
        toast.success("Quiz published")
      }

      await queryClient.invalidateQueries({ queryKey: ["teacher-quizzes", teacherId] })
      setView("list")
      resetForm()
    } catch (error) {
      console.error(error)
      toast.error("Failed to save quiz")
    } finally {
      setSaving(false)
    }
  }

  const header =
    view === "create" ? (
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.28em] text-slate-500">Quiz Studio</p>
          <h1 className="font-display text-3xl font-semibold text-[#0A1F44] md:text-5xl">
            {editingQuizId ? "Edit quiz" : "Create new quiz"}
          </h1>
          <p className="mt-3 max-w-2xl text-sm text-slate-600 md:text-base">
            Build assessments that land directly in your students&apos; dashboard once published.
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          <Button
            variant="outline"
            onClick={() => {
              setView("list")
              resetForm()
            }}
          >
            Cancel
          </Button>
          <Button onClick={handleCreate} disabled={saving} className="bg-[#0A1F44] hover:bg-[#0E2A59]">
            {saving ? "Publishing..." : editingQuizId ? "Save changes" : "Publish quiz"}
          </Button>
        </div>
      </div>
    ) : (
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.28em] text-slate-500">Quizzes</p>
          <h1 className="font-display text-3xl font-semibold text-[#0A1F44] md:text-5xl">
            Create and publish assessments for your classes
          </h1>
          <p className="mt-3 max-w-2xl text-sm text-slate-600 md:text-base">
            Every quiz you publish here appears in the student dashboard automatically.
          </p>
        </div>

        <Button onClick={() => setView("create")} className="bg-[#0A1F44] hover:bg-[#0E2A59]">
          Create quiz
        </Button>
      </div>
    )

  return (
    <div className="min-h-screen bg-white p-6 md:p-8 lg:p-10">
      {header}

      <div className="mb-6 overflow-hidden rounded-3xl bg-linear-to-br from-[#0A1F44] via-[#12396D] to-[#0E234D] text-white shadow-[0_24px_70px_rgba(10,31,68,0.18)]">
        <div className="grid gap-8 p-6 md:p-8 lg:grid-cols-[1.2fr_0.8fr] lg:p-10">
          <div>
            <div className="mb-4 text-xs uppercase tracking-[0.3em] text-white/70">Quiz studio</div>
            <h2 className="mb-4 font-display text-3xl font-light leading-tight md:text-5xl">
              Build quizzes, assign them, and publish them to students.
            </h2>
            <p className="max-w-2xl text-sm leading-relaxed text-white/80 md:text-base">
              Use the teacher dashboard to build quizzes, assign them to a class, and publish them so they appear in the student dashboard automatically.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="rounded-2xl bg-white/10 p-4 backdrop-blur-sm">
              <div className="text-[11px] uppercase tracking-[0.18em] text-white/60">Assigned classes</div>
              <div className="mt-2 text-2xl font-bold">{classes.length}</div>
            </div>
            <div className="rounded-2xl bg-white/10 p-4 backdrop-blur-sm">
              <div className="text-[11px] uppercase tracking-[0.18em] text-white/60">Total quizzes</div>
              <div className="mt-2 text-2xl font-bold">{teacherQuizzes.length}</div>
            </div>
            <div className="rounded-2xl bg-white/10 p-4 backdrop-blur-sm">
              <div className="text-[11px] uppercase tracking-[0.18em] text-white/60">Published</div>
              <div className="mt-2 text-2xl font-bold">{publishedCount}</div>
            </div>
            <div className="rounded-2xl bg-white/10 p-4 backdrop-blur-sm">
              <div className="text-[11px] uppercase tracking-[0.18em] text-white/60">Drafts</div>
              <div className="mt-2 text-2xl font-bold">{draftCount}</div>
            </div>
          </div>
        </div>
      </div>

      {view === "create" ? (
        <>
          <div className="mb-6 grid gap-4 rounded-3xl border border-slate-200 bg-white p-5 shadow-sm md:grid-cols-2 xl:grid-cols-4">
            <div>
              <label className="mb-2 block text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500">Quiz title</label>
              <input
                value={form.title}
                onChange={(event) => setForm({ ...form, title: event.target.value })}
                placeholder="e.g. SS2 Mathematics Weekly Drill"
                className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm outline-none transition-colors focus:border-[#0A1F44]"
              />
            </div>
            <div>
              <label className="mb-2 block text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500">Subject</label>
              <input
                value={form.subject}
                onChange={(event) => setForm({ ...form, subject: event.target.value })}
                placeholder="e.g. Mathematics"
                className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm outline-none transition-colors focus:border-[#0A1F44]"
              />
            </div>
            <div>
              <label className="mb-2 block text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500">Class</label>
              <select
                value={selectedClass}
                onChange={(event) => setSelectedClass(event.target.value)}
                className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm outline-none transition-colors focus:border-[#0A1F44]"
              >
                <option value="">Select class to assign</option>
                {classes.map((item: any) => (
                  <option key={item.id} value={item.id}>
                    {item.name} {item.arm ? `(${item.arm})` : ""}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="mb-2 block text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500">Due date</label>
              <input
                type="datetime-local"
                value={form.dueDate}
                onChange={(event) => setForm({ ...form, dueDate: event.target.value })}
                className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm outline-none transition-colors focus:border-[#0A1F44]"
              />
            </div>
            <div className="xl:col-span-4 flex items-center justify-between rounded-2xl bg-slate-50 px-4 py-3 text-sm text-slate-600">
              <span>
                Assigned class: <span className="font-semibold text-[#0A1F44]">{selectedClassLabel}</span>
              </span>
              <span>
                Students in class: <span className="font-semibold text-[#0A1F44]">{classes.find((item: any) => item?.id === selectedClass)?.students?.length ?? 0}</span>
              </span>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <h3 className="font-display text-2xl font-semibold text-[#0A1F44]">Questions</h3>
              <div className="flex items-center gap-2 text-sm text-slate-600">
                <Badge variant="outline">{questions.length} questions</Badge>
                <Badge variant="secondary">{totalPoints} total points</Badge>
              </div>
            </div>

            {questions.map((question, index) => (
              <div key={index} className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
                <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 bg-slate-50 px-5 py-4">
                  <div className="flex items-center gap-3">
                    <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-[#0A1F44] text-sm font-bold text-white">
                      Q{index + 1}
                    </span>
                    <div>
                      <div className="text-sm font-semibold text-[#0A1F44]">Question builder</div>
                      <div className="text-xs text-slate-500">Set the prompt, correct answer, and points.</div>
                    </div>
                  </div>
                  {questions.length > 1 && (
                    <button
                      className="rounded-full border border-red-200 px-3 py-2 text-xs font-semibold text-red-600 transition-colors hover:bg-red-50"
                      onClick={() => removeQuestion(index)}
                    >
                      Remove
                    </button>
                  )}
                </div>

                <div className="p-5">
                  <div className="mb-4">
                    <label className="mb-2 block text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500">Question text</label>
                    <input
                      value={question.text}
                      onChange={(event) => updateQuestion(index, "text", event.target.value)}
                      placeholder="Type your question here"
                      className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm outline-none transition-colors focus:border-[#0A1F44]"
                    />
                  </div>

                  <div className="mb-4 grid gap-3 md:grid-cols-2">
                    <div>
                      <label className="mb-2 block text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500">Type</label>
                      <select
                        value={question.type}
                        onChange={(event) => updateQuestion(index, "type", event.target.value as QForm["type"])}
                        className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm outline-none transition-colors focus:border-[#0A1F44]"
                      >
                        <option value="multiple_choice">Multiple choice</option>
                        <option value="short_answer">Short answer</option>
                      </select>
                    </div>
                    <div>
                      <label className="mb-2 block text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500">Points</label>
                      <input
                        type="number"
                        min={1}
                        value={question.points}
                        onChange={(event) => updateQuestion(index, "points", parseInt(event.target.value) || 1)}
                        className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm outline-none transition-colors focus:border-[#0A1F44]"
                      />
                    </div>
                  </div>

                  {question.type === "multiple_choice" && (
                    <div className="mb-4">
                      <label className="mb-2 block text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500">Answer options</label>
                      <div className="space-y-2">
                        {question.options.map((option, optionIndex) => (
                          <div key={optionIndex} className="grid grid-cols-[auto_1fr] items-center gap-3">
                            <input
                              type="radio"
                              name={`correct-${index}`}
                              checked={question.correctAnswer === option}
                              onChange={() => updateQuestion(index, "correctAnswer", option)}
                            />
                            <input
                              value={option}
                              onChange={(event) => updateOption(index, optionIndex, event.target.value)}
                              placeholder={`Option ${optionIndex + 1}`}
                              className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm outline-none transition-colors focus:border-[#0A1F44]"
                            />
                          </div>
                        ))}
                      </div>
                      <p className="mt-2 text-xs text-slate-500">Mark the radio circle for the correct answer.</p>
                    </div>
                  )}

                  {question.type === "short_answer" && (
                    <div>
                      <label className="mb-2 block text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500">Correct answer</label>
                      <input
                        value={question.correctAnswer}
                        onChange={(event) => updateQuestion(index, "correctAnswer", event.target.value)}
                        placeholder="Expected answer"
                        className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm outline-none transition-colors focus:border-[#0A1F44]"
                      />
                    </div>
                  )}
                </div>
              </div>
            ))}

            <button
              onClick={addQuestion}
              className="w-full rounded-2xl border-2 border-dashed border-[#0A1F44]/20 bg-[#0A1F44]/4 px-4 py-4 font-semibold text-[#0A1F44] transition-colors hover:bg-[#0A1F44]/8"
            >
              Add another question
            </button>
          </div>

          <div className="mt-8 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <h4 className="mb-4 text-sm font-extrabold uppercase tracking-[0.18em] text-[#0A1F44]">
              Assigned students ({classes.find((item: any) => item?.id === selectedClass)?.students?.length ?? 0})
            </h4>
            <p className="text-sm text-slate-500">
              Pick a class to preview the students who will receive this quiz.
            </p>
          </div>
        </>
      ) : (
        <div className="grid gap-4 md:grid-cols-2">
          {quizzesQuery.isLoading ? (
            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm md:col-span-2">Loading quizzes...</div>
          ) : teacherQuizzes.length === 0 ? (
            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm md:col-span-2">
              No quizzes yet. Create one to get started.
            </div>
          ) : (
            teacherQuizzes.map((quiz: any) => {
              const dueDate = new Date(quiz?.dueDate ?? quiz?.due_date ?? Date.now())
              const status = String(quiz?.status || "published").toLowerCase()
              const statusLabel = status === "draft" ? "Draft" : status === "closed" ? "Closed" : "Published"
              const statusClass =
                status === "draft"
                  ? "bg-slate-100 text-slate-700"
                  : status === "closed"
                    ? "bg-amber-100 text-amber-700"
                    : "bg-emerald-100 text-emerald-700"

              return (
                <div key={quiz.id} className="overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-[0_14px_36px_rgba(15,23,42,0.06)]">
                  <div className="relative min-h-52">
                    <img
                      src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1400&q=80"
                      alt={quiz.title}
                      className="absolute inset-0 h-full w-full object-cover"
                    />
                    <div className="absolute inset-0 bg-linear-to-b from-transparent via-[#0A1F44]/35 to-[#0A1F44]/82" />
                    <div className="absolute left-5 top-5 flex flex-wrap gap-2">
                      <span className={`rounded-full px-3 py-1 text-xs font-semibold ${statusClass}`}>{statusLabel}</span>
                      <span className="rounded-full bg-white/12 px-3 py-1 text-xs font-semibold text-white backdrop-blur-sm">
                        {normalizeArray(quiz.questions).length || 0} questions
                      </span>
                    </div>
                    <div className="absolute bottom-5 right-5 text-right text-white">
                      <div className="text-3xl font-bold">{quiz.timeLimitMinutes ?? 30}m</div>
                      <div className="mt-1 text-xs uppercase tracking-[0.22em] text-white/75">Time limit</div>
                    </div>
                  </div>

                  <div className="p-6">
                    <div className="mb-4 flex flex-wrap items-start justify-between gap-4">
                      <div>
                        <h4 className="mb-2 font-display text-2xl font-semibold text-[#0A1F44]">{quiz.title}</h4>
                        <p className="text-sm text-slate-600">{quiz.description || quiz.subject}</p>
                      </div>
                      <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-right">
                        <div className="mb-1 text-[11px] uppercase tracking-[0.18em] text-slate-500">Due</div>
                        <div className="text-sm font-semibold text-[#0A1F44]">{dueDate.toLocaleDateString()}</div>
                      </div>
                    </div>

                    <div className="mb-5 flex flex-wrap gap-2">
                      <Badge variant="outline">{quiz.timeLimitMinutes ?? 30}m</Badge>
                      <Badge variant="secondary">{normalizeArray(quiz.questions).length || 0} items</Badge>
                      <Badge variant="outline">Class: {quiz.classId ?? quiz.class_id ?? "-"}</Badge>
                    </div>

                    <div className="flex flex-wrap gap-3">
                      <Button variant="outline" size="sm" onClick={() => loadQuizForEdit(quiz.id)}>
                        Edit
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={async () => {
                          if (!confirm("Delete this quiz? This cannot be undone.")) return

                          try {
                            await QuizAPI.deleteQuiz(quiz.id)
                            toast.success("Quiz deleted")
                            await queryClient.invalidateQueries({ queryKey: ["teacher-quizzes", teacherId] })
                          } catch (error) {
                            console.error(error)
                            toast.error("Failed to delete quiz")
                          }
                        }}
                      >
                        Delete
                      </Button>
                      <Button
                        className="bg-[#0A1F44] hover:bg-[#0E2A59]"
                        size="sm"
                        onClick={async () => {
                          try {
                            const response = await QuizAPI.getQuizSubmissions(quiz.id)
                            const submissions = (response as any)?.data?.submissions ?? []
                            const averageScore = submissions.length
                              ? Math.round(submissions.reduce((sum: number, submission: any) => sum + (submission.score || 0), 0) / submissions.length)
                              : 0
                            alert(`Submissions: ${submissions.length}\nAvg score: ${averageScore}`)
                          } catch (error) {
                            console.error(error)
                            toast.error("Failed to load submissions")
                          }
                        }}
                      >
                        View submissions
                      </Button>
                    </div>
                  </div>
                </div>
              )
            })
          )}
        </div>
      )}
    </div>
  )
}

export default TeacherQuizzesPage
