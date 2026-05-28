"use client"
import { LogOut } from "lucide-react"
import { useState } from "react"
import { useAuthStore } from "@/store/auth-store"
import { titleCase } from "@/lib/utils"
import { LogoutDialog } from "@/components/dashboard/logout-confirmation-dialog"
import { useLogout } from "@/hooks/use-user-data"
import Link from "next/link"
import { usePathname } from "next/navigation"

interface SidebarFooterUserProps {
  isCollapsed?: boolean
}

export function SidebarFooterUser({ isCollapsed = false }: SidebarFooterUserProps) {
  const user = useAuthStore((state) => state.user)
  const [showLogoutDialog, setShowLogoutDialog] = useState(false)
  const sendLogoutRequest = useLogout().mutateAsync
  const userTitle = user?.title ? `${user.title}.` : ""
  const pathname = usePathname()

  // Extract role from pathname to determine profile route
  const segments = pathname.split("/").filter(Boolean)
  const role = segments[0] || "student" // student, teacher, parent, admin

  const handleLogout = async () => {
    await sendLogoutRequest()
  }

  const initials =
    `${user?.first_name?.[0] || "S"}${user?.last_name?.[0] || "B"}`.toUpperCase()

  return (
    <>
      <div className="border-t border-black/6 p-4 dark:border-white/6">
        <div className="flex items-center justify-between">
          <Link href={`/${role}/profile`} className="flex flex-1 items-center gap-3">
            <div className="relative flex h-10 w-10 items-center justify-center rounded-full bg-neutral-100 text-[11px] font-semibold text-neutral-600 dark:bg-white/10 dark:text-neutral-200">
              {initials}
              <div className="absolute right-0 bottom-0 h-2.5 w-2.5 rounded-full border-2 border-white bg-emerald-500 dark:border-[#111111]" />
            </div>
            {!isCollapsed && (
              <div className="flex flex-col">
                <span className="text-sm font-semibold text-neutral-900 dark:text-neutral-100">
                  {userTitle} {user?.first_name}
                </span>
                <span className="text-xs text-neutral-500 dark:text-neutral-400">
                  {titleCase(user?.role?.[0] || "")}
                </span>
              </div>
            )}
          </Link>
          {!isCollapsed && (
            <button
              onClick={() => setShowLogoutDialog(true)}
              className="ml-2 cursor-pointer rounded-md p-1.5 text-[#DA3743] transition-colors hover:bg-[#DA3743]/8"
              aria-label="Logout"
            >
              <LogOut className="h-5 w-5" />
            </button>
          )}
        </div>
      </div>

      <LogoutDialog
        open={showLogoutDialog}
        onOpenChange={setShowLogoutDialog}
        onConfirm={handleLogout}
      />
    </>
  )
}
