"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { Tag, Sparkles, ChevronLeft, ChevronRight } from "lucide-react";

interface Promo {
  id: number;
  name: string;
  code: string;
  discount: number;
  image: string;
}

export default function PromoCarousel() {
  const [promos, setPromos] = useState<Promo[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const storedPromos = localStorage.getItem("promos");
    if (storedPromos) {
      try {
        const parsedPromos: Promo[] = JSON.parse(storedPromos);
        setPromos(parsedPromos);
      } catch (error) {
        console.error("Error parsing promos from localStorage", error);
        setPromos([]);
      }
    }
  }, []);

  const nextSlide = () => {
    if (promos.length > 0) {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % promos.length);
    }
  };

  const prevSlide = () => {
    if (promos.length > 0) {
      setCurrentIndex((prevIndex) => (prevIndex - 1 + promos.length) % promos.length);
    }
  };

  if (promos.length === 0) {
    return (
      <div className="w-full h-[600px] flex flex-col items-center justify-center bg-neutral-900 border-y border-white/5">
        <Sparkles className="w-12 h-12 text-neutral-700 mb-4" />
        <p className="text-neutral-500 font-bold tracking-widest uppercase text-xs">
          Exhibition Coming Soon
        </p>
      </div>
    );
  }

  return (
    <section className="bg-black py-24 overflow-hidden">
      <div className="container mx-auto px-6 mb-16 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h2 className="text-white text-5xl font-black uppercase tracking-tighter italic">
            LIMITED OFFERS
          </h2>
          <p className="text-neutral-500 mt-2 font-light">
            Exclusive deals for our premier studio locations.
          </p>
        </div>
        <div className="flex gap-4">
          <button
            onClick={prevSlide}
            className="p-4 rounded-full border border-white/10 text-white hover:bg-white/5 transition-colors"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button
            onClick={nextSlide}
            className="p-4 rounded-full border border-white/10 text-white hover:bg-white/5 transition-colors"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>
      </div>

      <div className="relative w-full max-w-7xl mx-auto h-[600px] px-6">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full h-full rounded-[3rem] overflow-hidden group shadow-2xl shadow-indigo-500/10"
          >
            <Image
              src={promos[currentIndex].image}
              alt={promos[currentIndex].name}
              layout="fill"
              objectFit="cover"
              className="w-full h-full group-hover:scale-105 transition-transform duration-1000"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />

            <div className="absolute top-8 left-8">
              <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-xl border border-white/20 text-white text-xs font-bold tracking-widest uppercase">
                <Tag className="w-4 h-4 text-indigo-400" />
                <span>FLASH DEAL</span>
              </div>
            </div>

            <div className="absolute bottom-12 left-12 right-12">
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                <h3 className="text-white text-5xl md:text-7xl font-black uppercase tracking-tighter mb-4 italic">
                  {promos[currentIndex].name}
                </h3>
                <div className="flex flex-wrap items-center gap-6">
                  <p className="text-indigo-400 text-3xl font-black italic">
                    SAVE {promos[currentIndex].discount}%
                  </p>
                  <div className="h-2 w-2 rounded-full bg-neutral-600 hidden md:block" />
                  <p className="text-white/60 text-xl font-medium">
                    Use code{" "}
                    <span className="text-white font-bold">{promos[currentIndex].code}</span> at
                    checkout
                  </p>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
