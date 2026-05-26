import axios, { AxiosError, AxiosRequestConfig } from "axios"
import { getUserFriendlyMessage } from "../errors"

const DEFAULT_API_BASE_URL = "https://st-brains-model-college-be.onrender.com/api/v1"
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL ?? DEFAULT_API_BASE_URL
const AUTH_BYPASS_ENABLED = false
const MOCK_SESSION_KEY = "osp_mock_auth_session"

type MockUser = {
  id: string
  email: string
  first_name: string
  last_name: string
  middle_name: string
  role: string[]
  gender: "MALE"
  dob: string
  phone: string
  is_active: boolean
  created_at: string
  updated_at: string
  student_id: string
  parent_id: string
  teacher_id: string
}

const ALL_ROLES = ["ADMIN", "SUPER_ADMIN", "TEACHER", "STUDENT", "PARENT"] as const

const normalizePath = (path: string): string => {
  const [withoutQuery] = path.split("?")
  if (!withoutQuery) return "/"
  if (withoutQuery.startsWith("/")) return withoutQuery
  return `/${withoutQuery}`
}

const inferPrimaryRole = (email: string): string => {
  const value = email.toLowerCase()
  if (value.includes("super")) return "SUPER_ADMIN"
  if (value.includes("teacher")) return "TEACHER"
  if (value.includes("student")) return "STUDENT"
  if (value.includes("parent")) return "PARENT"
  return "ADMIN"
}

const buildMockUser = (primaryRole: string, email: string): MockUser => {
  const now = new Date().toISOString()
  const orderedRoles = [
    primaryRole,
    ...ALL_ROLES.filter((role) => role !== primaryRole),
  ]

  return {
    id: "usr-mock-001",
    email,
    first_name: "Demo",
    last_name: "User",
    middle_name: "A",
    role: orderedRoles,
    gender: "MALE",
    dob: "2008-03-15",
    phone: "+2348012345678",
    is_active: true,
    created_at: now,
    updated_at: now,
    student_id: "STD-0001",
    parent_id: "PRT-0001",
    teacher_id: "TCH-0001",
  }
}

const saveMockUser = (user: MockUser): void => {
  if (typeof window === "undefined") return
  window.localStorage.setItem(MOCK_SESSION_KEY, JSON.stringify(user))
}

const getMockUser = (): MockUser => {
  const defaultUser = buildMockUser("ADMIN", "admin@st-brians-model-college.local")

  if (typeof window === "undefined") {
    return defaultUser
  }

  const raw = window.localStorage.getItem(MOCK_SESSION_KEY)
  if (!raw) {
    saveMockUser(defaultUser)
    return defaultUser
  }

  try {
    const parsed = JSON.parse(raw) as MockUser
    if (!Array.isArray(parsed.role) || !parsed.email) {
      saveMockUser(defaultUser)
      return defaultUser
    }
    return parsed
  } catch {
    saveMockUser(defaultUser)
    return defaultUser
  }
}

const clearMockUser = (): void => {
  if (typeof window === "undefined") return
  window.localStorage.removeItem(MOCK_SESSION_KEY)
}

const mockStudentResult = {
  id: "res-001",
  student: {
    id: "STD-0001",
    name: "Demo User",
    registration_number: "REG-2026-001",
  },
  class: {
    id: "class-ss2a",
    name: "SS2",
    arm: "A",
  },
  term: {
    id: "term-3",
    name: "Third Term",
  },
  academicSession: {
    id: "session-2025-2026",
    name: "2025/2026",
    academicYear: "2025/2026",
  },
  total_score: 422,
  average_score: 70.3,
  grade_letter: "B",
  position: 5,
  remark: "Very Good",
  subject_count: 6,
  subject_lines: [
    {
      id: "line-1",
      subject: { id: "subj-math", name: "Mathematics" },
      ca_score: 24,
      exam_score: 58,
      total_score: 82,
      grade_letter: "A",
      remark: "Excellent",
    },
    {
      id: "line-2",
      subject: { id: "subj-eng", name: "English Language" },
      ca_score: 22,
      exam_score: 50,
      total_score: 72,
      grade_letter: "B",
      remark: "Very Good",
    },
    {
      id: "line-3",
      subject: { id: "subj-bio", name: "Biology" },
      ca_score: 20,
      exam_score: 46,
      total_score: 66,
      grade_letter: "C",
      remark: "Good",
    },
  ],
  generated_at: new Date().toISOString(),
  created_at: new Date().toISOString(),
  updated_at: new Date().toISOString(),
}

const buildMockApiResponse = (path: string, config: AxiosRequestConfig): unknown | null => {
  const method = (config.method || "GET").toUpperCase()
  const normalizedPath = normalizePath(path)

  if (
    method === "POST" &&
    (normalizedPath === "/api/auth/login" ||
      normalizedPath === "/api/auth/superadmin/login")
  ) {
    const payload = (config.data || {}) as { email?: string }
    const email = payload.email?.trim() || "admin@st-brians-model-college.local"
    const primaryRole =
      normalizedPath === "/api/auth/superadmin/login"
        ? "SUPER_ADMIN"
        : inferPrimaryRole(email)
    const user = buildMockUser(primaryRole, email)
    saveMockUser(user)

    if (normalizedPath === "/api/auth/superadmin/login") {
      return { message: "Login successful" }
    }

    return {
      message: "Login successful",
      data: {
        user: {
          id: user.id,
          email: user.email,
          first_name: user.first_name,
          last_name: user.last_name,
          role: user.role,
        },
      },
    }
  }

  if (normalizedPath === "/api/auth/logout") {
    clearMockUser()
    return { status: "success", message: "Logged out", data: null }
  }

  if (normalizedPath === "/api/auth/refresh") {
    return { status: "success", message: "Session refreshed", data: {} }
  }

  if (normalizedPath === "/auth/me") {
    return { status_code: 200, message: "OK", data: getMockUser() }
  }

  if (normalizedPath === "/academic-term/active") {
    return {
      status_code: 200,
      message: "OK",
      data: {
        id: "term-3",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        sessionId: "session-2025-2026",
        name: "Third Term",
        startDate: "2026-04-22",
        endDate: "2026-07-26",
        status: "ACTIVE",
        isCurrent: true,
        deletedAt: null,
      },
    }
  }

  if (normalizedPath === "/parents/my-students") {
    return {
      status_code: 200,
      message: "OK",
      data: {
        message: "Success",
        status_code: 200,
        data: [
          {
            id: "STD-0001",
            registration_number: "REG-2026-001",
            first_name: "Demo",
            last_name: "Learner",
            middle_name: "A",
            full_name: "Demo Learner",
          },
        ],
      },
    }
  }

  if (normalizedPath.startsWith("/results/student/")) {
    return {
      status_code: 200,
      message: "OK",
      data: {
        message: "Success",
        data: [mockStudentResult],
      },
    }
  }

  if (normalizedPath === "/classes/teacher/assigned") {
    return {
      status_code: 200,
      message: "OK",
      data: [
        {
          id: "class-ss2a",
          name: "SS2",
          arm: "A",
          academicSession: { id: "session-2025-2026", name: "2025/2026" },
        },
      ],
    }
  }

  if (normalizedPath.startsWith("/class-subjects")) {
    return {
      status_code: 200,
      message: "OK",
      data: {
        payload: [
          {
            id: "cls-sub-1",
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
            teacher_assignment_date: new Date().toISOString(),
            subject: { id: "subj-math", createdAt: "", updatedAt: "", name: "Mathematics" },
            teacher: { id: "TCH-0001", name: "Demo Teacher" },
          },
          {
            id: "cls-sub-2",
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
            teacher_assignment_date: new Date().toISOString(),
            subject: {
              id: "subj-eng",
              createdAt: "",
              updatedAt: "",
              name: "English Language",
            },
            teacher: { id: "TCH-0001", name: "Demo Teacher" },
          },
        ],
        paginationMeta: { total: 2 },
      },
    }
  }

  if (normalizedPath.startsWith("/classes/") && normalizedPath.endsWith("/students")) {
    return {
      status_code: 200,
      message: "OK",
      data: [
        {
          enrollment_date: "2025-09-01",
          is_active: true,
          name: "Demo Learner",
          registration_number: "REG-2026-001",
          student_id: "STD-0001",
        },
        {
          enrollment_date: "2025-09-01",
          is_active: true,
          name: "Aisha Bello",
          registration_number: "REG-2026-002",
          student_id: "STD-0002",
        },
      ],
    }
  }

  if (normalizedPath.startsWith("/grades/submissions")) {
    if (method === "GET") {
      return {
        status_code: 200,
        message: "OK",
        data: {
          items: [
            {
              id: "sub-001",
              teacher: { id: "TCH-0001", name: "Demo Teacher", title: "Mr" },
              class: { id: "class-ss2a", name: "SS2", arm: "A" },
              subject: { id: "subj-math", name: "Mathematics" },
              term: { id: "term-3", name: "Third Term" },
              status: "DRAFT",
              student_count: 2,
              submitted_at: null,
              reviewed_at: null,
              rejection_reason: null,
              grades: [
                {
                  id: "grade-1",
                  student: {
                    id: "STD-0001",
                    name: "Demo Learner",
                    registration_number: "REG-2026-001",
                  },
                  ca_score: "24",
                  exam_score: "58",
                  total_score: "82",
                  grade_letter: "A",
                  comment: null,
                },
              ],
              created_at: new Date().toISOString(),
              updated_at: new Date().toISOString(),
            },
          ],
          meta: {
            total: 1,
            limit: 10,
            page: 1,
            total_pages: 1,
            has_next: false,
            has_previous: false,
          },
        },
      }
    }

    return {
      status_code: 200,
      message: "Saved",
      data: {
        id: "sub-001",
        teacher_id: "TCH-0001",
        class_id: "class-ss2a",
        subject_id: "subj-math",
        term_id: "term-3",
        academic_session_id: "session-2025-2026",
        grades: [],
        status: "draft",
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      },
    }
  }

  if (normalizedPath.startsWith("/students/")) {
    const studentId = normalizedPath.replace("/students/", "")
    return {
      status_code: 200,
      message: "OK",
      data: {
        id: studentId,
        name: "Demo Learner",
        registration_number: "REG-2026-001",
      },
    }
  }

  return null
}

const isAbsoluteUrl = (path: string): boolean => /^https?:\/\//i.test(path)
const isInternalApiPath = (path: string): boolean => path.startsWith("/api/")
const normalizeBackendPath = (path: string): string => {
  const trimmedBase = API_BASE_URL?.replace(/\/+$/, "") ?? ""
  const trimmedPath = path.replace(/^\/+/, "")

  return `${trimmedBase}/${trimmedPath}`
}

const resolveRequestUrl = (path: string, proxy?: boolean): string => {
  if (isAbsoluteUrl(path) || isInternalApiPath(path)) {
    return path
  }

  if (proxy) {
    return `/api/proxy-auth${path.startsWith("/") ? path : "/" + path}`
  }

  return normalizeBackendPath(path)
}

// Axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
  validateStatus: (status) => status >= 200 && status < 400,
})

const navigateTo = (path: string) => {
  if (typeof window !== "undefined" && window.location.pathname !== path) {
    window.location.href = path
  }
}

const getErrorMessage = (error: unknown): string => {
  const defaultMessage = "An unexpected error occurred. Please try again later."

  if (error instanceof AxiosError) {
    const responseData = error.response?.data

    // Try to extract the actual error message from backend response
    if (typeof responseData === "object" && responseData !== null) {
      // Check for nested message structure
      const message = responseData.message || responseData.error || responseData.detail

      if (message) {
        if (typeof message === "string") {
          if (
            message.toLowerCase().includes("email already exists") ||
            message.toLowerCase().includes("email already exist")
          ) {
            return "Email address already exists. Please use a different email."
          }
          if (
            message.toLowerCase().includes("registration number") &&
            message.toLowerCase().includes("already exists")
          ) {
            return "Registration number already exists."
          }
          if (message.toLowerCase().includes("invalid credentials")) {
            return "Invalid Email address and/or Password."
          }
          // check if it is a proxy
          if (message.toLowerCase().includes("proxy error")) {
            return "Network error! please check your connection and try again"
          }

          return message
        }

        // Handle array of validation errors
        if (Array.isArray(message)) {
          return message[0] || defaultMessage
        }
      }

      // Check for validation errors in nested structure
      if (
        responseData.errors &&
        Array.isArray(responseData.errors) &&
        responseData.errors.length > 0
      ) {
        const firstError = responseData.errors[0]
        if (typeof firstError === "string") return firstError
        if (typeof firstError?.msg === "string") return firstError.msg
        return defaultMessage
      }
    }

    // if (error.response?.status === 409) {
    //   return "An account with these details already exists."
    // }

    if (error.response?.status === 400) {
      return "Invalid input data. Please check your entries."
    }

    if (error.response?.status === 401) {
      if (typeof window !== "undefined") {
        const pathname = window.location.pathname
        if (
          !AUTH_BYPASS_ENABLED &&
          !pathname.includes("/login") &&
          pathname.startsWith("/") &&
          !pathname.startsWith("//")
        ) {
          navigateTo(`/login?next=${encodeURIComponent(pathname)}`)
        }
      }
      return "Your session has expired. Please log in again."
    }

    // Fix the type error by providing default values
    const statusText = error.response?.statusText || "Unknown Error"
    const status = error.response?.status || 500
    return getUserFriendlyMessage(statusText, status)
  }

  return defaultMessage
}

export async function apiFetch<TResponse>(
  path: string,
  config: AxiosRequestConfig = {},
  proxy?: boolean
): Promise<TResponse> {
  if (AUTH_BYPASS_ENABLED && proxy) {
    const mockResponse = buildMockApiResponse(path, config)
    if (mockResponse !== null) {
      return mockResponse as TResponse
    }
  }

  const headers = { ...(config.headers || {}) }

  // Only set JSON header for plain objects/strings
  const isJson =
    config.data && !(config.data instanceof FormData) && !(config.data instanceof Blob)

  if (!headers["Content-Type"] && isJson) {
    headers["Content-Type"] = "application/json"
  }

  const axiosInstance = proxy ? axios : api
  const url = resolveRequestUrl(path, proxy)

  try {
    const res = await axiosInstance.request({
      url,
      ...config,
      headers,
    })

    // Handle 204 No Content (common for DELETE requests)
    if (res.status === 204) {
      return undefined as TResponse
    }

    return res.data as TResponse
  } catch (err) {
    // Network or backend errors
    if (err instanceof AxiosError) {
      // if unauthed
      if (err.response?.status === 401 && !AUTH_BYPASS_ENABLED) {
        navigateTo("/login")
      }
      const errorMessage = getErrorMessage(err)
      throw new Error(errorMessage)
    }
    throw new Error("An unexpected error occured. Please try again later")
  }
}
