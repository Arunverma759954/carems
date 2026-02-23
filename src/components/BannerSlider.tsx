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

const AUTOPLAY_MS = 5500;

export default function BannerSlider() {
  const [current, setCurrent] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const goTo = useCallback((index: number) => {
    setCurrent((prev) => (index + SLIDES.length) % SLIDES.length);
  }, []);

  const next = useCallback(() => {
    goTo(current + 1);
  }, [current, goTo]);

  const prev = useCallback(() => {
    goTo(current - 1);
  }, [current, goTo]);

  useEffect(() => {
    if (isPaused) return;
    const id = setInterval(next, AUTOPLAY_MS);
    return () => clearInterval(id);
  }, [current, isPaused, next]);

  return (
    <section
      className="relative w-full overflow-hidden bg-black"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="relative aspect-21/9 w-full min-h-[240px] sm:min-h-[320px] md:min-h-[400px] overflow-hidden bg-black">
        {SLIDES.map((slide, index) => (
          <div
            key={slide.src}
            className="absolute inset-0 transition-opacity duration-700 ease-out"
            style={{
              opacity: index === current ? 1 : 0,
              zIndex: index === current ? 1 : 0,
              pointerEvents: index === current ? "auto" : "none",
            }}
          >
            <Image
              src={slide.src}
              alt={slide.alt}
              fill
              priority={index === 0}
              className="object-contain object-center bg-white"
              sizes="100vw"
            />
          </div>
        ))}

        {/* Prev / Next buttons - auto-play + manual control */}
        <button
          type="button"
          onClick={prev}
          className="absolute left-3 top-1/2 z-10 -translate-y-1/2 flex h-11 w-11 items-center justify-center rounded-full bg-white/20 text-white shadow-lg backdrop-blur-md transition-all hover:bg-white/35 hover:scale-105 active:scale-95 md:left-5 md:h-12 md:w-12"
          aria-label="Previous slide"
        >
          <svg className="h-6 w-6 md:h-7 md:w-7" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <button
          type="button"
          onClick={next}
          className="absolute right-3 top-1/2 z-10 -translate-y-1/2 flex h-11 w-11 items-center justify-center rounded-full bg-white/20 text-white shadow-lg backdrop-blur-md transition-all hover:bg-white/35 hover:scale-105 active:scale-95 md:right-5 md:h-12 md:w-12"
          aria-label="Next slide"
        >
          <svg className="h-6 w-6 md:h-7 md:w-7" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </button>

        {/* Dots */}
        <div className="absolute bottom-5 left-1/2 z-10 flex -translate-x-1/2 gap-2.5">
          {SLIDES.map((_, index) => (
            <button
              key={index}
              type="button"
              onClick={() => goTo(index)}
              className={`h-2.5 rounded-full transition-all duration-300 ${
                index === current
                  ? "w-8 bg-white shadow-md"
                  : "w-2.5 bg-white/60 hover:bg-white/90"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>

      {/* CTA overlay on second slide - BOOK NOW */}
      <div className="absolute bottom-16 left-6 right-6 z-10 hidden md:block lg:left-12 lg:bottom-20">
        {current === 1 && (
          <div className="animate-[fadeIn_0.5s_ease-out]">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-lg bg-red-600 px-6 py-3.5 text-base font-bold text-white shadow-xl transition-all hover:bg-red-700 hover:scale-105 active:scale-100"
            >
              BOOK NOW
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
