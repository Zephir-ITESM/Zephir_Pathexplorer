import type { ReactNode } from "react"

export default function SettingsLayout({
  children,
}: {
  children: ReactNode
}) {
  return (
    <div className="flex-1 p-6">
      {children}
    </div>
  )
}