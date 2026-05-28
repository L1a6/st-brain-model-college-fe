export interface LoginPayload {
  registrationNumber: string
  password: string
}

export interface SignUpPayload {
  fullName: string
  email: string
  password: string
}

export type AuthUser = Record<string, unknown>

export type LoginUser = {
  id: string
  email: string
  first_name: string
  last_name: string
  role: string[]
}

export interface AuthApiResponse<Data = unknown> {
  status?: string | number | boolean
  message?: string
  data?: Data
  [key: string]: unknown
}

export interface UserProfileResponse {
  id: string
  title?: string
  email: string
  first_name: string
  last_name: string
  middle_name?: string | null | undefined
  gender?: "MALE" | "FEMALE" | "OTHER" | "male" | "female" | "other" | null | undefined
  dob?: string
  phone?: string
  is_active: boolean
  created_at: string
  updated_at: string
  role: string[] // ["STUDENT"] | ["ADMIN"] | ["TEACHER"] | etc
}

export type LoginResponse = {
  message: string
  user?: LoginUser
  access_token?: string
  refresh_token?: string
  session_id?: string
  session_expires_at?: string
  data?: {
    user: LoginUser
  }
  [key: string]: unknown
}
