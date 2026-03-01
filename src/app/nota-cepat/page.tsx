"use client";

import { ReceiptGenerator } from "@/components/receipt-generator";

export default function Home() {
  return (
    <main className="min-h-screen w-full font-sans">
      <ReceiptGenerator />
    </main>
  );
}
