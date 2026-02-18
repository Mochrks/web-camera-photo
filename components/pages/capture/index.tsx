"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import LayoutSelector from "@/components/camera/layout-selector";
import Camera from "@/components/camera/camera";
import * as Layouts from "@/components/camera/photo-layouts";
import { Button } from "@/components/ui/button";
import type { ConfettiRef } from "@/components/ui/confetti";
import Confetti from "@/components/ui/confetti";
import { Download, Play, Printer, Settings2, Sparkles } from "lucide-react";
import Image from "next/image";
import { AdvancedEditor } from "@/components/camera/advanced-editor";

export default function PhotoBooth() {
  const [selectedLayout, setSelectedLayout] = useState<number | null>(null);
  const [requiredPhotos, setRequiredPhotos] = useState(3);
  const [showCamera, setShowCamera] = useState(false);
  const [capturedImages, setCapturedImages] = useState<string[]>([]);
  const [finalImage, setFinalImage] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const confettiRef = useRef<ConfettiRef>(null);

  const handleLayoutSelect = useCallback((layoutId: number, count: number) => {
    setSelectedLayout(layoutId);
    setRequiredPhotos(count);
    setShowCamera(true);
  }, []);

  const handleCapturedImages = useCallback((images: string[]) => {
    setCapturedImages(images);
    setShowCamera(false);
  }, []);

  const handleLayoutSave = useCallback((dataUrl: string) => {
    setFinalImage(dataUrl);
  }, []);

  const handleStartOver = useCallback(() => {
    setSelectedLayout(null);
    setCapturedImages([]);
    setFinalImage(null);
  }, []);

  const handlePrint = () => {
    const printWindow = window.open("", "_blank");
    if (printWindow && finalImage) {
      printWindow.document.write(`
                <html>
                    <head>
                        <title>Print Photo Booth</title>
                        <style>
                            body { margin: 0; display: flex; align-items: center; justify-content: center; height: 100vh; background: white; }
                            img { max-width: 100%; max-height: 100%; object-fit: contain; }
                            @page { size: auto; margin: 0; }
                        </style>
                    </head>
                    <body>
                        <img src="${finalImage}" onload="window.print(); window.close();" />
                    </body>
                </html>
            `);
      printWindow.document.close();
    }
  };

  // Dynamically render the selected layout component
  const renderLayout = () => {
    if (!selectedLayout) return null;
    const LayoutComponent = (Layouts as any)[`Layout${selectedLayout}`];
    if (!LayoutComponent) return null;
    return (
      <LayoutComponent images={capturedImages} onSave={handleLayoutSave} backgroundColor="#000" />
    );
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-black overflow-hidden relative">
      <div className="absolute inset-0 bg-dots opacity-10 pointer-events-none" />

      <div className="z-50 w-full flex flex-col items-center">
        {!selectedLayout && !showCamera && !finalImage && (
          <LayoutSelector onSelect={handleLayoutSelect} />
        )}

        {showCamera && (
          <div className="fixed inset-0 z-[100]">
            <Camera
              onClosed={() => {
                setShowCamera(false);
                setSelectedLayout(null);
              }}
              onCapturedImages={handleCapturedImages}
              requiredPhotos={requiredPhotos}
            />
          </div>
        )}

        {capturedImages.length === requiredPhotos && !finalImage && (
          <div className="w-full max-w-4xl flex justify-center p-4">{renderLayout()}</div>
        )}

        {finalImage && (
          <div className="flex flex-col items-center max-w-5xl w-full px-4 pt-10 pb-24">
            <div className="w-full flex flex-col lg:flex-row gap-8 lg:gap-12 items-center lg:items-start justify-center">
              {/* Final Image Container */}
              <div className="relative group p-2 sm:p-3 bg-white/5 backdrop-blur-3xl rounded-[2rem] sm:rounded-[2.5rem] border border-white/10 shadow-[0_0_100px_rgba(0,0,0,0.8)] max-w-2xl w-full">
                <div className="relative w-full aspect-[4/5] sm:aspect-[3/4]">
                  <Image
                    src={finalImage}
                    alt="Final Layout"
                    fill
                    unoptimized
                    className="w-full h-auto rounded-[2rem] shadow-2xl object-contain"
                  />
                </div>
                <div className="absolute -top-4 -right-4 bg-indigo-600 text-white p-3 rounded-2xl shadow-xl transform rotate-12">
                  <Sparkles className="w-5 h-5 fill-current" />
                </div>
              </div>

              {/* Action Menu */}
              <div className="flex flex-col gap-6 w-full max-w-md">
                <div className="space-y-4 text-center lg:text-left">
                  <h2 className="text-3xl sm:text-4xl font-black text-white italic tracking-tighter uppercase leading-none">
                    Studio <span className="text-indigo-500">Result</span>
                  </h2>
                  <p className="text-white/40 text-sm font-medium tracking-tight max-w-sm mx-auto lg:mx-0">
                    Your masterpiece is ready. Fine-tune it with filters or share it instantly with
                    the world.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <Button
                    size="lg"
                    onClick={() => setIsEditing(true)}
                    className="h-16 px-6 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-black text-[10px] tracking-[0.2em] uppercase flex items-center justify-start gap-4 shadow-xl border border-indigo-400/20"
                  >
                    <div className="w-8 h-8 rounded-lg bg-indigo-500 flex items-center justify-center">
                      <Settings2 className="w-4 h-4" />
                    </div>
                    PRO EDITOR
                  </Button>

                  <Button
                    size="lg"
                    onClick={() => {
                      const link = document.createElement("a");
                      link.href = finalImage;
                      link.download = `photobooth-${Date.now()}.jpg`;
                      document.body.appendChild(link);
                      link.click();
                      document.body.removeChild(link);
                    }}
                    className="h-16 px-6 rounded-2xl bg-white text-black hover:bg-neutral-200 font-black text-[10px] tracking-[0.2em] uppercase flex items-center justify-start gap-4 shadow-xl"
                  >
                    <div className="w-8 h-8 rounded-lg bg-black/5 flex items-center justify-center">
                      <Download className="w-4 h-4" />
                    </div>
                    DOWNLOAD
                  </Button>

                  <Button
                    size="lg"
                    onClick={handlePrint}
                    className="h-16 px-6 rounded-2xl bg-neutral-900 border border-white/10 hover:bg-neutral-800 text-emerald-400 font-black text-[10px] tracking-[0.2em] uppercase flex items-center justify-start gap-4 shadow-xl"
                  >
                    <div className="w-8 h-8 rounded-lg bg-emerald-500/20 flex items-center justify-center">
                      <Printer className="w-4 h-4" />
                    </div>
                    PRINT OUT
                  </Button>

                  <Button
                    size="lg"
                    variant="outline"
                    onClick={handleStartOver}
                    className="h-16 px-6 rounded-2xl border-white/10 bg-white/5 text-white hover:bg-white/10 font-black text-[10px] tracking-[0.2em] uppercase flex items-center justify-start gap-4 shadow-xl"
                  >
                    <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center">
                      <Play className="w-4 h-4" />
                    </div>
                    NEW SESSION
                  </Button>
                </div>
              </div>
            </div>

            <Confetti
              ref={confettiRef}
              className="absolute left-0 top-0 z-0 size-full pointer-events-none"
              onMouseEnter={() => confettiRef.current?.fire({})}
            />
          </div>
        )}

        {isEditing && finalImage && (
          <AdvancedEditor
            image={finalImage}
            onSave={(filtered) => {
              setFinalImage(filtered);
              setIsEditing(false);
            }}
            onCancel={() => setIsEditing(false)}
          />
        )}
      </div>
    </div>
  );
}
