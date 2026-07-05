"use client";

import { motion, useMotionValue, useTransform } from "framer-motion";
import { ChevronRight, Gift, Sparkles, Heart } from "lucide-react";
import { useRouter } from "next/navigation";
import { useRef, useEffect, useState } from "react";

// --- EFEK PARTIKEL 3D BACKGROUND ---
function AmbientParticles() {
  const [particles, setParticles] = useState<{ id: number; left: number; top: number; scale: number; duration: number }[]>([]);

  useEffect(() => {
    const generated = Array.from({ length: 15 }).map((_, i) => ({
      id: i,
      left: Math.random() * 100,
      top: Math.random() * 100,
      scale: Math.random() * 0.7 + 0.3,
      duration: Math.random() * 5 + 4,
    }));
    setParticles(generated);
  }, []);

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-10">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          animate={{
            y: [0, -30, 0],
            x: [0, Math.random() * 20 - 10, 0],
            opacity: [0.1, 0.4, 0.1],
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute text-fuchsia-500/30"
          style={{
            left: `${p.left}%`,
            top: `${p.top}%`,
          }}
        >
          <Heart size={16} fill="currentColor" style={{ transform: `scale(${p.scale})` }} />
        </motion.div>
      ))}
    </div>
  );
}

// --- MAIN HERO COMPONENT ---
export default function Home() {
  const router = useRouter();
  const containerRef = useRef<HTMLDivElement>(null);

  // Motion value untuk menangkap koordinat kursor (Efek interaksi 3D)
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Transformasi rotasi kartu/konten utama berdasarkan posisi mouse
  const rotateX = useTransform(mouseY, [-400, 400], [8, -8]);
  const rotateY = useTransform(mouseX, [-400, 400], [-8, 8]);

  function handleMouseMove(event: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const x = event.clientX - rect.left - width / 2;
    const y = event.clientY - rect.top - height / 2;
    mouseX.set(x);
    mouseY.set(y);
  }

  function handleMouseLeave() {
    mouseX.set(0);
    mouseY.set(0);
  }

  return (
    <main 
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative min-h-screen overflow-hidden bg-[#030303] text-white flex items-center justify-center px-6 perspective-1000"
    >
      {/* BACKGROUND GLOW EFFECTS */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute left-1/2 top-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-fuchsia-600/10 blur-[160px] animate-pulse" />
        <div className="absolute -left-20 bottom-10 h-[450px] w-[450px] rounded-full bg-cyan-500/10 blur-[150px]" />
        <div className="absolute -right-20 top-10 h-[400px] w-[400px] rounded-full bg-pink-500/10 blur-[150px]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,.02),transparent_70%)]" />
      </div>

      {/* INTERACTIVE AMBIENT PARTICLES */}
      <AmbientParticles />

      {/* 3D INTERACTIVE CONTENT WRAPPER */}
      <motion.div
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        initial={{ opacity: 0, y: 50, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        className="relative z-20 mx-auto flex max-w-3xl flex-col items-center justify-center text-center py-12 px-8 rounded-3xl bg-white/[0.01] border border-white/5 backdrop-blur-3xl shadow-[0_30px_70px_rgba(0,0,0,0.7)] transition-shadow duration-500 hover:shadow-[0_0_50px_rgba(236,72,153,0.1)]"
      >
        {/* ICON - MELAYANG DENGAN EFEK 3D DEPTH */}
        <motion.div
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring" }}
          style={{ transform: "translateZ(50px)" }}
          className="mb-8 flex h-24 w-24 items-center justify-center rounded-full border border-pink-500/30 bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-2xl shadow-[0_0_50px_rgba(236,72,153,.3)]"
        >
          <Gift size={38} className="text-pink-400 drop-shadow-[0_0_15px_rgba(236,72,153,0.6)]" />
        </motion.div>

        {/* BADGE */}
        <motion.span
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          style={{ transform: "translateZ(30px)" }}
          className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-5 py-2 text-xs uppercase tracking-widest text-pink-300 backdrop-blur-xl"
        >
          <Sparkles size={14} className="animate-spin text-amber-300" style={{ animationDuration: '8s' }} />
          A Special Universe Built Just For You
        </motion.span>

        {/* TITLE - GRADASI MENYALA */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          style={{ transform: "translateZ(40px)" }}
          className="mt-8 text-4xl font-black leading-tight md:text-6xl tracking-tight"
        >
          Welcome to Your
          <br />
          <span className="bg-gradient-to-r from-pink-400 via-fuchsia-300 to-cyan-300 bg-clip-text text-transparent">
            Magical Day, Sayang.
          </span>
        </motion.h1>

        {/* DESCRIPTION KATA-KATA ROMANTIS BILINGUAL */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          style={{ transform: "translateZ(20px)" }}
          className="mx-auto mt-6 max-w-xl text-base md:text-lg leading-relaxed text-gray-400 font-light"
        >
          Today, let the world pause for a moment. Aku ingin mengajakmu melangkah masuk ke ruang kecil yang sengaja dirancang penuh kehangatan, khusus untuk merayakan kehadiranmu yang begitu berarti.
          <br /><br />
          <span className="text-pink-300/90 italic font-normal">
            "Because every beautiful soul deserves a beautiful celebration."
          </span>
          <br /><br />
          Every smile, every dream, and everything you are deserves to be loved completely today. Touch the button below to begin our little journey.
        </motion.p>

        {/* BUTTON INTERAKTIF GLOW */}
        <motion.button
          whileHover={{ scale: 1.05, y: -4 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => router.push("/birthday")} 
          style={{ transform: "translateZ(60px)" }}
          className="group mt-12 inline-flex items-center gap-3 rounded-full border border-pink-400/40 bg-gradient-to-r from-pink-500 via-fuchsia-500 to-violet-600 px-10 py-5 text-base font-semibold shadow-[0_0_40px_rgba(236,72,153,.4)] transition-all duration-300 hover:shadow-[0_0_70px_rgba(236,72,153,.7)] text-white"
        >
          <Heart size={18} fill="currentColor" className="text-white animate-pulse" />
          Open Your Surprise
          <ChevronRight
            size={18}
            className="transition-transform duration-300 group-hover:translate-x-1"
          />
        </motion.button>

        {/* FOOTER TEXT */}
        <motion.p
          animate={{ opacity: [0.3, 0.8, 0.3] }}
          transition={{ repeat: Infinity, duration: 4 }}
          className="mt-12 text-xs tracking-[6px] uppercase text-white-600 pointer-events-none"
        >
          By Kukz 2026
        </motion.p>
      </motion.div>
    </main>
  );
}