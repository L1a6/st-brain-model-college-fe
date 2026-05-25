import React from "react"
import BackButton from "../_components/back-button"
import BlogArticle from "../_components/blog-article"
import { articles } from "../_data/article"

type PostContent = { type: "paragraph"; text: string } | { type: "list"; items: string[] }

type Post = {
  key: string
  heading: string
  content: PostContent[]
}

type Article = {
  id: number
  heading: string
  subheading?: string
  slug: string
  date: string
  posts: Post[]
}

type BlogPageProps = {
  params: Promise<{ slug: string }>
}

export default async function BlogPage({ params }: BlogPageProps) {
  const { slug } = await params
  const article: Article | undefined = articles.find((a) => a.slug === slug)

  if (!article) {
    return (
      <div className="min-h-60 p-10 text-center">
        <BackButton />
        <p>Article not found.</p>
      </div>
    )
  }

  return (
    <BlogArticle title={article.heading} date={article.date}>
      {article.posts.map((post) => (
        <section key={post.key} className="mb-8">
          {post.heading && (
            <h2 className="mb-3 text-2xl font-semibold">{post.heading}</h2>
          )}

          {post.content.map((block, i) => {
            if (block.type === "paragraph") {
              return (
                <p key={i} className="mb-4">
                  {block.text}
                </p>
              )
            }

            if (block.type === "list") {
              return (
                <ul key={i} className="mb-4 list-disc space-y-2 pl-6">
                  {block.items.map((item, j) => (
                    <li key={j}>{item}</li>
                  ))}
                </ul>
              )
            }

            return null
          })}
        </section>
      ))}
    </BlogArticle>
  )
}
// import React from "react"
// import BackButton from "../_components/back-button"
// import BlogArticle from "../_components/blog-article"
// import { articles } from "../_data/article"

// type Post = {
//   key: string
//   heading: string
//   paragraphs: string[] // Changed from content
// }

// type Article = {
//   id: number
//   heading: string
//   subheading?: string
//   slug: string
//   date: string
//   posts: Post[]
// }

// type BlogPageProps = {
//   params: Promise<{ slug: string }>
// }

// export default async function BlogPage({ params }: BlogPageProps) {
//   const { slug } = await params
//   const article: Article | undefined = articles.find((a) => a.slug === slug)

//   if (!article) {
//     return (
//       <div className="min-h-60 p-10 text-center">
//         <BackButton />
//         <p>Article not found.</p>
//       </div>
//     )
//   }

//   return (
//     <BlogArticle title={article.heading} date={article.date}>
//       {article.posts.map((post) => (
//         <section key={post.key} className="mb-8">
//           {post.heading && (
//             <h2 className="mb-3 text-2xl font-semibold">{post.heading}</h2>
//           )}

//           {post.paragraphs.map((paragraph, i) => (
//             <p key={i} className="mb-2">
//               {paragraph}
//             </p>
//           ))}
//         </section>
//       ))}
//     </BlogArticle>
//   )
// }

// // import BackButton from "../_components/back-button"
// // import BlogArticle from "../_components/blog-article"
// // import { articles } from "../_data/article"

// // type BlogPageProps = {
// //   params: Promise<{ slug: string }>
// // }

// // export default async function BlogPage({ params }: BlogPageProps) {
// //   const { slug } = await params // Await the params
// //   const article = articles.find((a) => a.slug === slug)

// //   if (!article) {
// //     return (
// //       <div className="min-h-60 p-10 text-center">
// //         <BackButton />
// //         <p>Article not found.</p>
// //       </div>
// //     )
// //   }

// //   return (
// //     <BlogArticle title={article.heading} date={article.date}>
// //       {article.posts.map((post) => (
// //         <section key={post.key} className="mb-8">
// //           {post.heading && (
// //             <h2 className="mb-3 text-2xl font-semibold">{post.heading}</h2>
// //           )}

// //           {post.content.map((block, i) => {
// //             if (block.type === "paragraph") {
// //               return (
// //                 <p key={i} className="mb-2">
// //                   {block.text}
// //                 </p>
// //               )
// //             }

// //             if (block.type === "list") {
// //               return (
// //                 <ul key={i} className="mb-2 list-disc pl-5">
// //                   {block.items.map((item, j) => (
// //                     <li key={j}>{item}</li>
// //                   ))}
// //                 </ul>
// //               )
// //             }

// //             return null
// //           })}

// //           {/* {post.paragraphs.map((p, i) => (
// //             <p key={i} className="mb-2">
// //               {p}
// //             </p>
// //           ))} */}
// //         </section>
// //       ))}
// //     </BlogArticle>
// //   )
// // }
