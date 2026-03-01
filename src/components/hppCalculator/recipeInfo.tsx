import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { UtensilsCrossed } from "lucide-react";

interface RecipeInfoProps {
  recipeName: string;
  setRecipeName: (val: string) => void;
  yieldAmount: number;
  setYieldAmount: (val: number) => void;
}

export function RecipeInfo({
  recipeName,
  setRecipeName,
  yieldAmount,
  setYieldAmount,
}: RecipeInfoProps) {
  return (
    <Card className="border-slate-200 dark:border-slate-800 dark:bg-slate-900 shadow-sm">
      <CardHeader>
        <CardTitle className="flex items-center text-xl text-primary">
          <UtensilsCrossed className="w-5 h-5 mr-2" />
          Info Resep
        </CardTitle>
        <CardDescription>
          Masukkan detail dasar produk yang akan dihitung.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="recipeName">Nama Produk / Resep</Label>
            <Input
              id="recipeName"
              placeholder="Contoh: Brownies Panggang"
              value={recipeName}
              onChange={(e) => setRecipeName(e.target.value)}
              className="bg-slate-50 dark:bg-slate-950"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="yield">Hasil Resep (Porsi/Potong)</Label>
            <Input
              id="yield"
              type="number"
              min="1"
              value={yieldAmount || ""}
              onChange={(e) => setYieldAmount(Number(e.target.value))}
              className="bg-slate-50 dark:bg-slate-950"
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
