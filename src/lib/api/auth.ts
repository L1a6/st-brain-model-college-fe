import { apiFetch } from "./client"
import type {
  AuthApiResponse,
  LoginPayload,
  SignUpPayload,
  UserProfileResponse,
  LoginResponse,
} from "@/types/auth"

const LOGIN_PATH = "/api/auth/login"
const ME_PATH = "/auth/me"
const LOGOUT_PATH = "/api/auth/logout"
const REFRESH_PATH = "/api/auth/refresh"
const AUTH_SESSION_STORAGE_KEY = "st_brians_auth_session"

type StoredAuthSession = {
  userId: string
  sessionId: string
}

const readStoredAuthSession = (): StoredAuthSession | null => {
  if (typeof window === "undefined") return null

  const rawValue = window.localStorage.getItem(AUTH_SESSION_STORAGE_KEY)
  if (!rawValue) return null

  try {
    const parsed = JSON.parse(rawValue) as Partial<StoredAuthSession>
    if (typeof parsed.userId === "string" && typeof parsed.sessionId === "string") {
      return {
        userId: parsed.userId,
        sessionId: parsed.sessionId,
      }
    }
  } catch {
    return null
  }

  return null
}

const writeStoredAuthSession = (session: StoredAuthSession): void => {
  if (typeof window === "undefined") return

  window.localStorage.setItem(AUTH_SESSION_STORAGE_KEY, JSON.stringify(session))
}

export const clearStoredAuthSession = (): void => {
  if (typeof window === "undefined") return

  window.localStorage.removeItem(AUTH_SESSION_STORAGE_KEY)
}

export const storeAuthSessionFromResponse = (
  response: LoginResponse
): StoredAuthSession | null => {
  const user = response.user ?? response.data?.user
  const sessionId =
    typeof response.session_id === "string"
      ? response.session_id
      : typeof response["sessionId"] === "string"
        ? (response["sessionId"] as string)
        : null

  if (!user || !sessionId) return null

  const session = {
    userId: user.id,
    sessionId,
  }

  writeStoredAuthSession(session)
  return session
}

const getStoredLogoutPayload = (): StoredAuthSession | null => {
  return readStoredAuthSession()
}

export type RefreshResponse = AuthApiResponse<Record<string, unknown>>

// ------------------------------
// Auth
// ------------------------------

export const login = (payload: LoginPayload): Promise<LoginResponse> => {
  return apiFetch<LoginResponse>(
    LOGIN_PATH,
    {
      method: "POST",
      data: payload,
    },
    true // use proxy
  )
}

export const loginUsingEmail = (payload: {
  email: string
  password: string
}): Promise<LoginResponse> => {
  return apiFetch<LoginResponse>(
    LOGIN_PATH,
    {
      method: "POST",
      data: payload,
    },
    true // use proxy
  )
}

export const signUp = (payload: SignUpPayload): Promise<AuthApiResponse<null>> => {
  return apiFetch<AuthApiResponse<null>>(
    "/api/auth/signup",
    {
      method: "POST",
      data: payload,
    },
    true // use proxy
  )
}

// Get current user profile
export const getProfile = async (): Promise<UserProfileResponse> => {
  const res = await apiFetch<AuthApiResponse<UserProfileResponse>>(
    ME_PATH,
    { method: "GET" },
    true
  )
  if (!res.data) throw new Error("Failed to fetch profile")
  return res.data
}

export const refresh = (): Promise<RefreshResponse> => {
  return apiFetch<RefreshResponse>(
    REFRESH_PATH,
    {
      method: "POST",
    },
    true // use proxy
  )
}

// ------------------------------
// Activate Account
// ------------------------------

export const activateAccount = (userID: string): Promise<AuthApiResponse<null>> => {
  return apiFetch<AuthApiResponse<null>>(
    `/auth/users/${userID}activate-account`,
    {
      method: "PATCH",
    },
    true // use proxy
  )
}

// ------------------------------
// Forgot Password
// ------------------------------

export const sendForgotPasswordEmail = (
  email: string
): Promise<AuthApiResponse<null>> => {
  return apiFetch<AuthApiResponse<null>>(
    "/auth/forgot-password",
    {
      method: "POST",
      data: { email },
    },
    true // use proxy
  )
}

export const sendResetPasswordRequest = (payload: {
  token: string
  newPassword: string
}): Promise<AuthApiResponse<null>> => {
  return apiFetch<AuthApiResponse<null>>(
    "/auth/reset-password",
    {
      method: "POST",
      data: payload,
    },
    true
  )
}

export type UserData = {
  id: string // UUID
  email: string
  first_name: string
  last_name: string
  role: string[] // array of roles
  middle_name: string
  gender: "MALE" | "FEMALE" | "OTHER" | "male" | "female" | "other" | null | undefined
  dob: string // ISO date (YYYY-MM-DD)
  phone: string
  is_active: boolean
  created_at: string // ISO datetime
  updated_at: string // ISO datetime
}

export const getUserData = (): Promise<AuthApiResponse<UserData>> => {
  return apiFetch<AuthApiResponse<UserData>>(
    "/auth/me",
    {
      method: "GET",
    },
    true // use proxy
  )
}

export const sendLogoutRequest = (): Promise<AuthApiResponse<null>> => {
  const session = getStoredLogoutPayload()

  if (!session) {
    throw new Error("No active session was found. Please log in again.")
  }

  return apiFetch<AuthApiResponse<null>>(
    LOGOUT_PATH,
    {
      method: "POST",
      data: {
        session_id: session.sessionId,
        user_id: session.userId,
      },
    },
    true // use proxy
  )
}
