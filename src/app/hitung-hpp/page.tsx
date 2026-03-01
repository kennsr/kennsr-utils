import { Calculator } from "lucide-react";
import { HppCalculator } from "@/components/hpp-calculator";
import { FeatureLayout } from "@/components/layout/featureLayout";

export default function HitungHppPage() {
  return (
    <FeatureLayout
      icon={<Calculator className="w-5 h-5" />}
      title="Kalkulator HPP UMKM"
      description="Hitung Harga Pokok Penjualan (HPP) dan tentukan margin keuntungan ideal untuk bisnis kamu."
    >
      <HppCalculator />
    </FeatureLayout>
  );
}
