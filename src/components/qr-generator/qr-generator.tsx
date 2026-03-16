"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import { QRCodeSVG } from "qrcode.react";
import { toPng, toJpeg, toSvg } from "html-to-image";
import JSZip from "jszip";
import {
  Download,
  Copy,
  RefreshCw,
  Trash2,
  Wifi,
  Link as LinkIcon,
  Type,
  Mail,
  Phone,
  User,
  MessageCircle,
  History,
  Settings,
  Palette,
  Image as ImageIcon,
  Check,
  X,
  Scan,
  Share2,
  Layers,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { toast } from "sonner";

type QRType =
  | "url"
  | "text"
  | "wifi"
  | "email"
  | "phone"
  | "vcard"
  | "whatsapp";

interface QRHistoryItem {
  id: string;
  type: QRType;
  content: string;
  config: QRConfig;
  timestamp: number;
  svg?: string;
}

interface QRConfig {
  fgColor: string;
  bgColor: string;
  size: number;
  level: "L" | "M" | "Q" | "H";
  includeMargin: boolean;
  logoUrl?: string;
}

const defaultConfig: QRConfig = {
  fgColor: "#000000",
  bgColor: "#ffffff",
  size: 512,
  level: "M",
  includeMargin: true,
};

const colorPresets = [
  "#000000",
  "#1e40af",
  "#dc2626",
  "#16a34a",
  "#9333ea",
  "#ea580c",
  "#0891b2",
  "#7c3aed",
];

export default function QRGenerator() {
  const qrRef = useRef<HTMLDivElement>(null);
  const [qrType, setQrType] = useState<QRType>("url");
  const [qrValue, setQrValue] = useState("");
  const [config, setConfig] = useState<QRConfig>(defaultConfig);
  const [history, setHistory] = useState<QRHistoryItem[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [showScanTest, setShowScanTest] = useState(false);
  const [logoFile, setLogoFile] = useState<string | null>(null);

  // WiFi fields
  const [wifiSSID, setWifiSSID] = useState("");
  const [wifiPassword, setWifiPassword] = useState("");
  const [wifiEncryption, setWifiEncryption] = useState("WPA");

  // Email fields
  const [emailAddress, setEmailAddress] = useState("");
  const [emailSubject, setEmailSubject] = useState("");
  const [emailBody, setEmailBody] = useState("");

  // Phone fields
  const [phoneNumber, setPhoneNumber] = useState("");

  // vCard fields
  const [vcardName, setVcardName] = useState("");
  const [vcardOrg, setVcardOrg] = useState("");
  const [vcardPhone, setVcardPhone] = useState("");
  const [vcardEmail, setVcardEmail] = useState("");
  const [vcardUrl, setVcardUrl] = useState("");
  const [vcardAddress, setVcardAddress] = useState("");

  // WhatsApp fields
  const [waPhone, setWaPhone] = useState("");
  const [waMessage, setWaMessage] = useState("");

  // Load history from localStorage
  useEffect(() => {
    const saved = localStorage.getItem("qr-generator-history");
    if (saved) {
      try {
        setHistory(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to load history");
      }
    }
  }, []);

  // Get QR content based on type
  const getQRContent = useCallback(() => {
    switch (qrType) {
      case "url":
        return qrValue;
      case "text":
        return qrValue;
      case "wifi":
        return `WIFI:T:${wifiEncryption};S:${wifiSSID};P:${wifiPassword};;`;
      case "email":
        return `mailto:${emailAddress}?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`;
      case "phone":
        return `tel:${phoneNumber}`;
      case "vcard":
        return `BEGIN:VCARD
VERSION:3.0
FN:${vcardName}
ORG:${vcardOrg}
TEL:${vcardPhone}
EMAIL:${vcardEmail}
URL:${vcardUrl}
ADR:${vcardAddress}
END:VCARD`;
      case "whatsapp":
        const cleanPhone = waPhone.replace(/[^0-9]/g, "");
        const formattedPhone = cleanPhone.startsWith("62")
          ? cleanPhone
          : `62${cleanPhone.replace(/^0/, "")}`;
        return `https://wa.me/${formattedPhone}?text=${encodeURIComponent(waMessage)}`;
      default:
        return qrValue;
    }
  }, [
    qrType,
    qrValue,
    wifiSSID,
    wifiPassword,
    wifiEncryption,
    emailAddress,
    emailSubject,
    emailBody,
    phoneNumber,
    vcardName,
    vcardOrg,
    vcardPhone,
    vcardEmail,
    vcardUrl,
    vcardAddress,
    waPhone,
    waMessage,
  ]);

  // Save to history
  const saveToHistory = useCallback(async () => {
    const content = getQRContent();
    if (!content) return;

    const newItem: QRHistoryItem = {
      id: Date.now().toString(),
      type: qrType,
      content: content.slice(0, 100),
      config: { ...config },
      timestamp: Date.now(),
    };

    // Capture SVG as data URL
    if (qrRef.current) {
      try {
        const svgData = await toSvg(qrRef.current, {
          quality: 1.0,
          backgroundColor: config.bgColor,
        });
        newItem.svg = svgData;
      } catch (e) {
        console.error("Failed to capture QR");
      }
    }

    const newHistory = [newItem, ...history].slice(0, 10);
    setHistory(newHistory);
    localStorage.setItem("qr-generator-history", JSON.stringify(newHistory));
  }, [getQRContent, qrType, config, history]);

  // Download QR
  const downloadQR = async (format: "png" | "jpg" | "svg") => {
    if (!qrRef.current) return;

    setIsGenerating(true);
    try {
      let dataUrl: string;
      const options = {
        quality: 1.0,
        backgroundColor: config.bgColor,
        width: config.size * 2,
        height: config.size * 2,
      };

      if (format === "svg") {
        dataUrl = await toSvg(qrRef.current, options);
      } else if (format === "jpg") {
        dataUrl = await toJpeg(qrRef.current, options);
      } else {
        dataUrl = await toPng(qrRef.current, options);
      }

      const link = document.createElement("a");
      link.download = `QR-${qrType}-${Date.now()}.${format}`;
      link.href = dataUrl;
      link.click();

      toast.success("Download started", {
        description: `QR code saved as ${format.toUpperCase()}`,
      });

      await saveToHistory();
    } catch (error) {
      toast.error("Download failed", {
        description: "Please try again",
      });
    } finally {
      setIsGenerating(false);
    }
  };

  // Copy to clipboard
  const copyToClipboard = async () => {
    if (!qrRef.current) return;

    try {
      const dataUrl = await toPng(qrRef.current, {
        quality: 1.0,
        backgroundColor: config.bgColor,
      });
      const blob = await (await fetch(dataUrl)).blob();
      await navigator.clipboard.write([
        new ClipboardItem({ [blob.type]: blob }),
      ]);
      toast.success("Copied!", {
        description: "QR code copied to clipboard",
      });
    } catch (error) {
      toast.error("Copy failed", {
        description: "Your browser doesn't support this feature",
      });
    }
  };

  // Clear history
  const clearHistory = () => {
    setHistory([]);
    localStorage.removeItem("qr-generator-history");
    toast.success("History cleared", {
      description: "All saved QR codes have been removed",
    });
  };

  // Load from history
  const loadFromHistory = (item: QRHistoryItem) => {
    setQrType(item.type);
    setConfig(item.config);
    toast.success("Configuration loaded", {
      description: "QR settings restored from history",
    });
  };

  const qrContent = getQRContent();

  return (
    <div className="container mx-auto px-4 py-4 max-w-7xl">
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Left Column - Configuration */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Settings className="w-5 h-5" />
              Configuration
            </CardTitle>
            <CardDescription>Customize your QR code</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* QR Type Selection */}
            <div className="space-y-3">
              <Label>QR Code Type</Label>
              <div className="grid grid-cols-4 gap-2">
                {[
                  { type: "url", icon: LinkIcon, label: "URL" },
                  { type: "text", icon: Type, label: "Text" },
                  { type: "wifi", icon: Wifi, label: "WiFi" },
                  { type: "email", icon: Mail, label: "Email" },
                  { type: "phone", icon: Phone, label: "Phone" },
                  { type: "vcard", icon: User, label: "vCard" },
                  { type: "whatsapp", icon: MessageCircle, label: "WA" },
                ].map((item) => (
                  <button
                    key={item.type}
                    onClick={() => setQrType(item.type as QRType)}
                    className={`flex flex-col items-center justify-center p-3 rounded-lg border-2 transition-all ${
                      qrType === item.type
                        ? "border-blue-500 bg-blue-50 dark:bg-blue-950"
                        : "border-slate-200 dark:border-slate-700 hover:border-slate-300"
                    }`}
                  >
                    <item.icon className="w-5 h-5 mb-1" />
                    <span className="text-xs">{item.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Content Fields based on type */}
            <Tabs defaultValue="content" className="w-full">
              <TabsList className="w-full">
                <TabsTrigger value="content" className="flex-1">
                  Content
                </TabsTrigger>
                <TabsTrigger value="design" className="flex-1">
                  <Palette className="w-4 h-4 mr-1" />
                  Design
                </TabsTrigger>
              </TabsList>

              <TabsContent value="content" className="space-y-4 mt-4">
                {qrType === "url" && (
                  <>
                    <div className="space-y-2">
                      <Label htmlFor="url">Website URL</Label>
                      <Input
                        id="url"
                        placeholder="https://example.com"
                        value={qrValue}
                        onChange={(e) => setQrValue(e.target.value)}
                      />
                    </div>
                  </>
                )}

                {qrType === "text" && (
                  <>
                    <div className="space-y-2">
                      <Label htmlFor="text">Your Text</Label>
                      <Textarea
                        id="text"
                        placeholder="Enter your message here..."
                        value={qrValue}
                        onChange={(e) => setQrValue(e.target.value)}
                        rows={4}
                      />
                    </div>
                  </>
                )}

                {qrType === "wifi" && (
                  <>
                    <div className="space-y-2">
                      <Label htmlFor="ssid">Network Name (SSID)</Label>
                      <Input
                        id="ssid"
                        placeholder="MyWiFi"
                        value={wifiSSID}
                        onChange={(e) => setWifiSSID(e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="wifi-pass">Password</Label>
                      <Input
                        id="wifi-pass"
                        type="password"
                        placeholder="Your password"
                        value={wifiPassword}
                        onChange={(e) => setWifiPassword(e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Encryption</Label>
                      <Select
                        value={wifiEncryption}
                        onValueChange={setWifiEncryption}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="WPA">WPA/WPA2</SelectItem>
                          <SelectItem value="WEP">WEP</SelectItem>
                          <SelectItem value="nopass">No Password</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </>
                )}

                {qrType === "email" && (
                  <>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="hello@example.com"
                        value={emailAddress}
                        onChange={(e) => setEmailAddress(e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="subject">Subject</Label>
                      <Input
                        id="subject"
                        placeholder="Inquiry"
                        value={emailSubject}
                        onChange={(e) => setEmailSubject(e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email-body">Message</Label>
                      <Textarea
                        id="email-body"
                        placeholder="Your message..."
                        value={emailBody}
                        onChange={(e) => setEmailBody(e.target.value)}
                        rows={3}
                      />
                    </div>
                  </>
                )}

                {qrType === "phone" && (
                  <>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input
                        id="phone"
                        type="tel"
                        placeholder="+62 812 3456 7890"
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                      />
                    </div>
                  </>
                )}

                {qrType === "vcard" && (
                  <>
                    <div className="space-y-2">
                      <Label htmlFor="vcard-name">Full Name</Label>
                      <Input
                        id="vcard-name"
                        placeholder="John Doe"
                        value={vcardName}
                        onChange={(e) => setVcardName(e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="vcard-org">Organization</Label>
                      <Input
                        id="vcard-org"
                        placeholder="Company Name"
                        value={vcardOrg}
                        onChange={(e) => setVcardOrg(e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="vcard-phone">Phone</Label>
                      <Input
                        id="vcard-phone"
                        type="tel"
                        placeholder="+62 812 3456 7890"
                        value={vcardPhone}
                        onChange={(e) => setVcardPhone(e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="vcard-email">Email</Label>
                      <Input
                        id="vcard-email"
                        type="email"
                        placeholder="john@example.com"
                        value={vcardEmail}
                        onChange={(e) => setVcardEmail(e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="vcard-url">Website</Label>
                      <Input
                        id="vcard-url"
                        type="url"
                        placeholder="https://example.com"
                        value={vcardUrl}
                        onChange={(e) => setVcardUrl(e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="vcard-address">Address</Label>
                      <Textarea
                        id="vcard-address"
                        placeholder="Street, City, Country"
                        value={vcardAddress}
                        onChange={(e) => setVcardAddress(e.target.value)}
                        rows={2}
                      />
                    </div>
                  </>
                )}

                {qrType === "whatsapp" && (
                  <>
                    <div className="space-y-2">
                      <Label htmlFor="wa-phone">WhatsApp Number</Label>
                      <Input
                        id="wa-phone"
                        type="tel"
                        placeholder="0812 3456 7890"
                        value={waPhone}
                        onChange={(e) => setWaPhone(e.target.value)}
                      />
                      <p className="text-xs text-slate-500">
                        Indonesian format (08xx) auto-converts to +62
                      </p>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="wa-message">Message (Optional)</Label>
                      <Textarea
                        id="wa-message"
                        placeholder="Hello, I'm interested in..."
                        value={waMessage}
                        onChange={(e) => setWaMessage(e.target.value)}
                        rows={3}
                      />
                    </div>
                  </>
                )}
              </TabsContent>

              <TabsContent value="design" className="space-y-4 mt-4">
                {/* Colors */}
                <div className="space-y-3">
                  <Label>Foreground Color</Label>
                  <div className="flex items-center gap-2 flex-wrap">
                    {colorPresets.map((color) => (
                      <button
                        key={color}
                        onClick={() =>
                          setConfig({ ...config, fgColor: color })
                        }
                        className={`w-8 h-8 rounded-full border-2 ${
                          config.fgColor === color
                            ? "border-blue-500 ring-2 ring-blue-200"
                            : "border-slate-300"
                        }`}
                        style={{ backgroundColor: color }}
                      />
                    ))}
                    <Input
                      type="color"
                      value={config.fgColor}
                      onChange={(e) =>
                        setConfig({ ...config, fgColor: e.target.value })
                      }
                      className="w-12 h-8 p-0 cursor-pointer"
                    />
                  </div>
                </div>

                <div className="space-y-3">
                  <Label>Background Color</Label>
                  <div className="flex items-center gap-2 flex-wrap">
                    {["#ffffff", "#f8fafc", "#fef3c7", "#dcfce7", "#dbeafe"].map(
                      (color) => (
                        <button
                          key={color}
                          onClick={() =>
                            setConfig({ ...config, bgColor: color })
                          }
                          className={`w-8 h-8 rounded-full border-2 ${
                            config.bgColor === color
                              ? "border-blue-500 ring-2 ring-blue-200"
                              : "border-slate-300"
                          }`}
                          style={{ backgroundColor: color }}
                        />
                      )
                    )}
                    <Input
                      type="color"
                      value={config.bgColor}
                      onChange={(e) =>
                        setConfig({ ...config, bgColor: e.target.value })
                      }
                      className="w-12 h-8 p-0 cursor-pointer"
                    />
                  </div>
                </div>

                {/* Size */}
                <div className="space-y-3">
                  <Label>Size: {config.size}px</Label>
                  <Slider
                    value={[config.size]}
                    onValueChange={([value]) =>
                      setConfig({ ...config, size: value })
                    }
                    min={256}
                    max={2048}
                    step={256}
                    className="w-full"
                  />
                  <div className="flex justify-between text-xs text-slate-500">
                    <span>256px</span>
                    <span>2048px</span>
                  </div>
                </div>

                {/* Error Correction */}
                <div className="space-y-2">
                  <Label>Error Correction Level</Label>
                  <Select
                    value={config.level}
                    onValueChange={(val) =>
                      setConfig({
                        ...config,
                        level: val as "L" | "M" | "Q" | "H",
                      })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="L">
                        Low (7% - Smallest size)
                      </SelectItem>
                      <SelectItem value="M">
                        Medium (15% - Recommended)
                      </SelectItem>
                      <SelectItem value="Q">
                        Quartile (25% - More robust)
                      </SelectItem>
                      <SelectItem value="H">
                        High (30% - Best for logos)
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Logo Upload */}
                <div className="space-y-2">
                  <Label className="flex items-center gap-2">
                    <ImageIcon className="w-4 h-4" />
                    Center Logo (Optional)
                  </Label>
                  <Input
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        const reader = new FileReader();
                        reader.onload = (event) => {
                          setLogoFile(event.target?.result as string);
                        };
                        reader.readAsDataURL(file);
                      }
                    }}
                  />
                  {logoFile && (
                    <div className="flex items-center gap-2">
                      <img
                        src={logoFile}
                        alt="Logo preview"
                        className="w-10 h-10 object-contain rounded border"
                      />
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setLogoFile(null)}
                      >
                        Remove
                      </Button>
                    </div>
                  )}
                </div>

                {/* Margin */}
                <div className="flex items-center justify-between">
                  <Label htmlFor="margin">Include Margin</Label>
                  <Switch
                    id="margin"
                    checked={config.includeMargin}
                    onCheckedChange={(checked) =>
                      setConfig({ ...config, includeMargin: checked })
                    }
                  />
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        {/* Center & Right - Preview and Actions */}
        <div className="lg:col-span-2 space-y-6">
          {/* Preview Card */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <Layers className="w-5 h-5" />
                    Live Preview
                  </CardTitle>
                  <CardDescription>
                    Your QR code updates in real-time
                  </CardDescription>
                </div>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="outline" size="sm">
                      <Scan className="w-4 h-4 mr-2" />
                      Test Scan
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Scan to Test</DialogTitle>
                      <DialogDescription>
                        Use your phone's camera to verify the QR code works
                      </DialogDescription>
                    </DialogHeader>
                    <div className="flex justify-center py-8">
                      <QRCodeSVG
                        value={qrContent}
                        size={300}
                        level={config.level}
                        includeMargin={config.includeMargin}
                        imageSettings={
                          logoFile
                            ? {
                                src: logoFile,
                                width: 60,
                                height: 60,
                                excavate: true,
                              }
                            : undefined
                        }
                      />
                    </div>
                    <div className="bg-slate-100 dark:bg-slate-800 p-3 rounded text-sm break-all">
                      <strong>Content:</strong> {qrContent.slice(0, 200)}
                      {qrContent.length > 200 ? "..." : ""}
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col items-center justify-center p-8 bg-slate-50 dark:bg-slate-900 rounded-lg">
                <div
                  ref={qrRef}
                  className="bg-white p-4 rounded-lg shadow-lg"
                  style={{ backgroundColor: config.bgColor }}
                >
                  <QRCodeSVG
                    value={qrContent}
                    size={config.size}
                    level={config.level}
                    fgColor={config.fgColor}
                    bgColor={config.bgColor}
                    includeMargin={config.includeMargin}
                    imageSettings={
                      logoFile
                        ? {
                            src: logoFile,
                            width: Math.floor(config.size * 0.2),
                            height: Math.floor(config.size * 0.2),
                            excavate: true,
                          }
                        : undefined
                    }
                  />
                </div>

                {/* Info */}
                <div className="mt-6 flex flex-wrap gap-4 justify-center text-sm text-slate-600 dark:text-slate-400">
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-green-500" />
                    <span>Type: {qrType.toUpperCase()}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-green-500" />
                    <span>Size: {config.size}px</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-green-500" />
                    <span>Error Correction: {config.level}</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Export Actions */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Download className="w-5 h-5" />
                Export Options
              </CardTitle>
              <CardDescription>Download your QR code</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-3">
                <Button
                  onClick={() => downloadQR("png")}
                  disabled={!qrContent || isGenerating}
                  className="flex-1 min-w-[150px]"
                >
                  <Download className="w-4 h-4 mr-2" />
                  Download PNG
                </Button>
                <Button
                  onClick={() => downloadQR("jpg")}
                  disabled={!qrContent || isGenerating}
                  variant="outline"
                  className="flex-1 min-w-[150px]"
                >
                  Download JPG
                </Button>
                <Button
                  onClick={() => downloadQR("svg")}
                  disabled={!qrContent || isGenerating}
                  variant="outline"
                  className="flex-1 min-w-[150px]"
                >
                  Download SVG
                </Button>
                <Button
                  onClick={copyToClipboard}
                  disabled={!qrContent || isGenerating}
                  variant="secondary"
                >
                  <Copy className="w-4 h-4" />
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* History */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <History className="w-5 h-5" />
                  <div>
                    <CardTitle>Recent QR Codes</CardTitle>
                    <CardDescription>
                      Last 10 generated QR codes
                    </CardDescription>
                  </div>
                </div>
                {history.length > 0 && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={clearHistory}
                    className="text-red-500 hover:text-red-600"
                  >
                    <Trash2 className="w-4 h-4 mr-2" />
                    Clear
                  </Button>
                )}
              </div>
            </CardHeader>
            <CardContent>
              {history.length === 0 ? (
                <div className="text-center py-8 text-slate-500">
                  <History className="w-12 h-12 mx-auto mb-3 opacity-30" />
                  <p>No recent QR codes</p>
                  <p className="text-sm">
                    Generated QR codes will appear here
                  </p>
                </div>
              ) : (
                <ScrollArea className="h-48">
                  <div className="grid grid-cols-5 gap-3">
                    {history.map((item) => (
                      <div
                        key={item.id}
                        className="group relative aspect-square rounded-lg border bg-slate-50 dark:bg-slate-900 overflow-hidden cursor-pointer hover:border-blue-500 transition-colors"
                        onClick={() => loadFromHistory(item)}
                      >
                        {item.svg ? (
                          <img
                            src={item.svg}
                            alt={item.type}
                            className="w-full h-full object-contain p-2"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center">
                            <RefreshCw className="w-6 h-6 text-slate-400" />
                          </div>
                        )}
                        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                          <span className="text-white text-xs font-medium">
                            Load
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
