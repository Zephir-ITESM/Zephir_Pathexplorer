import "@/styles/globals.css";

import clsx from "clsx";

import { Metadata, Viewport } from "next";
import { Providers } from "./providers";
import { fontSans } from "@/config/fonts";

export const metadata: Metadata = {
  title: "Zephir Pathexplorer",
  description: "Human Resources Management System for Accenture",
  icons: {
    icon: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Accenture%20logo-AGEKhFu1kFFPMEmAqzDPslxaE0Dnpp.png",
    apple: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Accenture%20logo-AGEKhFu1kFFPMEmAqzDPslxaE0Dnpp.png",
  },
}


export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html suppressHydrationWarning lang="en">
      <head />
      <body
        className={clsx(
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable,
        )}
      >
        <Providers themeProps={{ attribute: "class", defaultTheme: "dark" }}>
          {children}
        </Providers>
      </body>
    </html>
  );
}
