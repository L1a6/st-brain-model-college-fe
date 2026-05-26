"use client"

import { createContext, useContext, useEffect, useMemo, useState } from "react"
import { useGetParentStudents } from "../_hooks/use-parent-students"
import { Student } from "@/lib/parents/client"
import { NoStudentLinkedModal } from "./no-assigned-student-modal"

interface StudentContextParams {
  studentID?: string
  selectedStudent?: Student
  students: Student[]
  setSelectedStudentID: (id: string) => void
  isLoading: boolean
}

const StudentContext = createContext<StudentContextParams | null>(null)

export const StudentProvider = ({ children }: { children: React.ReactNode }) => {
  const { data: students, isLoading, error } = useGetParentStudents()
  const studentList = useMemo(() => (Array.isArray(students) ? students : []), [students])

  const isEmpty = !isLoading && studentList.length === 0
  const is404 = error?.message?.includes("not found")
  const shouldShow = isEmpty || is404

  const [_selectedID, setSelectedID] = useState<string>()
  const selectedID = _selectedID ?? studentList[0]?.id

  // Modal visibility
  const [showModal, setShowModal] = useState(false)

  useEffect(() => {
    setShowModal(shouldShow)
  }, [shouldShow])

  function handleSelectStudent(studentID: string) {
    setSelectedID(studentID)
  }

  const data = {
    studentID: selectedID,
    selectedStudent: studentList.find((s) => s.id === selectedID),
    students: studentList,
    setSelectedStudentID: handleSelectStudent,
    isLoading,
  }

  return (
    <StudentContext.Provider value={data}>
      {children}

      {/* Modal appears when no students assigned */}
      <NoStudentLinkedModal open={showModal} onClose={() => setShowModal(false)} />
    </StudentContext.Provider>
  )
}

export const useParentStudents = () => {
  const context = useContext(StudentContext)
  if (!context) {
    throw new Error("useParentStudents must be used within a SetupStepProvider")
  }
  return context
}
