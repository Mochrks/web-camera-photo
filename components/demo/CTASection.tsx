"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Camera, ArrowUpRight, Github, Instagram, Twitter } from "lucide-react";

export default function CTASection() {
  return (
    <section className="relative bg-neutral-950 overflow-hidden">
      {/* CTA Box */}
      <div className="container mx-auto px-6 py-32">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative rounded-[3rem] bg-indigo-600 p-12 md:p-24 text-center overflow-hidden"
        >
          {/* Abstract Shapes */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-black/20 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/2" />

          <div className="relative z-10 max-w-3xl mx-auto flex flex-col items-center gap-8">
            <h2 className="text-5xl md:text-7xl font-black text-white leading-none uppercase tracking-tighter italic">
              LET&apos;S SHOOT <br />
              SOMETHING GREAT
            </h2>
            <p className="text-indigo-100 text-lg md:text-xl font-medium leading-relaxed opacity-90">
              Whether it&apos;s a warehouse party in London or a corporate gala in Tokyo, we bring
              the studio to you. Book your date now.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-4">
              <Button
                size="lg"
                className="h-16 px-10 rounded-full bg-white text-black hover:bg-black hover:text-white transition-all duration-300 font-bold text-lg flex items-center gap-3 border-none shadow-2xl"
              >
                <Camera className="w-5 h-5" />
                CHECK AVAILABILITY
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="h-16 px-10 rounded-full border-white/20 text-white hover:bg-white/10 transition-all duration-300 font-bold text-lg flex items-center gap-3"
              >
                VIEW PORTFOLIO
                <ArrowUpRight className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Premium Footer */}
      <footer className="border-t border-white/5 pt-24 pb-12 px-6">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-20 text-center md:text-left">
            <div className="md:col-span-2">
              <h3 className="text-2xl font-black text-white mb-6 tracking-tighter uppercase italic">
                MEMORY BOOTH.
              </h3>
              <p className="text-neutral-500 max-w-sm leading-relaxed font-light">
                Elevating the art of event photography through high-end engineering and cinematic
                aesthetics.
              </p>
              <div className="flex items-center justify-center md:justify-start gap-6 mt-8">
                <Instagram className="w-5 h-5 text-neutral-400 hover:text-white cursor-pointer transition-colors" />
                <Twitter className="w-5 h-5 text-neutral-400 hover:text-white cursor-pointer transition-colors" />
                <Github className="w-5 h-5 text-neutral-400 hover:text-white cursor-pointer transition-colors" />
              </div>
            </div>

            <div>
              <h4 className="text-white font-bold mb-6 uppercase tracking-widest text-xs">
                Resources
              </h4>
              <ul className="space-y-4 text-neutral-500 font-medium text-sm">
                <li className="hover:text-indigo-400 transition-colors cursor-pointer">
                  Pricing Guide
                </li>
                <li className="hover:text-indigo-400 transition-colors cursor-pointer">
                  Booth Anatomy
                </li>
                <li className="hover:text-indigo-400 transition-colors cursor-pointer">
                  Case Studies
                </li>
                <li className="hover:text-indigo-400 transition-colors cursor-pointer">
                  Partner Portal
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-bold mb-6 uppercase tracking-widest text-xs">
                Company
              </h4>
              <ul className="space-y-4 text-neutral-500 font-medium text-sm">
                <li className="hover:text-indigo-400 transition-colors cursor-pointer">
                  The Studio
                </li>
                <li className="hover:text-indigo-400 transition-colors cursor-pointer">Culture</li>
                <li className="hover:text-indigo-400 transition-colors cursor-pointer">
                  Global Reach
                </li>
                <li className="hover:text-indigo-400 transition-colors cursor-pointer">Contact</li>
              </ul>
            </div>
          </div>

          <div className="flex flex-col md:flex-row items-center justify-between border-t border-white/5 pt-12 gap-6">
            <p className="text-neutral-500 text-xs font-bold tracking-widest uppercase">
              © {new Date().getFullYear()} MEMORY BOOTH INTERNATIONAL. ALL RIGHTS RESERVED.
            </p>
            <div className="flex items-center gap-8 text-neutral-500 text-xs font-bold tracking-widest uppercase">
              <span className="hover:text-white cursor-pointer">Privacy Policy</span>
              <span className="hover:text-white cursor-pointer">Terms of Service</span>
              <a
                href="https://github.com/Mochrks"
                className="text-indigo-500 hover:text-white transition-colors"
              >
                CRAFTED BY @MOCHRKS
              </a>
            </div>
          </div>
        </div>
      </footer>
    </section>
  );
}
