import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ReactNode } from "react";

interface FeatureLayoutProps {
  icon: ReactNode;
  title: string;
  description: string;
  children: ReactNode;
  backHref?: string;
  backLabel?: string;
}

export function FeatureLayout({
  icon,
  title,
  description,
  children,
  backHref = "/",
  backLabel = "Kembali ke Portal",
}: FeatureLayoutProps) {
  return (
    <main className="min-h-screen bg-slate-50 dark:bg-slate-950 py-8 px-4 sm:px-6 lg:px-8 print:p-0 print:bg-white print:min-h-0">
      <div className="max-w-4xl mx-auto mb-8 print:hidden">
        <Link href={backHref}>
          <Button
            variant="ghost"
            className="mb-4 -ml-4 text-slate-500 hover:text-slate-900 dark:hover:text-slate-50"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            {backLabel}
          </Button>
        </Link>
        <div className="flex items-center space-x-3 mb-2">
          <div className="w-10 h-10 bg-primary/20 text-primary-foreground dark:bg-primary/30 dark:text-primary rounded-lg flex items-center justify-center">
            {icon}
          </div>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-50">
            {title}
          </h1>
        </div>
        <p className="text-slate-500 dark:text-slate-400">{description}</p>
      </div>

      <div className="max-w-4xl mx-auto">{children}</div>
    </main>
  );
}
