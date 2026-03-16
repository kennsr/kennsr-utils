import { ReceiptText, Link as LinkIcon, QrCode, Key, Image as ImageIcon, Calculator } from "lucide-react";
import { UtilityCard, UtilityItem } from "@/components/utility-card";

const utilities: UtilityItem[] = [
  {
    id: "nota-cepat",
    title: "Nota Cepat",
    description:
      "Instant digital receipt generator for UMKM. Create and download professional receipts in seconds.",
    icon: ReceiptText,
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
    <main className="container mx-auto px-6 py-16 max-w-5xl">
      <div className="flex flex-col items-center text-center space-y-6 mb-16">
        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-slate-900 dark:text-slate-50">
          Essential Tools for <br className="hidden md:block" />
          <span className="text-primary">Everyday Tasks</span>
        </h1>
        <p className="text-lg md:text-xl text-slate-500 dark:text-slate-400 max-w-2xl mx-auto">
          A growing collection of free, fast, and easy-to-use digital utilities
          designed to simplify your workflow and business operations.
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {utilities.map((util) => (
          <UtilityCard key={util.id} util={util} />
        ))}
      </div>
    </main>
  );
}
