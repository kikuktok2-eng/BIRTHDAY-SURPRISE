"use client";

import { motion } from "framer-motion";
import { Heart, Sparkles, Star, ArrowLeft, Gift } from "lucide-react";
import { useRouter } from "next/navigation";
import { useRef, useEffect, useState } from "react";

// ==========================================
// 1. KOMPONEN EFFECT LOVE DROPS (LEBIH BESAR & JELAS)
// ==========================================
function LoveDrops() {
  const [hearts, setHearts] = useState<{ id: number; left: number; scale: number; duration: number; delay: number; sway: number }[]>([]);

  useEffect(() => {
    // Membuat 25 partikel hati yang lebih besar dan padat
    const generatedHearts = Array.from({ length: 25 }).map((_, i) => ({
      id: i,
      left: Math.random() * 100,
      scale: Math.random() * 0.6 + 0.7, // Diperbesar (0.7 sampai 1.3) agar tidak kekecilan
      duration: Math.random() * 6 + 6,  // Kecepatan jatuh yang anggun (6 - 12 detik)
      delay: Math.random() * -12,       // Langsung memenuhi layar saat halaman dibuka
      sway: Math.random() * 50 - 25,    // Gerakan meliuk lembut ke kanan-kiri
    }));
    setHearts(generatedHearts);
  }, []);

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
      {hearts.map((heart) => (
        <motion.div
          key={heart.id}
          initial={{ y: "-10vh", opacity: 0, rotate: 0 }}
          animate={{
            y: "105vh",
            x: [0, heart.sway, -heart.sway, heart.sway / 2, 0],
            opacity: [0, 0.6, 0.6, 0], // Opacity dinaikkan ke 60% agar lebih tebal & jelas
            rotate: [0, Math.random() * 360 - 180],
          }}
          transition={{
            duration: heart.duration,
            repeat: Infinity,
            delay: heart.delay,
            ease: "easeInOut",
          }}
          className="absolute text-pink-500/60" // Warna merah muda yang lebih tegas
          style={{
            left: `${heart.left}%`,
          }}
        >
          <Heart size={28} fill="currentColor" style={{ transform: `scale(${heart.scale})` }} />
        </motion.div>
      ))}
    </div>
  );
}

// ==========================================
// 2. MAIN COMPONENT (LETTER PAGE)
// ==========================================
export default function LetterPage() {
  const router = useRouter();
  const videoRef = useRef<HTMLVideoElement>(null);
  
  // State untuk kontrol suara video
  const [isMuted, setIsMuted] = useState(true);

  // Animasi masuk untuk elemen di dalam kartu (Stagger Effect)
  const containerVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
        duration: 0.8,
        ease: "easeOut",
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  };

  return (
    <main className="relative min-h-screen overflow-x-hidden flex flex-col items-center justify-start bg-[#030303] text-white px-6 py-16 select-none">
      
      {/* EFFECT LOVE DROPS */}
      <LoveDrops />

      {/* BACKGROUND GLOW EFFECTS */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-pink-500/10 blur-[150px] rounded-full animate-pulse" style={{ animationDuration: '8s' }} />
        <div className="absolute bottom-1/4 right-1/4 w-[550px] h-[550px] bg-fuchsia-600/10 blur-[180px] rounded-full animate-pulse" style={{ animationDuration: '12s' }} />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.015),transparent_70%)]" />
      </div>

      {/* FLOATING STARS EFFECT */}
      <div className="absolute inset-0 pointer-events-none z-0">
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            animate={{
              y: [0, -50, 0],
              opacity: [0.15, 0.6, 0.15],
              scale: [1, 1.25, 1],
            }}
            transition={{
              duration: 6 + i * 1.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute hidden md:block text-pink-400/30"
            style={{
              top: `${10 + i * 12}%`,
              left: `${5 + (i * 19) % 90}%`,
            }}
          >
            <Star size={14 + i * 3} fill="currentColor" className="opacity-40" />
          </motion.div>
        ))}
      </div>

      {/* MAIN CONTENT CARD (DIAM & STABIL) */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 max-w-2xl w-full text-center flex flex-col items-center bg-white/[0.02] border border-white/10 backdrop-blur-3xl rounded-3xl p-8 md:p-12 shadow-[0_30px_60px_rgba(0,0,0,0.8)] border-pink-500/10 shadow-[0_0_50px_rgba(236,72,153,0.05)] mt-6"
      >
        
        {/* ICON HEART WITH GLOW EFFECT */}
        <motion.div variants={itemVariants} className="relative mb-6">
          <motion.div 
            animate={{ scale: [1, 1.08, 1] }}
            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
            className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-tr from-pink-500 via-rose-500 to-amber-400 shadow-[0_0_25px_rgba(236,72,153,0.5),0_0_50px_rgba(244,63,94,0.2)]"
          >
            <Heart size={26} fill="white" className="text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.3)]" />
          </motion.div>
          <Sparkles className="absolute -top-1 -right-2 text-yellow-300 animate-spin" size={18} style={{ animationDuration: '8s' }} />
        </motion.div>

        {/* THE NAME */}
        <motion.div variants={itemVariants} className="space-y-2">
          <span className="text-xs uppercase tracking-[0.3em] text-pink-400 font-bold block opacity-90">
            Special Dedicated To
          </span>
          <h1 className="text-3xl md:text-5xl font-black tracking-tight leading-none bg-gradient-to-r from-white via-pink-100 to-fuchsia-200 bg-clip-text text-transparent py-2">
            Aulia Fairosa Nur Aini
          </h1>
        </motion.div>

        {/* SEPARATOR */}
        <motion.div 
          variants={itemVariants} 
          className="w-20 h-[2px] bg-gradient-to-r from-transparent via-pink-500/60 to-transparent my-6"
        />

        {/* DEEP LOVE LETTER */}
        <motion.div variants={itemVariants} className="space-y-6 text-gray-300/90 text-base md:text-[17px] leading-relaxed font-light">
          <p>
            Selamat ulang tahun, Sayang. Hari ini semesta sedang tersenyum lebar karena merayakan lahirnya jiwa seindah kamu ke dunia ini.
          </p>
          <p>
            Terima kasih ya, sudah menjadi <span className="text-pink-300 font-medium drop-shadow-[0_0_10px_rgba(244,63,94,0.2)]"></span> yang selalu kuat, penuh kasih, dan membawa banyak kebahagiaan di hidupku. Kehadiranmu itu seperti cahaya hangat di malam yang dingin—selalu menenangkan dan tidak pernah gagal membuatku bersyukur.
          </p>

          {/* INTEGRATED AUTOPLAY VIDEO SECTION */}
          <motion.div 
            variants={itemVariants}
            className="relative my-8 w-full aspect-video rounded-2xl overflow-hidden border border-white/10 shadow-[0_15px_35px_rgba(0,0,0,0.6)] bg-black"
          >
            <video
              ref={videoRef}
              className="w-full h-full object-cover"
              src="/oca.mp4"
              autoPlay
              loop
              muted={isMuted}
              playsInline
            />
            
            <button
              onClick={() => setIsMuted(!isMuted)}
              className="absolute bottom-4 right-4 z-20 bg-black/70 hover:bg-pink-600/90 backdrop-blur-md text-white text-xs px-3.5 py-2 rounded-full flex items-center gap-1.5 transition-all duration-300 active:scale-95 shadow-lg font-medium"
            >
              {isMuted ? (
                <><span>Heii, Nyalain Suaraku! 🔊</span></>
              ) : (
                <><span>Matikan Suara 🔇</span></>
              )}
            </button>

            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />
          </motion.div>

          <p>
            Di usiamu yang baru ini, aku tidak meminta banyak hal rumit kepada dunia. Aku hanya berdoa agar senyum manismu itu tidak pernah pudar, agar lelahmu selalu digantikan bahagia, dan agar langkah kakimu selalu dituntun menuju takdir-takdir terbaik.
          </p>
          <p className="text-pink-200/90 font-medium italic bg-pink-500/5 py-3 px-4 rounded-xl border border-pink-500/10">
            "Semoga kamu selalu mencintai dirimu sendiri, sama besarnya seperti aku yang selalu mengagumi dan menyayangimu di setiap detiknya. Selamat hari spesial, cintaku. ❤️"
          </p>
        </motion.div>

        {/* BOTTOM NAVIGATION & NEXT PAGE BUTTON */}
        <motion.div 
          variants={itemVariants} 
          className="mt-12 flex flex-col items-center justify-center w-full gap-6"
        >
          {/* TOMBOL HALAMAN BERIKUTNYA */}
          <button
            onClick={() => router.push("/hadiah")} 
            className="group relative flex items-center justify-center gap-2.5 bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white font-medium text-sm tracking-wide py-3.5 px-7 rounded-full shadow-[0_10px_20px_rgba(236,72,153,0.15)] hover:shadow-[0_15px_30px_rgba(236,72,153,0.3)] transition-all duration-300 active:scale-95 cursor-pointer max-w-full"
          >
            <Gift size={16} className="animate-pulse text-white/90" />
            <span className="relative z-10">Ada Hadiah Satu Lagi ✨</span>
            
            {/* Sorot Cahaya Halus saat Hover */}
            <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-white/0 via-white/10 to-white/0 -translate-x-full group-hover:animate-[shimmer_1.5s_infinite] rounded-full" />
          </button>

          {/* TOMBOL KEMBALI */}
          <button
            onClick={() => router.push("/")}
            className="group flex items-center justify-center gap-2 text-[11px] font-medium uppercase tracking-[0.2em] text-gray-500 hover:text-pink-400 transition-colors duration-300 py-2 px-4 cursor-pointer"
          >
            <ArrowLeft size={12} className="transition-transform group-hover:-translate-x-1" />
            Back to Front
          </button>
        </motion.div>

      </motion.div>

      {/* COMPLEMENTARY FLOATING TEXT */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.25 }}
        transition={{ delay: 2.5, duration: 1 }}
        className="absolute bottom-6 text-[10px] text-gray-500 tracking-[0.25em] uppercase pointer-events-none"
      >
       By Kukz 2026
      </motion.p>
    </main>
  );
}