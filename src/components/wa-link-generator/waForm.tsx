import { useState } from "react";
import { Send } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";

interface WaFormProps {
  onSend: (number: string) => void;
}

export function WaForm({ onSend }: WaFormProps) {
  const [phoneRaw, setPhoneRaw] = useState("");
  const [message, setMessage] = useState("");

  const formatNumber = (input: string) => {
    // Basic sanitization
    let cleaned = input.replace(/\D/g, "");

    // Format prefixes
    if (cleaned.startsWith("08")) {
      cleaned = "628" + cleaned.substring(2);
    } else if (cleaned.startsWith("8")) {
      cleaned = "628" + cleaned.substring(1);
    }

    return cleaned;
  };

  const handleSend = () => {
    const sanitized = formatNumber(phoneRaw);
    if (!sanitized) return;

    // Trigger save to history via parent
    onSend(sanitized);

    // Encode text and open WA
    const encodedText = encodeURIComponent(message);
    const url = `https://wa.me/${sanitized}${
      encodedText ? `?text=${encodedText}` : ""
    }`;
    window.open(url, "_blank");
  };

  return (
    <Card className="border-slate-200 dark:border-slate-800 dark:bg-slate-900 shadow-sm relative overflow-hidden">
      {/* Decorative top accent */}
      <div className="absolute top-0 left-0 w-full h-1 bg-[#25D366]"></div>

      <CardHeader className="pb-4">
        <CardTitle className="text-xl">Nomor Tujuan</CardTitle>
        <CardDescription>
          Ketik atau paste nomor (cth. 0812..., 628..., +628... )
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-5">
        <div className="space-y-2">
          <Input
            type="tel"
            placeholder="081234567890"
            value={phoneRaw}
            onChange={(e) => setPhoneRaw(e.target.value)}
            className="text-2xl h-14 font-medium tracking-wide placeholder:text-slate-300 dark:placeholder:text-slate-700 focus-visible:ring-[#25D366]"
          />
          {phoneRaw && (
            <p className="text-xs text-slate-500 font-medium pl-1">
              Diformat menjadi:{" "}
              <span className="text-[#25D366] font-bold">
                +{formatNumber(phoneRaw)}
              </span>
            </p>
          )}
        </div>

        <div className="space-y-2">
          <Label className="text-sm font-medium text-slate-700 dark:text-slate-300">
            Pesan Pembuka{" "}
            <span className="text-slate-400 font-normal">(Opsional)</span>
          </Label>
          <Textarea
            placeholder="Halo, saya ingin bertanya tentang..."
            value={message}
            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
              setMessage(e.target.value)
            }
            className="resize-none h-24 focus-visible:ring-[#25D366]"
          />
        </div>

        <Button
          onClick={handleSend}
          disabled={!phoneRaw}
          className="w-full h-14 text-lg font-bold bg-[#25D366] hover:bg-[#20BE5C] text-white shadow-lg shadow-[#25D366]/20 transition-all rounded-xl"
        >
          <Send className="w-5 h-5 mr-2" />
          Chat via WhatsApp
        </Button>
      </CardContent>
    </Card>
  );
}
