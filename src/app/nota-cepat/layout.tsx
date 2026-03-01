import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Nota Cepat | Pembuat Struk Digital Instan UMKM",
  description:
    "Buat nota atau struk belanja digital secara gratis dan mudah untuk UMKM online. Export menjadi gambar hanya dalam hitungan detik.",
  openGraph: {
    title: "Nota Cepat | Pembuat Struk Digital Instan UMKM",
    description:
      "Buat nota digital instan untuk toko onlinemu dalam hitungan detik.",
    type: "website",
    locale: "id_ID",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  // Pass through layout since global layout handles the shell
  return children;
}
