"use client";

import { motion } from "framer-motion";
import { Camera, Edit3, Share2, Zap, Shield, Sparkles } from "lucide-react";
import { BackgroundGradient } from "../ui/background-gradient";

const features = [
  {
    icon: Camera,
    title: "Studio Quality Optics",
    description: "High-fidelity DSLR capture with professional studio lighting for every shot.",
    color: "text-indigo-500",
    bg: "bg-indigo-500/10",
  },
  {
    icon: Edit3,
    title: "AI Smart Retouch",
    description: "Neural network powered skin smoothing and color grading in real-time.",
    color: "text-emerald-500",
    bg: "bg-emerald-500/10",
  },
  {
    icon: Share2,
    title: "Instant Cloud Sync",
    description: "Scan QR and get your high-res originals synced to your device instantly.",
    color: "text-amber-500",
    bg: "bg-amber-500/10",
  },
  {
    icon: Zap,
    title: "Ultra-Fast Printing",
    description: "Sub-10 second dye-sublimation prints that last a lifetime.",
    color: "text-rose-500",
    bg: "bg-rose-500/10",
  },
  {
    icon: Shield,
    title: "Enterprise Security",
    description: "Private encrypted galleries with password protection for every event.",
    color: "text-sky-500",
    bg: "bg-sky-500/10",
  },
  {
    icon: Sparkles,
    title: "Custom Overlays",
    description: "Bespoke branded frames and animations tailored to your theme.",
    color: "text-purple-500",
    bg: "bg-purple-500/10",
  },
];

export default function FeatureSection() {
  return (
    <section className="py-32 bg-neutral-950 px-6">
      <div className="container mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-24">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-6xl font-black text-white mb-6 uppercase tracking-tighter"
          >
            Engineered for <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-emerald-400">
              Excellence
            </span>
          </motion.h2>
          <p className="text-neutral-500 text-lg leading-relaxed">
            We don&apos;t just take pictures. We create a high-end digital experience powered by
            cutting-edge technology and aesthetic precision.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <BackgroundGradient className="rounded-[22px] p-0.5 h-full">
                <div className="bg-neutral-900 rounded-[21px] p-8 h-full flex flex-col items-start gap-6 border border-white/5 hover:border-white/10 transition-colors group">
                  <div
                    className={`p-4 rounded-2xl ${feature.bg} group-hover:scale-110 transition-transform duration-500`}
                  >
                    <feature.icon className={`w-8 h-8 ${feature.color}`} />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-white mb-3 tracking-tight group-hover:text-indigo-400 transition-colors">
                      {feature.title}
                    </h3>
                    <p className="text-neutral-400 leading-relaxed font-light">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </BackgroundGradient>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
