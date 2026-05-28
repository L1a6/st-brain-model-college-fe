"use client"

import React, { useState } from "react"
import { useRouter } from "next/navigation"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { apiFetch } from "@/lib/api/client"
import { loginUsingEmail, storeAuthSessionFromResponse } from "@/lib/api/auth"
import type { LoginResponse } from "@/types/auth"
import SchoolLogo from "./school-logo"

type MockRoleLoginFormProps = {
  role: "student" | "teacher" | "admin" | "super-admin" | "parent"
  title: string
  description: string
}

const MockRoleLoginForm = ({ role, title, description }: MockRoleLoginFormProps) => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setIsLoading(true)

    try {
      let loginResponse: LoginResponse | null = null

      if (role === "super-admin") {
        loginResponse = await apiFetch<LoginResponse>(
          "/api/auth/superadmin/login",
          {
            method: "POST",
            data: { email, password },
          },
          true
        )
      } else {
        loginResponse = await loginUsingEmail({ email, password })
      }

      if (loginResponse) {
        storeAuthSessionFromResponse(loginResponse)
      }

      const nextRoute = new URLSearchParams(window.location.search).get("next")
      router.push(nextRoute?.startsWith("/") ? nextRoute : `/${role}`)
    } catch (error) {
      console.error("Login failed:", error)
      setIsLoading(false)
    }
  }

  return (
    <section className="flex min-h-screen flex-col items-center justify-center px-6 py-12 lg:px-8 bg-canvas">
      <SchoolLogo />

      <div className="w-full max-w-md mt-10">
        <header className="mb-8 text-center">
          <h1 className="mb-2 text-2xl font-semibold text-navy">{title}</h1>
          <p className="text-sm text-ink-3">{description}</p>
        </header>

        <form onSubmit={handleSubmit} className="space-y-6 rounded-[34px] border border-canvas-border bg-white p-6 sm:p-8">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-navy">
              Email Address
            </label>
            <div className="mt-2">
              <Input
                type="text"
                name="email"
                id="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                disabled={isLoading}
                className="w-full border-canvas-border bg-canvas-white"
              />
            </div>
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-navy">
              Password
            </label>
            <div className="mt-2">
              <Input
                type="password"
                name="password"
                id="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                disabled={isLoading}
                className="w-full border-canvas-border bg-canvas-white"
              />
            </div>
          </div>

          <Button type="submit" disabled={isLoading} className="w-full">
            Login
          </Button>
        </form>
      </div>
    </section>
  )
}

export default MockRoleLoginForm