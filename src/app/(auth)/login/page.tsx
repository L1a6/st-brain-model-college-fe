import Link from "next/link"

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
    <main className="min-h-screen bg-canvas px-6 py-12 lg:px-12">
      <section className="mx-auto flex min-h-[calc(100vh-6rem)] w-full max-w-6xl flex-col justify-center gap-12 lg:flex-row lg:items-stretch">
        <div className="flex-1 rounded-[36px] bg-navy px-8 py-10 text-white lg:px-12 lg:py-14">
          <p className="text-2xs uppercase tracking-[0.28em] text-white/55">School Portal</p>
          <h1 className="mt-4 font-display text-4xl leading-tight lg:text-6xl">
            Choose a login path.
          </h1>
          <p className="mt-5 max-w-xl text-sm leading-7 text-white/72 lg:text-base">
            Use the universal login first, or go straight to a role if you already know where you need to be.
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <Link href="/login" className="inline-flex items-center justify-center rounded-2xl bg-[#d9e8fb] px-6 py-3 text-sm font-semibold text-navy transition-colors hover:bg-white">
              Universal login
            </Link>
            <Link href="/" className="inline-flex items-center justify-center rounded-2xl border border-white/25 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/10">
              Back to home
            </Link>
          </div>
        </div>

        <div className="flex-1">
          <div className="mb-4 flex items-center gap-3">
            <div className="h-px w-10 bg-navy/30" />
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-ink-4">Role access</p>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            {loginLinks.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="group border-b border-canvas-border py-4 transition-colors hover:border-navy"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h2 className="text-lg font-semibold text-navy transition-colors group-hover:text-navy-mid">
                      {item.title}
                    </h2>
                    <p className="mt-2 max-w-sm text-sm leading-6 text-ink-3">{item.description}</p>
                  </div>
                  <span className="text-xs font-semibold uppercase tracking-[0.2em] text-ink-4">Open</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}

export default Login
