"use client"

import React from "react"
import Image from "next/image"

interface LoadingProps {
  size?: number
  text?: string
  showText?: boolean
}

export default function Loading({
  size = 100,
  text = "Loading...",
  showText = true,
}: LoadingProps) {
  return (
    <div className="flex min-h-screen w-full flex-col items-center justify-center gap-4 bg-gradient-to-b from-slate-50 via-white to-slate-100">
      <div
        className="relative flex items-center justify-center rounded-full bg-white/80 shadow-[0_18px_60px_rgba(15,23,42,0.12)] ring-1 ring-slate-200/70"
        style={{ width: size + 24, height: size + 24 }}
      >
        <div
          className="absolute inset-0 animate-pulse rounded-full bg-sky-400/10 blur-2xl"
          style={{ animationDuration: "3.5s" }}
        />
        <div
          className="relative animate-[pulse_3.5s_ease-in-out_infinite] overflow-hidden rounded-md"
          style={{ width: size, height: size }}
        >
          <Image
            src="/logo123.jpg"
            alt="St. Brian's Model College logo"
            fill
            className="object-cover"
          />
        </div>
      </div>
      {showText && (
        <p className="animate-pulse text-sm font-medium tracking-wide text-slate-600">
          {text}
        </p>
      )}
    </div>
  )
}
