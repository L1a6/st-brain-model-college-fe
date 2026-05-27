import Link from "next/link"
import SchoolLogo from "../_components/school-logo"

const loginLinks = [
  {
    href: "/student/login",
    title: "Student Login",
    description: "Open the student login page and enter any values.",
  },
  {
    href: "/teacher/login",
    title: "Teacher Login",
    description: "Open the teacher login page and enter any values.",
  },
  {
    href: "/admin/login",
    title: "Admin Login",
    description: "Open the admin login page and enter any values.",
  },
  {
    href: "/parent/login",
    title: "Parent Login",
    description: "Open the parent login page and enter any values.",
  },
  {
    href: "/super-admin/login",
    title: "Super Admin Login",
    description: "Open the super-admin login page and enter any values.",
  },
]

const Login = () => {
  return (
    <main className="min-h-screen bg-canvas px-6 py-16 lg:px-12 lg:py-20">
      <section className="mx-auto flex min-h-[calc(100vh-8rem)] w-full max-w-5xl flex-col justify-center gap-10 pt-8 lg:pt-12">
        <div className="flex flex-col items-center text-center">
          <SchoolLogo />
          <p className="mt-6 text-2xs font-semibold uppercase tracking-[0.28em] text-ink-4">
            School Portal
          </p>
          <h1 className="mt-4 font-display text-4xl leading-tight text-navy sm:text-5xl lg:text-6xl">
            Choose a login path.
          </h1>
          <p className="mt-5 max-w-2xl text-sm leading-7 text-ink-3 sm:text-base lg:text-lg">
            Use the universal login first, or go straight to a role if you already know where you need to be.
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/login"
              className="inline-flex items-center justify-center rounded-full border border-navy/15 px-6 py-3 text-sm font-semibold text-navy transition-colors hover:border-navy/30 hover:bg-white"
            >
              Universal login
            </Link>
            <Link
              href="/"
              className="inline-flex items-center justify-center rounded-full border border-canvas-border px-6 py-3 text-sm font-semibold text-ink-3 transition-colors hover:border-navy/25 hover:text-navy"
            >
              Back to home
            </Link>
          </div>
        </div>

        <div className="mx-auto w-full max-w-4xl">
          <div className="mb-4 flex items-center gap-3">
            <div className="h-px w-10 bg-navy/25" />
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-ink-4">Role access</p>
          </div>

          <div className="divide-y divide-canvas-border border-y border-canvas-border">
            {loginLinks.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="group flex items-start justify-between gap-4 py-5 transition-colors hover:bg-white/40"
              >
                <div>
                  <h2 className="text-xl font-semibold text-navy transition-colors group-hover:text-navy-mid">
                    {item.title}
                  </h2>
                  <p className="mt-2 max-w-md text-sm leading-6 text-ink-3">{item.description}</p>
                </div>
                <span className="mt-1 text-xs font-semibold uppercase tracking-[0.2em] text-ink-4">
                  Open
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}

export default Login
