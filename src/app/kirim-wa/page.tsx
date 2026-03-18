"use client";

import { WhatsappLogo } from "@phosphor-icons/react";
import { WaLinkGenerator } from "@/components/wa-link-generator";
import { DashboardSidebar } from "@/components/layout/dashboard-sidebar";

export default function KirimWaPage() {
  return (
    <DashboardSidebar>
      <div className="py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <div className="flex items-center space-x-3 mb-2">
              <div className="w-10 h-10 bg-green-500/20 text-green-600 dark:bg-green-500/30 dark:text-green-400 rounded-lg flex items-center justify-center">
                <WhatsappLogo className="w-5 h-5" weight="fill" />
              </div>
              <h1 className="text-3xl font-bold">KirimWA - Chat Tanpa Save Nomor</h1>
            </div>
            <p className="text-muted-foreground">
              Kirim pesan WhatsApp tanpa perlu menyimpan nomor kontak. Cepat, aman, dan tanpa iklan.
            </p>
          </div>

          <div className="mt-8">
            <WaLinkGenerator />
          </div>
        </div>
      </div>
    </DashboardSidebar>
  );
}
