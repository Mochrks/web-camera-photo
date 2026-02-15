"use client";

import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { LandingCover } from "./LandingCover";

export default function Home() {
  const router = useRouter();

  const handleStart = () => {
    router.push("/capture");
  };

  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      className="flex flex-col min-h-screen bg-black overflow-x-hidden selection:bg-indigo-500/30"
    >
      {/* Ambient Noise / Texture Overlay */}
      <div className="fixed inset-0 z-10 pointer-events-none opacity-[0.03] bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />

      <section className="relative z-20 flex-1 flex flex-col">
        <LandingCover onStart={handleStart} />
      </section>

      {/* Minimal Footer */}
      <footer className="relative z-30 py-8 bg-black text-center border-t border-white/5">
        <p className="text-neutral-500 text-xs font-bold tracking-widest uppercase">
          © {new Date().getFullYear()} — CRAFTED BY{" "}
          <a
            href="https://github.com/Mochrks"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white hover:text-indigo-400 transition-colors underline underline-offset-4"
          >
            @MOCHRKS
          </a>
        </p>
      </footer>
    </motion.main>
  );
}
