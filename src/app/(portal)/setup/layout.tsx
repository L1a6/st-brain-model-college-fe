import type { Metadata } from "next"
import { GeneralQueryProvider } from "@/providers/general-query-provider"

export const metadata: Metadata = {
  title: "Super Admin Setup | St. Brian's Model College",
  description:
    "Complete the initial St. Brian's Model College setup to configure your school workspace.",
}

export default function SuperAdminSetuLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <GeneralQueryProvider>
      <div className="h-screen w-screen overflow-x-hidden bg-white">{children}</div>
    </GeneralQueryProvider>
  )
}
