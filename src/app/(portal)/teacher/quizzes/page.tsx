"use client"

import { useMemo, useState, useEffect } from "react"
import { useAuthUser } from "@/hooks/use-auth-user"
import { useGetTeacherAssignedClasses } from "../attendance/_hooks/use-teacher-attendance"
import { ClassesAPI } from "@/lib/classes"
import { QuizAPI } from "@/lib/quiz"
import { useQuery, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"
import { useActiveAcademicSessionFromList } from "@/app/(portal)/admin/class-management/session/_hooks/use-session"
import { useGetTerms } from "../_hooks/use-results"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

type QForm = {
  text: string
  type: 'multiple_choice' | 'short_answer'
  options: string[]
  correctAnswer: string
  points: number
}

const emptyQ = (): QForm => ({ text: '', type: 'multiple_choice', options: ['', '', '', ''], correctAnswer: '', points: 1 })

export default function TeacherQuizzesPage() {
  const { data: teacher } = useAuthUser()
  const { data: classesData } = useGetTeacherAssignedClasses()
  const { data: activeSession } = useActiveAcademicSessionFromList()
  const { data: terms } = useGetTerms()
  // Sonner toast

  const classes = classesData || []

  const [view, setView] = useState<'list' | 'create'>('list')
  const [selectedClass, setSelectedClass] = useState<string>('')
  const [form, setForm] = useState({ title: '', subject: '', timeLimitMinutes: 30, dueDate: '', termId: '' })
  const [questions, setQuestions] = useState<QForm[]>([emptyQ()])
  const [saving, setSaving] = useState(false)
  const [editingQuizId, setEditingQuizId] = useState<string | null>(null)
  const qc = useQueryClient()

  const studentsQuery = useQuery({
    queryKey: ['class-students', selectedClass],
    queryFn: () => (selectedClass ? ClassesAPI.getStudentsForClass(selectedClass) : Promise.resolve({ data: [] })),
    enabled: !!selectedClass,
  })

  const students = (studentsQuery.data as any)?.data || []

  const { data: teacherQuizzesData, isLoading: isLoadingQuizzes } = useQuery({
    queryKey: ['teacher-quizzes', teacher?.teacher_id],
    queryFn: () => (teacher?.teacher_id ? QuizAPI.getTeacherQuizzes(teacher.teacher_id) : Promise.resolve({ data: { items: [] } })),
    enabled: !!teacher?.teacher_id,
  })

  const teacherQuizzes = (teacherQuizzesData as any)?.data?.items || []

  useEffect(() => {
    if (editingQuizId) {
      // load quiz to edit
      ;(async () => {
        try {
          const res = await QuizAPI.getQuiz(editingQuizId)
          const q = res.data
          setForm({ title: q.title || '', subject: q.description || '', timeLimitMinutes: q.timeLimitMinutes || 30, dueDate: q.dueDate || '', termId: q.term_id || '' })
          setQuestions(q.questions?.map((qq: any) => ({ text: qq.text, type: qq.type, options: qq.options || [], correctAnswer: qq.correctAnswer, points: qq.points || 1 })) || [emptyQ()])
        } catch (err) {
          toast.error('Failed to load quiz for editing')
        }
      })()
    }
  }, [editingQuizId])

  const totalPoints = useMemo(() => questions.reduce((s, q) => s + q.points, 0), [questions])

  const addQuestion = () => setQuestions((p) => [...p, emptyQ()])
  const removeQuestion = (i: number) => setQuestions((p) => p.filter((_, idx) => idx !== i))
  const updateQ = (i: number, field: keyof QForm, value: any) => setQuestions((p) => p.map((q, idx) => (idx === i ? { ...q, [field]: value } : q)))
  const updateOption = (qi: number, oi: number, val: string) => setQuestions((p) => p.map((q, idx) => idx === qi ? { ...q, options: q.options.map((o, i) => (i === oi ? val : o)) } : q))

  const resetForm = () => {
    setForm({ title: '', subject: '', timeLimitMinutes: 30, dueDate: '', termId: '' })
    setQuestions([emptyQ()])
    setSelectedClass('')
  }

  const handleCreate = async () => {
    const hasInvalidQuestion = questions.some((q) => !q.text || !q.correctAnswer || (q.type === 'multiple_choice' && q.options.filter((o) => o.trim()).length < 2))
    if (!form.title || !selectedClass || !form.dueDate || hasInvalidQuestion) {
      toast.error('Complete required fields before publishing')
      return
    }

    setSaving(true)

    try {
      const payload = {
        title: form.title,
        description: form.subject,
        class_id: selectedClass,
        subject_id: undefined,
        term_id: form.termId || (terms && terms.length ? terms[0].id : ''),
        session_id: activeSession?.id || '',
        due_date: form.dueDate,
        time_limit_minutes: form.timeLimitMinutes,
        questions: questions.map((q) => ({ text: q.text, type: q.type, options: q.type === 'multiple_choice' ? q.options.filter((o) => o.trim()) : undefined, correct_answer: q.correctAnswer, points: q.points })),
        status: 'published',
      }

      if (editingQuizId) {
        await QuizAPI.updateQuiz(editingQuizId, payload)
        toast.success('Quiz updated.')
        setEditingQuizId(null)
      } else {
        await QuizAPI.createQuiz(payload)
        toast.success('Quiz created and published.')
      }

      qc.invalidateQueries({ queryKey: ['teacher-quizzes', teacher?.teacher_id] })
      setView('list')
      resetForm()
    } catch (err: any) {
      console.error('Create/update quiz error', err)
      toast.error(err?.message || 'Failed to create/update quiz')
    }

    setSaving(false)
  }

  if (view === 'create') {
    return (
      <div className="p-6 max-w-4xl">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">{editingQuizId ? 'Edit Quiz' : 'Create New Quiz'}</h2>
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => { setView('list'); setEditingQuizId(null); resetForm() }}>Cancel</Button>
            <Button onClick={handleCreate} disabled={saving}>{saving ? 'Publishing...' : editingQuizId ? 'Save Changes' : 'Publish Quiz'}</Button>
          </div>
        </div>

        <div className="mb-4 grid grid-cols-1 md:grid-cols-2 gap-3">
          <input placeholder="Quiz Title" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} className="input" />
          <input placeholder="Subject" value={form.subject} onChange={(e) => setForm({ ...form, subject: e.target.value })} className="input" />
          <select value={selectedClass} onChange={(e) => setSelectedClass(e.target.value)} className="input">
            <option value="">Select class to assign</option>
            {classes.map((c: any) => (
              <option key={c.id} value={c.id}>{c.name} {c.arm ? `(${c.arm})` : ''}</option>
            ))}
          </select>
          <input type="datetime-local" value={form.dueDate} onChange={(e) => setForm({ ...form, dueDate: e.target.value })} className="input" />
        </div>

        <div className="mb-4">
          <h3 className="font-semibold mb-2">Questions ({questions.length}) · Total points: {totalPoints}</h3>
          {questions.map((q, qi) => (
            <div key={qi} className="p-3 border rounded mb-2">
              <div className="mb-2 flex justify-between items-center">
                <strong>Q{qi + 1}</strong>
                {questions.length > 1 && <button className="text-red-600" onClick={() => removeQuestion(qi)}>Remove</button>}
              </div>
              <input placeholder="Question text" value={q.text} onChange={(e) => updateQ(qi, 'text', e.target.value)} className="input mb-2" />
              <div className="grid grid-cols-2 gap-2 mb-2">
                <select value={q.type} onChange={(e) => updateQ(qi, 'type', e.target.value as any)} className="input">
                  <option value="multiple_choice">Multiple Choice</option>
                  <option value="short_answer">Short Answer</option>
                </select>
                <input type="number" min={1} value={q.points} onChange={(e) => updateQ(qi, 'points', parseInt(e.target.value) || 1)} className="input" />
              </div>
              {q.type === 'multiple_choice' && (
                <div>
                  {q.options.map((opt, oi) => (
                    <div key={oi} className="flex gap-2 items-center mb-2">
                      <input type="radio" name={`correct-${qi}`} checked={q.correctAnswer === opt} onChange={() => updateQ(qi, 'correctAnswer', opt)} />
                      <input value={opt} onChange={(e) => updateOption(qi, oi, e.target.value)} className="input flex-1" placeholder={`Option ${oi + 1}`} />
                    </div>
                  ))}
                </div>
              )}
              {q.type === 'short_answer' && (
                <input placeholder="Correct answer" value={q.correctAnswer} onChange={(e) => updateQ(qi, 'correctAnswer', e.target.value)} className="input" />
              )}
            </div>
          ))}

          <button onClick={addQuestion} className="w-full py-2 border-dashed border-2 rounded text-blue-700">Add another question</button>
        </div>

        <div className="mt-4">
          <h4 className="font-semibold">Assigned students ({students.length})</h4>
          <ul className="mt-2 list-disc list-inside">
            {students.map((s: any) => <li key={s.student_id || s.id}>{s.name || s.registration_number}</li>)}
          </ul>
        </div>
      </div>
    )
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold">Quizzes</h1>
          <p className="text-sm">Create and publish assessments for your classes</p>
        </div>
        <div>
          <Button onClick={() => setView('create')}>Create Quiz</Button>
        </div>
      </div>

      <div className="rounded border p-6 mb-6">
        <h3 className="font-semibold">Overview</h3>
        <p className="text-sm text-muted mt-2">Assigned classes: {classes.length} · Total quizzes: {teacherQuizzes.length}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {isLoadingQuizzes ? (
          <div>Loading quizzes...</div>
        ) : teacherQuizzes.length === 0 ? (
          <div className="p-6 rounded border">No quizzes yet. Create one to get started.</div>
        ) : (
          teacherQuizzes.map((q: any) => {
            const due = new Date(q.dueDate)
            return (
              <div key={q.id} className="bg-white rounded-2xl border p-4">
                <div className="flex justify-between items-start gap-3 mb-3">
                  <div>
                    <h4 className="text-lg font-bold">{q.title}</h4>
                    <p className="text-sm text-muted">{q.description}</p>
                    <div className="flex gap-2 mt-2">
                      <Badge variant="outline">{q.timeLimitMinutes}m</Badge>
                      <Badge variant="secondary">{q.questions?.length || 0} items</Badge>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-xs">Due {due.toLocaleDateString()}</div>
                    <div className="flex gap-2 mt-2">
                      <Button variant="outline" size="sm" onClick={() => { setEditingQuizId(q.id); setView('create') }}>Edit</Button>
                      <Button variant="destructive" size="sm" onClick={async () => {
                        if (!confirm('Delete this quiz? This cannot be undone.')) return
                        try {
                          await QuizAPI.deleteQuiz(q.id)
                          toast.success('Quiz deleted')
                          qc.invalidateQueries({ queryKey: ['teacher-quizzes', teacher?.teacher_id] })
                        } catch (err) {
                          toast.error('Failed to delete quiz')
                        }
                      }}>Delete</Button>
                    </div>
                  </div>
                </div>

                <div className="text-sm text-muted mb-2">Assigned class: {q.classId}</div>
                <div className="flex gap-2">
                  <Button variant="ghost" size="sm" onClick={async () => {
                    try {
                      const res = await QuizAPI.getQuizSubmissions(q.id)
                      const subs = res.data?.submissions || []
                      const avg = subs.length ? Math.round(subs.reduce((a: any, b: any) => a + (b.score || 0), 0) / subs.length) : 0
                      alert(`Submissions: ${subs.length}\nAvg score: ${avg}`)
                    } catch (err) {
                      toast.error('Failed to load submissions')
                    }
                  }}>View Submissions</Button>
                </div>
              </div>
            )
          })
        )}
      </div>
    </div>
  )
}
