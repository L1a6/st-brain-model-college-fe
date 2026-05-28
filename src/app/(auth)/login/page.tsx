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
    <main className="bg-canvas min-h-screen px-6 py-16 lg:px-12 lg:py-20">
      <section className="mx-auto flex min-h-[calc(100vh-8rem)] w-full max-w-5xl flex-col justify-center gap-10 pt-8 lg:pt-12">
        <div className="flex flex-col items-center text-center">
          <SchoolLogo />
          <p className="text-2xs text-ink-4 mt-6 font-semibold tracking-[0.28em] uppercase">
            School Portal
          </p>
          <h1 className="font-display text-navy mt-4 text-4xl leading-tight sm:text-5xl lg:text-6xl">
            Choose a login path.
          </h1>
          <p className="text-ink-3 mt-5 max-w-2xl text-sm leading-7 sm:text-base lg:text-lg">
            Use the universal login first, or go straight to a role if you already know
            where you need to be.
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/login"
              className="border-navy/15 text-navy hover:border-navy/30 inline-flex items-center justify-center rounded-full border px-6 py-3 text-sm font-semibold transition-colors hover:bg-white"
            >
              Universal login
            </Link>
            <Link
              href="/"
              className="border-canvas-border text-ink-3 hover:border-navy/25 hover:text-navy inline-flex items-center justify-center rounded-full border px-6 py-3 text-sm font-semibold transition-colors"
            >
              Back to home
            </Link>
          </div>
        </div>

        <div className="mx-auto w-full max-w-4xl">
          <div className="mb-4 flex items-center gap-3">
            <div className="bg-navy/25 h-px w-10" />
            <p className="text-ink-4 text-xs font-semibold tracking-[0.22em] uppercase">
              Role access
            </p>
          </div>

          <div className="divide-canvas-border border-canvas-border divide-y border-y">
            {loginLinks.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="group flex items-start justify-between gap-4 py-5 transition-colors hover:bg-white/40"
              >
                <div>
                  <h2 className="text-navy group-hover:text-navy-mid text-xl font-semibold transition-colors">
                    {item.title}
                  </h2>
                  <p className="text-ink-3 mt-2 max-w-md text-sm leading-6">
                    {item.description}
                  </p>
                </div>
                <span className="text-ink-4 mt-1 text-xs font-semibold tracking-[0.2em] uppercase">
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
