"use client";

import { useState, useRef, useEffect } from "react";
import { motion, useMotionValue, useTransform, useAnimation } from "framer-motion";
import confetti from "canvas-confetti";
import { Wind } from "lucide-react";
import { useRouter } from "next/navigation";

// --- EFEK BALON TERBANG 3D ---
function FloatingBalloons() {
  const [balloons, setBalloons] = useState<{ id: number; left: number; scale: number; duration: number; color: string; delay: number }[]>([]);

  useEffect(() => {
    const colors = [
      "from-pink-500/40 to-purple-600/30 shadow-pink-500/20",
      "from-cyan-500/40 to-blue-600/30 shadow-cyan-500/20",
      "from-fuchsia-500/40 to-pink-600/30 shadow-fuchsia-500/20",
      "from-violet-500/40 to-indigo-600/30 shadow-violet-500/20"
    ];
    
    const generated = Array.from({ length: 12 }).map((_, i) => ({
      id: i,
      left: Math.random() * 90 + 5,
      scale: Math.random() * 0.6 + 0.5,
      duration: Math.random() * 6 + 7,
      delay: Math.random() * 4,
      color: colors[Math.random() * colors.length | 0]
    }));
    setBalloons(generated);
  }, []);

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
      {balloons.map((b) => (
        <motion.div
          key={b.id}
          initial={{ y: "115vh", x: 0 }}
          animate={{
            y: "-15vh",
            x: [0, Math.random() * 40 - 20, 0]
          }}
          transition={{
            duration: b.duration,
            delay: b.delay,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute flex flex-col items-center"
          style={{ left: `${b.left}%`, transform: `scale(${b.scale})` }}
        >
          <div className={`w-14 h-18 rounded-full bg-gradient-to-b ${b.color} backdrop-blur-[1px] border border-white/10 shadow-[inset_-4px_-6px_20px_rgba(0,0,0,0.3),0_10px_30px_rgba(0,0,0,0.5)] relative`}>
            <div className="absolute top-2 left-3 w-3 h-5 bg-white/40 rounded-full rotate-12 blur-[0.5px]" />
          </div>
          <div className="w-[1px] h-16 bg-gradient-to-b from-white/30 to-transparent -mt-0.5" />
        </motion.div>
      ))}
    </div>
  );
}

// --- EFEK BINTANG BERKELAP-KELIP ---
function SparklingStars() {
  const [stars, setStars] = useState<{ id: number; left: number; top: number; size: number; duration: number }[]>([]);

  useEffect(() => {
    const generated = Array.from({ length: 30 }).map((_, i) => ({
      id: i,
      left: Math.random() * 100,
      top: Math.random() * 80,
      size: Math.random() * 3 + 1,
      duration: Math.random() * 2 + 1.5,
    }));
    setStars(generated);
  }, []);

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
      {stars.map((s) => (
        <motion.div
          key={s.id}
          animate={{ opacity: [0.1, 1, 0.1], scale: [0.8, 1.2, 0.8] }}
          transition={{ duration: s.duration, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bg-white rounded-full shadow-[0_0_8px_#fff]"
          style={{
            left: `${s.left}%`,
            top: `${s.top}%`,
            width: `${s.size}px`,
            height: `${s.size}px`,
          }}
        />
      ))}
    </div>
  );
}

export default function BirthdayPage() {
  // State Lilin: 'off' (mati), 'lighting' (animasi menyala awal), 'on' (menyala penuh)
  const [candleState, setCandleState] = useState<"off" | "lighting" | "on">("off");
  // Progress menekan tombol (0 sampai 100)
  const [holdProgress, setHoldProgress] = useState(0);
  
  const router = useRouter();
  const containerRef = useRef<HTMLDivElement>(null);
  const holdIntervalRef = useRef<NodeJS.Timeout | null>(null);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const rotateX = useTransform(mouseY, [-300, 300], [12, -12]);
  const rotateY = useTransform(mouseX, [-300, 300], [-12, 12]);

  // Efek transisi menyalakan api lilin saat masuk halaman awal
  useEffect(() => {
    const timer = setTimeout(() => {
      setCandleState("lighting");
      // Selesaikan proses transisi menyala penuh setelah 1.5 detik
      setTimeout(() => setCandleState("on"), 1500);
    }, 800); // delay awal sebelum api muncul
    return () => clearTimeout(timer);
  }, []);

  function handleMouseMove(event: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = event.clientX - rect.left - rect.width / 2;
    const y = event.clientY - rect.top - rect.height / 2;
    mouseX.set(x);
    mouseY.set(y);
  }

  function handleMouseLeave() {
    mouseX.set(0);
    mouseY.set(0);
  }

  // Fungsi saat lilin berhasil ditiup (setelah ditekan lama)
  const blowCandles = () => {
    setCandleState("off");
    confetti({ particleCount: 180, spread: 90, origin: { y: 0.65 } });
    setTimeout(() => {
      confetti({ particleCount: 60, angle: 60, spread: 60, origin: { x: 0 } });
      confetti({ particleCount: 60, angle: 120, spread: 60, origin: { x: 1 } });
    }, 200);

    setTimeout(() => {
      router.push("/wishes"); 
    }, 3500);
  };

  // LOGIKA TEKAN LAMA (HOLD TO BLOW)
  const startHolding = () => {
    if (candleState !== "on") return;
    
    holdIntervalRef.current = setInterval(() => {
      setHoldProgress((prev) => {
        if (prev >= 100) {
          clearInterval(holdIntervalRef.current!);
          blowCandles();
          return 100;
        }
        return prev + 4; // Kecepatan pengisian progress (semakin besar semakin cepat)
      });
    }, 50);
  };

  const stopHolding = () => {
    if (holdIntervalRef.current) {
      clearInterval(holdIntervalRef.current);
    }
    // Mengembalikan progress ke 0 dengan smooth
    holdIntervalRef.current = setInterval(() => {
      setHoldProgress((prev) => {
        if (prev <= 0) {
          clearInterval(holdIntervalRef.current!);
          return 0;
        }
        return prev - 8;
      });
    }, 30);
  };

  useEffect(() => {
    return () => {
      if (holdIntervalRef.current) clearInterval(holdIntervalRef.current);
    };
  }, []);

  return (
    <main 
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative min-h-screen overflow-hidden flex flex-col items-center justify-start bg-[#030303] text-white px-6 py-12 perspective-1000"
    >
      {/* DINAMIS MESH GRADIENT & EFEK BACKGROUND */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <motion.div 
          animate={{ scale: [1, 1.15, 1], x: [0, 30, 0], y: [0, -20, 0] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[-10%] left-[-10%] w-[700px] h-[700px] bg-gradient-to-tr from-pink-600/15 to-purple-600/0 blur-[180px] rounded-full" 
        />
        <motion.div 
          animate={{ scale: [1, 1.2, 1], x: [0, -40, 0], y: [0, 30, 0] }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] bg-gradient-to-br from-cyan-600/10 to-fuchsia-600/5 blur-[160px] rounded-full" 
        />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.015),transparent_65%)]" />
      </div>

      <SparklingStars />
      <FloatingBalloons />

      {/* HEADER */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="z-10 text-center max-w-xl"
      >
        <h1 className="text-4xl md:text-6xl font-black bg-gradient-to-r from-pink-400 via-fuchsia-300 to-cyan-300 bg-clip-text text-transparent tracking-tight">
           Make a Wish 
        </h1>
        <p className="mt-4 text-gray-400 text-sm md:text-base leading-relaxed font-light">
          Hari ini adalah tentang kamu, Rosa. Sebelum kamu melihat pesan rahasia di dalam, mari tiup lilin di atas kue bertingkat ini dan buatlah satu permohonan tulus. ✨
        </p>
      </motion.div>

      {/* 3D INTERACTIVE CAKE WRAPPER */}
      <motion.div
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 75, delay: 0.3 }}
        className="relative mt-20 mb-10 flex flex-col items-center justify-center w-full max-w-md z-10 py-10"
      >
        {/* GLOW EFFECT PADA KUE: Hanya aktif secara dinamis saat lilin menyala / on */}
        <div className={`absolute top-10 w-72 h-72 rounded-full bg-orange-500/20 blur-[80px] transition-opacity duration-1000 pointer-events-none z-0 ${candleState === "on" ? "opacity-100 animate-pulse" : "opacity-0"}`} />

        <div className="relative flex flex-col items-center transformStyle-3d">
          
          {/* ================= TIER 3 (TOP TIER + CANDLES) ================= */}
          <div className="relative flex flex-col items-center z-30" style={{ transform: "translateZ(45px)" }}>
            <div className="absolute -top-12 left-1/2 -translate-x-1/2 flex gap-3 items-end h-12 z-40">
              {[1, 2, 3].map((c) => (
                <div key={c} className="flex flex-col items-center relative">
                  {/* Animasi Api Lilin */}
                  {candleState !== "off" ? (
                    <motion.div
                      initial={{ scale: 0, opacity: 0, y: 10 }}
                      animate={candleState === "lighting" 
                        ? { scale: [0, 1.4, 1], opacity: 1, y: 0 } 
                        : { scale: [1, 1.25, 0.95, 1.15, 1], y: [0, -2, 1, -1, 0] }
                      }
                      transition={candleState === "lighting" 
                        ? { duration: 0.6, delay: c * 0.3, ease: "easeOut" } 
                        : { repeat: Infinity, duration: 0.5 + c * 0.1 }
                      }
                      className="w-3.5 h-5 bg-gradient-to-t from-red-500 via-orange-400 to-yellow-200 rounded-full blur-[0.5px] shadow-[0_0_15px_#f59e0b,0_0_30px_#ef4444]"
                    />
                  ) : (
                    /* Asap lilin setelah ditiup mati */
                    <motion.div
                      initial={{ opacity: 0.8, y: 0, scale: 0.5 }}
                      animate={{ opacity: 0, y: -25, scale: 1.6 }}
                      transition={{ duration: 1.5, ease: "easeOut" }}
                      className="absolute -top-3 w-2 h-5 bg-white/20 rounded-full blur-[2px]"
                    />
                  )}
                  <div className={`w-2 h-9 rounded-t-sm ${c === 2 ? "bg-gradient-to-b from-pink-400 to-purple-500" : "bg-gradient-to-b from-cyan-400 to-blue-500"}`} />
                </div>
              ))}
            </div>

            <div className="w-24 h-5 bg-white rounded-full -mb-2 shadow-sm flex justify-around items-center px-2">
              <div className="w-2 h-2 bg-red-500 rounded-full" />
              <div className="w-2 h-2 bg-red-500 rounded-full" />
            </div>
            {/* Ditambahkan efek inner-shadow glow halus pada bodi kue */}
            <div className={`w-32 h-16 bg-gradient-to-b from-pink-400 to-pink-500 rounded-xl shadow-md border-t border-white/20 relative overflow-hidden transition-all duration-1000 ${candleState === "on" ? "shadow-[inset_0_10px_20px_rgba(251,146,60,0.3)] border-orange-300/30" : ""}`}>
              <div className="absolute top-0 inset-x-0 flex justify-between px-1">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="w-3.5 h-4 bg-white rounded-b-full shadow-inner" />
                ))}
              </div>
              <div className="w-full h-1.5 bg-yellow-100 absolute top-1/2 -translate-y-1/2" />
            </div>
          </div>

          {/* ================= TIER 2 (MIDDLE TIER) ================= */}
          <div className="relative flex flex-col items-center z-20 -mt-2" style={{ transform: "translateZ(25px)" }}>
            <div className="w-40 h-6 bg-white rounded-full -mb-3 shadow-sm flex justify-around items-center px-4">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="w-2 h-2 bg-pink-300 rounded-full shadow-inner" />
              ))}
            </div>
            <div className={`w-48 h-20 bg-gradient-to-b from-fuchsia-500 to-fuchsia-600 rounded-xl shadow-lg border-t border-white/10 relative overflow-hidden transition-all duration-1000 ${candleState === "on" ? "shadow-[inset_0_10px_25px_rgba(251,146,60,0.2)] border-orange-300/20" : ""}`}>
              <div className="absolute top-0 inset-x-0 flex justify-between px-1">
                {[...Array(7)].map((_, i) => (
                  <div key={i} className="w-4.5 h-5 bg-white rounded-b-full shadow-inner" />
                ))}
              </div>
              <div className="w-full h-2 bg-amber-100 absolute top-1/2 -translate-y-1/2" />
            </div>
          </div>

          {/* ================= TIER 1 (BASE TIER) ================= */}
          <div className="relative flex flex-col items-center z-10 -mt-2" style={{ transform: "translateZ(12px)" }}>
            <div className="w-56 h-6 bg-white rounded-full -mb-3 shadow-md flex justify-around items-center px-6">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="w-2.5 h-2.5 bg-red-400 rounded-full" />
              ))}
            </div>
            <div className={`w-64 h-24 bg-gradient-to-b from-purple-600 to-purple-800 rounded-2xl shadow-xl border-t border-white/10 relative overflow-hidden transition-all duration-1000 ${candleState === "on" ? "shadow-[inset_0_10px_30px_rgba(251,146,60,0.15)]" : ""}`}>
              <div className="absolute top-0 inset-x-0 flex justify-between px-1.5">
                {[...Array(9)].map((_, i) => (
                  <div key={i} className="w-5 h-6 bg-white rounded-b-full shadow-inner" />
                ))}
              </div>
              <div className="w-full h-2.5 bg-yellow-200/80 absolute top-1/2 -translate-y-1/2" />
              <div className="absolute bottom-2 inset-x-0 flex justify-around opacity-40">
                <div className="w-1 h-3 bg-cyan-300 rounded-full rotate-45" />
                <div className="w-3 h-1 bg-yellow-300 rounded-full" />
                <div className="w-1 h-3 bg-pink-300 rounded-full -rotate-45" />
              </div>
            </div>
          </div>

          {/* CAKE STAND / PLATTER BASE */}
          <div 
            className="w-76 h-5 bg-gradient-to-r from-zinc-500 via-zinc-200 to-zinc-500 rounded-full shadow-[0_20px_40px_rgba(0,0,0,0.6)] -mt-2 z-0"
            style={{ transform: "translateZ(0px)" }}
          />
        </div>
      </motion.div>

      {/* INTERACTION AREA (HOLD TO BLOW BUTTON) */}
      <div className="min-h-[140px] flex flex-col items-center justify-center w-full z-10">
        {candleState !== "off" ? (
          <div className="flex flex-col items-center gap-3">
            <motion.button
              whileHover={candleState === "on" ? { scale: 1.03 } : {}}
              whileTap={candleState === "on" ? { scale: 0.98 } : {}}
              onMouseDown={startHolding}
              onMouseUp={stopHolding}
              onMouseLeave={stopHolding}
              onTouchStart={startHolding} // Dukungan untuk perangkat mobile/touchscreen
              onTouchEnd={stopHolding}
              disabled={candleState !== "on"}
              className={`flex items-center gap-3 px-10 py-5 rounded-full text-lg font-bold transition-all duration-500 text-white relative overflow-hidden select-none select-none
                ${candleState === "on" 
                  ? "bg-gradient-to-r from-pink-500 via-fuchsia-500 to-purple-600 shadow-[0_0_40px_rgba(236,72,153,0.3)] cursor-pointer" 
                  : "bg-zinc-800 text-zinc-500 cursor-not-allowed border border-white/5"
                }
              `}
            >
              {/* Progress Overlay bar yang smooth di dalam tombol */}
              <div 
                className="absolute left-0 top-0 bottom-0 bg-white/20 transition-all duration-75 ease-out pointer-events-none" 
                style={{ width: `${holdProgress}%` }}
              />
              
              <Wind className={candleState === "on" ? "animate-pulse" : ""} size={22} />
              <span>{candleState === "on" ? "Hold to Blow Candles" : "Preparing Cake..."}</span>
            </motion.button>
            
            {candleState === "on" && (
              <p className="text-xs text-zinc-500 font-light animate-fade-in">
                *Tekan dan tahan tombol untuk meniup lilin
              </p>
            )}
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ type: "spring", duration: 0.7 }}
            className="text-center bg-white/[0.03] border border-white/10 backdrop-blur-2xl rounded-2xl p-6 shadow-2xl max-w-sm"
          >
            <p className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-yellow-300 animate-bounce">
              Make a wish! ✨
            </p>
            <p className="text-gray-400 mt-2 text-sm leading-relaxed">
              Pemberian lilin berhasil ditiup! Membuka gerbang ucapan romantis untuk Rosa ...
            </p>
          </motion.div>
        )}
      </div>

      {/* FOOTER WISHES TEXT */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7 }}
        className="mt-8 text-center max-w-xl px-4 z-10"
      >
        <p className="text-xs md:text-sm text-gray-500 tracking-widest uppercase pointer-events-none">
          "By Kukz 2026"
        </p>
      </motion.div>
    </main>
  );
}