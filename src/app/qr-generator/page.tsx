"use client";

import { QrCode } from "@phosphor-icons/react";
import QRGenerator from "@/components/qr-generator/qr-generator";
import { DashboardSidebar } from "@/components/layout/dashboard-sidebar";

export default function QRGeneratorPage() {
  return (
    <DashboardSidebar>
      <div className="py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <div className="flex items-center space-x-3 mb-2">
              <div className="w-10 h-10 bg-blue-500/20 text-blue-600 dark:bg-blue-500/30 dark:text-blue-400 rounded-lg flex items-center justify-center">
                <QrCode className="w-5 h-5" weight="fill" />
              </div>
              <h1 className="text-3xl font-bold">QR Generator Pro</h1>
            </div>
            <p className="text-muted-foreground">
              Generate professional, customizable QR codes instantly. Free, no watermark, 100% client-side.
            </p>
          </div>

          <div className="mt-8">
            <QRGenerator />
          </div>
        </div>
      </div>
    </DashboardSidebar>
  );
}
