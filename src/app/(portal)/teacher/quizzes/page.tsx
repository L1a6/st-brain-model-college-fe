"use client"

import { useEffect, useMemo, useState } from "react"
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

            </div>
          </div>
        </div>

        <div className="mx-auto max-w-6xl p-6 md:p-8 lg:p-10">
          <PageHeader
            title="Quizzes"
            subtitle="Create and publish assessments for your classes"
            actions={
              <Button onClick={() => setView('create')} className="bg-[#0A1F44] hover:bg-[#0E2A59]">
                Create quiz
              </Button>
            }
          />

          <div className="mb-6 overflow-hidden rounded-3xl bg-linear-to-br from-[#0A1F44] via-[#12396D] to-[#0E234D] text-white shadow-[0_24px_70px_rgba(10,31,68,0.18)]">
            <div className="relative grid gap-8 p-6 md:p-8 lg:grid-cols-[1.2fr_0.8fr] lg:p-10">
              <div>
                <div className="text-xs uppercase tracking-[0.3em] text-white/70 mb-4">Quiz studio</div>
                <h2 className="font-display text-3xl md:text-5xl font-light leading-tight mb-4">Build quizzes, assign them, and publish them to students.</h2>
                <p className="max-w-2xl text-sm md:text-base text-white/80 leading-relaxed mb-6">
                  Every quiz you publish here can be delivered straight to the students in the selected class so it shows up in their dashboard automatically.
                </p>
                <Button onClick={() => setView('create')} className="bg-white text-[#0A1F44] hover:bg-white/90">Open quiz studio</Button>
              </div>

              <div className="grid grid-cols-2 gap-3">
                {heroStat({ label: 'Assigned classes', value: `${classes.length}` })}
                {heroStat({ label: 'Total quizzes', value: `${teacherQuizzes.length}` })}
                {heroStat({ label: 'Published', value: `${publishedCount}` })}
                {heroStat({ label: 'Drafts', value: `${draftCount}` })}
              </div>
            </div>
          </div>

          <div className="mb-6 grid gap-3 rounded-3xl border border-slate-200 bg-white p-5 shadow-sm md:grid-cols-3">
            <div className="rounded-2xl bg-slate-50 p-4">
              <div className="text-[11px] uppercase tracking-[0.18em] text-slate-500 mb-1">Classes</div>
              <div className="text-2xl font-bold text-[#0A1F44]">{classes.length}</div>
            </div>
            <div className="rounded-2xl bg-slate-50 p-4">
              <div className="text-[11px] uppercase tracking-[0.18em] text-slate-500 mb-1">Published</div>
              <div className="text-2xl font-bold text-[#0A1F44]">{publishedCount}</div>
            </div>
            <div className="rounded-2xl bg-slate-50 p-4">
              <div className="text-[11px] uppercase tracking-[0.18em] text-slate-500 mb-1">Drafts</div>
              <div className="text-2xl font-bold text-[#0A1F44]">{draftCount}</div>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            {isLoadingQuizzes ? (
              <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">Loading quizzes...</div>
            ) : teacherQuizzes.length === 0 ? (
              <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm md:col-span-2">No quizzes yet. Create one to get started.</div>
            ) : (
              teacherQuizzes.map((q: any) => {
                const due = new Date(q.dueDate)
                const status = (q.status || 'published').toLowerCase()
                const statusLabel = status === 'draft' ? 'Draft' : status === 'closed' ? 'Closed' : 'Published'
                const statusClass = status === 'draft' ? 'bg-slate-100 text-slate-700' : status === 'closed' ? 'bg-amber-100 text-amber-700' : 'bg-emerald-100 text-emerald-700'

                return (
                  <div key={q.id} className="overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-[0_14px_36px_rgba(15,23,42,0.06)]">
                    <div className="relative min-h-52">
                      <img
                        src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1400&q=80"
                        alt={q.title}
                        className="absolute inset-0 h-full w-full object-cover"
                      />
                      <div className="absolute inset-0 bg-linear-to-b from-transparent via-[#0A1F44]/35 to-[#0A1F44]/82" />
                      <div className="absolute left-5 top-5 flex flex-wrap gap-2">
                        <span className={`rounded-full px-3 py-1 text-xs font-semibold ${statusClass}`}>{statusLabel}</span>
                        <span className="rounded-full bg-white/12 px-3 py-1 text-xs font-semibold text-white backdrop-blur-sm">{q.questions?.length || 0} questions</span>
                      </div>
                      <div className="absolute right-5 bottom-5 text-right text-white">
                        <div className="text-3xl font-bold">{q.timeLimitMinutes}m</div>
                        <div className="text-xs uppercase tracking-[0.22em] text-white/75 mt-1">Time limit</div>
                      </div>
                    </div>

                    <div className="p-6">
                      <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
                        <div>
                          <h4 className="font-display text-2xl font-semibold text-[#0A1F44] mb-2">{q.title}</h4>
                          <p className="text-sm text-slate-600">{q.description || q.subject}</p>
                        </div>
                        <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-right">
                          <div className="text-[11px] uppercase tracking-[0.18em] text-slate-500 mb-1">Due</div>
                          <div className="text-sm font-semibold text-[#0A1F44]">{due.toLocaleDateString()}</div>
                        </div>
                      </div>

                      <div className="mb-5 flex flex-wrap gap-2">
                        <Badge variant="outline">{q.timeLimitMinutes}m</Badge>
                        <Badge variant="secondary">{q.questions?.length || 0} items</Badge>
                        <Badge variant="outline">Class: {q.classId}</Badge>
                      </div>

                      <div className="flex flex-wrap gap-3">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => { setEditingQuizId(q.id); setView('create') }}
                        >
                          Edit
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={async () => {
                            if (!confirm('Delete this quiz? This cannot be undone.')) return
                            try {
                              await QuizAPI.deleteQuiz(q.id)
                              toast.success('Quiz deleted')
                              qc.invalidateQueries({ queryKey: ['teacher-quizzes', teacherId] })
                            } catch (err) {
                              toast.error('Failed to delete quiz')
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
                              const res = await QuizAPI.getQuizSubmissions(q.id)
                              const subs = res.data?.submissions || []
                              const avg = subs.length ? Math.round(subs.reduce((a: any, b: any) => a + (b.score || 0), 0) / subs.length) : 0
                              alert(`Submissions: ${subs.length}\nAvg score: ${avg}`)
                            } catch (err) {
                              toast.error('Failed to load submissions')
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
        </div>
      </div>
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
        <div className="mx-auto max-w-6xl p-6 md:p-8 lg:p-10">
          <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-slate-500 mb-3">Quiz Studio</p>
              <h2 className="font-display text-3xl md:text-5xl font-semibold text-[#0A1F44]">
                {editingQuizId ? 'Edit quiz' : 'Create new quiz'}
              </h2>
              <p className="mt-3 max-w-2xl text-sm md:text-base text-slate-600">
                Build assessments that land directly in your students&apos; dashboard once published.
              </p>
            </div>

            <div className="flex gap-2 flex-wrap">
              <Button variant="outline" onClick={() => { setView('list'); setEditingQuizId(null); resetForm() }}>Cancel</Button>
              <Button onClick={handleCreate} disabled={saving} className="bg-[#0A1F44] hover:bg-[#0E2A59]">
                {saving ? 'Publishing...' : editingQuizId ? 'Save changes' : 'Publish quiz'}
              </Button>
            </div>
          </div>

          <div className="mb-6 overflow-hidden rounded-3xl bg-linear-to-br from-[#0A1F44] via-[#12396D] to-[#0E234D] text-white shadow-[0_24px_70px_rgba(10,31,68,0.18)]">
            <div className="grid gap-8 p-6 md:p-8 lg:grid-cols-[1.3fr_0.8fr] lg:p-10">
              <div>
                <div className="text-xs uppercase tracking-[0.3em] text-white/70 mb-4">Assessment deck</div>
                <h3 className="font-display text-3xl md:text-5xl font-light leading-tight mb-4">
                  Craft quizzes students actually respect.
                </h3>
                <p className="max-w-2xl text-sm md:text-base text-white/80 leading-relaxed">
                  Use your teacher dashboard to build quizzes, assign them to a class, and publish them so they appear in the student dashboard automatically.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3">
                {heroStat({ label: 'Questions', value: `${questions.length}` })}
                {heroStat({ label: 'Total points', value: `${totalPoints}` })}
                {heroStat({ label: 'Objective items', value: `${objectiveCount}` })}
                {heroStat({ label: 'Duration', value: `${form.timeLimitMinutes} mins` })}
              </div>
            </div>
          </div>

          <div className="mb-6 grid gap-4 rounded-3xl border border-slate-200 bg-white p-5 shadow-sm md:grid-cols-2 xl:grid-cols-4">
            <div>
              <label className="mb-2 block text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500">Quiz title</label>
              <input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} placeholder="e.g. SS2 Mathematics Weekly Drill" className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm outline-none transition-colors focus:border-[#0A1F44]" />
            </div>
            <div>
              <label className="mb-2 block text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500">Subject</label>
              <input value={form.subject} onChange={(e) => setForm({ ...form, subject: e.target.value })} placeholder="e.g. Mathematics" className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm outline-none transition-colors focus:border-[#0A1F44]" />
            </div>
            <div>
              <label className="mb-2 block text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500">Class</label>
              <select value={selectedClass} onChange={(e) => setSelectedClass(e.target.value)} className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm outline-none transition-colors focus:border-[#0A1F44]">
                <option value="">Select class to assign</option>
                {classes.map((c: any) => (
                  <option key={c.id} value={c.id}>{c.name} {c.arm ? `(${c.arm})` : ''}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="mb-2 block text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500">Due date</label>
              <input type="datetime-local" value={form.dueDate} onChange={(e) => setForm({ ...form, dueDate: e.target.value })} className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm outline-none transition-colors focus:border-[#0A1F44]" />
            </div>
            <div className="xl:col-span-4 flex items-center justify-between rounded-2xl bg-slate-50 px-4 py-3 text-sm text-slate-600">
              <span>Assigned class: <span className="font-semibold text-[#0A1F44]">{assignedClassLabel}</span></span>
              <span>Students in class: <span className="font-semibold text-[#0A1F44]">{students.length}</span></span>
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

            {questions.map((q, qi) => (
              <div key={qi} className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
                <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 bg-slate-50 px-5 py-4">
                  <div className="flex items-center gap-3">
                    <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-[#0A1F44] text-sm font-bold text-white">Q{qi + 1}</span>
                    <div>
                      <div className="text-sm font-semibold text-[#0A1F44]">Question builder</div>
                      <div className="text-xs text-slate-500">Set the prompt, correct answer and points.</div>
                    </div>
                  </div>
                  {questions.length > 1 && (
                    <button className="rounded-full border border-red-200 px-3 py-2 text-xs font-semibold text-red-600 transition-colors hover:bg-red-50" onClick={() => removeQuestion(qi)}>
                      Remove
                    </button>
                  )}
                </div>

                <div className="p-5">
                  <div className="mb-4">
                    <label className="mb-2 block text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500">Question text</label>
                    <input value={q.text} onChange={(e) => updateQ(qi, 'text', e.target.value)} placeholder="Type your question here" className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm outline-none transition-colors focus:border-[#0A1F44]" />
                  </div>

                  <div className="mb-4 grid gap-3 md:grid-cols-2">
                    <div>
                      <label className="mb-2 block text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500">Type</label>
                      <select value={q.type} onChange={(e) => updateQ(qi, 'type', e.target.value as any)} className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm outline-none transition-colors focus:border-[#0A1F44]">
                        <option value="multiple_choice">Multiple choice</option>
                        <option value="short_answer">Short answer</option>
                      </select>
                    </div>
                    <div>
                      <label className="mb-2 block text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500">Points</label>
                      <input type="number" min={1} value={q.points} onChange={(e) => updateQ(qi, 'points', parseInt(e.target.value) || 1)} className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm outline-none transition-colors focus:border-[#0A1F44]" />
                    </div>
                  </div>

                  {q.type === 'multiple_choice' && (
                    <div className="mb-4">
                      <label className="mb-2 block text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500">Answer options</label>
                      <div className="space-y-2">
                        {q.options.map((opt, oi) => (
                          <div key={oi} className="grid grid-cols-[auto_1fr] items-center gap-3">
                            <input type="radio" name={`correct-${qi}`} checked={q.correctAnswer === opt} onChange={() => updateQ(qi, 'correctAnswer', opt)} />
                            <input value={opt} onChange={(e) => updateOption(qi, oi, e.target.value)} placeholder={`Option ${oi + 1}`} className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm outline-none transition-colors focus:border-[#0A1F44]" />
                          </div>
                        ))}
                      </div>
                      <p className="mt-2 text-xs text-slate-500">Mark the radio circle for the correct answer.</p>
                    </div>
                  )}

                  {q.type === 'short_answer' && (
                    <div>
                      <label className="mb-2 block text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500">Correct answer</label>
                      <input value={q.correctAnswer} onChange={(e) => updateQ(qi, 'correctAnswer', e.target.value)} placeholder="Expected answer" className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm outline-none transition-colors focus:border-[#0A1F44]" />
                    </div>
                  )}
                </div>
              </div>
            ))}

            <button onClick={addQuestion} className="w-full rounded-2xl border-2 border-dashed border-[#0A1F44]/20 bg-[#0A1F44]/4 px-4 py-4 font-semibold text-[#0A1F44] transition-colors hover:bg-[#0A1F44]/8">
              Add another question
            </button>
          </div>

          <div className="mt-8 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <h4 className="text-sm font-extrabold uppercase tracking-[0.18em] text-[#0A1F44] mb-4">Assigned students ({students.length})</h4>
            {students.length === 0 ? (
              <p className="text-sm text-slate-500">Pick a class to preview the students who will receive this quiz.</p>
            ) : (
              <ul className="grid gap-2 md:grid-cols-2 lg:grid-cols-3">
                {students.map((s: any) => (
                  <li key={s.student_id || s.id} className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700">
                    {s.name || s.registration_number}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
                    }
                  }}>View Submissions</Button>
                </div>
              </div>
      <div className="mx-auto max-w-6xl p-6 md:p-8 lg:p-10">
        <PageHeader
          title="Quizzes"
          subtitle="Create and publish assessments for your classes"
          actions={
            <Button onClick={() => setView('create')} className="bg-[#0A1F44] hover:bg-[#0E2A59]">
              Create quiz
            </Button>
          }
        />

        <div className="mb-6 overflow-hidden rounded-3xl bg-linear-to-br from-[#0A1F44] via-[#12396D] to-[#0E234D] text-white shadow-[0_24px_70px_rgba(10,31,68,0.18)]">
          <div className="relative grid gap-8 p-6 md:p-8 lg:grid-cols-[1.2fr_0.8fr] lg:p-10">
            <div>
              <div className="text-xs uppercase tracking-[0.3em] text-white/70 mb-4">Quiz studio</div>
              <h2 className="font-display text-3xl md:text-5xl font-light leading-tight mb-4">Build quizzes, assign them, and publish them to students.</h2>
              <p className="max-w-2xl text-sm md:text-base text-white/80 leading-relaxed mb-6">
                Every quiz you publish here can be delivered straight to the students in the selected class so it shows up in their dashboard automatically.
              </p>
              <Button onClick={() => setView('create')} className="bg-white text-[#0A1F44] hover:bg-white/90">Open quiz studio</Button>
            </div>

            <div className="grid grid-cols-2 gap-3">
              {heroStat({ label: 'Assigned classes', value: `${classes.length}` })}
              {heroStat({ label: 'Total quizzes', value: `${teacherQuizzes.length}` })}
              {heroStat({ label: 'Published', value: `${publishedCount}` })}
              {heroStat({ label: 'Drafts', value: `${draftCount}` })}
            </div>
          </div>
        </div>

        <div className="mb-6 grid gap-3 rounded-3xl border border-slate-200 bg-white p-5 shadow-sm md:grid-cols-3">
          <div className="rounded-2xl bg-slate-50 p-4">
            <div className="text-[11px] uppercase tracking-[0.18em] text-slate-500 mb-1">Classes</div>
            <div className="text-2xl font-bold text-[#0A1F44]">{classes.length}</div>
          </div>
          <div className="rounded-2xl bg-slate-50 p-4">
            <div className="text-[11px] uppercase tracking-[0.18em] text-slate-500 mb-1">Published</div>
            <div className="text-2xl font-bold text-[#0A1F44]">{publishedCount}</div>
          </div>
          <div className="rounded-2xl bg-slate-50 p-4">
            <div className="text-[11px] uppercase tracking-[0.18em] text-slate-500 mb-1">Drafts</div>
            <div className="text-2xl font-bold text-[#0A1F44]">{draftCount}</div>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          {isLoadingQuizzes ? (
            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">Loading quizzes...</div>
          ) : teacherQuizzes.length === 0 ? (
            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm md:col-span-2">No quizzes yet. Create one to get started.</div>
          ) : (
            teacherQuizzes.map((q: any) => {
              const due = new Date(q.dueDate)
              const status = (q.status || 'published').toLowerCase()
              const statusLabel = status === 'draft' ? 'Draft' : status === 'closed' ? 'Closed' : 'Published'
              const statusClass = status === 'draft' ? 'bg-slate-100 text-slate-700' : status === 'closed' ? 'bg-amber-100 text-amber-700' : 'bg-emerald-100 text-emerald-700'

              return (
                <div key={q.id} className="overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-[0_14px_36px_rgba(15,23,42,0.06)]">
                  <div className="relative min-h-52">
                    <img
                      src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1400&q=80"
                      alt={q.title}
                      className="absolute inset-0 h-full w-full object-cover"
                    />
                    <div className="absolute inset-0 bg-linear-to-b from-transparent via-[#0A1F44]/35 to-[#0A1F44]/82" />
                    <div className="absolute left-5 top-5 flex flex-wrap gap-2">
                      <span className={`rounded-full px-3 py-1 text-xs font-semibold ${statusClass}`}>{statusLabel}</span>
                      <span className="rounded-full bg-white/12 px-3 py-1 text-xs font-semibold text-white backdrop-blur-sm">{q.questions?.length || 0} questions</span>
                    </div>
                    <div className="absolute right-5 bottom-5 text-right text-white">
                      <div className="text-3xl font-bold">{q.timeLimitMinutes}m</div>
                      <div className="text-xs uppercase tracking-[0.22em] text-white/75 mt-1">Time limit</div>
                    </div>
                  </div>

                  <div className="p-6">
                    <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
                      <div>
                        <h4 className="font-display text-2xl font-semibold text-[#0A1F44] mb-2">{q.title}</h4>
                        <p className="text-sm text-slate-600">{q.description || q.subject}</p>
                      </div>
                      <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-right">
                        <div className="text-[11px] uppercase tracking-[0.18em] text-slate-500 mb-1">Due</div>
                        <div className="text-sm font-semibold text-[#0A1F44]">{due.toLocaleDateString()}</div>
                      </div>
                    </div>

                    <div className="mb-5 flex flex-wrap gap-2">
                      <Badge variant="outline">{q.timeLimitMinutes}m</Badge>
                      <Badge variant="secondary">{q.questions?.length || 0} items</Badge>
                      <Badge variant="outline">Class: {q.classId}</Badge>
                    </div>

                    <div className="flex flex-wrap gap-3">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => { setEditingQuizId(q.id); setView('create') }}
                      >
                        Edit
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={async () => {
                          if (!confirm('Delete this quiz? This cannot be undone.')) return
                          try {
                            await QuizAPI.deleteQuiz(q.id)
                            toast.success('Quiz deleted')
                            qc.invalidateQueries({ queryKey: ['teacher-quizzes', teacherId] })
                          } catch (err) {
                            toast.error('Failed to delete quiz')
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
                            const res = await QuizAPI.getQuizSubmissions(q.id)
                            const subs = res.data?.submissions || []
                            const avg = subs.length ? Math.round(subs.reduce((a: any, b: any) => a + (b.score || 0), 0) / subs.length) : 0
                            alert(`Submissions: ${subs.length}\nAvg score: ${avg}`)
                          } catch (err) {
                            toast.error('Failed to load submissions')
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
      </div>
