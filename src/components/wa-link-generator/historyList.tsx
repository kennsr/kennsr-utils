import { Trash2, MessageCircle } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";

export interface HistoryItem {
  id: string;
  number: string;
  label: string;
  timestamp: number;
}

interface HistoryListProps {
  history: HistoryItem[];
  onUpdateLabel: (id: string, newLabel: string) => void;
  onDelete: (id: string) => void;
}

export function HistoryList({
  history,
  onUpdateLabel,
  onDelete,
}: HistoryListProps) {
  const handleChatAgain = (number: string) => {
    window.open(`https://wa.me/${number}`, "_blank");
  };

  return (
    <Card className="border-slate-200 dark:border-slate-800 dark:bg-slate-900 shadow-sm">
      <CardHeader>
        <CardTitle className="text-lg">Recent Numbers / Riwayat</CardTitle>
        <CardDescription>
          10 nomor terakhir yang Anda hubungi (Tersimpan lokal di browser).
        </CardDescription>
      </CardHeader>
      <CardContent>
        {history.length === 0 ? (
          <div className="text-center py-8 px-4 border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-xl text-slate-500 text-sm bg-slate-50 dark:bg-slate-950/50">
            Riwayat nomor akan muncul di sini.
          </div>
        ) : (
          <div className="space-y-3">
            {history.map((item) => (
              <div
                key={item.id}
                className="flex flex-col sm:flex-row gap-3 items-center p-3 border border-slate-200 dark:border-slate-800 rounded-lg hover:border-slate-300 dark:hover:border-slate-700 transition-colors bg-white dark:bg-slate-950/50"
              >
                {/* Number & Input Mobile Stack */}
                <div className="flex-1 w-full space-y-1 sm:space-y-0 sm:flex sm:items-center sm:gap-4">
                  <span className="font-semibold text-slate-700 dark:text-slate-300 tabular-nums shrink-0 w-32">
                    +{item.number}
                  </span>
                  <Input
                    value={item.label}
                    onChange={(e) => onUpdateLabel(item.id, e.target.value)}
                    placeholder="Beri label (Mis. Kurir J&T)"
                    className="h-8 text-sm flex-1 bg-slate-50 dark:bg-slate-900 border-dashed focus-visible:border-solid uppercase focus-visible:ring-slate-300 dark:focus-visible:ring-slate-700"
                  />
                </div>

                {/* Actions */}
                <div className="flex w-full sm:w-auto gap-2 justify-end shrink-0">
                  <Button
                    variant="outline"
                    size="sm"
                    className="h-8 flex-1 sm:flex-none border-[#25D366] text-[#25D366] hover:bg-[#25D366]/10 hover:text-[#25D366]"
                    onClick={() => handleChatAgain(item.number)}
                  >
                    <MessageCircle className="w-4 h-4 mr-1.5" /> Chat
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 text-slate-400 hover:text-destructive hover:bg-destructive/10"
                    onClick={() => onDelete(item.id)}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
