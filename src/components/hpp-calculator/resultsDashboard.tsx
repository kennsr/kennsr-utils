import { RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent } from "@/components/ui/card";

interface ResultsDashboardProps {
  resetData: () => void;
  totalRecipeCost: number;
  yieldAmount: number;
  cogsPerPortion: number;
  profitMargin: number;
  profitTarget: number;
  suggestedSellingPrice: number;
  formatRp: (val: number) => string;
}

export function ResultsDashboard({
  resetData,
  totalRecipeCost,
  yieldAmount,
  cogsPerPortion,
  profitMargin,
  profitTarget,
  suggestedSellingPrice,
  formatRp,
}: ResultsDashboardProps) {
  return (
    <div className="w-full lg:w-1/3 fixed bottom-0 left-0 right-0 z-40 lg:sticky lg:top-8 p-4 lg:p-0 bg-white dark:bg-slate-950 lg:bg-transparent border-t lg:border-t-0 shadow-[0_-10px_40px_-15px_rgba(0,0,0,0.1)] lg:shadow-none">
      <Card className="border-primary/50 dark:border-primary/30 shadow-xl overflow-hidden">
        <div className="bg-primary/10 dark:bg-primary/20 py-3 px-6 border-b border-primary/20 dark:border-primary/10">
          <h2 className="font-bold tracking-tight text-slate-800 dark:text-slate-200 flex items-center justify-between">
            Hasil Perhitungan
            <Button
              variant="ghost"
              size="sm"
              onClick={resetData}
              className="h-6 px-2 text-xs text-muted-foreground hover:text-slate-900"
            >
              <RotateCcw className="w-3 h-3 mr-1" /> Reset
            </Button>
          </h2>
        </div>
        <CardContent className="p-6 space-y-6">
          <div className="space-y-4 text-sm">
            <div className="flex justify-between items-center pb-2 border-b border-dashed border-slate-200 dark:border-slate-800">
              <span className="text-slate-500">Total Biaya 1 Resep</span>
              <span className="font-semibold">{formatRp(totalRecipeCost)}</span>
            </div>
            <div className="flex justify-between items-center pb-2 border-b border-dashed border-slate-200 dark:border-slate-800">
              <span className="text-slate-500">Hasil Porsi</span>
              <span className="font-semibold">{yieldAmount} pcs</span>
            </div>

            <div className="pt-2">
              <div className="flex justify-between items-center mb-1">
                <span className="font-medium text-slate-700 dark:text-slate-300">
                  HPP per Porsi
                </span>
                <span className="font-bold text-lg">
                  {formatRp(cogsPerPortion)}
                </span>
              </div>
              <div className="flex justify-between items-center text-primary/80">
                <span>Target Untung ({profitMargin}%)</span>
                <span>+ {formatRp(profitTarget)}</span>
              </div>
            </div>
          </div>

          <Separator className="bg-primary/20" />

          <div className="pt-2 pb-4">
            <span className="block text-sm font-medium text-slate-500 mb-1 text-center">
              Harga Jual Disarankan
            </span>
            <span className="block text-4xl lg:text-5xl font-extrabold text-primary text-center tracking-tighter">
              {formatRp(suggestedSellingPrice)}
            </span>
          </div>
        </CardContent>
        <div className="bg-slate-50 dark:bg-slate-900/50 p-4 text-xs text-center text-slate-500 border-t border-slate-200 dark:border-slate-800">
          Dibuat via Kennsr Utilities | Butuh website?{" "}
          <a
            href="https://wa.me/6281282411257"
            className="text-primary hover:underline font-medium"
          >
            Hubungi Admin
          </a>
        </div>
      </Card>
    </div>
  );
}
