import type { ReactNode } from "react"
import { requireAuth } from "@/auth/utils"
import { AppSidebar } from "@/components/layout/sidebar"

export default async function ProyectosLayout({
  children,
}: {
  children: ReactNode
}) {
  // This layout will be applied to all proyectos pages
  await requireAuth() // Ensure user is authenticated

  return (
    <div className="flex min-h-screen">
      <AppSidebar />
      <div className="flex-1 ml-16 transition-all duration-300">
        {/* Common proyectos layout elements go here */}
        <main className="p-6">{children}</main>
      </div>
    </div>
  )
}
