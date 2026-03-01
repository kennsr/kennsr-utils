import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface ProfitMarginProps {
  profitMargin: number;
  setProfitMargin: (val: number) => void;
}

export function ProfitMargin({
  profitMargin,
  setProfitMargin,
}: ProfitMarginProps) {
  return (
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
  );
}
