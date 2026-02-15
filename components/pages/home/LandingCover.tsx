"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Camera, ArrowRight, Star } from "lucide-react";

interface LandingCoverProps {
  onStart: () => void;
}

export function LandingCover({ onStart }: LandingCoverProps) {
  return (
    <div className="relative h-screen w-full bg-black overflow-hidden selection:bg-indigo-500/30">
      {/* Simple Background Pattern */}
      <div className="absolute inset-0 bg-dots opacity-20" />

      <div className="relative z-50 h-full w-full max-w-7xl mx-auto px-6 flex flex-col items-center justify-center text-center">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-indigo-300 text-[10px] font-black tracking-[0.2em] uppercase shadow-2xl">
            <Star className="w-3 h-3 fill-indigo-400" />
            <span>Premium Photobooth Experience</span>
            <Star className="w-3 h-3 fill-indigo-400" />
          </div>
        </motion.div>

        {/* Main Headline */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="mb-6 relative"
        >
          <h1 className="text-8xl md:text-9xl font-black text-white tracking-tighter leading-[0.95] italic uppercase ">
            REDEFINE <br />
          </h1>
          <h1 className="text-8xl md:text-9xl font-black text-white tracking-tighter leading-[0.95] italic uppercase ">
            MOMENTS <br />
          </h1>

          {/* Ambient Glow - Simplified */}
          <div className="absolute -top-10 -left-10 w-40 h-40 bg-indigo-600/10 rounded-full blur-[80px]" />
        </motion.div>

        {/* Subtext */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="max-w-2xl mx-auto mb-12"
        >
          <p className="text-neutral-400 text-lg md:text-xl font-light leading-relaxed tracking-tight">
            Transform your events into art. High-fidelity prints meets
            <span className="text-white font-medium"> cinematic digital experiences.</span>
          </p>
        </motion.div>

        {/* CTA Grid */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="flex flex-col sm:flex-row items-center gap-6"
        >
          <Button
            size="lg"
            onClick={onStart}
            className="group relative h-20 px-10 text-xl font-black bg-white text-black hover:bg-neutral-200 transition-all rounded-full flex items-center gap-4 border-none shadow-[0_20px_50px_rgba(255,255,255,0.1)]"
          >
            <Camera className="w-6 h-6 group-hover:rotate-12 transition-transform" />
            LAUNCH STUDIO
            <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
          </Button>
        </motion.div>

        {/* Stats - Simplified */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mt-20 pt-12 border-t border-white/5 w-full flex flex-wrap justify-center gap-12 md:gap-24"
        >
          {[
            { label: "Active Studios", value: "240+" },
            { label: "Captured Moments", value: "1.2M" },
            { label: "Partner Brands", value: "45" },
          ].map((stat, i) => (
            <div key={i} className="text-center">
              <p className="text-2xl md:text-3xl font-black text-white">{stat.value}</p>
              <p className="text-[9px] text-neutral-500 uppercase tracking-[0.2em] font-black mt-1">
                {stat.label}
              </p>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
