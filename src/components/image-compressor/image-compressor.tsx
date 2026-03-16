"use client";

import { useState, useCallback, useRef } from "react";
import imageCompression from "browser-image-compression";
import { ReactCompareSlider } from "react-compare-slider";
import JSZip from "jszip";
import {
  Upload,
  Download,
  Image as ImageIcon,
  Trash2,
  Settings,
  Check,
  X,
  Zap,
  Maximize,
  Minimize,
  FileImage,
  Layers,
  Archive,
  Eye,
  EyeOff,
  Info,
  Sparkles,
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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { toast } from "sonner";

interface CompressedImage {
  id: string;
  file: File;
  originalUrl: string;
  compressedUrl: string | null;
  compressedFile: File | null;
  originalSize: number;
  compressedSize: number | null;
  width: number;
  height: number;
  status: "pending" | "processing" | "completed" | "error";
  progress: number;
}

export default function ImageCompressor() {
  const [images, setImages] = useState<CompressedImage[]>([]);
  const [quality, setQuality] = useState(80);
  const [outputFormat, setOutputFormat] = useState<"original" | "jpeg" | "png" | "webp">(
    "original"
  );
  const [maxWidth, setMaxWidth] = useState<number | null>(null);
  const [maxHeight, setMaxHeight] = useState<number | null>(null);
  const [removeExif, setRemoveExif] = useState(true);
  const [sameSettingsForAll, setSameSettingsForAll] = useState(true);
  const [isProcessing, setIsProcessing] = useState(false);
  const [comparisonMode, setComparisonMode] = useState<"side" | "slider">("slider");
  const [selectedImageId, setSelectedImageId] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Handle file upload
  const handleFileUpload = useCallback((files: FileList | null) => {
    if (!files) return;

    const newImages: CompressedImage[] = [];

    Array.from(files).forEach((file) => {
      if (!file.type.startsWith("image/")) {
        toast.error(`Skipping ${file.name}: Not an image file`);
        return;
      }

      const img = new Image();
      const url = URL.createObjectURL(file);

      img.onload = () => {
        newImages.push({
          id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
          file,
          originalUrl: url,
          compressedUrl: null,
          compressedFile: null,
          originalSize: file.size,
          compressedSize: null,
          width: img.width,
          height: img.height,
          status: "pending",
          progress: 0,
        });

        if (newImages.length === files.length) {
          setImages((prev) => [...prev, ...newImages]);
          toast.success(`Added ${newImages.length} image(s)`);
        }
      };

      img.src = url;
    });
  }, []);

  // Handle drop
  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      handleFileUpload(e.dataTransfer.files);
    },
    [handleFileUpload]
  );

  // Remove image
  const removeImage = (id: string) => {
    setImages((prev) => {
      const img = prev.find((i) => i.id === id);
      if (img) {
        URL.revokeObjectURL(img.originalUrl);
        if (img.compressedUrl) {
          URL.revokeObjectURL(img.compressedUrl);
        }
      }
      return prev.filter((i) => i.id !== id);
    });
    if (selectedImageId === id) {
      setSelectedImageId(null);
    }
    toast.success("Image removed");
  };

  // Compress single image
  const compressImage = async (image: CompressedImage): Promise<CompressedImage> => {
    const options = {
      maxSizeMB: 10,
      maxWidthOrHeight: maxWidth || image.width,
      useWebWorker: true,
      fileType: outputFormat === "original" ? image.file.type : `image/${outputFormat}`,
      initialQuality: quality / 100,
    };

    try {
      const compressedFile = await imageCompression(image.file, options);

      // If PNG output, convert from blob
      let finalFile = compressedFile;
      if (outputFormat !== "original" && outputFormat !== image.file.type.split("/")[1]) {
        finalFile = await convertImageFormat(compressedFile, outputFormat);
      }

      const compressedUrl = URL.createObjectURL(finalFile);

      return {
        ...image,
        compressedUrl,
        compressedFile: finalFile,
        compressedSize: finalFile.size,
        status: "completed",
        progress: 100,
      };
    } catch (error) {
      console.error("Compression error:", error);
      return {
        ...image,
        status: "error",
        progress: 0,
      };
    }
  };

  // Convert image format
  const convertImageFormat = async (file: File, format: string): Promise<File> => {
    return new Promise((resolve) => {
      const img = new Image();
      img.src = URL.createObjectURL(file);
      img.onload = () => {
        const canvas = document.createElement("canvas");
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext("2d");
        if (ctx) {
          ctx.drawImage(img, 0, 0);
          canvas.toBlob(
            (blob) => {
              if (blob) {
                resolve(new File([blob], `converted.${format}`, { type: `image/${format}` }));
              } else {
                resolve(file);
              }
            },
            `image/${format}`,
            quality / 100
          );
        } else {
          resolve(file);
        }
      };
    });
  };

  // Compress all images
  const compressAll = async () => {
    if (images.length === 0) return;

    setIsProcessing(true);

    for (let i = 0; i < images.length; i++) {
      const image = images[i];
      if (image.status === "completed" && sameSettingsForAll) continue;

      setImages((prev) =>
        prev.map((img, idx) =>
          idx === i ? { ...img, status: "processing", progress: 50 } : img
        )
      );

      const compressed = await compressImage(image);

      setImages((prev) =>
        prev.map((img, idx) => (idx === i ? compressed : img))
      );

      if (compressed.status === "completed") {
        toast.success(`Compressed ${image.file.name}`);
      } else {
        toast.error(`Failed to compress ${image.file.name}`);
      }
    }

    setIsProcessing(false);
    toast.success("All images processed!");
  };

  // Download single image
  const downloadImage = (image: CompressedImage) => {
    if (!image.compressedFile) return;

    const link = document.createElement("a");
    link.href = image.compressedUrl!;
    const ext = outputFormat === "original"
      ? image.file.name.split(".").pop()
      : outputFormat;
    link.download = `compressed-${image.file.name.split(".")[0]}.${ext}`;
    link.click();

    toast.success("Download started");
  };

  // Download all as ZIP
  const downloadAll = async () => {
    const completedImages = images.filter((i) => i.status === "completed");
    if (completedImages.length === 0) {
      toast.error("No compressed images to download");
      return;
    }

    const zip = new JSZip();
    const folder = zip.folder("compressed-images");

    completedImages.forEach((image) => {
      if (image.compressedFile) {
        const ext = outputFormat === "original"
          ? image.file.name.split(".").pop()
          : outputFormat;
        folder?.file(
          `compressed-${image.file.name.split(".")[0]}.${ext}`,
          image.compressedFile
        );
      }
    });

    const content = await zip.generateAsync({ type: "blob" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(content);
    link.download = `compressed-images-${Date.now()}.zip`;
    link.click();

    toast.success("ZIP download started");
  };

  // Format file size
  const formatSize = (bytes: number) => {
    if (bytes === 0) return "0 B";
    const k = 1024;
    const sizes = ["B", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  // Calculate savings
  const calculateSavings = (original: number, compressed: number) => {
    const saved = original - compressed;
    const percentage = ((saved / original) * 100).toFixed(1);
    return { saved, percentage };
  };

  // Get total stats
  const getTotalStats = () => {
    const completed = images.filter((i) => i.status === "completed");
    const totalOriginal = completed.reduce((sum, i) => sum + i.originalSize, 0);
    const totalCompressed = completed.reduce(
      (sum, i) => sum + (i.compressedSize || 0),
      0
    );
    const savings = calculateSavings(totalOriginal, totalCompressed);
    return {
      total: completed.length,
      totalOriginal,
      totalCompressed,
      savings,
    };
  };

  const selectedImage = images.find((i) => i.id === selectedImageId);
  const stats = getTotalStats();

  return (
    <div className="container mx-auto px-4 py-4 max-w-7xl">
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Left Column - Upload & Settings */}
        <div className="lg:col-span-1 space-y-6">
          {/* Upload Zone */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Upload className="w-5 h-5" />
                Upload Images
              </CardTitle>
              <CardDescription>
                Drag & drop or click to browse
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div
                onDrop={handleDrop}
                onDragOver={(e) => e.preventDefault()}
                onClick={() => fileInputRef.current?.click()}
                className="border-2 border-dashed border-slate-300 dark:border-slate-700 rounded-lg p-8 text-center cursor-pointer hover:border-green-500 transition-colors bg-slate-50 dark:bg-slate-900"
              >
                <ImageIcon className="w-12 h-12 mx-auto mb-4 text-slate-400" />
                <p className="text-sm text-slate-600 dark:text-slate-400 mb-2">
                  Drop images here or click to browse
                </p>
                <p className="text-xs text-slate-500">
                  JPEG, PNG, WebP, AVIF • Max 20 files • 20MB each
                </p>
                <Input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={(e) => handleFileUpload(e.target.files)}
                  className="hidden"
                />
              </div>

              {images.length > 0 && (
                <div className="mt-4 flex items-center justify-between">
                  <Badge variant="secondary">{images.length} images</Badge>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      images.forEach((i) => {
                        URL.revokeObjectURL(i.originalUrl);
                        if (i.compressedUrl) URL.revokeObjectURL(i.compressedUrl);
                      });
                      setImages([]);
                    }}
                  >
                    Clear All
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Settings */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings className="w-5 h-5" />
                Compression Settings
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <Tabs defaultValue="simple">
                <TabsList className="w-full">
                  <TabsTrigger value="simple" className="flex-1">
                    Simple
                  </TabsTrigger>
                  <TabsTrigger value="advanced" className="flex-1">
                    Advanced
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="simple" className="space-y-4 mt-4">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <Label>Quality</Label>
                      <span className="text-sm font-mono bg-slate-100 dark:bg-slate-900 px-2 py-1 rounded">
                        {quality}%
                      </span>
                    </div>
                    <Slider
                      value={[quality]}
                      onValueChange={([v]) => setQuality(v)}
                      min={1}
                      max={100}
                      step={1}
                    />
                    <div className="flex justify-between text-xs text-slate-500">
                      <span>Low</span>
                      <span>Best</span>
                    </div>
                  </div>

                  <Button onClick={compressAll} disabled={images.length === 0 || isProcessing} className="w-full">
                    {isProcessing ? (
                      <>
                        <Zap className="w-4 h-4 mr-2 animate-spin" />
                        Processing...
                      </>
                    ) : (
                      <>
                        <Zap className="w-4 h-4 mr-2" />
                        Compress All
                      </>
                    )}
                  </Button>
                </TabsContent>

                <TabsContent value="advanced" className="space-y-4 mt-4">
                  <div className="space-y-3">
                    <Label>Output Format</Label>
                    <Select
                      value={outputFormat}
                      onValueChange={(v) =>
                        setOutputFormat(v as typeof outputFormat)
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="original">Original Format</SelectItem>
                        <SelectItem value="jpeg">JPEG</SelectItem>
                        <SelectItem value="png">PNG</SelectItem>
                        <SelectItem value="webp">WebP</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-3">
                    <Label>Max Width (px)</Label>
                    <Input
                      type="number"
                      placeholder="Original width"
                      value={maxWidth || ""}
                      onChange={(e) =>
                        setMaxWidth(e.target.value ? parseInt(e.target.value) : null)
                      }
                    />
                  </div>

                  <div className="space-y-3">
                    <Label>Max Height (px)</Label>
                    <Input
                      type="number"
                      placeholder="Original height"
                      value={maxHeight || ""}
                      onChange={(e) =>
                        setMaxHeight(e.target.value ? parseInt(e.target.value) : null)
                      }
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <Label htmlFor="exif" className="flex items-center gap-2">
                      Remove EXIF Data
                      <TooltipInfo>
                        Removes camera metadata for privacy
                      </TooltipInfo>
                    </Label>
                    <Switch
                      id="exif"
                      checked={removeExif}
                      onCheckedChange={setRemoveExif}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <Label htmlFor="sync">Sync Settings</Label>
                    <Switch
                      id="sync"
                      checked={sameSettingsForAll}
                      onCheckedChange={setSameSettingsForAll}
                    />
                  </div>

                  <Button onClick={compressAll} disabled={images.length === 0 || isProcessing} className="w-full">
                    {isProcessing ? (
                      <>
                        <Zap className="w-4 h-4 mr-2 animate-spin" />
                        Processing...
                      </>
                    ) : (
                      <>
                        <Zap className="w-4 h-4 mr-2" />
                        Apply & Compress
                      </>
                    )}
                  </Button>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>

        {/* Center & Right - Preview & Queue */}
        <div className="lg:col-span-2 space-y-6">
          {/* Preview Card */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Eye className="w-5 h-5" />
                  <div>
                    <CardTitle>Preview</CardTitle>
                    <CardDescription>
                      {selectedImage
                        ? "Compare original vs compressed"
                        : "Select an image to preview"}
                    </CardDescription>
                  </div>
                </div>
                {selectedImage && (
                  <Select
                    value={comparisonMode}
                    onValueChange={(v) =>
                      setComparisonMode(v as "side" | "slider")
                    }
                  >
                    <SelectTrigger className="w-[150px]">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="slider">Slider</SelectItem>
                      <SelectItem value="side">Side by Side</SelectItem>
                    </SelectContent>
                  </Select>
                )}
              </div>
            </CardHeader>
            <CardContent>
              {!selectedImage ? (
                <div className="flex flex-col items-center justify-center py-16 text-slate-500">
                  <ImageIcon className="w-16 h-16 mb-4 opacity-30" />
                  <p>Select an image from the queue to preview</p>
                </div>
              ) : selectedImage.status === "completed" && selectedImage.compressedUrl ? (
                <div className="space-y-4">
                  {comparisonMode === "slider" ? (
                    <ReactCompareSlider
                      itemOne={
                        <img
                          src={selectedImage.originalUrl}
                          alt="Original"
                          className="w-full h-auto rounded-lg"
                        />
                      }
                      itemTwo={
                        <img
                          src={selectedImage.compressedUrl!}
                          alt="Compressed"
                          className="w-full h-auto rounded-lg"
                        />
                      }
                      className="rounded-lg overflow-hidden"
                    />
                  ) : (
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <div className="text-center text-sm font-medium mb-2">
                          Original
                        </div>
                        <img
                          src={selectedImage.originalUrl}
                          alt="Original"
                          className="w-full h-auto rounded-lg border"
                        />
                      </div>
                      <div>
                        <div className="text-center text-sm font-medium mb-2">
                          Compressed
                        </div>
                        <img
                          src={selectedImage.compressedUrl!}
                          alt="Compressed"
                          className="w-full h-auto rounded-lg border"
                        />
                      </div>
                    </div>
                  )}

                  {/* Image Info */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4 bg-slate-50 dark:bg-slate-900 rounded-lg">
                    <div>
                      <div className="text-xs text-slate-500">Original Size</div>
                      <div className="font-mono">
                        {formatSize(selectedImage.originalSize)}
                      </div>
                    </div>
                    <div>
                      <div className="text-xs text-slate-500">Compressed Size</div>
                      <div className="font-mono text-green-600">
                        {formatSize(selectedImage.compressedSize!)}
                      </div>
                    </div>
                    <div>
                      <div className="text-xs text-slate-500">Saved</div>
                      <div className="font-mono text-green-600">
                        {calculateSavings(
                          selectedImage.originalSize,
                          selectedImage.compressedSize!
                        ).percentage}
                        %
                      </div>
                    </div>
                    <div>
                      <div className="text-xs text-slate-500">Dimensions</div>
                      <div className="font-mono">
                        {selectedImage.width}×{selectedImage.height}
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-16 text-slate-500">
                  {selectedImage.status === "processing" ? (
                    <>
                      <Zap className="w-16 h-16 mb-4 animate-spin" />
                      <p>Compressing...</p>
                      <Progress value={selectedImage.progress} className="mt-4 w-48" />
                    </>
                  ) : (
                    <>
                      <ImageIcon className="w-16 h-16 mb-4 opacity-30" />
                      <p>Click "Compress All" to process this image</p>
                    </>
                  )}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Queue & Stats */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Layers className="w-5 h-5" />
                  <div>
                    <CardTitle>Image Queue</CardTitle>
                    <CardDescription>
                      {images.filter((i) => i.status === "completed").length} of{" "}
                      {images.length} images compressed
                    </CardDescription>
                  </div>
                </div>
                {stats.total > 0 && (
                  <Button onClick={downloadAll} variant="outline" size="sm">
                    <Archive className="w-4 h-4 mr-2" />
                    Download All (ZIP)
                  </Button>
                )}
              </div>
            </CardHeader>
            <CardContent>
              {images.length === 0 ? (
                <div className="text-center py-8 text-slate-500">
                  <FileImage className="w-12 h-12 mx-auto mb-3 opacity-30" />
                  <p>No images uploaded yet</p>
                  <p className="text-sm">Upload images to see them here</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {/* Stats Summary */}
                  {stats.total > 0 && (
                    <div className="p-4 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-950 dark:to-emerald-950 rounded-lg border border-green-200 dark:border-green-900">
                      <div className="flex items-center gap-2 mb-2">
                        <Sparkles className="w-5 h-5 text-green-600" />
                        <span className="font-semibold text-green-800 dark:text-green-200">
                          Total Savings
                        </span>
                      </div>
                      <div className="grid grid-cols-3 gap-4 text-sm">
                        <div>
                          <div className="text-green-600 dark:text-green-400">
                            Original
                          </div>
                          <div className="font-mono">
                            {formatSize(stats.totalOriginal)}
                          </div>
                        </div>
                        <div>
                          <div className="text-green-600 dark:text-green-400">
                            Compressed
                          </div>
                          <div className="font-mono">
                            {formatSize(stats.totalCompressed)}
                          </div>
                        </div>
                        <div>
                          <div className="text-green-600 dark:text-green-400">
                            Saved
                          </div>
                          <div className="font-mono font-bold">
                            {formatSize(stats.savings.saved)} (
                            {stats.savings.percentage}%)
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Image List */}
                  <div className="grid sm:grid-cols-2 gap-3 max-h-96 overflow-y-auto">
                    {images.map((image) => (
                      <div
                        key={image.id}
                        className={`flex gap-3 p-3 rounded-lg border cursor-pointer transition-all ${
                          selectedImageId === image.id
                            ? "border-green-500 bg-green-50 dark:bg-green-950"
                            : "border-slate-200 dark:border-slate-800 hover:border-slate-300"
                        }`}
                        onClick={() => setSelectedImageId(image.id)}
                      >
                        <img
                          src={image.originalUrl}
                          alt="Thumbnail"
                          className="w-16 h-16 object-cover rounded"
                        />
                        <div className="flex-1 min-w-0">
                          <div className="font-medium text-sm truncate">
                            {image.file.name}
                          </div>
                          <div className="text-xs text-slate-500 mt-1">
                            {image.width}×{image.height} • {formatSize(image.originalSize)}
                          </div>
                          {image.status === "completed" && image.compressedSize && (
                            <Badge className="mt-1 bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200 border-0">
                              −
                              {
                                calculateSavings(image.originalSize, image.compressedSize)
                                  .percentage
                              }
                              %
                            </Badge>
                          )}
                        </div>
                        <div className="flex flex-col gap-1">
                          {image.status === "completed" && (
                            <Button
                              variant="ghost"
                              size="icon"
                              className="w-8 h-8"
                              onClick={(e) => {
                                e.stopPropagation();
                                downloadImage(image);
                              }}
                            >
                              <Download className="w-4 h-4" />
                            </Button>
                          )}
                          <Button
                            variant="ghost"
                            size="icon"
                            className="w-8 h-8 text-red-500 hover:text-red-600"
                            onClick={(e) => {
                              e.stopPropagation();
                              removeImage(image.id);
                            }}
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

// Helper component for tooltips
function TooltipInfo({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center">
      <Info className="w-4 h-4 text-slate-400 ml-1" />
    </span>
  );
}
