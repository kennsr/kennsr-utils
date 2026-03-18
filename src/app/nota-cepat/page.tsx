"use client";

import { Receipt } from "@phosphor-icons/react";
import { ReceiptGenerator } from "@/components/receipt-generator";
import { DashboardSidebar } from "@/components/layout/dashboard-sidebar";

export default function NotaCepatPage() {
  return (
    <DashboardSidebar>
      <div className="py-8 px-4 sm:px-6 lg:px-8 print:p-0 print:bg-white print:min-h-0">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8 print:hidden">
            <div className="flex items-center space-x-3 mb-2">
              <div className="w-10 h-10 bg-primary/20 text-primary-foreground dark:bg-primary/30 dark:text-primary rounded-lg flex items-center justify-center">
                <Receipt className="w-5 h-5" weight="fill" />
              </div>
              <h1 className="text-3xl font-bold">
                Receipt Generator / Nota Cepat
              </h1>
            </div>
            <p className="text-muted-foreground">
              Buat nota olshop dengan cepat. Atur tema menggunakan tombol di bawah, dan langsung cetak struk dari browsermu.
            </p>
          </div>

          <div className="mt-8">
            <ReceiptGenerator />
          </div>
        </div>
      </div>
    </DashboardSidebar>
  );
}
