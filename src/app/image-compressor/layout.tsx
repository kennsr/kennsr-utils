import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "CompressIMG Pro - Free Image Compressor",
  description:
    "Compress and optimize images without quality loss. Batch processing, multiple formats, 100% client-side privacy.",
  keywords: [
    "image compressor",
    "photo optimizer",
    "image resizer",
    "batch image compression",
    "JPEG compressor",
    "PNG compressor",
    "WebP converter",
  ],
  openGraph: {
    title: "CompressIMG Pro - Free Image Compressor",
    description:
      "Compress and optimize images without quality loss. Batch processing, 100% client-side.",
    type: "website",
  },
};

export default function ImageCompressorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
