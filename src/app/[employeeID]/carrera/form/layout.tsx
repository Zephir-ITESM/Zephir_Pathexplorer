import type { ReactNode } from "react"

export default function CareerLayout({
  children,
}: {
  children: ReactNode
}) {
  return <div className="w-full min-h-screaen">{children}</div>
}
