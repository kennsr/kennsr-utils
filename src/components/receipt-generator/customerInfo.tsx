import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { User } from "lucide-react";

interface CustomerInfoProps {
  customerName: string;
  setCustomerName: (val: string) => void;
  date: string;
  setDate: (val: string) => void;
}

export function CustomerInfo({
  customerName,
  setCustomerName,
  date,
  setDate,
}: CustomerInfoProps) {
  return (
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
  );
}
