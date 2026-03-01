import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Plus, Trash2, Package } from "lucide-react";

export interface Ingredient {
  id: string;
  name: string;
  price: number;
  buyAmount: number;
  unit: string;
  usedAmount: number;
}

interface IngredientsListProps {
  ingredients: Ingredient[];
  addIngredient: () => void;
  removeIngredient: (id: string) => void;
  updateIngredient: (
    id: string,
    field: keyof Ingredient,
    value: string | number,
  ) => void;
  calculateIngredientCost: (ing: Ingredient) => number;
  totalIngredientsCost: number;
  formatRp: (val: number) => string;
}

export function IngredientsList({
  ingredients,
  addIngredient,
  removeIngredient,
  updateIngredient,
  calculateIngredientCost,
  totalIngredientsCost,
  formatRp, // <-- Add it to props here
}: IngredientsListProps) {
  return (
    <Card className="border-slate-200 dark:border-slate-800 dark:bg-slate-900 shadow-sm">
      <CardHeader>
        <div className="flex justify-between items-center">
          <div>
            <CardTitle className="flex items-center text-xl text-primary">
              <Package className="w-5 h-5 mr-2" />
              Bahan Baku
            </CardTitle>
            <CardDescription>
              Masukkan semua bahan yang digunakan.
            </CardDescription>
          </div>
          <Button
            onClick={addIngredient}
            size="sm"
            className="bg-primary text-primary-foreground hover:bg-primary/90"
          >
            <Plus className="w-4 h-4 mr-1" /> Tambah Bahan
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {ingredients.length === 0 ? (
          <div className="text-center py-6 text-slate-500 text-sm border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-lg">
            Belum ada bahan baku ditambahkan.
          </div>
        ) : (
          ingredients.map((ing, index) => (
            <div
              key={ing.id}
              className="relative p-4 border border-slate-200 dark:border-slate-800 rounded-lg bg-slate-50/50 dark:bg-slate-950/50"
            >
              <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
                {/* Row 1 */}
                <div className="md:col-span-12 flex justify-between items-center">
                  <span className="font-semibold text-sm text-slate-700 dark:text-slate-300">
                    Bahan #{index + 1}
                  </span>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => removeIngredient(ing.id)}
                    className="h-8 w-8 text-destructive hover:bg-destructive/10"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
                {/* Row 2 */}
                <div className="space-y-1 md:col-span-4">
                  <Label className="text-xs">Nama Bahan</Label>
                  <Input
                    value={ing.name}
                    onChange={(e) =>
                      updateIngredient(ing.id, "name", e.target.value)
                    }
                    placeholder="Tepung Terigu"
                    className="h-9"
                  />
                </div>
                <div className="space-y-1 md:col-span-4">
                  <Label className="text-xs">Harga Beli (Rp)</Label>
                  <Input
                    type="number"
                    value={ing.price || ""}
                    onChange={(e) =>
                      updateIngredient(ing.id, "price", Number(e.target.value))
                    }
                    placeholder="15000"
                    className="h-9"
                  />
                </div>
                <div className="space-y-1 md:col-span-4">
                  <Label className="text-xs">Berat/Jml Beli total</Label>
                  <div className="flex gap-2">
                    <Input
                      type="number"
                      value={ing.buyAmount || ""}
                      onChange={(e) =>
                        updateIngredient(
                          ing.id,
                          "buyAmount",
                          Number(e.target.value),
                        )
                      }
                      placeholder="1000"
                      className="h-9 w-2/3"
                    />
                    <select
                      className="w-1/3 h-9 rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring dark:bg-slate-950"
                      value={ing.unit}
                      onChange={(e) =>
                        updateIngredient(ing.id, "unit", e.target.value)
                      }
                    >
                      <option value="gram">gram</option>
                      <option value="ml">ml</option>
                      <option value="pcs">pcs</option>
                    </select>
                  </div>
                </div>
                {/* Row 3 */}
                <div className="space-y-1 md:col-span-6 bg-primary/5 dark:bg-primary/10 p-2 rounded border border-primary/20">
                  <Label className="text-xs font-semibold text-primary">
                    Dipakai di Resep ({ing.unit})
                  </Label>
                  <Input
                    type="number"
                    value={ing.usedAmount || ""}
                    onChange={(e) =>
                      updateIngredient(
                        ing.id,
                        "usedAmount",
                        Number(e.target.value),
                      )
                    }
                    placeholder="250"
                    className="h-9 border-primary/30 focus-visible:ring-primary"
                  />
                </div>
                <div className="space-y-1 md:col-span-6 flex flex-col justify-center items-end bg-slate-100 dark:bg-slate-900 p-2 rounded">
                  <span className="text-xs text-slate-500 font-medium">
                    Biaya Terpakai:
                  </span>
                  <span className="font-bold text-slate-900 dark:text-slate-50">
                    {formatRp(calculateIngredientCost(ing))}
                  </span>
                </div>
              </div>
            </div>
          ))
        )}

        {ingredients.length > 0 && (
          <div className="flex justify-end pt-2">
            <div className="text-sm">
              Total Biaya Bahan:{" "}
              <span className="font-bold">
                {formatRp(totalIngredientsCost)}
              </span>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
