import { format } from "date-fns";
import { Download, Printer } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { OrderItem } from "./productList";

interface ReceiptPreviewProps {
  receiptRef: React.RefObject<HTMLDivElement | null>;
  storeName: string;
  storeContact: string;
  customerName: string;
  date: string;
  items: OrderItem[];
  shippingFee: number;
  subtotal: number;
  grandTotal: number;
  handleExport: () => void;
  handlePrint: () => void;
  formatCurrency: (val: number) => string;
}

export function ReceiptPreview({
  receiptRef,
  storeName,
  storeContact,
  customerName,
  date,
  items,
  shippingFee,
  subtotal,
  grandTotal,
  handleExport,
  handlePrint,
  formatCurrency,
}: ReceiptPreviewProps) {
  return (
    <div className="w-full lg:w-1/3 fixed bottom-0 left-0 right-0 z-40 lg:sticky lg:top-8 p-4 lg:p-0 bg-white dark:bg-slate-950 lg:bg-transparent border-t lg:border-t-0 shadow-[0_-10px_40px_-15px_rgba(0,0,0,0.1)] lg:shadow-none print:static print:p-0 print:border-none print:shadow-none print:bg-white print:w-full">
      <div className="flex items-center justify-between mb-2 lg:flex print:hidden">
        <h2 className="text-sm font-bold uppercase tracking-widest text-slate-400 dark:text-slate-500">
          Live Preview
        </h2>
      </div>

      <div className="overflow-hidden rounded-xl border border-slate-200 shadow-xl shadow-slate-200/50 bg-white mb-4 lg:mb-6 max-h-[55vh] lg:max-h-[65vh] overflow-y-auto print:max-h-none print:overflow-visible print:border-none print:shadow-none print:mb-0">
        <div
          id="printable-receipt"
          ref={receiptRef}
          className="bg-white text-slate-900 w-full print:w-[80mm]! print:p-[10mm]! print:mx-auto! print:shadow-none! print:border-none!"
          style={{
            padding: "40px",
            fontFamily: "var(--font-inter), sans-serif",
            width: "100%",
            minHeight: "500px",
            display: "flex",
            flexDirection: "column",
          }}
        >
          {/* Header */}
          <div className="text-center mb-10">
            <h1 className="text-2xl font-extrabold tracking-tight mb-2 wrap-break-word">
              {storeName || "NAMA TOKO"}
            </h1>
            <p className="text-slate-500 text-sm">
              {storeContact || "IG / Telepon Toko"}
            </p>
          </div>

          <div className="flex justify-between items-end mb-8 text-sm">
            <div>
              <p className="text-slate-500 mb-1">Diberikan kepada:</p>
              <p className="font-semibold text-lg">
                {customerName || "Nama Pelanggan"}
              </p>
            </div>
            <div className="text-right">
              <p className="text-slate-500 mb-1">Tanggal Transaksi:</p>
              <p className="font-medium text-slate-900">
                {date ? format(new Date(date), "dd MMMM yyyy") : "Tanggal"}
              </p>
            </div>
          </div>

          {/* Table */}
          <div className="mb-8 flex-1">
            <div className="grid grid-cols-12 gap-2 text-xs font-bold text-slate-500 border-b-2 border-slate-200 pb-3 uppercase tracking-wider mb-3">
              <div className="col-span-6">Produk</div>
              <div className="col-span-2 text-center">Qty</div>
              <div className="col-span-4 text-right">Total</div>
            </div>

            <div className="space-y-4 text-sm mt-4">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="grid grid-cols-12 gap-2 items-start py-1"
                >
                  <div className="col-span-6 pr-2">
                    <p className="font-medium leading-tight text-slate-800">
                      {item.name || `Barang ${item.id}`}
                    </p>
                    <p className="text-slate-500 text-xs mt-0.5">
                      {formatCurrency(item.price)}
                    </p>
                  </div>
                  <div className="col-span-2 text-center text-slate-700">
                    {item.qty}
                  </div>
                  <div className="col-span-4 text-right font-medium text-slate-800">
                    {formatCurrency(item.qty * item.price)}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <Separator className="my-6 bg-slate-200" />

          {/* Summary */}
          <div className="space-y-3 mb-8 w-full max-w-[250px] ml-auto text-sm">
            <div className="flex justify-between text-slate-600">
              <span>Subtotal</span>
              <span className="font-medium text-slate-900">
                {formatCurrency(subtotal)}
              </span>
            </div>
            <div className="flex justify-between text-slate-600">
              <span>Ongkos Kirim</span>
              <span className="font-medium text-slate-900">
                {formatCurrency(shippingFee)}
              </span>
            </div>
            <div className="flex justify-between font-bold text-lg pt-3 border-t border-slate-200 mt-2">
              <span className="text-slate-900">Total</span>
              <span className="text-slate-900">
                {formatCurrency(grandTotal)}
              </span>
            </div>
          </div>

          {/* Footer Magnet */}
          <div className="mt-auto pt-8 text-center border-t border-dashed border-slate-300">
            <p className="text-xs text-slate-400">
              Terima kasih telah berbelanja di{" "}
              <span className="font-medium text-slate-500">
                {storeName || "Toko Kami"}
              </span>
              !
            </p>
            <p className="text-[10px] text-slate-300 mt-3">
              Dibuat via Kennsr Utilities | Butuh website? Hubungi via WA/IG
            </p>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-2 w-full lg:w-auto mt-4 print:hidden">
        <Button
          size="lg"
          className="w-full text-base font-semibold shadow-lg shadow-primary/20 bg-primary text-primary-foreground hover:bg-primary/90 rounded-none lg:rounded-md"
          onClick={handleExport}
        >
          <Download className="w-5 h-5 mr-2" />
          Download Nota (JPG)
        </Button>
        <Button
          size="lg"
          variant="outline"
          className="w-full text-base font-semibold rounded-none lg:rounded-md border-primary text-primary hover:bg-primary/5"
          onClick={handlePrint}
        >
          <Printer className="w-5 h-5 mr-2" />
          Cetak Nota (Print)
        </Button>
      </div>
    </div>
  );
}
