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
import { Plus, Trash2, DollarSign } from "lucide-react";

export interface Overhead {
  id: string;
  name: string;
  cost: number;
}

interface OverheadsListProps {
  overheads: Overhead[];
  addOverhead: () => void;
  removeOverhead: (id: string) => void;
  updateOverhead: (
    id: string,
    field: keyof Overhead,
    value: string | number,
  ) => void;
  totalOverheadCost: number;
  formatRp: (val: number) => string;
}

export function OverheadsList({
  overheads,
  addOverhead,
  removeOverhead,
  updateOverhead,
  totalOverheadCost,
  formatRp,
}: OverheadsListProps) {
  return (
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
              <span className="font-bold">{formatRp(totalOverheadCost)}</span>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
