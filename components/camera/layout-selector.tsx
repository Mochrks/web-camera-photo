"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  Star,
  Layout as LayoutIcon,
  Sparkles,
  Heart,
  Zap,
  Camera,
  Film,
  Image as ImageIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface LayoutSelectorProps {
  onSelect: (layoutId: number, requiredPhotos: number) => void;
}

const LayoutSelector: React.FC<LayoutSelectorProps> = ({ onSelect }) => {
  const layouts = [
    {
      id: 1,
      name: "Classic Vertical",
      count: 3,
      tag: "Classic",
      icon: Film,
      desc: "3 vertical slots for a timeless feel",
    },
    {
      id: 2,
      name: "Modern Grid",
      count: 4,
      tag: "Pro",
      icon: LayoutIcon,
      desc: "2x2 grid for dynamic shots",
    },
    {
      id: 3,
      name: "Retro Polaroid",
      count: 3,
      tag: "Vintage",
      icon: ImageIcon,
      desc: "Overlapping frames with vintage border",
    },
    {
      id: 4,
      name: "Minimal Wide",
      count: 3,
      tag: "Clean",
      icon: Camera,
      desc: "Wide format for cinematic portraits",
    },
    {
      id: 5,
      name: "Cinematic Circle",
      count: 3,
      tag: "Modern",
      icon: Zap,
      desc: "Focus on your smile with round frames",
    },
    {
      id: 6,
      name: "Vintage Film",
      count: 3,
      tag: "Retro",
      icon: Film,
      desc: "Film strip style horizontal shots",
    },
    {
      id: 7,
      name: "Pastel 4-Cut",
      count: 4,
      tag: "Korean",
      icon: Heart,
      desc: "Trendy Korean style 4-cut strip",
    },
    {
      id: 8,
      name: "Neo Tokyo",
      count: 4,
      tag: "Cyber",
      icon: Zap,
      desc: "High contrast glow and neon accents",
    },
    {
      id: 9,
      name: "Kawaii Pink",
      count: 3,
      tag: "Cute",
      icon: Heart,
      desc: "Pastel pink with adorable heart details",
    },
    {
      id: 10,
      name: "Y2K Sparkle",
      count: 3,
      tag: "Y2K",
      icon: Sparkles,
      desc: "Retro gradients and glitter effects",
    },
    {
      id: 11,
      name: "Cloud 9",
      count: 3,
      tag: "Dreamy",
      icon: Sparkles,
      desc: "Soft cloud patterns and airy layout",
    },
    {
      id: 12,
      name: "Gallery Wall",
      count: 3,
      tag: "Art",
      icon: ImageIcon,
      desc: "Artistic collage with varied sizes",
    },
    {
      id: 13,
      name: "Midnight",
      count: 4,
      tag: "Dark",
      icon: Star,
      desc: "Elegant deep blues and star patterns",
    },
    {
      id: 14,
      name: "Sunset Horz",
      count: 3,
      tag: "Warm",
      icon: Camera,
      desc: "Golden hour vibes with wide frames",
    },
    {
      id: 15,
      name: "Doodle Fun",
      count: 3,
      tag: "Handmade",
      icon: LayoutIcon,
      desc: "Cute hand-drawn border elements",
    },
    {
      id: 16,
      name: "Geometric",
      count: 4,
      tag: "Bold",
      icon: Zap,
      desc: "Sharp lines and vibrant pop colors",
    },
    {
      id: 17,
      name: "Studio Solo",
      count: 1,
      tag: "Minimal",
      icon: Camera,
      desc: "High-end single portrait layout",
    },
    {
      id: 18,
      name: "Sticker Bomb",
      count: 3,
      tag: "Trendy",
      icon: Sparkles,
      desc: "Decorated with fun virtual stickers",
    },
    {
      id: 19,
      name: "Hologram",
      count: 3,
      tag: "Future",
      icon: Zap,
      desc: "Iridescent borders and glow effects",
    },
    {
      id: 20,
      name: "News Retro",
      count: 3,
      tag: "Classic",
      icon: ImageIcon,
      desc: "Old newspaper style aged finish",
    },
  ];

  return (
    <div className="w-full min-h-screen flex flex-col items-center p-6 gap-12 mt-20 sm:mt-0 relative overflow-x-hidden">
      <div className="absolute inset-0 bg-dots opacity-5 pointer-events-none" />

      <div className="text-center z-10 space-y-4 max-w-2xl">
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-[10px] font-black tracking-widest uppercase"
        >
          <Sparkles className="w-3 h-3" />
          <span>Choose Your Frame</span>
        </motion.div>
        <h1 className="text-5xl md:text-7xl font-black text-white tracking-tighter uppercase italic leading-[0.9]">
          SELECT <span className="text-indigo-500">STYLE</span>
        </h1>
        <p className="text-neutral-500 text-sm font-medium tracking-tight">
          Choose from 20+ trendy studio layouts. Each one is designed for the perfect social media
          post.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl w-full z-10 pb-32">
        {layouts.map((layout, index) => (
          <motion.button
            key={layout.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.03 }}
            onClick={() => onSelect(layout.id, layout.count)}
            className="group relative bg-white/5 backdrop-blur-sm rounded-[2rem] p-5 border border-white/5 hover:border-indigo-500/50 hover:bg-white/[0.08] transition-all text-left flex flex-col gap-4 overflow-hidden"
          >
            {/* Preview Skeleton Replacement */}
            <div className="h-40 w-full rounded-2xl bg-neutral-900/50 flex items-center justify-center relative overflow-hidden group-hover:bg-neutral-800/50 transition-colors">
              <layout.icon className="w-12 h-12 text-white/10 group-hover:text-indigo-500/30 transition-all group-hover:scale-110" />
              <div className="absolute top-3 right-3 px-2 py-0.5 rounded-md bg-white/5 border border-white/10 text-[8px] font-black text-white/40 uppercase">
                {layout.count} Shots
              </div>
            </div>

            <div className="space-y-1">
              <div className="flex items-center justify-between">
                <span className="text-[8px] font-black text-indigo-500 uppercase tracking-widest">
                  {layout.tag}
                </span>
              </div>
              <h3 className="text-lg font-black text-white uppercase italic tracking-tight leading-tight">
                {layout.name}
              </h3>
              <p className="text-[10px] text-neutral-500 font-medium leading-tight h-8 overflow-hidden">
                {layout.desc}
              </p>
            </div>

            <div className="flex items-center justify-between pt-3 border-t border-white/5">
              <span className="text-[9px] font-black text-white/20 tracking-[0.2em]">
                S-ID.0{layout.id}
              </span>
              <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-indigo-600 transition-colors">
                <Star className="w-3 h-3 text-white group-hover:fill-current" />
              </div>
            </div>
          </motion.button>
        ))}
      </div>
    </div>
  );
};

export default LayoutSelector;
