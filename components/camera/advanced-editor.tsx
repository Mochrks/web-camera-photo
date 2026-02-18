"use client";

import { useState, useRef, FC, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sun,
  Contrast as ContrastIcon,
  Palette,
  Square,
  CircleDot,
  Paintbrush,
  Sliders,
  RotateCcw,
  X,
  Wind,
  Cloud,
  Droplets,
  Thermometer,
  Maximize,
  Minimize,
  Sparkles,
  Filter as FilterIcon,
  Camera,
  Check,
} from "lucide-react";
import NextImage from "next/image";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { cn } from "@/lib/utils";

interface AdvancedEditorProps {
  image: string;
  onSave: (filteredImageUrl: string) => void;
  onCancel: () => void;
}

type TabType = "filter" | "adjust";
type AdjustmentCategory = "light" | "color" | "detail" | "effects";

interface FilterPreset {
  id: string;
  name: string;
  filter: string;
}

const PRESETS: FilterPreset[] = [
  { id: "original", name: "Original", filter: "" },
  { id: "vivid", name: "Vivid", filter: "saturate(1.5) contrast(1.1) brightness(1.05)" },
  { id: "vivid-warm", name: "Vivid Warm", filter: "saturate(1.4) sepia(0.2) contrast(1.1)" },
  { id: "vivid-cool", name: "Vivid Cool", filter: "saturate(1.4) hue-rotate(10deg) contrast(1.1)" },
  { id: "dramatic", name: "Dramatic", filter: "contrast(1.4) brightness(0.9) saturate(0.8)" },
  { id: "mono", name: "Mono", filter: "grayscale(1) contrast(1.2) brightness(1.1)" },
  { id: "silvertone", name: "Silver", filter: "grayscale(1) contrast(1.5) brightness(0.9)" },
  { id: "noir", name: "Noir", filter: "grayscale(1) contrast(2) brightness(0.7)" },
  { id: "fade", name: "Fade", filter: "brightness(1.1) contrast(0.9) saturate(0.7) sepia(0.1)" },
  { id: "warm", name: "Warm", filter: "sepia(0.3) saturate(1.2) contrast(1.1)" },
];

const ADJUSTMENTS: Record<AdjustmentCategory, any[]> = {
  light: [
    { id: "exposure", label: "Exposure", icon: Sun, min: -100, max: 100, step: 1, defaultValue: 0 },
    {
      id: "brilliance",
      label: "Brilliance",
      icon: Sparkles,
      min: -100,
      max: 100,
      step: 1,
      defaultValue: 0,
    },
    {
      id: "highlights",
      label: "Highlights",
      icon: Cloud,
      min: -100,
      max: 100,
      step: 1,
      defaultValue: 0,
    },
    { id: "shadows", label: "Shadows", icon: Wind, min: -100, max: 100, step: 1, defaultValue: 0 },
    {
      id: "contrast",
      label: "Contrast",
      icon: ContrastIcon,
      min: -100,
      max: 100,
      step: 1,
      defaultValue: 0,
    },
    {
      id: "brightness",
      label: "Brightness",
      icon: Sun,
      min: -100,
      max: 100,
      step: 1,
      defaultValue: 0,
    },
    {
      id: "blackPoint",
      label: "Black Point",
      icon: Square,
      min: -100,
      max: 100,
      step: 1,
      defaultValue: 0,
    },
  ],
  color: [
    {
      id: "saturation",
      label: "Saturation",
      icon: Palette,
      min: -100,
      max: 100,
      step: 1,
      defaultValue: 0,
    },
    {
      id: "vibrance",
      label: "Vibrance",
      icon: Droplets,
      min: -100,
      max: 100,
      step: 1,
      defaultValue: 0,
    },
    {
      id: "warmth",
      label: "Warmth",
      icon: Thermometer,
      min: -100,
      max: 100,
      step: 1,
      defaultValue: 0,
    },
    { id: "tint", label: "Tint", icon: Paintbrush, min: -100, max: 100, step: 1, defaultValue: 0 },
  ],
  detail: [
    {
      id: "sharpness",
      label: "Sharpness",
      icon: CircleDot,
      min: 0,
      max: 100,
      step: 1,
      defaultValue: 0,
    },
    {
      id: "definition",
      label: "Definition",
      icon: Maximize,
      min: 0,
      max: 100,
      step: 1,
      defaultValue: 0,
    },
  ],
  effects: [
    {
      id: "vignette",
      label: "Vignette",
      icon: Minimize,
      min: 0,
      max: 100,
      step: 1,
      defaultValue: 0,
    },
  ],
};

export const AdvancedEditor: FC<AdvancedEditorProps> = ({ image, onSave, onCancel }) => {
  const [activeTab, setActiveTab] = useState<TabType>("filter");
  const [activeCategory, setActiveCategory] = useState<AdjustmentCategory>("light");
  const [activeAdjustment, setActiveAdjustment] = useState<string>("exposure");
  const [selectedPreset, setSelectedPreset] = useState<string>("original");

  const [values, setValues] = useState<Record<string, number>>(() => {
    const initial: Record<string, number> = {};
    Object.values(ADJUSTMENTS)
      .flat()
      .forEach((adj) => {
        initial[adj.id] = adj.defaultValue;
      });
    return initial;
  });

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const getFilterString = useCallback(() => {
    const preset = PRESETS.find((p) => p.id === selectedPreset);
    const presetFilter = preset?.filter || "";

    const b = 100 + values.brightness + values.exposure * 0.5;
    const c = 100 + values.contrast;
    const s = 100 + values.saturation + values.vibrance * 0.5;

    const adjustmentFilter = `
            brightness(${b}%) 
            contrast(${c}%) 
            saturate(${s}%) 
            hue-rotate(${values.tint * 0.5}deg)
            blur(${values.sharpness < 0 ? Math.abs(values.sharpness / 20) : 0}px)
        `;

    return `${presetFilter} ${adjustmentFilter}`;
  }, [values, selectedPreset]);

  const handleSave = async () => {
    if (!canvasRef.current) return;
    setIsProcessing(true);

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const img = new window.Image();
    img.crossOrigin = "anonymous";
    img.src = image;

    await new Promise((resolve) => (img.onload = resolve));

    canvas.width = img.width;
    canvas.height = img.height;

    ctx.filter = getFilterString();
    ctx.drawImage(img, 0, 0);

    if (values.vignette > 0) {
      const gradient = ctx.createRadialGradient(
        canvas.width / 2,
        canvas.height / 2,
        0,
        canvas.width / 2,
        canvas.height / 2,
        Math.sqrt((canvas.width / 2) ** 2 + (canvas.height / 2) ** 2)
      );
      gradient.addColorStop(0, "rgba(0,0,0,0)");
      gradient.addColorStop(1, `rgba(0,0,0,${values.vignette / 100})`);
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    }

    onSave(canvas.toDataURL("image/jpeg", 0.95));
    setIsProcessing(false);
  };

  return (
    <div className="fixed inset-0 z-[200] bg-black flex flex-col font-sans select-none overflow-hidden">
      {/* Minimal Header */}
      <div className="h-16 flex items-center justify-between px-6 bg-black/80 backdrop-blur-md z-50">
        <button
          onClick={onCancel}
          className="p-2 -ml-2 text-white/50 hover:text-white transition-colors"
        >
          <X className="w-6 h-6" />
        </button>

        <div className="flex bg-white/5 rounded-full p-1 border border-white/10">
          <button
            onClick={() => setActiveTab("filter")}
            className={cn(
              "px-6 py-1.5 rounded-full text-[10px] font-black tracking-widest uppercase transition-all",
              activeTab === "filter" ? "bg-white text-black" : "text-white/40 hover:text-white"
            )}
          >
            Filter
          </button>
          <button
            onClick={() => setActiveTab("adjust")}
            className={cn(
              "px-6 py-1.5 rounded-full text-[10px] font-black tracking-widest uppercase transition-all",
              activeTab === "adjust" ? "bg-white text-black" : "text-white/40 hover:text-white"
            )}
          >
            Adjust
          </button>
        </div>

        <button
          onClick={handleSave}
          disabled={isProcessing}
          className="flex items-center gap-2 px-6 py-2 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white rounded-full text-[10px] font-black tracking-widest uppercase transition-all shadow-[0_0_20px_rgba(79,70,229,0.4)]"
        >
          {isProcessing ? "Wait..." : "Save"}
          <Check className="w-3 h-3" />
        </button>
      </div>

      {/* Content Area */}
      <div className="flex-1 flex flex-col md:flex-row h-[calc(100vh-64px)]">
        {/* Preview Container */}
        <div className="flex-1 relative bg-neutral-950 flex items-center justify-center p-4 min-h-0">
          <div className="relative group max-w-full max-h-full">
            <div className="relative w-full h-[60vh] md:h-[75vh] min-w-[300px]">
              <NextImage
                src={image}
                alt="Preview"
                fill
                unoptimized
                style={{ filter: getFilterString() }}
                className="object-contain rounded-lg shadow-[0_0_50px_rgba(0,0,0,0.5)] transition-all"
              />
            </div>
            {values.vignette > 0 && (
              <div
                className="absolute inset-0 pointer-events-none rounded-lg"
                style={{
                  boxShadow: `inset 0 0 ${values.vignette * 2.5}px rgba(0,0,0,${values.vignette / 100})`,
                }}
              />
            )}
          </div>
        </div>

        {/* Controls Sidebar (Desktop) / Bottom Sheet (Mobile) */}
        <div className="w-full md:w-96 bg-black border-t md:border-t-0 md:border-l border-white/10 flex flex-col p-6 overflow-y-auto no-scrollbar pb-12">
          <AnimatePresence mode="wait">
            {activeTab === "adjust" ? (
              <motion.div
                key="adjust"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-8"
              >
                {/* Adjustment List */}
                <div className="space-y-8">
                  <div className="flex flex-wrap gap-3">
                    {(["light", "color", "detail", "effects"] as AdjustmentCategory[]).map(
                      (cat) => (
                        <button
                          key={cat}
                          onClick={() => {
                            setActiveCategory(cat);
                            setActiveAdjustment(ADJUSTMENTS[cat][0].id);
                          }}
                          className={cn(
                            "px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest border transition-all",
                            activeCategory === cat
                              ? "bg-indigo-600 border-indigo-500 text-white"
                              : "bg-white/5 border-white/10 text-white/40"
                          )}
                        >
                          {cat}
                        </button>
                      )
                    )}
                  </div>

                  <div className="grid grid-cols-4 gap-4">
                    {ADJUSTMENTS[activeCategory].map((adj) => (
                      <button
                        key={adj.id}
                        onClick={() => setActiveAdjustment(adj.id)}
                        className={cn(
                          "flex flex-col items-center gap-2 group transition-all",
                          activeAdjustment === adj.id ? "scale-105" : "opacity-40"
                        )}
                      >
                        <div
                          className={cn(
                            "w-12 h-12 rounded-2xl flex items-center justify-center border transition-all",
                            activeAdjustment === adj.id
                              ? "bg-indigo-600 border-indigo-400 rotate-3 shadow-lg"
                              : "bg-white/5 border-white/10 group-hover:bg-white/10"
                          )}
                        >
                          <adj.icon className="w-5 h-5 text-white" />
                        </div>
                        <span className="text-[8px] font-black uppercase tracking-tighter text-white/60">
                          {adj.label}
                        </span>
                      </button>
                    ))}
                  </div>

                  {/* Slider Control */}
                  <div className="bg-white/5 p-6 rounded-3xl border border-white/10">
                    <div className="flex items-center justify-between mb-6">
                      <span className="text-[10px] font-black text-white/50 tracking-[0.2em] uppercase">
                        {
                          Object.values(ADJUSTMENTS)
                            .flat()
                            .find((a) => a.id === activeAdjustment)?.label
                        }
                      </span>
                      <span className="text-xl font-black text-indigo-400">
                        {values[activeAdjustment] > 0
                          ? `+${values[activeAdjustment]}`
                          : values[activeAdjustment]}
                      </span>
                    </div>
                    <Slider
                      value={[values[activeAdjustment]]}
                      min={
                        Object.values(ADJUSTMENTS)
                          .flat()
                          .find((a) => a.id === activeAdjustment)?.min
                      }
                      max={
                        Object.values(ADJUSTMENTS)
                          .flat()
                          .find((a) => a.id === activeAdjustment)?.max
                      }
                      step={1}
                      onValueChange={(v) =>
                        setValues((prev) => ({ ...prev, [activeAdjustment]: v[0] }))
                      }
                      className="w-full"
                    />
                    <div className="flex justify-center mt-6">
                      <button
                        onClick={() => {
                          const adj = Object.values(ADJUSTMENTS)
                            .flat()
                            .find((a) => a.id === activeAdjustment);
                          if (adj)
                            setValues((prev) => ({
                              ...prev,
                              [activeAdjustment]: adj.defaultValue,
                            }));
                        }}
                        className="flex items-center gap-2 text-[9px] font-bold text-white/20 hover:text-white/60 uppercase tracking-widest transition-colors"
                      >
                        <RotateCcw className="w-3 h-3" /> Reset
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="filter"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <div className="grid grid-cols-2 gap-4">
                  {PRESETS.map((preset) => (
                    <button
                      key={preset.id}
                      onClick={() => setSelectedPreset(preset.id)}
                      className={cn(
                        "relative aspect-square rounded-3xl overflow-hidden border-2 transition-all p-1",
                        selectedPreset === preset.id
                          ? "border-indigo-600 bg-indigo-600/20"
                          : "border-white/5 bg-white/5 hover:border-white/20"
                      )}
                    >
                      <div className="w-full h-full rounded-2xl overflow-hidden relative">
                        <NextImage
                          src={image}
                          alt={preset.name}
                          fill
                          unoptimized
                          style={{ filter: preset.filter }}
                          className="object-contain bg-black/40"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                        <span className="absolute bottom-3 left-3 text-[10px] font-black text-white uppercase tracking-wider">
                          {preset.name}
                        </span>
                        {selectedPreset === preset.id && (
                          <div className="absolute top-2 right-2 w-5 h-5 bg-white rounded-full flex items-center justify-center">
                            <Check className="w-3 h-3 text-indigo-600 stroke-[4px]" />
                          </div>
                        )}
                      </div>
                    </button>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      <canvas ref={canvasRef} className="hidden" />

      <style jsx global>{`
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
};
