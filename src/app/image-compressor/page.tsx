"use client";

import { Image as ImageIcon } from "lucide-react";
import ImageCompressor from "@/components/image-compressor/image-compressor";
import { FeatureLayout } from "@/components/layout/featureLayout";

export default function ImageCompressorPage() {
  return (
    <FeatureLayout
      icon={<ImageIcon className="w-5 h-5" />}
      title="CompressIMG Pro"
      description="Compress and optimize images without quality loss. 100% client-side, your images never leave your device."
    >
      <div className="mt-8">
        <ImageCompressor />
      </div>
    </FeatureLayout>
  );
}
