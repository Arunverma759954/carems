"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect, useCallback, useRef } from "react";

const SLIDES = [
  {
    src: "/1.jpg",
    alt: "CareMS Maintenance Services - Get Ready For Winter",
    topLabel: "CareMS Premium Maintenance",
    line1: "WINTER",
    line2: "READY",
    line2Color: "text-blue-400",
    desc: "24 hours emergency service for installation, repair, and maintenance of your dream property.",
  },
  {
    src: "/2.jpg",
    alt: "Looking For An Electrician - 24 hours emergency service",
    topLabel: "Expert Technicians On Call",
    line1: "EXPERT",
    line2: "CARE",
    line2Color: "text-red-400",
    desc: "Qualified professionals available around the clock to handle all your electrical and maintenance needs.",
  },
];

const AUTOPLAY_MS = 6000;

/* ─── Premium Pencil Icon Component ────────────────────── */
function RotatingPencil({ active, delay, duration = 1.0 }: { active: boolean; delay: number; duration?: number }) {
  if (!active) return null;
  return (
    <div
      className="absolute z-50 pointer-events-none"
      style={{
        width: active ? (typeof window !== 'undefined' && window.innerWidth < 640 ? 32 : 54) : 0,
        height: active ? (typeof window !== 'undefined' && window.innerWidth < 640 ? 32 : 54) : 0,
        top: '50%',
        left: 0,
        transform: 'translate(-50%, -50%) rotate(25deg)',
        opacity: 0,
        filter: 'drop-shadow(0 4px 6px rgba(0,0,0,0.6))',
        animation: active ? `pencil-scribble-move ${duration}s cubic-bezier(0.4, 0, 0.2, 1) ${delay}s forwards` : 'none',
      }}
    >
      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Pencil Body with realistic colors */}
        <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" fill="#EAB308" stroke="#451A03" strokeWidth="0.5" />
        <path d="M8 11l1 4-4 1 3-5z" fill="#451A03" />
        <path d="M21.5 5.5l-1.5-1.5 1.5-1.5 1.5 1.5-1.5 1.5z" fill="#F472B6" />
        {/* Graphite lead */}
        <circle cx="5" cy="19" r="1.5" fill="#1F2937" />
      </svg>
      <style jsx global>{`
        @keyframes pencil-scribble-move {
          0% { left: 0%; opacity: 1; transform: translate(-50%, -50%) rotate(15deg); }
          12.5% { transform: translate(-50%, -50%) rotate(32deg) translateY(-8px) translateX(2px); }
          25% { transform: translate(-50%, -50%) rotate(22deg) translateY(0px) translateX(-2px); }
          37.5% { transform: translate(-50%, -50%) rotate(35deg) translateY(-10px) translateX(3px); }
          50% { transform: translate(-50%, -50%) rotate(24deg) translateY(2px) translateX(-3px); }
          62.5% { transform: translate(-50%, -50%) rotate(38deg) translateY(-12px) translateX(4px); }
          75% { transform: translate(-50%, -50%) rotate(26deg) translateY(0px) translateX(-4px); }
          87.5% { transform: translate(-50%, -50%) rotate(40deg) translateY(-8px) translateX(2px); }
          100% { left: 100%; opacity: 0; transform: translate(-50%, -50%) rotate(30deg); }
        }
      `}</style>
    </div>
  );
}

export default function BannerSlider() {
  const [current, setCurrent] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const next = useCallback(() => {
    setCurrent((prev) => (prev + 1) % SLIDES.length);
  }, []);

  const prev = useCallback(() => {
    setCurrent((prev) => (prev - 1 + SLIDES.length) % SLIDES.length);
  }, []);

  const goTo = useCallback((index: number) => {
    setCurrent((index + SLIDES.length) % SLIDES.length);
  }, []);

  useEffect(() => {
    if (isPaused) return;
    const id = setInterval(next, AUTOPLAY_MS);
    return () => clearInterval(id);
  }, [isPaused, next]);

  return (
    <section
      className="relative w-full overflow-hidden bg-slate-950"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Responsive hero height – thoda compact rakha taaki mobile pe extra khaali space bhi na लगे */}
      <div className="relative w-full min-h-[340px] sm:min-h-[380px] md:min-h-[460px] lg:min-h-[560px] overflow-hidden">
        {SLIDES.map((slide, index) => {
          const active = index === current;
          return (
            <div
              key={slide.src}
              className="absolute inset-0 transition-opacity duration-1000"
              style={{
                zIndex: active ? 1 : 0,
                opacity: active ? 1 : 0,
              }}
              aria-hidden={!active}
            >
              {/* Background image – object-contain so poori banner image clear dikhe (no crop).  
                 Gap area ko same white background diya hai taaki slide ka part lage. */}
              <div className="absolute inset-0 bg-white">
                <Image
                  src={slide.src}
                  alt={slide.alt}
                  fill
                  priority={index === 0}
                  className="object-contain object-center brightness-[0.9]"
                  style={{
                    transition: active ? 'transform 12s linear' : 'none',
                    transform: active ? 'scale(1.02) rotate(0deg)' : 'scale(1.0) rotate(0deg)',
                  }}
                  sizes="100vw"
                />
              </div>

              {/* CENTERED CONTENT - SYMMETRICAL DESIGN */}
              <div className="absolute inset-0 z-20 flex items-center justify-center p-6 md:p-12">
                <div
                  className={`relative w-full max-w-6xl p-6 sm:p-14 md:p-20 flex flex-col items-center justify-center transition-all duration-1000 ${active ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}
                >

                  {/* LOGO AREA - Compact Reveal */}
                  <div className="relative mb-4 h-12 w-24 sm:h-20 sm:w-40 flex items-center justify-center">
                    <div className={`relative w-full h-full flex items-center justify-center transition-all duration-700 ${active ? 'opacity-100' : 'opacity-0'}`}>
                      <Image
                        src="/logo1.png"
                        alt="Care Logo"
                        fill
                        className="object-contain drop-shadow-lg"
                        style={{
                          clipPath: active ? 'inset(0 0% 0 0)' : 'inset(0 100% 0 0)',
                          transition: active ? 'clip-path 1.2s cubic-bezier(0.19, 1, 0.22, 1) 0.3s' : 'none'
                        }}
                      />
                      <RotatingPencil active={active} delay={0.3} duration={1.2} />
                    </div>
                  </div>

                  {/* LABEL - Small & Elegant */}
                  <div className="relative mb-3 overflow-hidden">
                    <span
                      className="block text-[10px] sm:text-xs font-bold uppercase tracking-[0.4em] text-blue-400"
                      style={{
                        clipPath: active ? 'inset(0 0% 0 0)' : 'inset(0 100% 0 0)',
                        transition: active ? 'clip-path 1s cubic-bezier(0.19, 1, 0.22, 1) 1.2s' : 'none'
                      }}
                    >
                      {slide.topLabel}
                    </span>
                    <RotatingPencil active={active} delay={1.2} duration={0.9} />
                  </div>

                  {/* MAIN HEADING - Compact & Professional */}
                  <div className="relative mb-4 text-center max-w-4xl">
                    <h1 className="text-2xl xs:text-3xl sm:text-5xl md:text-7xl font-black uppercase tracking-tighter leading-[0.9] text-white">
                      <div className="relative overflow-hidden pt-1">
                        <span
                          className="block"
                          style={{
                            clipPath: active ? 'inset(0 0% 0 0)' : 'inset(0 100% 0 0)',
                            transition: active ? 'clip-path 1.2s cubic-bezier(0.19, 1, 0.22, 1) 1.8s' : 'none'
                          }}
                        >
                          {slide.line1}
                        </span>
                        <RotatingPencil active={active} delay={1.8} duration={1.1} />
                      </div>
                      <div className="relative overflow-hidden mt-1 pb-1">
                        <span
                          className={`block ${slide.line2Color}`}
                          style={{
                            clipPath: active ? 'inset(0 0% 0 0)' : 'inset(0 100% 0 0)',
                            transition: active ? 'clip-path 1.2s cubic-bezier(0.19, 1, 0.22, 1) 2.4s' : 'none'
                          }}
                        >
                          {slide.line2}
                        </span>
                        <RotatingPencil active={active} delay={2.4} duration={1.1} />
                      </div>
                    </h1>
                  </div>

                  {/* UNDERLINE - Realistic Scratch (Smaller Scale) */}
                  <div className="relative w-32 sm:w-64 h-3 sm:h-4 mb-4">
                    <svg viewBox="0 0 300 24" className="w-full h-full overflow-visible drop-shadow-md">
                      <path
                        d="M20 12 Q80 4, 150 20 Q220 4, 280 12"
                        stroke={slide.line2Color.includes('red') ? '#EF4444' : '#3B82F6'}
                        strokeWidth="3"
                        fill="none"
                        strokeLinecap="round"
                        opacity="0.8"
                        style={{
                          strokeDasharray: 500,
                          strokeDashoffset: active ? 0 : 500,
                          transition: active ? 'stroke-dashoffset 1.2s ease-out 3.2s' : 'none'
                        }}
                      />
                    </svg>
                    <RotatingPencil active={active} delay={3.2} duration={1.1} />
                  </div>

                  {/* DESCRIPTION - Compact & Clear */}
                  <div className="relative mb-6 max-w-xl px-4">
                    <p
                      className="text-[10px] sm:text-base font-medium text-slate-100 leading-relaxed opacity-95 text-center"
                      style={{
                        clipPath: active ? 'inset(0 0% 0 0)' : 'inset(0 100% 0 0)',
                        transition: active ? 'clip-path 1s cubic-bezier(0.19, 1, 0.22, 1) 3.8s' : 'none'
                      }}
                    >
                      {slide.desc}
                    </p>
                    <RotatingPencil active={active} delay={3.8} duration={1.2} />
                  </div>

                  {/* ACTION BUTTON - Scratch Reveal */}
                  <div className={`relative transition-all duration-700 ${active ? 'opacity-100' : 'opacity-0'}`}>
                    <div
                      style={{
                        clipPath: active ? 'inset(0 0% 0 0)' : 'inset(0 100% 0 0)',
                        transition: active ? 'clip-path 1.2s cubic-bezier(0.19, 1, 0.22, 1) 5.0s' : 'none'
                      }}
                    >
                      <Link
                        href="/contact"
                        className="group relative inline-flex items-center gap-3 overflow-hidden rounded-xl bg-gradient-to-r from-red-600 to-red-700 px-6 py-3 sm:px-8 sm:py-4 text-xs sm:text-base font-black uppercase text-white transition-all hover:bg-white hover:text-red-600 shadow-[0_15px_30px_rgba(220,38,38,0.3)] hover:shadow-[0_20px_45px_rgba(220,38,38,0.5)]"
                      >
                        <span className="relative z-10 flex items-center gap-3">
                          BOOK YOUR SERVICE
                          <svg className="h-5 w-5 transition-transform group-hover:translate-x-2" fill="none" stroke="currentColor" strokeWidth={4} viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                          </svg>
                        </span>
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-full skew-x-[-35deg] group-hover:translate-x-[300%] transition-transform duration-1000" />
                      </Link>
                    </div>
                    <RotatingPencil active={active} delay={5.0} duration={1.2} />
                  </div>

                </div>
              </div>

              {/* NAVIGATION ARROWS - SYMMETRICAL SIDES */}
              <button
                onClick={prev}
                className="absolute left-8 top-1/2 z-40 h-20 w-20 -translate-y-1/2 hidden lg:flex items-center justify-center rounded-full border-2 border-white/10 bg-white/5 text-white backdrop-blur-2xl transition-all hover:bg-red-600 hover:border-red-600 hover:scale-110 active:scale-95 group"
              >
                <svg className="h-10 w-10 transition-transform group-hover:-translate-x-1" fill="none" stroke="currentColor" strokeWidth={3} viewBox="0 0 24 24"><path d="M15 19l-7-7 7-7" /></svg>
              </button>
              <button
                onClick={next}
                className="absolute right-8 top-1/2 z-40 h-20 w-20 -translate-y-1/2 hidden lg:flex items-center justify-center rounded-full border-2 border-white/10 bg-white/5 text-white backdrop-blur-2xl transition-all hover:bg-red-600 hover:border-red-600 hover:scale-110 active:scale-95 group"
              >
                <svg className="h-10 w-10 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" strokeWidth={3} viewBox="0 0 24 24"><path d="M9 5l7 7-7 7" /></svg>
              </button>

            </div>
          );
        })}

        {/* DOTS NAVIGATION - BOTTOM SYMMETRY */}
        <div className="absolute bottom-16 left-1/2 z-40 flex -translate-x-1/2 gap-5">
          {SLIDES.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              className={`h-3 rounded-full transition-all duration-700 ${i === current ? 'w-20 bg-red-600 shadow-[0_0_25px_rgba(220,38,38,0.7)]' : 'w-6 bg-white/20 hover:bg-white/50'}`}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
