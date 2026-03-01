"use client";

import { ReceiptText } from "lucide-react";
import { ReceiptGenerator } from "@/components/receipt-generator";
import { FeatureLayout } from "@/components/layout/featureLayout";

export default function NotaCepatPage() {
  return (
    <FeatureLayout
      icon={<ReceiptText className="w-5 h-5" />}
      title="Receipt Generator / Nota Cepat"
      description="Buat nota olshop dengan cepat. Atur tema menggunakan tombol di bawah, dan langsung cetak struk dari browsermu."
    >
      <div className="mt-8">
        <ReceiptGenerator />
      </div>
    </FeatureLayout>
  );
}
