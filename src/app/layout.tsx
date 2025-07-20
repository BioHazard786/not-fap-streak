import { Toaster } from "@/components/ui/sonner";
import type { Metadata } from "next";
import { Antonio, Caveat, Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const caveat = Caveat({
  variable: "--font-caveat",
  subsets: ["latin"],
});

const antonio = Antonio({
  variable: "--font-antonio",
  subsets: ["latin"],
  weight: ["100", "200"],
});

export const metadata: Metadata = {
  title: "No-Fap Streak Tracker",
  description:
    "Track your no-fap journey with a beautiful flip clock. Create your account and start your streak today!",
  keywords: [
    "no-fap",
    "streak tracker",
    "motivation",
    "self-improvement",
    "addiction recovery",
    "habit tracker",
    "personal development",
    "mental health",
    "wellness",
    "productivity",
  ],
  authors: [
    {
      name: "Mohd Zaid",
      url: "https://github.com/BioHazard786",
    },
  ],
  creator: "Mohd Zaid",
  publisher: "Mohd Zaid",
  category: "Health & Fitness",
  classification: "Personal Development",
  manifest: "/manifest.json",
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_APP_URL || "https://localhost:3000"
  ),
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    title: "No-Fap Streak Tracker",
    description: "Track your no-fap journey with a beautiful flip clock",
    type: "website",
    locale: "en_US",
    url: "https://no-fap-streak.biohazard786.workers.dev",
    siteName: "No-Fap Streak Tracker",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "No-Fap Streak Tracker",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "No-Fap Streak Tracker",
    description: "Track your no-fap journey with a beautiful flip clock",
    creator: "@coder_zaid",
    images: ["/og-image.png"],
  },

  applicationName: "No-Fap Streak Tracker",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "No-Fap Tracker",
  },
  formatDetection: {
    telephone: false,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${caveat.variable} ${antonio.variable} antialiased`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
