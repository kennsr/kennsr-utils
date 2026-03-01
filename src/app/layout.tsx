import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import { Footer } from "@/components/layout/footer";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://utils.kenn.sr"),
  title: {
    default: "Kennsr Utilities | Essential Tools & Generators",
    template: "%s | Kennsr Utilities",
  },
  description:
    "A collection of essential utilities including Receipt Generator, Hitung HPP, and Kirim WA Link Generator by Kennsr. Built for everyday productivity.",
  keywords: [
    "Kennsr Utilities",
    "Essential Tools",
    "Receipt Generator",
    "Nota Cepat",
    "Hitung HPP",
    "Kalkulator COGS",
    "WA Link Generator",
    "Kirim WhatsApp Tanpa Save Nomor",
  ],
  authors: [{ name: "@kennsr", url: "https://utils.kenn.sr" }],
  creator: "Kennsr",
  openGraph: {
    type: "website",
    locale: "id_ID",
    url: "https://utils.kenn.sr",
    title: "Kennsr Utilities | Essential Tools",
    description: "A growing collection of useful daily tools from Kennsr.",
    siteName: "Kennsr Utilities",
  },
  twitter: {
    card: "summary_large_image",
    creator: "@kenn.sr",
  },
  alternates: {
    canonical: "/",
  },
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
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
