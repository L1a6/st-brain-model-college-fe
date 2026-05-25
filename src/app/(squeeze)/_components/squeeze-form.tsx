"use client"

import React from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

const schema = z.object({
  fullName: z.string().min(2, "Name is required"),
  email: z.email("Enter a valid email address"),
})

type FormData = z.infer<typeof schema>
type SqueezeFormProps = {
  cta?: "dev" | "school" // optional prop
}

const SqueezeForm = ({ cta = "school" }: SqueezeFormProps) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  })

  const onSubmit = (data: FormData) => {
    localStorage.setItem("contactData", JSON.stringify(data))
    toast.success(`Congratulations ${data.fullName}!`)
    reset()
  }

  return (
    <div className="animate-onrender mx-auto w-full max-w-[80%]">
      <form onSubmit={handleSubmit(onSubmit)} className="w-full space-y-4">
        <div>
          <Label htmlFor="fullName">Name</Label>
          <Input id="fullName" placeholder="Enter your name" {...register("fullName")} />
          {errors.fullName && (
            <p className="text-sm text-red-500">{errors.fullName.message}</p>
          )}
        </div>

        <div>
          <Label htmlFor="email">Email Address</Label>
          <Input
            id="email"
            type="email"
            placeholder="Enter your email"
            {...register("email")}
          />
          {errors.email && <p className="text-sm text-red-500">{errors.email.message}</p>}
        </div>

        <Button
          type="submit"
          className="bg-accent/80 w-full py-6 text-lg"
          disabled={isSubmitting}
        >
          {cta === "dev"
            ? "Build your first integration"
            : " Be among the first 30 schools"}
        </Button>
      </form>
    </div>
  )
}

export default SqueezeForm
