"use client"

import React, { ReactNode } from "react"

import BackButton from "./back-button"
import ResourceContactForm from "./resource-contact"
import { articles } from "../_data/article"

type BlogArticleProps = {
  title: string
  date: string
  children: ReactNode
}

export default function BlogArticle({ title, date, children }: BlogArticleProps) {
  const articleId = articles.findIndex((article) => article.heading === title)
  const article = articles[articleId]

  return (
    <>
      <BackButton />
      <article className="mx-auto max-w-[1200px] px-5 py-10">
        {/* Title */}
        <h1 className="mb-2 text-2xl font-bold lg:text-4xl">{title}</h1>

        {/* Date */}
        <p className="mb-8 text-sm text-gray-500">{date}</p>

        {/* Actual Article Content */}
        <div className="prose prose-lg mb-16 leading-relaxed">{children}</div>

        {/* Call to Action */}
        <div className="mt-10 w-full pt-8">
          <ResourceContactForm articleId={article.id} />
        </div>
      </article>
    </>
  )
}
