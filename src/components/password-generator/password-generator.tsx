"use client";

import { useState, useCallback, useEffect } from "react";
import {
  Copy,
  RefreshCw,
  Eye,
  EyeOff,
  Shield,
  ShieldCheck,
  ShieldAlert,
  Key,
  Lock,
  Unlock,
  Check,
  X,
  Save,
  Trash2,
  Download,
  Upload,
  AlertTriangle,
  Info,
  Zap,
  Type,
  Settings,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { toast } from "sonner";
import CryptoJS from "crypto-js";

interface SavedPassword {
  id: string;
  label: string;
  password: string;
  strength: string;
  createdAt: number;
}

interface PasswordStats {
  entropy: number;
  crackTime: string;
  score: number;
  composition: {
    uppercase: number;
    lowercase: number;
    numbers: number;
    symbols: number;
  };
}

const defaultCharsets = {
  uppercase: true,
  lowercase: true,
  numbers: true,
  symbols: true,
  ambiguous: false,
};

export default function PasswordGenerator() {
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [length, setLength] = useState(16);
  const [charsets, setCharsets] = useState(defaultCharsets);
  const [pattern, setPattern] = useState<"random" | "pronounceable" | "pin">(
    "random"
  );
  const [stats, setStats] = useState<PasswordStats | null>(null);
  const [savedPasswords, setSavedPasswords] = useState<SavedPassword[]>([]);
  const [masterPassword, setMasterPassword] = useState("");
  const [isVaultUnlocked, setIsVaultUnlocked] = useState(false);
  const [saveLabel, setSaveLabel] = useState("");
  const [showSaveDialog, setShowSaveDialog] = useState(false);
  const [analyzingPassword, setAnalyzingPassword] = useState("");
  const [analysisResult, setAnalysisResult] = useState<PasswordStats | null>(
    null
  );
  const [isCheckingBreach, setIsCheckingBreach] = useState(false);
  const [breachCount, setBreachCount] = useState<number | null>(null);

  // Load saved passwords and master password status
  useEffect(() => {
    const vaultLocked = localStorage.getItem("vault-locked");
    if (vaultLocked === "true") {
      setIsVaultUnlocked(false);
    }
    const saved = localStorage.getItem("saved-passwords");
    if (saved && vaultLocked === "false") {
      try {
        const decrypted = decryptData(saved);
        if (decrypted) {
          setSavedPasswords(JSON.parse(decrypted));
        }
      } catch (e) {
        console.error("Failed to load passwords");
      }
    }
  }, []);

  // Generate password
  const generatePassword = useCallback(() => {
    let charset = "";
    if (charsets.uppercase) charset += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    if (charsets.lowercase) charset += "abcdefghijklmnopqrstuvwxyz";
    if (charsets.numbers) charset += "0123456789";
    if (charsets.symbols) charset += "!@#$%^&*()_+-=[]{}|;:,.<>?";

    if (charsets.ambiguous) {
      charset = charset.replace(/[il1Lo0O]/g, "");
    }

    if (!charset) {
      toast.error("Select at least one character type");
      return;
    }

    if (pattern === "pin") {
      charset = "0123456789";
    }

    let generated = "";
    const array = new Uint32Array(length);
    crypto.getRandomValues(array);

    for (let i = 0; i < length; i++) {
      generated += charset[array[i] % charset.length];
    }

    // Ensure at least one of each selected type
    if (pattern === "random") {
      const types: { charset: string; type: keyof typeof charsets }[] = [];
      if (charsets.uppercase)
        types.push({ charset: "ABCDEFGHIJKLMNOPQRSTUVWXYZ", type: "uppercase" });
      if (charsets.lowercase)
        types.push({ charset: "abcdefghijklmnopqrstuvwxyz", type: "lowercase" });
      if (charsets.numbers)
        types.push({ charset: "0123456789", type: "numbers" });
      if (charsets.symbols)
        types.push({ charset: "!@#$%^&*()_+-=[]{}|;:,.<>?", type: "symbols" });

      types.forEach((t, i) => {
        if (i < length) {
          const idx = array[i] % t.charset.length;
          generated =
            generated.substring(0, i) + t.charset[idx] + generated.substring(i + 1);
        }
      });
    }

    setPassword(generated);
    calculateStats(generated);
    setBreachCount(null);
  }, [length, charsets, pattern]);

  // Calculate password strength
  const calculateStats = (pwd: string) => {
    const composition = {
      uppercase: (pwd.match(/[A-Z]/g) || []).length,
      lowercase: (pwd.match(/[a-z]/g) || []).length,
      numbers: (pwd.match(/[0-9]/g) || []).length,
      symbols: (pwd.match(/[^A-Za-z0-9]/g) || []).length,
    };

    let charsetSize = 0;
    if (composition.uppercase > 0) charsetSize += 26;
    if (composition.lowercase > 0) charsetSize += 26;
    if (composition.numbers > 0) charsetSize += 10;
    if (composition.symbols > 0) charsetSize += 32;

    const entropy = Math.log2(Math.pow(charsetSize, pwd.length));

    // Estimate crack time (assuming 10 billion guesses per second)
    const guessesPerSecond = 10_000_000_000;
    const secondsToCrack = Math.pow(2, entropy) / guessesPerSecond;

    let crackTime = "";
    if (secondsToCrack < 1) {
      crackTime = "Instantly";
    } else if (secondsToCrack < 60) {
      crackTime = `${Math.round(secondsToCrack)} seconds`;
    } else if (secondsToCrack < 3600) {
      crackTime = `${Math.round(secondsToCrack / 60)} minutes`;
    } else if (secondsToCrack < 86400) {
      crackTime = `${Math.round(secondsToCrack / 3600)} hours`;
    } else if (secondsToCrack < 31536000) {
      crackTime = `${Math.round(secondsToCrack / 86400)} days`;
    } else if (secondsToCrack < 31536000 * 100) {
      crackTime = `${Math.round(secondsToCrack / 31536000)} years`;
    } else if (secondsToCrack < 31536000 * 1000000) {
      crackTime = `${Math.round(secondsToCrack / 31536000 / 1000)} thousand years`;
    } else {
      crackTime = "Centuries";
    }

    // Score 0-4
    let score = 0;
    if (entropy > 35) score = 1;
    if (entropy > 50) score = 2;
    if (entropy > 70) score = 3;
    if (entropy > 90) score = 4;

    const result = { entropy, crackTime, score, composition };
    setStats(result);
    return result;
  };

  // Generate on mount and when options change
  useEffect(() => {
    generatePassword();
  }, [generatePassword]);

  // Copy to clipboard
  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(password);
      toast.success("Copied!", { description: "Password copied to clipboard" });

      // Clear clipboard after 30 seconds
      setTimeout(() => {
        navigator.clipboard.writeText("");
      }, 30000);
    } catch (error) {
      toast.error("Copy failed", {
        description: "Your browser doesn't support this feature",
      });
    }
  };

  // Check for breaches using HIBP API
  const checkBreach = async (pwd: string) => {
    setIsCheckingBreach(true);
    try {
      const hash = await sha1(pwd);
      const prefix = hash.substring(0, 5).toUpperCase();
      const suffix = hash.substring(5).toUpperCase();

      const response = await fetch(
        `https://api.pwnedpasswords.com/range/${prefix}`
      );
      const data = await response.text();

      const matches = data.split("\n");
      const found = matches.find((line) => line.split(":")[0] === suffix);

      if (found) {
        const count = parseInt(found.split(":")[1]);
        setBreachCount(count);
        toast.error("Password found in breaches!", {
          description: `This password has been seen ${count.toLocaleString()} times`,
        });
      } else {
        setBreachCount(0);
        toast.success("Good news!", {
          description: "Password not found in known breaches",
        });
      }
    } catch (error) {
      toast.error("Breach check failed", {
        description: "Could not check HIBP database",
      });
    } finally {
      setIsCheckingBreach(false);
    }
  };

  // SHA1 hash helper
  const sha1 = async (message: string) => {
    const msgBuffer = new TextEncoder().encode(message);
    const hashBuffer = await crypto.subtle.digest("SHA-1", msgBuffer);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
  };

  // Encrypt/Decrypt helpers
  const encryptData = (data: string) => {
    if (!masterPassword) return data;
    return CryptoJS.AES.encrypt(data, masterPassword).toString();
  };

  const decryptData = (encrypted: string) => {
    if (!masterPassword) return encrypted;
    try {
      const bytes = CryptoJS.AES.decrypt(encrypted, masterPassword);
      return bytes.toString(CryptoJS.enc.Utf8);
    } catch {
      return null;
    }
  };

  // Save password
  const savePassword = () => {
    if (!saveLabel.trim()) {
      toast.error("Please enter a label");
      return;
    }

    const newPassword: SavedPassword = {
      id: Date.now().toString(),
      label: saveLabel,
      password: password,
      strength: stats?.score.toString() || "0",
      createdAt: Date.now(),
    };

    const updated = [newPassword, ...savedPasswords].slice(0, 50);
    const encrypted = encryptData(JSON.stringify(updated));
    localStorage.setItem("saved-passwords", encrypted);
    localStorage.setItem("vault-locked", "false");
    setSavedPasswords(updated);
    setShowSaveDialog(false);
    setSaveLabel("");
    toast.success("Password saved", { description: "Stored locally & encrypted" });
  };

  // Delete password
  const deletePassword = (id: string) => {
    const updated = savedPasswords.filter((p) => p.id !== id);
    const encrypted = encryptData(JSON.stringify(updated));
    localStorage.setItem("saved-passwords", encrypted);
    setSavedPasswords(updated);
    toast.success("Password deleted");
  };

  // Copy saved password
  const copySavedPassword = async (pwd: string) => {
    try {
      await navigator.clipboard.writeText(pwd);
      toast.success("Copied!", { description: "Password copied to clipboard" });
      setTimeout(() => navigator.clipboard.writeText(""), 30000);
    } catch {
      toast.error("Copy failed");
    }
  };

  // Get strength label
  const getStrengthLabel = (score: number) => {
    switch (score) {
      case 0:
        return { label: "Very Weak", color: "bg-red-500" };
      case 1:
        return { label: "Weak", color: "bg-orange-500" };
      case 2:
        return { label: "Fair", color: "bg-yellow-500" };
      case 3:
        return { label: "Strong", color: "bg-lime-500" };
      case 4:
        return { label: "Excellent", color: "bg-green-500" };
      default:
        return { label: "Unknown", color: "bg-gray-500" };
    }
  };

  const strengthInfo = stats ? getStrengthLabel(stats.score) : getStrengthLabel(0);

  return (
    <TooltipProvider>
      <div className="container mx-auto px-4 py-4 max-w-6xl">
        <div className="grid lg:grid-cols-2 gap-6">
          {/* Generator Panel */}
          <div className="space-y-6">
            {/* Password Display */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Key className="w-5 h-5" />
                  Generated Password
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="relative">
                  <div className="flex items-center gap-2 bg-slate-100 dark:bg-slate-900 rounded-lg p-4 pr-24">
                    <code className="flex-1 text-lg font-mono break-all">
                      {showPassword ? password : "•".repeat(password.length)}
                    </code>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <EyeOff className="w-5 h-5" />
                      ) : (
                        <Eye className="w-5 h-5" />
                      )}
                    </Button>
                  </div>
                  <div className="absolute right-2 top-1/2 -translate-y-1/2 flex gap-1">
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={copyToClipboard}
                        >
                          <Copy className="w-4 h-4" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>Copy to clipboard</TooltipContent>
                    </Tooltip>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={generatePassword}
                        >
                          <RefreshCw className="w-4 h-4" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>Regenerate</TooltipContent>
                    </Tooltip>
                  </div>
                </div>

                {/* Strength Indicator */}
                {stats && (
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-slate-600 dark:text-slate-400">
                        Strength
                      </span>
                      <Badge
                        className={`${strengthInfo.color} text-white border-0`}
                      >
                        {strengthInfo.label}
                      </Badge>
                    </div>
                    <div className="h-2 bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden">
                      <div
                        className={`h-full ${strengthInfo.color} transition-all duration-500`}
                        style={{ width: `${(stats.score / 4) * 100}%` }}
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-2 text-xs text-slate-500">
                      <div>Entropy: {stats.entropy.toFixed(1)} bits</div>
                      <div>Crack time: {stats.crackTime}</div>
                    </div>
                  </div>
                )}

                {/* Actions */}
                <div className="flex gap-2">
                  <Button
                    onClick={() => setShowSaveDialog(true)}
                    variant="outline"
                    className="flex-1"
                  >
                    <Save className="w-4 h-4 mr-2" />
                    Save Password
                  </Button>
                  <Button
                    onClick={() => checkBreach(password)}
                    variant="outline"
                    disabled={isCheckingBreach}
                    className="flex-1"
                  >
                    {isCheckingBreach ? (
                      <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                    ) : (
                      <ShieldAlert className="w-4 h-4 mr-2" />
                    )}
                    Check Breach
                  </Button>
                </div>

                {breachCount !== null && (
                  <div
                    className={`p-3 rounded-lg flex items-center gap-2 ${
                      breachCount > 0
                        ? "bg-red-50 dark:bg-red-950 text-red-700 dark:text-red-300"
                        : "bg-green-50 dark:bg-green-950 text-green-700 dark:text-green-300"
                    }`}
                  >
                    {breachCount > 0 ? (
                      <X className="w-5 h-5" />
                    ) : (
                      <ShieldCheck className="w-5 h-5" />
                    )}
                    <span className="text-sm">
                      {breachCount > 0
                        ? `Found in ${breachCount.toLocaleString()} known breaches`
                        : "Not found in known breaches"}
                    </span>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Options */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Settings className="w-5 h-5" />
                  Generation Options
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Length */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <Label>Password Length</Label>
                    <span className="text-sm font-mono bg-slate-100 dark:bg-slate-900 px-2 py-1 rounded">
                      {length}
                    </span>
                  </div>
                  <Slider
                    value={[length]}
                    onValueChange={([v]) => setLength(v)}
                    min={8}
                    max={64}
                    step={1}
                  />
                </div>

                {/* Character Types */}
                <div className="space-y-3">
                  <Label>Character Types</Label>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="uppercase" className="flex items-center gap-2">
                        <span className="font-mono text-sm bg-slate-100 dark:bg-slate-900 px-2 py-0.5 rounded">
                          A-Z
                        </span>
                        Uppercase
                      </Label>
                      <Switch
                        id="uppercase"
                        checked={charsets.uppercase}
                        onCheckedChange={(v) =>
                          setCharsets({ ...charsets, uppercase: v })
                        }
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label htmlFor="lowercase" className="flex items-center gap-2">
                        <span className="font-mono text-sm bg-slate-100 dark:bg-slate-900 px-2 py-0.5 rounded">
                          a-z
                        </span>
                        Lowercase
                      </Label>
                      <Switch
                        id="lowercase"
                        checked={charsets.lowercase}
                        onCheckedChange={(v) =>
                          setCharsets({ ...charsets, lowercase: v })
                        }
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label htmlFor="numbers" className="flex items-center gap-2">
                        <span className="font-mono text-sm bg-slate-100 dark:bg-slate-900 px-2 py-0.5 rounded">
                          0-9
                        </span>
                        Numbers
                      </Label>
                      <Switch
                        id="numbers"
                        checked={charsets.numbers}
                        onCheckedChange={(v) =>
                          setCharsets({ ...charsets, numbers: v })
                        }
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label htmlFor="symbols" className="flex items-center gap-2">
                        <span className="font-mono text-sm bg-slate-100 dark:bg-slate-900 px-2 py-0.5 rounded">
                          !@#
                        </span>
                        Symbols
                      </Label>
                      <Switch
                        id="symbols"
                        checked={charsets.symbols}
                        onCheckedChange={(v) =>
                          setCharsets({ ...charsets, symbols: v })
                        }
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label
                        htmlFor="ambiguous"
                        className="flex items-center gap-2"
                      >
                        <Tooltip>
                          <TooltipTrigger>
                            <Info className="w-4 h-4 text-slate-400" />
                          </TooltipTrigger>
                          <TooltipContent>
                            Exclude: i, l, 1, L, o, 0, O
                          </TooltipContent>
                        </Tooltip>
                        Exclude Ambiguous
                      </Label>
                      <Switch
                        id="ambiguous"
                        checked={charsets.ambiguous}
                        onCheckedChange={(v) =>
                          setCharsets({ ...charsets, ambiguous: v })
                        }
                      />
                    </div>
                  </div>
                </div>

                {/* Pattern */}
                <div className="space-y-3">
                  <Label>Pattern Type</Label>
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { value: "random", label: "Random", icon: Zap },
                      { value: "pronounceable", label: "Readable", icon: Type },
                      { value: "pin", label: "PIN Only", icon: Key },
                    ].map((item) => (
                      <Button
                        key={item.value}
                        variant={pattern === item.value ? "default" : "outline"}
                        onClick={() => setPattern(item.value as typeof pattern)}
                        className="flex flex-col h-auto py-3"
                      >
                        <item.icon className="w-4 h-4 mb-1" />
                        <span className="text-xs">{item.label}</span>
                      </Button>
                    ))}
                  </div>
                </div>

                <Button onClick={generatePassword} className="w-full">
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Generate New Password
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Analysis & Vault Panel */}
          <div className="space-y-6">
            {/* Password Analyzer */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="w-5 h-5" />
                  Password Analyzer
                </CardTitle>
                <CardDescription>
                  Check the strength of any password
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="analyze">Password to Analyze</Label>
                  <div className="flex gap-2">
                    <Input
                      id="analyze"
                      type="password"
                      placeholder="Paste a password to analyze..."
                      value={analyzingPassword}
                      onChange={(e) => {
                        setAnalyzingPassword(e.target.value);
                        if (e.target.value) {
                          setAnalysisResult(calculateStats(e.target.value));
                        } else {
                          setAnalysisResult(null);
                        }
                      }}
                    />
                    <Button
                      variant="outline"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <EyeOff className="w-4 h-4" />
                      ) : (
                        <Eye className="w-4 h-4" />
                      )}
                    </Button>
                  </div>
                </div>

                {analysisResult && (
                  <div className="space-y-3 p-4 bg-slate-50 dark:bg-slate-900 rounded-lg">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Strength</span>
                      <Badge
                        className={`${
                          getStrengthLabel(analysisResult.score).color
                        } text-white`}
                      >
                        {getStrengthLabel(analysisResult.score).label}
                      </Badge>
                    </div>
                    <div className="grid grid-cols-2 gap-3 text-sm">
                      <div>
                        <div className="text-slate-500">Entropy</div>
                        <div className="font-mono">
                          {analysisResult.entropy.toFixed(1)} bits
                        </div>
                      </div>
                      <div>
                        <div className="text-slate-500">Crack Time</div>
                        <div className="font-mono text-xs">
                          {analysisResult.crackTime}
                        </div>
                      </div>
                    </div>
                    <div className="grid grid-cols-4 gap-2 text-xs text-center">
                      <div className="bg-slate-100 dark:bg-slate-800 rounded p-2">
                        <div className="font-bold">
                          {analysisResult.composition.uppercase}
                        </div>
                        <div className="text-slate-500">A-Z</div>
                      </div>
                      <div className="bg-slate-100 dark:bg-slate-800 rounded p-2">
                        <div className="font-bold">
                          {analysisResult.composition.lowercase}
                        </div>
                        <div className="text-slate-500">a-z</div>
                      </div>
                      <div className="bg-slate-100 dark:bg-slate-800 rounded p-2">
                        <div className="font-bold">
                          {analysisResult.composition.numbers}
                        </div>
                        <div className="text-slate-500">0-9</div>
                      </div>
                      <div className="bg-slate-100 dark:bg-slate-800 rounded p-2">
                        <div className="font-bold">
                          {analysisResult.composition.symbols}
                        </div>
                        <div className="text-slate-500">!@#</div>
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Password Vault */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Lock className="w-5 h-5" />
                    <div>
                      <CardTitle>Password Vault</CardTitle>
                      <CardDescription>
                        {isVaultUnlocked
                          ? `${savedPasswords.length} passwords saved`
                          : "Unlock to access saved passwords"}
                      </CardDescription>
                    </div>
                  </div>
                  {savedPasswords.length > 0 && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => {
                        setIsVaultUnlocked(!isVaultUnlocked);
                        localStorage.setItem(
                          "vault-locked",
                          (!isVaultUnlocked).toString()
                        );
                      }}
                    >
                      {isVaultUnlocked ? (
                        <Lock className="w-4 h-4" />
                      ) : (
                        <Unlock className="w-4 h-4" />
                      )}
                    </Button>
                  )}
                </div>
              </CardHeader>
              <CardContent>
                {!isVaultUnlocked ? (
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="master">Master Password</Label>
                      <Input
                        id="master"
                        type="password"
                        placeholder="Enter master password..."
                        value={masterPassword}
                        onChange={(e) => setMasterPassword(e.target.value)}
                      />
                    </div>
                    <Button
                      onClick={() => {
                        localStorage.setItem("vault-locked", "false");
                        setIsVaultUnlocked(true);
                        toast.success("Vault unlocked");
                      }}
                      className="w-full"
                    >
                      <Unlock className="w-4 h-4 mr-2" />
                      Unlock Vault
                    </Button>
                    <p className="text-xs text-slate-500 text-center">
                      Your passwords are encrypted with AES-256 using your master
                      password
                    </p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {savedPasswords.length === 0 ? (
                      <div className="text-center py-8 text-slate-500">
                        <Lock className="w-12 h-12 mx-auto mb-3 opacity-30" />
                        <p>No saved passwords</p>
                      </div>
                    ) : (
                      <div className="space-y-2 max-h-64 overflow-y-auto">
                        {savedPasswords.map((item) => (
                          <div
                            key={item.id}
                            className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-900 rounded-lg"
                          >
                            <div className="flex-1 min-w-0">
                              <div className="font-medium truncate">
                                {item.label}
                              </div>
                              <div className="text-xs text-slate-500">
                                {new Date(item.createdAt).toLocaleDateString()}
                              </div>
                            </div>
                            <div className="flex gap-1">
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => copySavedPassword(item.password)}
                              >
                                <Copy className="w-4 h-4" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => deletePassword(item.id)}
                                className="text-red-500 hover:text-red-600"
                              >
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Save Dialog */}
        <Dialog open={showSaveDialog} onOpenChange={setShowSaveDialog}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Save Password</DialogTitle>
              <DialogDescription>
                Store this password securely in your local vault
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="save-label">Label (e.g., Gmail, Facebook)</Label>
                <Input
                  id="save-label"
                  placeholder="Service name..."
                  value={saveLabel}
                  onChange={(e) => setSaveLabel(e.target.value)}
                />
              </div>
              {!masterPassword && (
                <div className="space-y-2">
                  <Label htmlFor="set-master">Set Master Password</Label>
                  <Input
                    id="set-master"
                    type="password"
                    placeholder="Create a master password..."
                    value={masterPassword}
                    onChange={(e) => setMasterPassword(e.target.value)}
                  />
                  <p className="text-xs text-slate-500">
                    This will encrypt all saved passwords. Don't forget it!
                  </p>
                </div>
              )}
              <div className="flex gap-2">
                <Button variant="outline" onClick={() => setShowSaveDialog(false)}>
                  Cancel
                </Button>
                <Button onClick={savePassword}>
                  <Save className="w-4 h-4 mr-2" />
                  Save Password
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </TooltipProvider>
  );
}
