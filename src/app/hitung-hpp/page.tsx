"use client";

import { Calculator } from "@phosphor-icons/react";
import { HppCalculator } from "@/components/hpp-calculator";
import { DashboardSidebar } from "@/components/layout/dashboard-sidebar";

export default function HitungHppPage() {
  return (
    <DashboardSidebar>
      <div className="py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <div className="flex items-center space-x-3 mb-2">
              <div className="w-10 h-10 bg-primary/20 text-primary-foreground dark:bg-primary/30 dark:text-primary rounded-lg flex items-center justify-center">
                <Calculator className="w-5 h-5" weight="fill" />
              </div>
              <h1 className="text-3xl font-bold">Kalkulator HPP UMKM</h1>
            </div>
            <p className="text-muted-foreground">
              Hitung Harga Pokok Penjualan (HPP) dan tentukan margin keuntungan ideal untuk bisnis kamu.
            </p>
          </div>

          <HppCalculator />
        </div>
      </div>
    </DashboardSidebar>
  );
}
