"use client";

import { QrCode } from "lucide-react";
import QRGenerator from "@/components/qr-generator/qr-generator";
import { FeatureLayout } from "@/components/layout/featureLayout";

export default function QRGeneratorPage() {
  return (
    <FeatureLayout
      icon={<QrCode className="w-5 h-5" />}
      title="QR Generator Pro"
      description="Generate professional, customizable QR codes instantly. Free, no watermark, 100% client-side."
    >
      <div className="mt-8">
        <QRGenerator />
      </div>
    </FeatureLayout>
  );
}
