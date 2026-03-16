import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "QR Generator Pro - Free Professional QR Code Generator",
  description:
    "Generate professional, customizable QR codes instantly. Free, no watermark, client-side only. Create QR codes for URLs, WiFi, vCards, and more.",
  keywords: [
    "QR code generator",
    "free QR code",
    "custom QR code",
    "QR code with logo",
    "WiFi QR code",
    "vCard QR code",
  ],
  openGraph: {
    title: "QR Generator Pro - Free Professional QR Code Generator",
    description:
      "Generate professional, customizable QR codes instantly. Free, no watermark, client-side only.",
    type: "website",
  },
};

export default function QRGeneratorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
