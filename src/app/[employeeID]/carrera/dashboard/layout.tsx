import type { ReactNode } from "react"
import { requireAuth } from "@/auth/utils"
import { AppSidebar } from "@/components/layout/sidebar"

export default async function CarreraDashboardLayout({
  children,
}: {
  children: ReactNode
}) {
  // Ensure user is authenticated
  await requireAuth()

  return (
    <div className="flex min-h-screen">
      <AppSidebar />
      <div className="flex-1 ml-16 transition-all duration-300">
        <main className="p-6">{children}</main>
      </div>
    </div>
  )
}
