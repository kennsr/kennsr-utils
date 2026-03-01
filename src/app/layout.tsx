import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import { ThemeToggle } from "@/components/theme-toggle";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Kennsr Utilities | Essential Tools & Generators",
  description:
    "A collection of essential utilities including Receipt Generator, WA Link Generator, and more by Kennsr.",
  keywords: [
    "Kennsr Utilities",
    "Essential Tools",
    "Receipt Generator",
    "Nota Cepat",
    "WA Link Generator",
  ],
  openGraph: {
    title: "Kennsr Utilities | Essential Tools",
    description: "A growing collection of useful daily tools from Kennsr.",
    type: "website",
    locale: "id_ID",
  },
  authors: [{ name: "@kennsr", url: "https://utils.kennsr/" }],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" suppressHydrationWarning>
      <body
        className={`${inter.variable} font-sans antialiased text-slate-900 bg-slate-50 min-h-screen flex flex-col dark:bg-slate-950 dark:text-slate-50`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="flex-1">{children}</div>
          <footer className="border-t bg-white dark:bg-slate-950 dark:border-slate-800 py-6 mt-12 w-full">
            <div className="container mx-auto px-4 flex flex-col items-center justify-center space-y-4 text-sm text-slate-500 dark:text-slate-400">
              <div className="flex items-center gap-4">
                <p className="font-medium text-slate-800 dark:text-slate-200">
                  Kennsr Utilities
                </p>
                <div className="h-4 w-px bg-slate-200 dark:bg-slate-800" />
                <ThemeToggle />
              </div>
              <div className="flex gap-4">
                <a
                  href="https://wa.me/6281282411257"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-slate-900 dark:hover:text-slate-200 transition-colors"
                >
                  Feedback & Inquiries (WhatsApp)
                </a>
                <a
                  href="https://instagram.com/kenn.sr"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-slate-900 dark:hover:text-slate-200 transition-colors"
                >
                  @kenn.sr
                </a>
              </div>
              <p className="text-xs">
                &copy; {new Date().getFullYear()} Kennsr. All rights reserved.
              </p>
            </div>
          </footer>
        </ThemeProvider>
      </body>
    </html>
  );
}
