"use client";

import { ReceiptGenerator } from "@/components/receipt-generator";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ReceiptText } from "lucide-react";

export default function NotaCepatPage() {
  return (
    <main className="min-h-screen bg-slate-50 dark:bg-slate-950 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto mb-8">
        <Link href="/">
          <Button
            variant="ghost"
            className="mb-4 -ml-4 text-slate-500 hover:text-slate-900 dark:hover:text-slate-50"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Kembali ke Portal
          </Button>
        </Link>
        <div className="flex items-center space-x-3 mb-2">
          <div className="w-10 h-10 bg-primary/20 text-primary-foreground dark:bg-primary/30 dark:text-primary rounded-lg flex items-center justify-center">
            <ReceiptText className="w-5 h-5" />
          </div>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-50">
            Nota Cepat
          </h1>
        </div>
        <p className="text-slate-500 dark:text-slate-400">
          Buat nota digital keren dalam hitungan detik.
        </p>
      </div>

      <div className="max-w-4xl mx-auto">
        <ReceiptGenerator />
      </div>
    </main>
  );
}
