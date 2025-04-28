import type React from "react"
import { Inter } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
import Header from "@/components/header"
import "./globals.css"
import { FirebaseProvider } from "@/firebase/FirebaseProvider"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "EcoShare Hub - Environmental Impact Tracking",
  description: "Track, visualize, and reduce your environmental impact with EcoShare Hub.",
  openGraph: {
    title: "EcoShare Hub - Environmental Impact Tracking",
    description: "Track, visualize, and reduce your environmental impact with EcoShare Hub.",
    url: "https://ecoshare-hub.vercel.app",
    siteName: "EcoShare Hub",
    images: [
      {
        url: "https://ecoshare-hub.vercel.app/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "EcoShare Hub",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "EcoShare Hub - Environmental Impact Tracking",
    description: "Track, visualize, and reduce your environmental impact with EcoShare Hub.",
    images: ["https://ecoshare-hub.vercel.app/og-image.jpg"],
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className} suppressHydrationWarning>
        <FirebaseProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <Header />
            <main className="min-h-screen">{children}</main>
          </ThemeProvider>
        </FirebaseProvider>
      </body>
    </html>
  )
}
