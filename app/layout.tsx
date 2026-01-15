import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { AnalyticsProvider } from "@/components/providers/AnalyticsProvider";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: 'swap',
  preload: true,
  fallback: ['-apple-system', 'BlinkMacSystemFont', 'system-ui', 'sans-serif'],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: 'swap',
  preload: true,
  fallback: ['Monaco', 'Courier New', 'monospace'],
});

export const metadata: Metadata = {
  title: "Nadav Galili - Full-Stack & Mobile Developer",
  description: "Full-stack developer with 5 years of experience building production applications. Shipped Poker AI to iOS and Android app stores.",
  keywords: [
    "React Native",
    "Expo",
    "Full-Stack Developer",
    "Mobile Developer",
    "TypeScript",
    "React",
    "Next.js",
    "Node.js",
  ],
  authors: [{ name: "Nadav Galili" }],
  openGraph: {
    title: "Nadav Galili - Full-Stack & Mobile Developer",
    description: "Full-stack developer with 5 years of experience building production applications. Shipped Poker AI to iOS and Android app stores.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Nadav Galili - Full-Stack & Mobile Developer",
    description: "Full-stack developer with 5 years of experience building production applications.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          disableTransitionOnChange
        >
          <AnalyticsProvider>
            <Header />
            <main className="min-h-screen">
              {children}
            </main>
            <Footer />
          </AnalyticsProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
