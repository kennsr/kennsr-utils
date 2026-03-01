import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Hitung HPP Kuliner & Bakery | Kennsr Utilities",
  description:
    "Kalkulator HPP gratis untuk UMKM makanan dan bakery. Hitung biaya bahan baku, operasional, dan tentukan target margin keuntungan otomatis.",
  keywords: [
    "hitung hpp",
    "kalkulator hpp",
    "cara hitung harga pokok penjualan",
    "hpp makanan",
    "hpp bakery",
    "margin keuntungan umkm",
    "kennsr utilities",
    "aplikasi hitung modal",
  ],
  openGraph: {
    title: "Kalkulator HPP Gratis untuk UMKM - Kennsr Utilities",
    description:
      "Hitung modal dan harga jual ideal untuk produk kuliner kamu dengan mudah dan akurat.",
    url: "https://utils.kennsr.com/hitung-hpp",
    siteName: "Kennsr Utilities",
    locale: "id_ID",
    type: "website",
  },
  alternates: {
    canonical: "https://utils.kennsr.com/hitung-hpp",
  },
};

export default function HitungHppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
