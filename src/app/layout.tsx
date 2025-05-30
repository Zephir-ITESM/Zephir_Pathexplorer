import type React from "react"
import "@/styles/globals.css"
import clsx from "clsx"
import type { Metadata, Viewport } from "next"
import { Providers } from "./providers"
import { fontSans } from "@/config/fonts"
import { AuthProvider } from "@/hooks/use-auth"

export const metadata: Metadata = {
  title: "Zephir Pathexplorer",
  description: "Human Resources Management System for Accenture",
  icons: {
    icon: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Accenture%20logo-AGEKhFu1kFFPMEmAqzDPslxaE0Dnpp.png",
    apple:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Accenture%20logo-AGEKhFu1kFFPMEmAqzDPslxaE0Dnpp.png",
  },
}

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
  ],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html suppressHydrationWarning lang="en" className="light" style={{colorScheme: 'light'}}>
      <head />
      <body className={clsx("min-h-screen bg-background font-sans antialiased light", fontSans.variable)}>
        <Providers>
          <AuthProvider>{children}</AuthProvider>
        </Providers>
      </body>
    </html>
  )
}
