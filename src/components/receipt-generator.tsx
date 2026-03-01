"use client";

import { useState, useRef } from "react";
import { format } from "date-fns";
import * as htmlToImage from "html-to-image";
import {
  Plus,
  Trash2,
  Download,
  Store,
  User,
  Package,
  DollarSign,
  Printer,
} from "lucide-react";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";

interface OrderItem {
  id: string;
  name: string;
  qty: number;
  price: number;
}

export function ReceiptGenerator() {
  const [storeName, setStoreName] = useState("");
  const [storeContact, setStoreContact] = useState("");
  const [customerName, setCustomerName] = useState("");
  const [date, setDate] = useState(format(new Date(), "yyyy-MM-dd"));

  const [items, setItems] = useState<OrderItem[]>([
    { id: "1", name: "", qty: 1, price: 0 },
  ]);
  const [shippingFee, setShippingFee] = useState<number>(0);

  const receiptRef = useRef<HTMLDivElement>(null);

  const addItem = () => {
    setItems([
      ...items,
      { id: Math.random().toString(), name: "", qty: 1, price: 0 },
    ]);
  };

  const removeItem = (id: string) => {
    setItems(items.filter((item) => item.id !== id));
  };

  const updateItem = (
    id: string,
    field: keyof OrderItem,
    value: string | number,
  ) => {
    setItems(
      items.map((item) => {
        if (item.id === id) {
          return { ...item, [field]: value };
        }
        return item;
      }),
    );
  };

  const subtotal = items.reduce((acc, item) => acc + item.qty * item.price, 0);
  const grandTotal = subtotal + shippingFee;

  const handleExport = async () => {
    if (!receiptRef.current) return;
    try {
      const dataUrl = await htmlToImage.toJpeg(receiptRef.current, {
        quality: 0.95,
      });
      const link = document.createElement("a");
      const name = customerName
        ? customerName.replace(/\s+/g, "_")
        : "Pelanggan";
      link.download = `Nota-${name}.jpg`;
      link.href = dataUrl;
      link.click();
    } catch (err) {
      console.error("Terjadi kesalahan saat menyimpan gambar:", err);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(val);
  };

  return (
    <div className="flex flex-col lg:flex-row gap-8 items-start relative pb-32 lg:pb-0">
      {/* LEFT COLUMN: Input Forms */}
      <div className="w-full lg:w-2/3 space-y-6">
        {/* Section A: Informasi Toko */}
        <Card className="border-slate-200 dark:border-slate-800 dark:bg-slate-900 shadow-sm">
          <CardHeader>
            <CardTitle className="flex items-center text-xl text-primary">
              <Store className="w-5 h-5 mr-2" />
              Informasi Toko
            </CardTitle>
            <CardDescription>Detail nama dan kontak toko Anda.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="storeName">Nama Toko *</Label>
                <Input
                  id="storeName"
                  placeholder="Mis. Beauty Skincare"
                  value={storeName}
                  onChange={(e) => setStoreName(e.target.value)}
                  className="bg-slate-50 dark:bg-slate-950"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="storeContact">IG / Telepon</Label>
                <Input
                  id="storeContact"
                  placeholder="@beautylc / 0812..."
                  value={storeContact}
                  onChange={(e) => setStoreContact(e.target.value)}
                  className="bg-slate-50 dark:bg-slate-950"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Section B: Informasi Pelanggan */}
        <Card className="border-slate-200 dark:border-slate-800 dark:bg-slate-900 shadow-sm">
          <CardHeader>
            <CardTitle className="flex items-center text-xl text-primary">
              <User className="w-5 h-5 mr-2" />
              Informasi Pelanggan
            </CardTitle>
            <CardDescription>
              Detail pelanggan dan tanggal transaksi.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="customerName">Nama Pelanggan *</Label>
                <Input
                  id="customerName"
                  placeholder="Mis. Sisca"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  className="bg-slate-50 dark:bg-slate-950"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="date">Tanggal</Label>
                <Input
                  id="date"
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="bg-slate-50 dark:bg-slate-950"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Section C: Daftar Produk */}
        <Card className="border-slate-200 dark:border-slate-800 dark:bg-slate-900 shadow-sm">
          <CardHeader>
            <div className="flex justify-between items-center">
              <div>
                <CardTitle className="flex items-center text-xl text-primary">
                  <Package className="w-5 h-5 mr-2" />
                  Daftar Produk
                </CardTitle>
                <CardDescription>
                  Barang yang dibeli oleh pelanggan.
                </CardDescription>
              </div>
              <Button
                onClick={addItem}
                size="sm"
                className="bg-primary text-primary-foreground hover:bg-primary/90"
              >
                <Plus className="w-4 h-4 mr-1" /> Tambah Produk
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            {items.length === 0 ? (
              <div className="text-center py-6 text-slate-500 text-sm border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-lg">
                Belum ada produk ditambahkan.
              </div>
            ) : (
              items.map((item, index) => (
                <div
                  key={item.id}
                  className="relative p-4 border border-slate-200 dark:border-slate-800 rounded-lg bg-slate-50/50 dark:bg-slate-950/50"
                >
                  <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
                    {/* Row 1 */}
                    <div className="md:col-span-12 flex justify-between items-center">
                      <span className="font-semibold text-sm text-slate-700 dark:text-slate-300">
                        Produk #{index + 1}
                      </span>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => removeItem(item.id)}
                        disabled={items.length === 1}
                        className="h-8 w-8 text-destructive hover:bg-destructive/10"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                    {/* Row 2 */}
                    <div className="space-y-1 md:col-span-6">
                      <Label className="text-xs">Nama Barang</Label>
                      <Input
                        value={item.name}
                        onChange={(e) =>
                          updateItem(item.id, "name", e.target.value)
                        }
                        placeholder="Mis. Serum Acne"
                        className="h-9"
                      />
                    </div>
                    <div className="space-y-1 md:col-span-3">
                      <Label className="text-xs">Harga Satuan</Label>
                      <Input
                        type="number"
                        min="0"
                        value={item.price || ""}
                        onChange={(e) =>
                          updateItem(
                            item.id,
                            "price",
                            parseFloat(e.target.value) || 0,
                          )
                        }
                        className="h-9"
                      />
                    </div>
                    <div className="space-y-1 md:col-span-3">
                      <Label className="text-xs">Kuantitas</Label>
                      <Input
                        type="number"
                        min="1"
                        value={item.qty || ""}
                        onChange={(e) =>
                          updateItem(
                            item.id,
                            "qty",
                            parseInt(e.target.value) || 1,
                          )
                        }
                        className="h-9"
                      />
                    </div>
                  </div>
                </div>
              ))
            )}
          </CardContent>
        </Card>

        {/* Section D: Biaya Tambahan */}
        <Card className="border-slate-200 dark:border-slate-800 dark:bg-slate-900 shadow-sm">
          <CardHeader>
            <CardTitle className="flex items-center text-xl text-primary">
              <DollarSign className="w-5 h-5 mr-2" />
              Biaya Tambahan
            </CardTitle>
            <CardDescription>
              Biaya packing, asuransi, atau pengiriman.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2 max-w-sm">
              <Label htmlFor="shippingFee">Ongkos Kirim</Label>
              <Input
                id="shippingFee"
                type="number"
                min="0"
                value={shippingFee || ""}
                onChange={(e) =>
                  setShippingFee(parseFloat(e.target.value) || 0)
                }
                className="bg-slate-50 dark:bg-slate-950"
              />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* RIGHT COLUMN / BOTTOM MOBILE: Live Preview */}
      <div className="w-full lg:w-1/3 fixed bottom-0 left-0 right-0 z-40 lg:sticky lg:top-8 p-4 lg:p-0 bg-white dark:bg-slate-950 lg:bg-transparent border-t lg:border-t-0 shadow-[0_-10px_40px_-15px_rgba(0,0,0,0.1)] lg:shadow-none">
        <div className="flex items-center justify-between mb-2 lg:flex">
          <h2 className="text-sm font-bold uppercase tracking-widest text-slate-400 dark:text-slate-500">
            Live Preview
          </h2>
        </div>

        {/* The actual receipt div to capture */}
        <div className="overflow-hidden rounded-xl border border-slate-200 shadow-xl shadow-slate-200/50 bg-white mb-4 lg:mb-6 max-h-[55vh] lg:max-h-[65vh] overflow-y-auto">
          <div
            ref={receiptRef}
            className="bg-white text-slate-900 w-full"
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

        <div className="flex flex-col gap-2 w-full lg:w-auto mt-4">
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
    </div>
  );
}
