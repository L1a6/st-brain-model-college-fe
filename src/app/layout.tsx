import type { Metadata } from "next"
import { Outfit } from "next/font/google"
import "./globals.css"
import { GeneralQueryProvider } from "@/providers/general-query-provider"
import { Toaster } from "sonner"

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
})

export const viewport = {
  themeColor: "#0f172a",
}

export const metadata: Metadata = {
  metadataBase: new URL("http://localhost:3000"),
  title: {
    default: "St. Brian's Model College",
    template: "%s | St. Brian's Model College",
  },
  description:
    "St. Brian's Model College portal for dashboards, academics, attendance, notices, and school operations.",
  applicationName: "St. Brian's Model College",
  manifest: "/manifest.json",
  keywords: [
    "St. Brian's Model College",
    "school portal",
    "education management",
    "attendance",
    "results",
    "timetable",
    "fees",
    "NFC",
    "Nigeria schools",
  ],
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "St. Brian's Model College",
  },
  openGraph: {
    title: "School Base",
    description:
      "The modern way schools run in Nigeria. Manage attendance, results, timetables, fees, and NFC all in one place. Connect students, teachers, parents, and administrators.",
    url: "https://borjigin.emerj.net/",
    siteName: "St. Brian's Model College",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/icons/android-chrome-512x512.png",
        width: 512,
        height: 512,
        alt: "St. Brian's Model College logo",
      },
    ],
  },
  icons: {
    icon: [
      { url: "/icons/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/icons/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/icons/favicon.ico" },
    ],
    apple: [{ url: "/icons/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
  },
  category: "education",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <GeneralQueryProvider>
      <html lang="en">
        <body className={`${outfit.variable} font-outfit antialiased`}>
          {children}
          <Toaster position="bottom-right" richColors />
        </body>
      </html>
    </GeneralQueryProvider>
  )
}
