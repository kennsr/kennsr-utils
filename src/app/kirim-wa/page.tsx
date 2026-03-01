"use client";

import { MessageCircle } from "lucide-react";
import { FeatureLayout } from "@/components/layout/featureLayout";
import { WaLinkGenerator } from "@/components/wa-link-generator";

export default function KirimWaPage() {
  return (
    <>
      <FeatureLayout
        icon={<MessageCircle className="w-5 h-5 text-[#25D366]" />}
        title="KirimWA - Chat Tanpa Save Nomor"
        description="Kirim pesan WhatsApp tanpa perlu menyimpan nomor kontak. Cepat, aman, dan tanpa iklan."
      >
        <div className="mt-8">
          <WaLinkGenerator />
        </div>
      </FeatureLayout>

      {/* Lead Magnet Footer */}
      <footer className="w-full text-center py-6 mt-12 mb-8 text-sm text-slate-500">
        <p>
          KirimWA - Tanpa Iklan, Tanpa Ribet. Dibuat oleh{" "}
          <span className="font-semibold text-slate-700 dark:text-slate-300">
            Kennsr Utilities
          </span>
          .
        </p>
        <p className="mt-1">
          Butuh jasa pembuatan website atau sistem web app? Hubungi{" "}
          <a
            href="https://wa.me/6281282411257"
            target="_blank"
            rel="noreferrer"
            className="text-primary hover:underline font-semibold"
          >
            WA Admin
          </a>
        </p>
      </footer>
    </>
  );
}
