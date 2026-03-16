"use client";

import { Key } from "lucide-react";
import PasswordGenerator from "@/components/password-generator/password-generator";
import { FeatureLayout } from "@/components/layout/featureLayout";

export default function PasswordGeneratorPage() {
  return (
    <FeatureLayout
      icon={<Key className="w-5 h-5" />}
      title="PassGen Secure"
      description="Generate cryptographically strong passwords. 100% client-side, never transmitted."
    >
      <div className="mt-8">
        <PasswordGenerator />
      </div>
    </FeatureLayout>
  );
}
