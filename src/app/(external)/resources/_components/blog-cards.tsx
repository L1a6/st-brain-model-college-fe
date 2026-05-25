"use client"

import React from "react"
import Link from "next/link"
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card"
import { articles } from "../_data/article"

const BlogCards = () => {
  return (
    <section className="w-full py-10">
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
        {articles.map((article) => (
          <Card
            key={article.id}
            className="rounded-2xl border bg-[#EEEEEE] p-6 shadow-sm transition-all hover:shadow-md"
          >
            <CardHeader className="space-y-3">
              <span className="text-primary text-xs font-semibold tracking-wide">
                BLOG
              </span>
              <CardTitle className="text-primary text-xl leading-tight capitalize">
                {article.heading}
              </CardTitle>
              <CardDescription className="text-sm text-gray-500">
                {article.date}
              </CardDescription>
            </CardHeader>

            <CardContent className="flex justify-end">
              <Link
                href={`/resources/${article.slug}`}
                className="text-text-secondary flex items-center gap-2 text-sm font-medium hover:underline"
              >
                Read article →
              </Link>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  )
}

export default BlogCards
