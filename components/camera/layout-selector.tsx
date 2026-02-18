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
      name: "Wedding Elegance",
      count: 3,
      tag: "Wedding",
      icon: Heart,
      desc: "Luxury white & gold floral theme",
    },
    {
      id: 2,
      name: "Spotify Viral",
      count: 4,
      tag: "Music",
      icon: Film,
      desc: "Iconic music player interface",
    },
    {
      id: 3,
      name: "Birthday Party",
      count: 3,
      tag: "Birthday",
      icon: Sparkles,
      desc: "Festive blue with confetti effect",
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
      name: "Graduation Day",
      count: 3,
      tag: "Success",
      icon: Star,
      desc: "Classic black & gold achievement",
    },
    {
      id: 7,
      name: "Korean Photoism",
      count: 4,
      tag: "Photoism",
      icon: Heart,
      desc: "Authentic soft rainbow self-studio",
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
      name: "Y2K Futuro",
      count: 3,
      tag: "Cyber",
      icon: Zap,
      desc: "Metallic silver scanline aesthetic",
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
      name: "VOGUE Magazine",
      count: 3,
      tag: "Editorial",
      icon: ImageIcon,
      desc: "High-end fashion cover layout",
    },
  ];

  const LayoutPreview = ({ id, count }: { id: number; count: number }) => {
    // Generate mini skeletons based on layout ID
    const renderSkeleton = () => {
      switch (id) {
        case 1: // Wedding
          return (
            <div className="flex flex-col gap-1.5 w-full h-full p-4 bg-white/10">
              <div className="absolute inset-0 border-4 border-[#D4AF37]/30" />
              {[...Array(count)].map((_, i) => (
                <div key={i} className="flex-1 bg-white/20 rounded-sm border border-[#D4AF37]/20" />
              ))}
            </div>
          );
        case 2: // Spotify
          return (
            <div className="flex flex-col gap-2 w-full h-full p-4 bg-[#121212]">
              <div className="grid grid-cols-2 gap-1.5 flex-1">
                {[...Array(count)].map((_, i) => (
                  <div key={i} className="bg-white/5 rounded-sm" />
                ))}
              </div>
              <div className="h-1 w-full bg-[#1db954]/40 rounded-full" />
              <div className="h-4 w-2/3 bg-white/10 rounded-sm" />
            </div>
          );
        case 3: // Birthday
          return (
            <div className="flex flex-col gap-1.5 w-full h-full p-4 bg-blue-500/20">
              {[...Array(count)].map((_, i) => (
                <div
                  key={i}
                  className="flex-1 bg-white/20 rounded-sm border border-white/10 relative overflow-hidden"
                >
                  <div className="absolute top-0 right-0 w-4 h-4 bg-yellow-400/20 rounded-full" />
                </div>
              ))}
            </div>
          );
        case 6: // Graduation
          return (
            <div className="flex flex-col gap-1.5 w-full h-full p-4 bg-black/40">
              <div className="absolute top-0 w-full h-8 bg-[#D4AF37]/30" />
              {[...Array(count)].map((_, i) => (
                <div key={i} className="flex-1 bg-white/5 rounded-sm border border-[#D4AF37]/20" />
              ))}
            </div>
          );
        case 7: // Korean Photoism
          return (
            <div className="flex flex-col gap-1.5 w-full h-full p-4 bg-gradient-to-b from-orange-100/20 to-blue-100/20">
              {[...Array(count)].map((_, i) => (
                <div key={i} className="flex-1 bg-white/40 rounded-sm" />
              ))}
            </div>
          );
        case 10: // Y2K
          return (
            <div className="flex gap-2 w-full h-full p-4 bg-slate-800/40">
              {[...Array(count)].map((_, i) => (
                <div
                  key={i}
                  className="flex-1 bg-white/5 rounded-sm border border-cyan-400/30 shadow-[0_0_10px_rgba(34,211,238,0.2)]"
                />
              ))}
            </div>
          );
        case 20: // Vogue
          return (
            <div className="flex flex-col gap-4 w-full h-full p-6 bg-[#f5f5f7]">
              <div className="h-8 w-full bg-black/10 rounded-sm flex items-center justify-center text-[10px] font-serif text-black/40">
                V O G U E
              </div>
              <div className="flex-1 bg-black/5 rounded-sm border border-black/5" />
            </div>
          );
        default:
          return (
            <div className="flex gap-1.5 w-full h-full p-4">
              {[...Array(count)].map((_, i) => (
                <div key={i} className="flex-1 bg-white/10 rounded-md border border-white/5" />
              ))}
            </div>
          );
      }
    };

    return (
      <div className="h-full w-full relative group-hover:scale-105 transition-transform duration-500">
        {renderSkeleton()}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
      </div>
    );
  };

  return (
    <div className="w-full min-h-screen flex flex-col items-center p-6 gap-8 sm:gap-12 mt-12 sm:mt-0 relative overflow-x-hidden">
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
        <h1 className="text-4xl sm:text-5xl md:text-7xl font-black text-white tracking-tighter uppercase italic leading-[0.9]">
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
            {/* Visual Layout Preview */}
            <div className="h-44 w-full rounded-2xl bg-neutral-900/80 border border-white/5 flex items-center justify-center relative overflow-hidden group-hover:bg-neutral-800/80 transition-all duration-300">
              <LayoutPreview id={layout.id} count={layout.count} />

              <div className="absolute top-4 right-4 px-2 py-1 rounded-lg bg-indigo-600/90 text-[8px] font-black text-white uppercase tracking-widest shadow-lg transform rotate-2">
                {layout.count} SHOTS
              </div>

              {/* Decorative Glow */}
              <div className="absolute -bottom-10 -right-10 w-24 h-24 bg-indigo-600/20 blur-[30px] rounded-full group-hover:bg-indigo-500/40 transition-colors" />
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
