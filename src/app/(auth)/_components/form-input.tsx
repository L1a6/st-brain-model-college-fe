"use client"

import React, { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { AlertCircle, Loader2Icon } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { loginSchema, type LoginFormValues } from "@/lib/schemas/auth"
import { useRouter } from "next/navigation"
import SchoolLogo from "./school-logo"

type LoginField = keyof LoginFormValues

const initialValues: LoginFormValues = {
  email: "",
  password: "",
}

const resolveLocalDashboardRoute = (email: string) => {
  const normalizedEmail = email.toLowerCase()

  if (normalizedEmail.includes("super-admin") || normalizedEmail.includes("superadmin")) {
    return "/super-admin"
  }

  if (normalizedEmail.includes("teacher")) {
    return "/teacher"
  }

  if (normalizedEmail.includes("admin")) {
    return "/admin"
  }

  if (normalizedEmail.includes("parent")) {
    return "/parent"
  }

  return "/student"
}

const LoginForm = () => {
  const [formData, setFormData] = useState<LoginFormValues>(initialValues)
  const [errors, setErrors] = useState<Partial<Record<LoginField, string>>>({})
  const [touched, setTouched] = useState<Record<LoginField, boolean>>({
    email: false,
    password: false,
  })

  const [showPassword, setShowPassword] = useState(false)
  const [showWarningModal, setShowWarningModal] = useState(false)
  const [showLockedModal, setShowLockedModal] = useState(false)
  const [isLocked, setIsLocked] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [attemptCount, setAttemptCount] = useState(0)

  // ?next=/path
  const nextRoute =
    typeof window !== "undefined" ? new URLSearchParams(window.location.search).get("next") : null

  const router = useRouter()

  const getFieldError = (field: LoginField, value: string) => {
    const schema = loginSchema.shape[field]
    if (!schema) return undefined
    const result = schema.safeParse(value)
    return result.success ? undefined : result.error.issues[0]?.message
  }

  const syncFieldError = (field: LoginField, value: string) => {
    const message = getFieldError(field, value)
    setErrors((prev) => ({
      ...prev,
      [field]: message,
    }))
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target
    const field = name as LoginField
    setFormData((prev) => ({ ...prev, [field]: value }))

    if (touched[field]) {
      syncFieldError(field, value)
    }
  }

  const handleBlur = (event: React.FocusEvent<HTMLInputElement>) => {
    const field = event.target.name as LoginField
    setTouched((prev) => ({ ...prev, [field]: true }))
    syncFieldError(field, formData[field])
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    // Check if account is locked
    if (isLocked) {
      setShowLockedModal(true)
      return
    }

    // Mark all fields as touched
    setTouched({
      email: true,
      password: true,
    })

    // In local mock mode, accept any entered credentials.
    if (!formData.email.trim() || !formData.password.trim()) {
      setErrors({
        email: !formData.email.trim() ? "Email is required" : undefined,
        password: !formData.password.trim() ? "Password is required" : undefined,
      })
      return
    }

    // all roles
    const roleToRoute: Record<string, string> = {
      ADMIN: "admin",
      SUPER_ADMIN: "super-admin",
      TEACHER: "teacher",
      STUDENT: "student",
      PARENT: "parent",
    }

    setIsLoading(true)
    setErrors({})

    const route = nextRoute && nextRoute.startsWith("/") ? nextRoute : resolveLocalDashboardRoute(formData.email)
    router.push(route)
    setAttemptCount(0)
  }

  const renderError = (field: LoginField) => {
    if (!touched[field] || !errors[field]) return null
    return (
      <div className="mt-2 flex items-center gap-2 text-sm text-red-600">
        <AlertCircle className="h-4 w-4 shrink-0" />
        <span>{errors[field]}</span>
      </div>
    )
  }

  return (
    <>
      <section className="flex min-h-screen flex-col items-center justify-center px-6 py-12 lg:px-8">
        {/* School Logo */}
        <SchoolLogo />

        {/* Main Content */}
        <div className="w-full max-w-md">
          <header className="mb-8 text-center">
            <h1 className="mb-2 text-2xl font-semibold text-gray-900">Welcome Back</h1>
            <p className="text-sm text-gray-600">Sign in your account to continue</p>
          </header>

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email Field */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-900">
                Email Address
              </label>
              <div className="mt-2">
                <Input
                  type="email"
                  name="email"
                  id="email"
                  placeholder="admin@school.edu"
                  value={formData.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  disabled={isLoading}
                  aria-invalid={touched.email && Boolean(errors.email)}
                  className={`w-full ${
                    errors.email && touched.email
                      ? "border-red-500 bg-red-50"
                      : "border-gray-300"
                  } ${isLoading ? "cursor-not-allowed opacity-50" : ""}`}
                />
                {renderError("email")}
              </div>
            </div>

            {/* Password Field */}
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-900"
              >
                Password
              </label>
              <div className="relative mt-2">
                <Input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  id="password"
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  disabled={isLoading}
                  aria-invalid={touched.password && Boolean(errors.password)}
                  className={`w-full pr-10 ${
                    errors.password && touched.password
                      ? "border-red-500 bg-red-50"
                      : "border-gray-300"
                  } ${isLoading ? "cursor-not-allowed opacity-50" : ""}`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  disabled={isLoading}
                  className="absolute top-1/2 right-3 -translate-y-1/2 text-gray-400 hover:text-gray-600 disabled:cursor-not-allowed"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? (
                    <Image
                      src="/assets/images/auth/show-password-icon.png"
                      alt=""
                      width={16}
                      height={16}
                    />
                  ) : (
                    <Image
                      src="/assets/images/auth/hide-password-icon.png"
                      alt=""
                      width={16}
                      height={16}
                    />
                  )}
                </button>
              </div>
              {renderError("password")}
            </div>

            {/* Remember Me & Forgot Password */}
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                {/* <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  disabled={isLoading}
                  className="accent-accent h-4 w-4 rounded"
                />
                <label
                  htmlFor="remember-me"
                  className={`ml-2 block text-sm text-gray-900 ${
                    isLoading ? "opacity-50" : ""
                  }`}
                >
                  Remember me
                </label> */}
              </div>

              <div className="text-sm">
                <Link
                  href="/forgot-password"
                  className={`text-accent font-medium hover:underline ${
                    isLoading ? "pointer-events-none opacity-50" : ""
                  }`}
                >
                  Forgot password?
                </Link>
              </div>
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              disabled={isLoading}
              className="w-full disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <Loader2Icon className="mx-auto h-5 w-5 animate-spin" />
              ) : (
                "Sign In"
              )}
            </Button>

            <div className="rounded-2xl border border-gray-200 bg-gray-50 p-4">
              <p className="text-sm font-medium text-gray-900">Quick access</p>
              <p className="mt-1 text-sm text-gray-600">
                Open a role login page and sign in with your account details.
              </p>
              <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-3">
                <Link
                  href="/login"
                  className="rounded-lg border border-gray-200 bg-white px-3 py-2 text-center text-sm font-medium text-gray-700 transition-colors hover:border-gray-300 hover:bg-gray-50"
                >
                  Student Login
                </Link>
                <Link
                  href="/teacher/login"
                  className="rounded-lg border border-gray-200 bg-white px-3 py-2 text-center text-sm font-medium text-gray-700 transition-colors hover:border-gray-300 hover:bg-gray-50"
                >
                  Teacher Login
                </Link>
                <Link
                  href="/admin/login"
                  className="rounded-lg border border-gray-200 bg-white px-3 py-2 text-center text-sm font-medium text-gray-700 transition-colors hover:border-gray-300 hover:bg-gray-50"
                >
                  Admin Login
                </Link>
                <Link
                  href="/super-admin/login"
                  className="rounded-lg border border-gray-200 bg-white px-3 py-2 text-center text-sm font-medium text-gray-700 transition-colors hover:border-gray-300 hover:bg-gray-50"
                >
                  Super Admin Login
                </Link>
                <Link
                  href="/login"
                  className="rounded-lg border border-gray-200 bg-white px-3 py-2 text-center text-sm font-medium text-gray-700 transition-colors hover:border-gray-300 hover:bg-gray-50"
                >
                  Student Login
                </Link>
              </div>
            </div>
          </form>
        </div>
      </section>

      {/* Warning Modal - After 3 attempts */}
      <Dialog open={showWarningModal} onOpenChange={setShowWarningModal}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <div className="mx-auto mb-4">
              <Image
                src="/assets/images/auth/desktop-school-logo.png"
                alt="School Logo"
                width={60}
                height={60}
              />
            </div>
            <DialogTitle className="text-center text-xl font-semibold">
              Attention
            </DialogTitle>
            <DialogDescription className="text-center text-gray-600">
              You have 5 attempts to enter a correct password before your account is
              locked.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="flex flex-col gap-2 sm:flex-col">
            <Button onClick={() => setShowWarningModal(false)} className="w-full">
              Try again
            </Button>
            <Link href="/forgot-password" className="w-full">
              <Button variant="outline" className="w-full">
                Forgot Password
              </Button>
            </Link>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Locked Out Modal - After 5 attempts */}
      <Dialog open={showLockedModal} onOpenChange={setShowLockedModal}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <div className="mx-auto mb-4">
              <Image
                src="/assets/images/auth/desktop-school-logo.png"
                alt="School Logo"
                width={60}
                height={60}
              />
            </div>
            <DialogTitle className="text-center text-xl font-semibold">
              Locked out
            </DialogTitle>
            <DialogDescription className="text-center text-gray-600">
              Your account has been locked due to multiple incorrect password attempts.
              You can reset your password now or try again in 01:59:59 hours
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="flex flex-col gap-2 sm:flex-col">
            <Link href="/forgot-password" className="w-full">
              <Button className="w-full bg-[#DA3743] text-white hover:bg-[#C32F3A]">
                Forgot Password
              </Button>
            </Link>
            <Button
              onClick={() => setShowLockedModal(false)}
              variant="outline"
              className="w-full border border-[#DA3743] bg-white text-[#DA3743] hover:bg-red-50"
            >
              Sign in
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}

export default LoginForm
