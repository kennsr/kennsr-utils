"use client";

import {
  Receipt,
  Link as LinkIcon,
  QrCode,
  Key,
  ImageSquare as ImageIcon,
  Calculator,
} from "@phosphor-icons/react";
import { UtilityCard, UtilityItem } from "@/components/utility-card";
import { DashboardSidebar } from "@/components/layout/dashboard-sidebar";
import { WeatherWidget } from "@/components/dashboard/weather-widget";
import { TimeWidget } from "@/components/dashboard/time-widget";
import { QuoteWidget } from "@/components/dashboard/quote-widget";
import { TipsWidget } from "@/components/dashboard/tips-widget";

const utilities: UtilityItem[] = [
  {
    id: "nota-cepat",
    title: "Nota Cepat",
    description:
      "Instant digital receipt generator for UMKM. Create and download professional receipts in seconds.",
    icon: Receipt,
    iconActiveColors:
      "bg-primary/20 text-primary-foreground dark:bg-primary/30 dark:text-primary",
    iconInactiveColors: "",
    bulletColorActive: "bg-primary",
    bulletColorInactive: "",
    features: [
      "No Login Required",
      "Auto-calculation",
      "Export to high-quality JPG",
    ],
    href: "/nota-cepat",
    isComingSoon: false,
  },
  {
    id: "hitung-hpp",
    title: "Hitung HPP",
    description:
      "Cost of Goods Sold (COGS) and profit margin calculator for food and bakery businesses.",
    icon: Calculator,
    iconActiveColors:
      "bg-primary/20 text-primary-foreground dark:bg-primary/30 dark:text-primary",
    iconInactiveColors: "",
    bulletColorActive: "bg-primary",
    bulletColorInactive: "",
    features: ["Dynamic costing", "Profit targeting", "Real-time Dashboard"],
    href: "/hitung-hpp",
    isComingSoon: false,
  },
  {
    id: "kirim-wa",
    title: "KirimWA",
    description:
      "Send WhatsApp messages without saving numbers. Instantly formats local Indonesian numbers.",
    icon: LinkIcon,
    iconActiveColors:
      "bg-primary/20 text-primary-foreground dark:bg-primary/30 dark:text-primary",
    iconInactiveColors: "",
    bulletColorActive: "bg-primary",
    bulletColorInactive: "",
    features: ["Auto Formatting", "Local History", "No Login Needed"],
    href: "/kirim-wa",
    isComingSoon: false,
  },
  {
    id: "qr-generator",
    title: "QR Generator Pro",
    description:
      "Generate professional, customizable QR codes instantly. Free, no watermark, client-side only.",
    icon: QrCode,
    iconActiveColors:
      "bg-blue-500/20 text-blue-600 dark:bg-blue-500/30 dark:text-blue-400",
    iconInactiveColors: "",
    bulletColorActive: "bg-blue-500",
    bulletColorInactive: "",
    features: ["Multiple QR Types", "Logo Support", "Export PNG/SVG/JPG"],
    href: "/qr-generator",
    isComingSoon: false,
  },
  {
    id: "password-generator",
    title: "PassGen Secure",
    description:
      "Generate cryptographically strong passwords with breach checking and secure local vault.",
    icon: Key,
    iconActiveColors:
      "bg-cyan-500/20 text-cyan-600 dark:bg-cyan-500/30 dark:text-cyan-400",
    iconInactiveColors: "",
    bulletColorActive: "bg-cyan-500",
    bulletColorInactive: "",
    features: ["100% Client-Side", "Breach Detection", "Encrypted Vault"],
    href: "/password-generator",
    isComingSoon: false,
  },
  {
    id: "image-compressor",
    title: "CompressIMG Pro",
    description:
      "Compress and optimize images without quality loss. Batch processing with format conversion.",
    icon: ImageIcon,
    iconActiveColors:
      "bg-green-500/20 text-green-600 dark:bg-green-500/30 dark:text-green-400",
    iconInactiveColors: "",
    bulletColorActive: "bg-green-500",
    bulletColorInactive: "",
    features: ["Batch Processing", "Format Conversion", "Privacy First"],
    href: "/image-compressor",
    isComingSoon: false,
  },
];

export default function PortalPage() {
  return (
    <DashboardSidebar>
      <div className="container mx-auto px-4 py-6 max-w-7xl">
        {/* Welcome Header */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold mb-2">Dashboard</h1>
          <p className="text-muted-foreground">
            Welcome to Kennsr Utilities - Your essential tools for everyday tasks
          </p>
        </div>

        {/* Info Widgets Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <TimeWidget />
          <WeatherWidget />
          <QuoteWidget />
          <TipsWidget />
        </div>

        {/* Tools Section */}
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-4">Quick Tools</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {utilities.map((util) => (
              <UtilityCard key={util.id} util={util} />
            ))}
          </div>
        </div>
      </div>
    </DashboardSidebar>
  );
}
