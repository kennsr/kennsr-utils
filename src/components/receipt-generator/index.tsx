"use client";

import { useState, useRef } from "react";
import { format } from "date-fns";
import * as htmlToImage from "html-to-image";

import { StoreInfo } from "./storeInfo";
import { CustomerInfo } from "./customerInfo";
import { ProductList, OrderItem } from "./productList";
import { AdditionalFees } from "./additionalFees";
import { ReceiptPreview } from "./receiptPreview";

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
        <StoreInfo
          storeName={storeName}
          setStoreName={setStoreName}
          storeContact={storeContact}
          setStoreContact={setStoreContact}
        />
        <CustomerInfo
          customerName={customerName}
          setCustomerName={setCustomerName}
          date={date}
          setDate={setDate}
        />
        <ProductList
          items={items}
          addItem={addItem}
          removeItem={removeItem}
          updateItem={updateItem}
        />
        <AdditionalFees
          shippingFee={shippingFee}
          setShippingFee={setShippingFee}
        />
      </div>

      {/* RIGHT COLUMN / BOTTOM MOBILE: Live Preview */}
      <ReceiptPreview
        receiptRef={receiptRef}
        storeName={storeName}
        storeContact={storeContact}
        customerName={customerName}
        date={date}
        items={items}
        shippingFee={shippingFee}
        subtotal={subtotal}
        grandTotal={grandTotal}
        handleExport={handleExport}
        handlePrint={handlePrint}
        formatCurrency={formatCurrency}
      />
    </div>
  );
}
