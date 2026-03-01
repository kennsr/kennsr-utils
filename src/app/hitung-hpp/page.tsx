import { Calculator, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { HppCalculator } from "@/components/hpp-calculator";

export default function HitungHppPage() {
  return (
    <main className="min-h-screen bg-slate-50 dark:bg-slate-950 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto mb-8">
        <Link href="/">
          <Button
            variant="ghost"
            className="mb-4 -ml-4 text-slate-500 hover:text-slate-900 dark:hover:text-slate-50"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Kembali ke Portal
          </Button>
        </Link>
        <div className="flex items-center space-x-3 mb-2">
          <div className="w-10 h-10 bg-primary/20 text-primary-foreground dark:bg-primary/30 dark:text-primary rounded-lg flex items-center justify-center">
            <Calculator className="w-5 h-5" />
          </div>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-50">
            Kalkulator HPP UMKM
          </h1>
        </div>
        <p className="text-slate-500 dark:text-slate-400">
          Hitung Harga Pokok Penjualan (HPP) dan tentukan margin keuntungan
          ideal untuk bisnis kamu.
        </p>
      </div>

      <div className="max-w-4xl mx-auto">
        <HppCalculator />
      </div>
    </main>
  );
}
