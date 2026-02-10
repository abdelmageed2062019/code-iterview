import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import "@stream-io/video-react-sdk/dist/css/styles.css"
import "./globals.css"
import ConvexClerkProvider from "@/providers/ConvexClerkProvider"
import Navbar from "@/components/Navbar"
import { ThemeProvider } from "@/providers/ThemeProvider"
import AuthGate from "@/components/AuthGate"
import { Toaster } from "@/components/ui/sonner"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
})

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
})

export const metadata: Metadata = {
  title: "CodeSync",
  description: "Schedule interviews, collaborate live, and review sessions in one place.",
  icons: {
    icon: "/icon.png",
    apple: "/apple-icon.png",
    shortcut: "/icon.png",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <ConvexClerkProvider>
      <html lang="en" suppressContentEditableWarning>
        <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
          <ThemeProvider attribute={"class"} defaultTheme="system" enableSystem disableTransitionOnChange>
            <AuthGate>
              <div className="min-h-screen">
                <Navbar />
                <main className="px-4 sm:px-6 lg:px-8">{children}</main>
                <Toaster />
              </div>
            </AuthGate>
          </ThemeProvider>
        </body>
      </html>
    </ConvexClerkProvider>
  )
}
