"use client";

import { useState } from "react";

// Lucide Icons
import {
  Plus,
  Trash2,
  RotateCcw,
  Package,
  UtensilsCrossed,
  DollarSign,
} from "lucide-react";

// Shadcn UI
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

// --- Types ---
export interface Ingredient {
  id: string;
  name: string;
  price: number;
  buyAmount: number;
  unit: string;
  usedAmount: number;
}

export interface Overhead {
  id: string;
  name: string;
  cost: number;
}

export function HppCalculator() {
  // --- State ---
  const [recipeName, setRecipeName] = useState("");
  const [yieldAmount, setYieldAmount] = useState<number>(1);

  const [ingredients, setIngredients] = useState<Ingredient[]>([]);
  const [overheads, setOverheads] = useState<Overhead[]>([]);

  const [profitMargin, setProfitMargin] = useState<number>(40);

  // --- Handlers ---
  const addIngredient = () => {
    const newIngredient: Ingredient = {
      id: crypto.randomUUID(),
      name: "",
      price: 0,
      buyAmount: 0,
      unit: "gram",
      usedAmount: 0,
    };
    setIngredients([...ingredients, newIngredient]);
  };

  const removeIngredient = (id: string) => {
    setIngredients(ingredients.filter((ing) => ing.id !== id));
  };

  const updateIngredient = (
    id: string,
    field: keyof Ingredient,
    value: string | number,
  ) => {
    setIngredients(
      ingredients.map((ing) => {
        if (ing.id === id) {
          return { ...ing, [field]: value };
        }
        return ing;
      }),
    );
  };

  const addOverhead = () => {
    const newOverhead: Overhead = {
      id: crypto.randomUUID(),
      name: "",
      cost: 0,
    };
    setOverheads([...overheads, newOverhead]);
  };

  const removeOverhead = (id: string) => {
    setOverheads(overheads.filter((oh) => oh.id !== id));
  };

  const updateOverhead = (
    id: string,
    field: keyof Overhead,
    value: string | number,
  ) => {
    setOverheads(
      overheads.map((oh) => {
        if (oh.id === id) {
          return { ...oh, [field]: value };
        }
        return oh;
      }),
    );
  };

  const resetData = () => {
    if (confirm("Apakah anda yakin ingin mereset semua data?")) {
      setRecipeName("");
      setYieldAmount(1);
      setIngredients([]);
      setOverheads([]);
      setProfitMargin(40);
    }
  };

  // --- Derived Calculations ---
  const calculateIngredientCost = (ing: Ingredient) => {
    if (ing.buyAmount <= 0) return 0;
    return (ing.price / ing.buyAmount) * ing.usedAmount;
  };

  const totalIngredientsCost = ingredients.reduce(
    (sum, ing) => sum + calculateIngredientCost(ing),
    0,
  );
  const totalOverheadCost = overheads.reduce((sum, oh) => sum + oh.cost, 0);

  const totalRecipeCost = totalIngredientsCost + totalOverheadCost;
  const cogsPerPortion = yieldAmount > 0 ? totalRecipeCost / yieldAmount : 0;

  const profitTarget = cogsPerPortion * (profitMargin / 100);
  const suggestedSellingPrice = cogsPerPortion + profitTarget;

  // --- Formatting ---
  const formatRp = (value: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  return (
    <div className="flex flex-col lg:flex-row gap-8 items-start relative pb-32 lg:pb-0">
      {/* LEFT COLUMN: Input Forms */}
      <div className="w-full lg:w-2/3 space-y-6">
        {/* Section A: Info Resep */}
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

        {/* Section B: Bahan Baku */}
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
                          updateIngredient(
                            ing.id,
                            "price",
                            Number(e.target.value),
                          )
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

        {/* Section C: Overhead */}
        <Card className="border-slate-200 dark:border-slate-800 dark:bg-slate-900 shadow-sm">
          <CardHeader>
            <div className="flex justify-between items-center">
              <div>
                <CardTitle className="flex items-center text-xl text-primary">
                  <DollarSign className="w-5 h-5 mr-2" />
                  Kemasan & Operasional
                </CardTitle>
                <CardDescription>
                  Box kue, gas, listrik, stiker, dll per batch/resep.
                </CardDescription>
              </div>
              <Button
                onClick={addOverhead}
                size="sm"
                variant="outline"
                className="border-primary text-primary hover:bg-primary/10"
              >
                <Plus className="w-4 h-4 mr-1" /> Tambah Biaya
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            {overheads.length === 0 ? (
              <div className="text-center py-4 text-slate-500 text-sm border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-lg">
                Opsional: Tambahkan biaya kemasan atau operasional pendukung.
              </div>
            ) : (
              overheads.map((oh) => (
                <div key={oh.id} className="flex gap-4 items-end">
                  <div className="space-y-1 flex-1">
                    <Label className="text-xs">Nama Pengeluaran</Label>
                    <Input
                      value={oh.name}
                      onChange={(e) =>
                        updateOverhead(oh.id, "name", e.target.value)
                      }
                      placeholder="Box Kue"
                      className="h-9"
                    />
                  </div>
                  <div className="space-y-1 flex-1">
                    <Label className="text-xs">Biaya (Rp)</Label>
                    <Input
                      type="number"
                      value={oh.cost || ""}
                      onChange={(e) =>
                        updateOverhead(oh.id, "cost", Number(e.target.value))
                      }
                      placeholder="2500"
                      className="h-9"
                    />
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => removeOverhead(oh.id)}
                    className="h-9 w-9 mb-px text-destructive hover:bg-destructive/10"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              ))
            )}
            {overheads.length > 0 && (
              <div className="flex justify-end pt-2">
                <div className="text-sm">
                  Total Biaya Operasional:{" "}
                  <span className="font-bold">
                    {formatRp(totalOverheadCost)}
                  </span>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Section D: Margin */}
        <Card className="border-slate-200 dark:border-slate-800 dark:bg-slate-900 shadow-sm">
          <CardHeader>
            <CardTitle className="text-xl text-primary">
              Target Keuntungan
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <Label htmlFor="margin">Margin Keuntungan (%)</Label>
                <span className="font-bold text-lg text-primary">
                  {profitMargin}%
                </span>
              </div>
              <div className="flex items-center gap-4">
                <input
                  type="range"
                  id="margin"
                  min="0"
                  max="200"
                  step="5"
                  value={profitMargin}
                  onChange={(e) => setProfitMargin(Number(e.target.value))}
                  className="w-full accent-primary"
                />
                <Input
                  type="number"
                  value={profitMargin}
                  onChange={(e) => setProfitMargin(Number(e.target.value))}
                  className="w-20 text-center font-bold"
                />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* RIGHT COLUMN / BOTTOM MOBILE: Results Dashboard */}
      <div className="w-full lg:w-1/3 fixed bottom-0 left-0 right-0 z-40 lg:sticky lg:top-8 p-4 lg:p-0 bg-white dark:bg-slate-950 lg:bg-transparent border-t lg:border-t-0 shadow-[0_-10px_40px_-15px_rgba(0,0,0,0.1)] lg:shadow-none">
        <Card className="border-primary/50 dark:border-primary/30 shadow-xl overflow-hidden">
          <div className="bg-primary/10 dark:bg-primary/20 py-3 px-6 border-b border-primary/20 dark:border-primary/10">
            <h2 className="font-bold tracking-tight text-slate-800 dark:text-slate-200 flex items-center justify-between">
              Hasil Perhitungan
              <Button
                variant="ghost"
                size="sm"
                onClick={resetData}
                className="h-6 px-2 text-xs text-muted-foreground hover:text-slate-900"
              >
                <RotateCcw className="w-3 h-3 mr-1" /> Reset
              </Button>
            </h2>
          </div>
          <CardContent className="p-6 space-y-6">
            <div className="space-y-4 text-sm">
              <div className="flex justify-between items-center pb-2 border-b border-dashed border-slate-200 dark:border-slate-800">
                <span className="text-slate-500">Total Biaya 1 Resep</span>
                <span className="font-semibold">
                  {formatRp(totalRecipeCost)}
                </span>
              </div>
              <div className="flex justify-between items-center pb-2 border-b border-dashed border-slate-200 dark:border-slate-800">
                <span className="text-slate-500">Hasil Porsi</span>
                <span className="font-semibold">{yieldAmount} pcs</span>
              </div>

              <div className="pt-2">
                <div className="flex justify-between items-center mb-1">
                  <span className="font-medium text-slate-700 dark:text-slate-300">
                    HPP per Porsi
                  </span>
                  <span className="font-bold text-lg">
                    {formatRp(cogsPerPortion)}
                  </span>
                </div>
                <div className="flex justify-between items-center text-primary/80">
                  <span>Target Untung ({profitMargin}%)</span>
                  <span>+ {formatRp(profitTarget)}</span>
                </div>
              </div>
            </div>

            <Separator className="bg-primary/20" />

            <div className="pt-2 pb-4">
              <span className="block text-sm font-medium text-slate-500 mb-1 text-center">
                Harga Jual Disarankan
              </span>
              <span className="block text-4xl lg:text-5xl font-extrabold text-primary text-center tracking-tighter">
                {formatRp(suggestedSellingPrice)}
              </span>
            </div>
          </CardContent>
          <div className="bg-slate-50 dark:bg-slate-900/50 p-4 text-xs text-center text-slate-500 border-t border-slate-200 dark:border-slate-800">
            Dibuat via Kennsr Utilities | Butuh website?{" "}
            <a
              href="https://wa.me/6281282411257"
              className="text-primary hover:underline font-medium"
            >
              Hubungi Admin
            </a>
          </div>
        </Card>
      </div>
    </div>
  );
}
