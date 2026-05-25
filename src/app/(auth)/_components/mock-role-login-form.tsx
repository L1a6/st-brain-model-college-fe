"use client"

import React, { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import SchoolLogo from "./school-logo"

type MockRoleLoginFormProps = {
  role: "student" | "teacher" | "admin" | "super-admin"
  title: string
  description: string
}

const MockRoleLoginForm = ({ role, title, description }: MockRoleLoginFormProps) => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setIsLoading(true)

    const nextRoute = new URLSearchParams(window.location.search).get("next")
    router.push(nextRoute?.startsWith("/") ? nextRoute : `/${role}`)
  }

  return (
    <section className="flex min-h-screen flex-col items-center justify-center px-6 py-12 lg:px-8">
      <SchoolLogo />

      <div className="w-full max-w-md">
        <header className="mb-8 text-center">
          <h1 className="mb-2 text-2xl font-semibold text-gray-900">{title}</h1>
          <p className="text-sm text-gray-600">{description}</p>
        </header>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-900">
              Email Address
            </label>
            <div className="mt-2">
              <Input
                type="text"
                name="email"
                id="email"
                placeholder="anything works"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                disabled={isLoading}
                className="w-full border-gray-300"
              />
            </div>
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-900">
              Password
            </label>
            <div className="mt-2">
              <Input
                type="text"
                name="password"
                id="password"
                placeholder="anything works"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                disabled={isLoading}
                className="w-full border-gray-300"
              />
            </div>
          </div>

          <Button type="submit" disabled={isLoading} className="w-full">
            Login
          </Button>

          <div className="rounded-2xl border border-gray-200 bg-gray-50 p-4 text-sm text-gray-600">
            This is a local mock login. Any values are accepted.
            <div className="mt-3">
              <Link href={`/${role}`} className="font-medium text-accent hover:underline">
                Go to dashboard without logging in
              </Link>
            </div>
          </div>
        </form>
      </div>
    </section>
  )
}

export default MockRoleLoginForm