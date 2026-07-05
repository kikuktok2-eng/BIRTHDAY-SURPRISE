"use client";

import { motion } from "framer-motion";
import { ArrowLeft, Sparkles } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

// ==========================================
// 1. EFEK PARTIKEL CAHAYA MELAYANG (MAGIC SPARKLES)
// ==========================================
function FloatingSparkles() {
  const [particles, setParticles] = useState<{ id: number; left: number; top: number; scale: number; duration: number; delay: number }[]>([]);

  useEffect(() => {
    // Membuat 20 partikel cahaya keemasan yang melayang lembut ke atas
    const generatedParticles = Array.from({ length: 20 }).map((_, i) => ({
      id: i,
      left: Math.random() * 100,
      top: Math.random() * 100,
      scale: Math.random() * 0.6 + 0.4,
      duration: Math.random() * 6 + 6,
      delay: Math.random() * -10,
    }));
    setParticles(generatedParticles);
  }, []);

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          initial={{ y: "100%", opacity: 0 }}
          animate={{
            y: "-10%",
            opacity: [0, 0.8, 0.8, 0],
            x: [0, Math.sin(p.id) * 30, -Math.sin(p.id) * 20, 0],
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            delay: p.delay,
            ease: "linear",
          }}
          className="absolute w-1 h-1 bg-amber-200 rounded-full shadow-[0_0_8px_#fde047]"
          style={{
            left: `${p.left}%`,
            top: `${p.top}%`,
            transform: `scale(${p.scale})`,
          }}
        />
      ))}
    </div>
  );
}

// ==========================================
// 2. MAIN COMPONENT (GIFT PAGE)
// ==========================================
export default function GiftPage() {
  const router = useRouter();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 25 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } },
  };

  return (
    <main className="relative min-h-screen overflow-x-hidden flex flex-col items-center justify-start bg-[#050505] text-white px-6 py-16 select-none font-sans">
      
      {/* PARTIKEL CAHAYA ELEGAN */}
      <FloatingSparkles />

      {/* BACKGROUND GLOW (AMBIENT LIGHT) */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-rose-500/5 blur-[150px] rounded-full" />
        <div className="absolute top-1/3 left-1/3 w-[350px] h-[350px] bg-amber-500/5 blur-[130px] rounded-full animate-pulse" style={{ animationDuration: '8s' }} />
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 max-w-xl w-full flex flex-col items-center text-center"
      >
        
        {/* ==========================================
            ESTETIK VEKTOR TULIP BOUQUET (HIGH ART FIDELITY)
           ========================================== */}
        <motion.div 
          variants={itemVariants}
          className="relative w-full max-w-[280px] aspect-[4/5] flex items-center justify-center mb-8"
        >
          {/* Efek Pendaran Belakang (Halo Glow) */}
          <div className="absolute w-[200px] h-[200px] bg-rose-500/10 blur-[50px] rounded-full animate-pulse" style={{ animationDuration: '4s' }} />

          {/* SVG ILUSTRASI TULIP MEWAH & MINIMALIS */}
          <motion.svg
            animate={{ y: [0, -6, 0] }}
            transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
            className="w-full h-full drop-shadow-[0_0_20px_rgba(244,63,94,0.3)] filter"
            viewBox="0 0 200 240"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              {/* Gradasi Lembut Kelopak Tulip */}
              <linearGradient id="roseTulip" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#fda4af" />
                <stop offset="60%" stopColor="#f43f5e" />
                <stop offset="100%" stopColor="#9f1239" />
              </linearGradient>
              <linearGradient id="peachTulip" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#fef08a" />
                <stop offset="40%" stopColor="#fb923c" />
                <stop offset="100%" stopColor="#e11d48" />
              </linearGradient>
              <linearGradient id="stemGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#4ade80" opacity="0.8" />
                <stop offset="100%" stopColor="#065f46" opacity="0.4" />
              </linearGradient>
              {/* Glow Filter */}
              <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="6" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
              </filter>
            </defs>

            {/* Daun & Tangkai Estetik */}
            <g strokeLinecap="round">
              {/* Tangkai Kiri */}
              <path d="M75,100 C80,140 95,170 100,210" stroke="url(#stemGrad)" strokeWidth="3" />
              {/* Tangkai Tengah */}
              <path d="M100,90 L100,210" stroke="url(#stemGrad)" strokeWidth="3.5" />
              {/* Tangkai Kanan */}
              <path d="M125,110 C120,150 105,170 100,210" stroke="url(#stemGrad)" strokeWidth="3" />
              
              {/* Daun Melengkung Halus */}
              <path d="M100,160 C80,145 65,150 60,170 C70,185 90,185 100,210" fill="url(#stemGrad)" opacity="0.3" />
              <path d="M100,170 C120,155 135,160 140,180 C130,195 110,195 100,210" fill="url(#stemGrad)" opacity="0.3" />
            </g>

            {/* BUNGA 1: Tulip Tengah (Warm Sunset Peach) */}
            <g filter="url(#glow)">
              {/* Kelopak Belakang */}
              <path d="M100,45 C88,45 80,65 100,90 C120,65 112,45 100,45 Z" fill="url(#peachTulip)" opacity="0.8" />
              {/* Kelopak Kiri */}
              <path d="M100,90 C82,90 76,60 90,48 C100,62 100,75 100,90 Z" fill="url(#peachTulip)" />
              {/* Kelopak Kanan */}
              <path d="M100,90 C118,90 124,60 110,48 C100,62 100,75 100,90 Z" fill="url(#peachTulip)" />
            </g>

            {/* BUNGA 2: Tulip Kiri (Soft Rose Pink - Sedikit Miring) */}
            <g transform="translate(-5, 10) rotate(-12, 75, 100)">
              <path d="M75,65 C65,65 58,80 75,100 C92,80 85,65 75,65 Z" fill="url(#roseTulip)" opacity="0.8" />
              <path d="M75,100 C60,100 55,75 67,66 C75,77 75,88 75,100 Z" fill="url(#roseTulip)" />
              <path d="M75,100 C90,100 95,75 83,66 C75,77 75,88 75,100 Z" fill="url(#roseTulip)" />
            </g>

            {/* BUNGA 3: Tulip Kanan (Deep Crimson Red - Kuncup Anggun) */}
            <g transform="translate(5, 15) rotate(12, 125, 110)">
              <path d="M125,75 C117,75 110,90 125,110 C140,90 133,75 125,75 Z" fill="url(#roseTulip)" opacity="0.75" />
              <path d="M125,110 C112,110 108,88 118,80 C125,90 125,100 125,110 Z" fill="url(#roseTulip)" />
              <path d="M125,110 C138,110 142,88 132,80 C125,90 125,100 125,110 Z" fill="url(#roseTulip)" />
            </g>

            {/* Pita Ikat Minimalis (Aesthetic Wrap) */}
            <path d="M85,160 Q100,165 115,160 Q100,172 85,160" fill="#f43f5e" />
            <circle cx="100" cy="162" r="3" fill="#fda4af" />
          </motion.svg>

          {/* Label Tipis yang Elegan */}
          <span className="absolute bottom-2 bg-white/[0.03] backdrop-blur-md border border-white/10 px-4 py-1.5 rounded-full text-[10px] uppercase tracking-[0.25em] text-pink-300 font-medium">
            Luminescent Tulip ✧
          </span>
        </motion.div>

        {/* ==========================================
            PESAN SURAT YANG MENYENTUH & ELEGAN
           ========================================== */}
        <motion.div variants={itemVariants} className="space-y-6 px-4 md:px-8">
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight bg-gradient-to-r from-amber-200 via-pink-100 to-rose-200 bg-clip-text text-transparent">
            Maaf ya, Sayang...
          </h2>

          <div className="space-y-4 text-gray-300/80 text-[14px] md:text-[15px] leading-relaxed font-light text-justify">
            <p>
              Di hari spesialmu yang sangat indah ini, aku ingin meminta maaf dari lubuk hatiku yang terdalam... karena aku belum bisa berada di sampingmu secara langsung, memelukmu erat, membawakan sebuket bunga segar yang harum, atau memberikan kado fisik yang bisa kamu genggam hari ini.
            </p>
            <p>
              Ada sedikit rasa sedih di hatiku karena belum bisa memberikan hadiah nyata yang layak untuk menyempurnakan hari lahirmu hari ini.
            </p>
            <p>
              Tapi lewat buket bunga tulip digital ini—yang kurancang lembar demi lembar kelopaknya dengan segenap rasa sayang—aku ingin mengirimkan sesuatu yang abadi. Bunga asli di dunia nyata suatu hari nanti pasti akan layu dan kering... namun tulip bercahaya di layarmu ini **tidak akan pernah pudar**, melambangkan rasa kagum, sayang, dan doaku untukmu yang akan selalu hidup melintasi waktu.
            </p>
            <p className="text-pink-200/90 font-medium italic bg-pink-500/5 py-3.5 px-4 rounded-xl border border-pink-500/10 text-xs md:text-sm text-center">
              "Terima kasih sudah lahir ke dunia ini dan mengizinkanku menjadi bagian dari kisahmu. Senyum bahagiamu adalah kado terbesarku. Aku menyayangimu selamanya, Aulia. ❤️"
            </p>
          </div>
        </motion.div>

        {/* ==========================================
            TOMBOL NAVIGASI KEMBALI
           ========================================== */}
        <motion.div variants={itemVariants} className="mt-10 flex flex-col items-center justify-center w-full">
          <button
            onClick={() => router.back()}
            className="group flex items-center justify-center gap-2.5 text-xs font-semibold uppercase tracking-[0.2em] text-pink-400 hover:text-pink-300 transition-colors duration-300 py-3 px-6 bg-pink-500/5 hover:bg-pink-500/10 border border-pink-500/20 rounded-full cursor-pointer shadow-[0_5px_15px_rgba(236,72,153,0.03)]"
          >
            <ArrowLeft size={12} className="transition-transform group-hover:-translate-x-1" />
            Baca Surat Kembali
          </button>
        </motion.div>

      </motion.div>

      {/* FOOTER */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.15 }}
        transition={{ delay: 2.5, duration: 1 }}
        className="absolute bottom-6 text-[9px] text-gray-500 tracking-[0.25em] uppercase pointer-events-none"
      >
        LUMINOUS BLOOM • DEAR MY SURPRISE
      </motion.p>
    </main>
  );
}