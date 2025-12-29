import type React from "react"
import type { Metadata, Viewport } from "next"
import { Inter, Source_Serif_4, JetBrains_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { AIChatbot } from "@/components/ai-chatbot"
import "./globals.css"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
})

const sourceSerif4 = Source_Serif_4({
  subsets: ["latin"],
  variable: "--font-serif",
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
})

export const metadata: Metadata = {
  title: "Healthcare Admin Dashboard",
  description: "Patient Management System",
  generator: "v0.app",
  icons: {
    icon: [
      {
        url: "/icon-light-32x32.png",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/icon-dark-32x32.png",
        media: "(prefers-color-scheme: dark)",
      },
      {
        url: "/icon.svg",
        type: "image/svg+xml",
      },
    ],
    apple: "/apple-icon.png",
  },
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="bg-background">
      <body className={`${inter.variable} ${sourceSerif4.variable} ${jetbrainsMono.variable} font-sans antialiased`}>
        {children}
        <AIChatbot />
        <Analytics />
      </body>
    </html>
  )
}
