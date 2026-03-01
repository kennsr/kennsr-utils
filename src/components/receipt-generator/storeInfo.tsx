import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Store } from "lucide-react";

interface StoreInfoProps {
  storeName: string;
  setStoreName: (val: string) => void;
  storeContact: string;
  setStoreContact: (val: string) => void;
}

export function StoreInfo({
  storeName,
  setStoreName,
  storeContact,
  setStoreContact,
}: StoreInfoProps) {
  return (
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
  );
}
