import type React from "react"
import type { Metadata } from "next"
import { Bricolage_Grotesque, Instrument_Sans } from "next/font/google"
import "./globals.css"
import { cn } from "@/lib/utils"
import { ThemeProvider } from "@/components/theme-provider"
import { OnboardingProvider } from "@/components/onboarding/onboarding-provider"
import { AuthProvider } from "@/components/auth-context"
import BackendStatus from "@/components/backend-status"

const bricolage = Bricolage_Grotesque({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["300", "400", "500", "600", "700", "800"],
})

const instrument = Instrument_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: ["400", "500", "600", "700"],
})

export const metadata: Metadata = {
  title: "CreatorConnect — Recruit UGC Creators at Scale",
  description:
    "Source, brief, track, and pay UGC creators from one platform. 50,000+ vetted creators ready to amplify your brand.",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          bricolage.variable,
          instrument.variable,
        )}
      >
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false} forcedTheme="dark">
          <AuthProvider>
            <OnboardingProvider>{children}</OnboardingProvider>
            <BackendStatus />
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
