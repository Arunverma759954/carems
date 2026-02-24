"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect, useCallback } from "react";

const SLIDES = [
  {
    src: "/1.jpg",
    alt: "CareMS Maintenance Services - Get Ready For Winter",
  },
  {
    src: "/2.jpg",
    alt: "Looking For An Electrician - 24 hours emergency service",
  },
];

const AUTOPLAY_MS = 3000; // Auto slider: change slide every 3 seconds

export default function BannerSlider() {
  const [current, setCurrent] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const goTo = useCallback((index: number) => {
    setCurrent((prev) => (index + SLIDES.length) % SLIDES.length);
  }, []);

  const next = useCallback(() => {
    setCurrent((prev) => (prev + 1) % SLIDES.length);
  }, []);

  const prev = useCallback(() => {
    setCurrent((prev) => (prev - 1 + SLIDES.length) % SLIDES.length);
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
      <div className="relative aspect-[21/9] w-full min-h-[450px] sm:min-h-[550px] md:min-h-[650px] overflow-hidden">
        {SLIDES.map((slide, index) => (
          <div
            key={slide.src}
            className={`absolute inset-0 transition-all duration-1000 ease-in-out ${index === current ? "opacity-100 scale-100" : "opacity-0 scale-110 pointer-events-none"
              }`}
            style={{ zIndex: index === current ? 1 : 0 }}
          >
            <Image
              src={slide.src}
              alt={slide.alt}
              fill
              priority={index === 0}
              className="object-cover brightness-[0.7]"
              sizes="100vw"
            />

            {/* Animated Text Overlay */}
            <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-black/30 px-6 text-center text-white">
              <div className="max-w-4xl space-y-6">
                <span className={`block text-sm font-bold uppercase tracking-[0.4em] text-blue-400 transition-all duration-700 delay-300 ${index === current ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
                  CareMS Premium Maintenance
                </span>
                <h1 className={`text-4xl font-black uppercase tracking-tight sm:text-6xl md:text-8xl transition-all duration-700 delay-500 ${index === current ? 'translate-y-0 opacity-100 shadow-text' : 'translate-y-10 opacity-0'}`}>
                  {index === 0 ? "Winter Ready" : "Expert Care"}
                  <span className="block text-blue-500 underline decoration-red-600/50 underline-offset-8 decoration-4">
                    {index === 0 ? "Solutions" : "Every Day"}
                  </span>
                </h1>
                <p className={`mx-auto max-w-2xl text-lg font-medium text-slate-200 transition-all duration-700 delay-700 ${index === current ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
                  24 hours emergency service for installation, repair, and maintenance of your dream property.
                </p>
                <div className={`pt-8 transition-all duration-700 delay-1000 ${index === current ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
                  <Link
                    href="/contact"
                    className="group relative inline-flex items-center gap-3 overflow-hidden rounded-full bg-red-600 px-10 py-5 text-lg font-black uppercase text-white transition-all hover:bg-white hover:text-red-600"
                  >
                    <span className="relative z-10 flex items-center gap-2">
                      BOOK YOUR SERVICE
                      <svg className="h-5 w-5 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                      </svg>
                    </span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ))}

        {/* Premium Arrows */}
        <button
          type="button"
          onClick={prev}
          className="absolute left-6 top-1/2 z-20 flex h-16 w-16 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-black/20 text-white backdrop-blur-md transition-all hover:bg-red-600 hover:border-red-600 md:left-10"
          aria-label="Previous slide"
        >
          <svg className="h-8 w-8" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <button
          type="button"
          onClick={next}
          className="absolute right-6 top-1/2 z-20 flex h-16 w-16 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-black/20 text-white backdrop-blur-md transition-all hover:bg-red-600 hover:border-red-600 md:right-10"
          aria-label="Next slide"
        >
          <svg className="h-8 w-8" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </button>

        {/* Glass Dots */}
        <div className="absolute bottom-10 left-1/2 z-20 flex -translate-x-1/2 gap-4">
          {SLIDES.map((_, index) => (
            <button
              key={index}
              type="button"
              onClick={() => goTo(index)}
              className={`h-1.5 transition-all duration-500 ${index === current
                ? "w-12 bg-red-600"
                : "w-4 bg-white/40 hover:bg-white/80"
                }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
