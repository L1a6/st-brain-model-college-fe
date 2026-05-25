"use client"

import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

const formSchema = z.object({
  fullName: z.string().min(2, "Name is required"),
  email: z.email("Enter a valid email address"),
})

type FormData = z.infer<typeof formSchema>

type Props = {
  articleId: number
}

export default function ResourceContactForm({ articleId }: Props) {
  const router = useRouter()

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  })

  const onSubmit = (data: FormData) => {
    // Save to localStorage
    localStorage.setItem("contactData", JSON.stringify(data))

    // Toast message
    toast.success("Details saved successfully")

    // Navigate to squeeze page
    if (articleId === 1 || articleId === 10) {
      router.push("/squeeze-dev") // for devs
    } else {
      router.push("/squeeze") // schools
    }
  }

  return (
    <div className="max-w-md space-y-5 rounded-xl bg-white p-6 shadow">
      <h2 className="text-center text-2xl font-semibold">Contact School Base</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        {/* Full Name */}
        <div className="space-y-1">
          <Label htmlFor="fullName">Name</Label>
          <Input id="fullName" placeholder="Enter your name" {...register("fullName")} />
          {errors.fullName && (
            <p className="text-sm text-red-500">{errors.fullName.message}</p>
          )}
        </div>

        {/* Email */}
        <div className="space-y-1">
          <Label htmlFor="email">Email Address</Label>
          <Input
            id="email"
            type="email"
            placeholder="Enter your email"
            {...register("email")}
          />
          {errors.email && <p className="text-sm text-red-500">{errors.email.message}</p>}
        </div>

        <Button type="submit" className="w-full" disabled={isSubmitting}>
          {isSubmitting ? "Signing up..." : "Sign up today!"}
        </Button>
      </form>
    </div>
  )
}
