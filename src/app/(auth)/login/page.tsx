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
    href: "/super-admin/login",
    title: "Super Admin Login",
    description: "Open the super-admin login page and enter any values.",
  },
]

const Login = () => {
  return (
    <main className="flex min-h-screen items-center justify-center px-6 py-12">
      <section className="w-full max-w-xl rounded-3xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8">
        <div className="mb-8 text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-accent">
            School Portal
          </p>
          <h1 className="mt-3 text-3xl font-semibold text-gray-900">
            Choose a login page
          </h1>
          <p className="mt-2 text-sm text-gray-600">
            Use one of the role-specific links below to enter the dashboard.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          {loginLinks.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="group rounded-2xl border border-gray-200 bg-gray-50 p-5 transition-all hover:-translate-y-0.5 hover:border-gray-300 hover:bg-white hover:shadow-md"
            >
              <h2 className="text-lg font-semibold text-gray-900 transition-colors group-hover:text-accent">
                {item.title}
              </h2>
              <p className="mt-2 text-sm leading-6 text-gray-600">{item.description}</p>
            </Link>
          ))}
        </div>
      </section>
    </main>
  )
}

export default Login
