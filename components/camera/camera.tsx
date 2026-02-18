"use client";

import { ArrowLeftRight, Images, X, Timer, Zap, Grid3X3 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CameraView } from "./camera-view";
import { FC, useRef, useState, useEffect, useCallback } from "react";
import { CameraType } from "@/components/camera/camera-types";
import { useCamera } from "@/components/camera/camera-provider";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

interface CameraProps {
  onClosed: () => void;
  onCapturedImages: (images: string[]) => void;
  requiredPhotos: number;
}

const Camera: FC<CameraProps> = ({ onClosed, onCapturedImages, requiredPhotos }) => {
  const camera = useRef<CameraType>();
  const { addImage, stopStream, switchCamera, resetImages } = useCamera();
  const [sessionImages, setSessionImages] = useState<string[]>([]);
  const [photoCount, setPhotoCount] = useState(0);
  const [timerActive, setTimerActive] = useState(false);
  const [timerDuration, setTimerDuration] = useState(3);
  const [showFlash, setShowFlash] = useState(false);
  const [showGrid, setShowGrid] = useState(false);
  const [timerCount, setTimerCount] = useState(0);
  const [flashMode, setFlashMode] = useState<"auto" | "on" | "off">("auto");

  useEffect(() => {
    resetImages();
  }, [resetImages]);

  const capturePhoto = useCallback(() => {
    if (camera.current) {
      if (flashMode === "on" || (flashMode === "auto" && Math.random() > 0.5)) {
        setShowFlash(true);
      }

      setTimeout(() => {
        const imageData = camera.current?.takePhoto();
        if (imageData) {
          // Store locally in sessionImages for immediate result passing
          setSessionImages((prev) => {
            const updated = [...prev, imageData];

            // Sync with global provider too
            addImage(imageData);

            if (updated.length === requiredPhotos) {
              // End session immediately after last shot is clear
              setTimeout(() => {
                onCapturedImages(updated);
              }, 500);
            }
            return updated;
          });

          setPhotoCount((prev) => prev + 1);
        }
        setShowFlash(false);
      }, 100);
    }
  }, [flashMode, addImage, requiredPhotos, onCapturedImages]);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (timerCount > 0) {
      timer = setTimeout(() => {
        if (timerCount === 1) {
          capturePhoto();
          setTimerCount(0);
        } else {
          setTimerCount(timerCount - 1);
        }
      }, 1000);
    }
    return () => clearTimeout(timer);
  }, [timerCount, capturePhoto]);

  const handleCapture = () => {
    if (photoCount < requiredPhotos && timerCount === 0) {
      if (timerActive) {
        setTimerCount(timerDuration);
      } else {
        capturePhoto();
      }
    }
  };

  const handleClose = () => {
    stopStream();
    onClosed();
  };

  return (
    <div className="fixed inset-0 z-[100] flex flex-col bg-black text-white font-sans overflow-hidden select-none">
      {/* Background Camera View */}
      <div className="absolute inset-0 z-0">
        <CameraView ref={camera} />

        {/* Simple Flash Overlay */}
        {showFlash && <div className="absolute inset-0 bg-white z-[120] opacity-100" />}

        {/* Static Grid Overlay */}
        {showGrid && (
          <div className="absolute inset-0 z-10 pointer-events-none opacity-40">
            <div className="absolute top-0 bottom-0 left-1/3 w-px bg-white" />
            <div className="absolute top-0 bottom-0 left-2/3 w-px bg-white" />
            <div className="absolute left-0 right-0 top-1/3 h-px bg-white" />
            <div className="absolute left-0 right-0 top-2/3 h-px bg-white" />
          </div>
        )}
      </div>

      {/* Simplified Top Bar */}
      <div className="relative h-20 flex items-center justify-between px-6 z-50 bg-black/40">
        <Button
          variant="ghost"
          size="icon"
          className="rounded-full bg-white/10 hover:bg-white/20 text-white"
          onClick={handleClose}
        >
          <X className="h-5 w-5" />
        </Button>

        <div className="flex items-center gap-4">
          <button
            onClick={() =>
              setFlashMode((curr) => (curr === "auto" ? "on" : curr === "on" ? "off" : "auto"))
            }
            className={cn(
              "w-10 h-10 flex items-center justify-center rounded-full transition-all",
              flashMode !== "off" ? "text-yellow-400 bg-yellow-400/20" : "text-white bg-white/10"
            )}
          >
            <Zap className={cn("h-4 w-4", flashMode === "on" && "fill-current")} />
          </button>

          <button
            onClick={() => setTimerActive(!timerActive)}
            className={cn(
              "w-10 h-10 flex items-center justify-center rounded-full transition-all",
              timerActive ? "text-yellow-400 bg-yellow-400/20" : "text-white bg-white/10"
            )}
          >
            <Timer className="h-4 w-4" />
          </button>

          <button
            onClick={() => setShowGrid(!showGrid)}
            className={cn(
              "w-10 h-10 flex items-center justify-center rounded-full transition-all",
              showGrid ? "text-yellow-400 bg-yellow-400/20" : "text-white bg-white/10"
            )}
          >
            <Grid3X3 className="h-4 w-4" />
          </button>
        </div>

        <div className="flex flex-col items-end">
          <div className="px-4 py-1 rounded-full bg-indigo-600 text-[10px] font-black tracking-widest border border-indigo-400">
            {photoCount} / {requiredPhotos}
          </div>
        </div>
      </div>

      {/* Simplified Countdown */}
      <div className="flex-1 flex items-center justify-center pointer-events-none relative z-50">
        <AnimatePresence>
          {timerCount > 0 && (
            <motion.span
              key={timerCount}
              initial={{ scale: 1.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="text-[12rem] font-black text-white"
            >
              {timerCount}
            </motion.span>
          )}
        </AnimatePresence>
      </div>

      {/* Simplified Bottom Bar */}
      <div className="relative h-64 flex flex-col items-center justify-center px-10 z-50 bg-black/60 pb-10">
        <div className="w-full max-w-lg flex items-center justify-between gap-8">
          {/* Gallery Preview */}
          <div className="w-16 h-16 rounded-full border border-white/20 bg-neutral-900 overflow-hidden">
            {sessionImages.length > 0 ? (
              <Image
                src={sessionImages[sessionImages.length - 1]}
                alt="Captured Preview"
                width={64}
                height={64}
                unoptimized
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center opacity-20">
                <Images className="w-4 h-4" />
              </div>
            )}
          </div>

          {/* Simple Shutter */}
          <button
            onClick={handleCapture}
            disabled={photoCount === requiredPhotos || timerCount > 0}
            className="relative w-24 h-24 flex items-center justify-center group"
          >
            <div className="absolute inset-0 rounded-full border-[4px] border-white transition-all group-active:scale-90" />
            <div
              className={cn(
                "w-[80%] h-[80%] rounded-full bg-white transition-all",
                photoCount === requiredPhotos || timerCount > 0 ? "opacity-20" : "opacity-100"
              )}
            />
          </button>

          {/* Switch Camera */}
          <button
            className="w-16 h-16 rounded-full bg-white/10 hover:bg-white/20 transition-all flex items-center justify-center active:rotate-180"
            onClick={switchCamera}
          >
            <ArrowLeftRight className="h-6 w-6 text-white" />
          </button>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="absolute bottom-0 left-0 w-full h-1 flex z-[100]">
        {[...Array(requiredPhotos)].map((_, i) => (
          <div
            key={i}
            className={cn(
              "grow h-full transition-all duration-300",
              i < photoCount ? "bg-indigo-500" : "bg-white/10"
            )}
          />
        ))}
      </div>
    </div>
  );
};

export default Camera;
