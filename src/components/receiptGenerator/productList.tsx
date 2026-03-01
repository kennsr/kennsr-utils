import { Plus, Trash2, Package } from "lucide-react";
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

export interface OrderItem {
  id: string;
  name: string;
  qty: number;
  price: number;
}

interface ProductListProps {
  items: OrderItem[];
  addItem: () => void;
  removeItem: (id: string) => void;
  updateItem: (
    id: string,
    field: keyof OrderItem,
    value: string | number,
  ) => void;
}

export function ProductList({
  items,
  addItem,
  removeItem,
  updateItem,
}: ProductListProps) {
  return (
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
                      updateItem(item.id, "qty", parseInt(e.target.value) || 1)
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
  );
}
