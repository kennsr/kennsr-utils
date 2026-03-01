"use client";

import { useState, useRef } from "react";
import { format } from "date-fns";
import * as htmlToImage from "html-to-image";
import { Plus, Trash2, Download } from "lucide-react";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

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

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(val);
  };

  return (
    <div className="container mx-auto max-w-7xl p-6 lg:p-12 md:max-h-screen">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-slate-50">
            Nota Cepat
          </h1>
          <p className="text-slate-500 dark:text-slate-400 mt-1">
            Buat nota keren dalam hitungan detik.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* LEFT COLUMN - INPUT FORM */}
        <div className="lg:col-span-6 space-y-8 overflow-y-auto pb-12 pr-4 custom-scrollbar lg:max-h-[80vh]">
          <div className="space-y-4">
            <h2 className="text-lg font-semibold border-b pb-2">
              Informasi Toko
            </h2>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="storeName">Nama Toko *</Label>
                <Input
                  id="storeName"
                  placeholder="Mis. Beauty Skincare"
                  value={storeName}
                  onChange={(e) => setStoreName(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="storeContact">IG / Telepon</Label>
                <Input
                  id="storeContact"
                  placeholder="@beautylc / 0812..."
                  value={storeContact}
                  onChange={(e) => setStoreContact(e.target.value)}
                />
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h2 className="text-lg font-semibold border-b pb-2">
              Informasi Pelanggan
            </h2>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="customerName">Nama Pelanggan *</Label>
                <Input
                  id="customerName"
                  placeholder="Mis. Sisca"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="date">Tanggal</Label>
                <Input
                  id="date"
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                />
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h2 className="text-lg font-semibold border-b pb-2">
              Daftar Produk
            </h2>

            <div className="space-y-4">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="flex gap-3 items-start bg-slate-50 dark:bg-slate-900 p-4 rounded-xl border dark:border-slate-800"
                >
                  <div className="flex-1 space-y-3">
                    <div>
                      <Label className="text-xs text-slate-500 mb-1 block">
                        Nama Barang
                      </Label>
                      <Input
                        placeholder="Mis. Serum Acne"
                        value={item.name}
                        onChange={(e) =>
                          updateItem(item.id, "name", e.target.value)
                        }
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <Label className="text-xs text-slate-500 mb-1 block">
                          Harga Satuan
                        </Label>
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
                        />
                      </div>
                      <div>
                        <Label className="text-xs text-slate-500 mb-1 block">
                          Kuantitas
                        </Label>
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
                        />
                      </div>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-red-500 hover:bg-red-50 hover:text-red-600 mt-6"
                    onClick={() => removeItem(item.id)}
                    disabled={items.length === 1}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              ))}
            </div>

            <Button
              onClick={addItem}
              variant="outline"
              className="w-full border-dashed"
            >
              <Plus className="w-4 h-4 mr-2" />
              Tambah Produk Lain
            </Button>
          </div>

          <div className="space-y-4">
            <h2 className="text-lg font-semibold border-b pb-2">
              Biaya Tambahan
            </h2>
            <div className="space-y-2">
              <Label htmlFor="shippingFee">Ongkos Kirim</Label>
              <Input
                id="shippingFee"
                type="number"
                min="0"
                value={shippingFee || ""}
                onChange={(e) =>
                  setShippingFee(parseFloat(e.target.value) || 0)
                }
              />
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN - LIVE PREVIEW */}
        <div className="lg:col-span-6 relative">
          <div className="sticky top-12 space-y-6">
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-sm font-bold uppercase tracking-widest text-slate-400 dark:text-slate-500">
                Live Preview
              </h2>
            </div>

            {/* The actual receipt div to capture */}
            <div className="overflow-hidden rounded-xl border border-slate-200 shadow-xl shadow-slate-200/50 bg-white">
              <div
                ref={receiptRef}
                className="bg-white text-slate-900 w-full"
                style={{
                  padding: "40px",
                  fontFamily: "var(--font-inter), sans-serif",
                  width: "100%",
                  minHeight: "600px",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                {/* Header */}
                <div className="text-center mb-10">
                  <h1 className="text-4xl font-extrabold tracking-tight mb-2">
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
                      {date
                        ? format(new Date(date), "dd MMMM yyyy")
                        : "Tanggal"}
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
                          <p className="font-medium leading-tight">
                            {item.name || `Barang ${item.id}`}
                          </p>
                          <p className="text-slate-500 text-xs mt-0.5">
                            {formatCurrency(item.price)}
                          </p>
                        </div>
                        <div className="col-span-2 text-center text-slate-700">
                          {item.qty}
                        </div>
                        <div className="col-span-4 text-right font-medium">
                          {formatCurrency(item.qty * item.price)}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <Separator className="my-6 bg-slate-200" />

                {/* Summary */}
                <div className="space-y-3 mb-12 w-full max-w-[250px] ml-auto text-sm">
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
                    <span>Total</span>
                    <span>{formatCurrency(grandTotal)}</span>
                  </div>
                </div>

                {/* Footer Magnet */}
                <div className="mt-auto pt-8 text-center border-t border-dashed border-slate-300">
                  <p className="text-xs text-slate-400">
                    Terima kasih telah berbelanja di{" "}
                    <span className="font-medium">
                      {storeName || "Toko Kami"}
                    </span>
                    !
                  </p>
                  <p className="text-[10px] text-slate-300 mt-3 hover:text-slate-400 transition-colors">
                    Dibuat via Kennsr Utilities | Butuh website? Hubungi via
                    WA/IG
                  </p>
                </div>
              </div>
            </div>

            <Button
              size="lg"
              className="w-full text-base font-semibold shadow-lg shadow-primary/20 bg-slate-900 hover:bg-slate-800 dark:bg-slate-50 dark:text-slate-900 dark:hover:bg-slate-200"
              onClick={handleExport}
            >
              <Download className="w-5 h-5 mr-2" />
              Download Nota (JPG)
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
