import type { Metadata } from "next"
import "./globals.css"

export const metadata: Metadata = {
  title: "Github Stars Dashboard",
  description: "A dashboard to track and visualize GitHub stars",
  keywords: ["GitHub", "Stars", "Dashboard", "Visualization"],
  generator: "v0.dev",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
