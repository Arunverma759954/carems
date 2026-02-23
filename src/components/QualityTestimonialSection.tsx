"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const TESTIMONIALS = [
  {
    id: 1,
    name: "Our Valued Customer",
    role: "CareMS User",
    image: "/mc.jpg",
    quote: "Best quality service at my doorstep. Made my life easy with one call.",
  },
];

export default function QualityTestimonialSection() {
  const [current, setCurrent] = useState(0);

  return (
    <section className="relative overflow-hidden bg-white px-4 py-20 sm:px-6 lg:px-8">
      {/* Soft background */}
      <div
        className="absolute inset-0 opacity-50"
        style={{
          background: "linear-gradient(180deg, #fefce8 0%, #ffffff 45%, #f8fafc 100%)",
        }}
        aria-hidden
      />

      <div className="relative mx-auto max-w-[90rem]">
        {/* Top: Best quality + Make Life Easy + Book Now – new premium UI */}
        <div className="flex flex-col items-center gap-8 lg:flex-row lg:items-stretch lg:justify-between">
          <div
            className="w-full max-w-xl rounded-3xl px-8 py-10 text-center shadow-xl lg:text-left"
            style={{
              background: "linear-gradient(145deg, #ffffff 0%, #fefce8 100%)",
              boxShadow: "0 25px 50px -12px rgba(0,0,0,0.08), 0 0 0 1px rgba(0,0,0,0.04)",
            }}
          >
            <h2 className="text-3xl font-extrabold leading-tight tracking-tight text-red-600 sm:text-4xl">
              Best quality
            </h2>
            <h2 className="mt-1 text-3xl font-extrabold leading-tight tracking-tight text-red-600 sm:text-4xl">
              Make Life Easy
            </h2>
            <Link
              href="/contact"
              className="mt-6 inline-flex items-center justify-center rounded-xl bg-red-600 px-8 py-4 text-base font-bold text-white shadow-lg transition hover:bg-red-700 hover:shadow-xl active:scale-[0.98]"
            >
              Book Now
            </Link>
          </div>

          {/* Testimonial – mc.jpg with best UI */}
          <div className="flex w-full max-w-xl flex-col items-center">
            <div className="relative w-full max-w-sm">
              {/* Main profile circle – mc.jpg */}
              <div className="relative mx-auto aspect-square w-56 overflow-hidden rounded-full ring-4 ring-white shadow-2xl sm:w-64">
                <Image
                  src={TESTIMONIALS[current]?.image ?? "/mc.jpg"}
                  alt={TESTIMONIALS[current]?.name ?? "Customer"}
                  fill
                  className="object-cover"
                  sizes="256px"
                  priority
                />
              </div>
              {/* Decorative ring */}
              <div
                className="absolute -inset-2 rounded-full opacity-20"
                style={{
                  background: "linear-gradient(135deg, #dc2626 0%, #ea580c 50%, #2563eb 100%)",
                }}
                aria-hidden
              />
              {/* Nav arrows */}
              <button
                type="button"
                onClick={() => setCurrent((p) => (p - 1 + TESTIMONIALS.length) % TESTIMONIALS.length)}
                className="absolute left-0 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-slate-600 shadow-lg transition hover:bg-white hover:text-slate-900"
                aria-label="Previous"
              >
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button
                type="button"
                onClick={() => setCurrent((p) => (p + 1) % TESTIMONIALS.length)}
                className="absolute right-0 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-slate-600 shadow-lg transition hover:bg-white hover:text-slate-900"
                aria-label="Next"
              >
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
            <div className="mt-6 rounded-2xl border border-slate-200/80 bg-white/90 px-6 py-5 text-center shadow-lg backdrop-blur-sm">
              <p className="text-sm font-semibold uppercase tracking-wider text-slate-500">
                {TESTIMONIALS[current]?.role ?? "CareMS User"}
              </p>
              <p className="mt-1 text-lg font-bold text-slate-800">
                {TESTIMONIALS[current]?.name ?? "Our Valued Customer"}
              </p>
              <p className="mt-3 text-slate-600 italic">
                &ldquo;{TESTIMONIALS[current]?.quote ?? "Best quality service at my doorstep. Made my life easy with one call."}&rdquo;
              </p>
            </div>
          </div>
        </div>

        {/* Google Play – bottom */}
        <div className="mt-16 flex justify-center">
          <a
            href="https://play.google.com/store"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 rounded-xl border border-slate-200 bg-slate-900 px-5 py-3 text-white shadow-lg transition hover:bg-slate-800"
          >
            <svg className="h-8 w-8" viewBox="0 0 24 24" aria-hidden>
              <path fill="currentColor" d="M3.609 1.814L13.792 12 3.61 22.186a.996.996 0 01-.61-.92V2.734a1 1 0 01.609-.92zm10.89 10.893l2.302 2.302-10.937 6.333 8.635-8.635zm3.199-3.198l2.807 1.626a1 1 0 010 1.73l-2.808 1.626L15.206 12l2.492-2.491zM5.864 2.658L16.802 8.99l-2.302 2.302-8.636-8.634z" />
            </svg>
            <div className="text-left">
              <span className="block text-[10px] text-slate-400">Get it on</span>
              <span className="block text-sm font-semibold">Google Play</span>
            </div>
          </a>
        </div>
      </div>
    </section>
  );
}
