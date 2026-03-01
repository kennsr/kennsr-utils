import { DollarSign } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface AdditionalFeesProps {
  shippingFee: number;
  setShippingFee: (val: number) => void;
}

export function AdditionalFees({
  shippingFee,
  setShippingFee,
}: AdditionalFeesProps) {
  return (
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
            onChange={(e) => setShippingFee(parseFloat(e.target.value) || 0)}
            className="bg-slate-50 dark:bg-slate-950"
          />
        </div>
      </CardContent>
    </Card>
  );
}
