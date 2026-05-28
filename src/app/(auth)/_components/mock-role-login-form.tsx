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
    <section className="bg-canvas flex min-h-screen flex-col items-center justify-center px-6 py-12 lg:px-8">
      <SchoolLogo />

      <div className="mt-10 w-full max-w-md">
        <header className="mb-8 text-center">
          <h1 className="text-navy mb-2 text-2xl font-semibold">{title}</h1>
          <p className="text-ink-3 text-sm">{description}</p>
        </header>

        <form
          onSubmit={handleSubmit}
          className="border-canvas-border space-y-6 rounded-[34px] border bg-white p-6 sm:p-8"
        >
          <div>
            <label htmlFor="email" className="text-navy block text-sm font-medium">
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
                className="border-canvas-border bg-canvas-white w-full"
              />
            </div>
          </div>

          <div>
            <label htmlFor="password" className="text-navy block text-sm font-medium">
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
                className="border-canvas-border bg-canvas-white w-full"
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
