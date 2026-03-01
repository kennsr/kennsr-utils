import { ReceiptText, Link as LinkIcon } from "lucide-react";
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
    id: "wa-link-generator",
    title: "WA Link Generator",
    description:
      "Create customized WhatsApp short-links with pre-filled messages instantly.",
    icon: LinkIcon,
    iconActiveColors: "",
    iconInactiveColors: "bg-muted dark:bg-muted text-muted-foreground",
    bulletColorActive: "",
    bulletColorInactive: "bg-muted-foreground",
    features: ["Custom templates", "Easy sharing"],
    href: "#",
    isComingSoon: true,
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
