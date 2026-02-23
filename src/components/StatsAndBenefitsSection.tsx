"use client";

import { useState, useEffect, useRef } from "react";

const STATS = [
  { endValue: 14, suffix: "+", label: "Years", sublabel: "Experience", icon: "experience" as const },
  { endValue: 10000, suffix: "+", label: "Families", sublabel: "Served", icon: "families" as const },
  { endValue: 350, suffix: "+", label: "Corporates", sublabel: "Trust Us", icon: "corporate" as const },
  { endValue: 4.9, suffix: "", label: "Customer", sublabel: "Rating", icon: "rating" as const },
];

const COUNT_DURATION_MS = 2200;
function easeOutCubic(t: number) {
  return 1 - Math.pow(1 - t, 3);
}

function CountUpStat({
  endValue,
  suffix,
  label,
  sublabel,
  icon,
}: {
  endValue: number;
  suffix: string;
  label: string;
  sublabel: string;
  icon: "experience" | "families" | "corporate" | "rating";
}) {
  const [display, setDisplay] = useState(0);
  const [started, setStarted] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current || started) return;
    const el = ref.current;
    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries[0]?.isIntersecting) return;
        setStarted(true);
      },
      { threshold: 0.2, rootMargin: "0px 0px -40px 0px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [started]);

  useEffect(() => {
    if (!started) return;
    const start = performance.now();
    let rafId: number;
    const tick = (now: number) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / COUNT_DURATION_MS, 1);
      const eased = easeOutCubic(progress);
      const value = endValue * eased;
      setDisplay(value);
      if (progress < 1) rafId = requestAnimationFrame(tick);
    };
    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, [started, endValue]);

  const isComplete = display >= endValue - 0.01;
  const showValue =
    endValue >= 1
      ? (isComplete ? endValue : Math.floor(display)).toLocaleString("en-IN")
      : isComplete
        ? endValue.toFixed(1)
        : display.toFixed(1);

  return (
    <div
      ref={ref}
      className="group relative flex flex-col items-center rounded-2xl border border-amber-200/60 bg-white/80 p-6 text-center shadow-sm backdrop-blur-sm transition hover:border-amber-300 hover:shadow-md"
    >
      <div className="mb-3 flex h-14 w-14 items-center justify-center rounded-xl bg-red-600/10 text-red-600 transition group-hover:bg-red-600/15">
        <StatIcon type={icon} />
      </div>
      <p className="text-3xl font-extrabold tracking-tight text-slate-800 sm:text-4xl">
        {showValue}{suffix}
      </p>
      <p className="mt-0.5 text-sm font-semibold uppercase tracking-wider text-red-600">
        {label}
      </p>
      <p className="mt-0.5 text-xs text-slate-500">{sublabel}</p>
    </div>
  );
}

const BENEFITS = [
  {
    title: "Verified Professionals",
    icon: "document",
  },
  {
    title: "Insured Work",
    icon: "shield",
  },
  {
    title: "Satisfaction Guaranteed",
    icon: "award",
  },
  {
    title: "Easy Payment",
    icon: "payment",
  },
];

function StatIcon({ type }: { type: string }) {
  if (type === "experience")
    return (
      <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
      </svg>
    );
  if (type === "families")
    return (
      <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
    );
  if (type === "corporate")
    return (
      <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    );
  return (
    <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
    </svg>
  );
}

function BenefitIcon({ type }: { type: string }) {
  if (type === "document")
    return (
      <svg className="h-7 w-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    );
  if (type === "shield")
    return (
      <svg className="h-7 w-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.187-.382-3.208z" />
      </svg>
    );
  if (type === "award")
    return (
      <svg className="h-7 w-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
      </svg>
    );
  return (
    <svg className="h-7 w-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
    </svg>
  );
}

export default function StatsAndBenefitsSection() {
  return (
    <section className="relative overflow-hidden bg-white">
      {/* Top: Stats – professional block */}
      <div
        className="relative px-4 py-16 sm:px-6 lg:px-8"
        style={{
          background: "linear-gradient(180deg, #fefce8 0%, #fef9c3 50%, #fef3c7 100%)",
        }}
      >
        <div className="mx-auto max-w-[90rem]">
          <div className="grid grid-cols-2 gap-4 sm:gap-6 sm:grid-cols-4">
            {STATS.map((stat) => (
              <CountUpStat
                key={stat.label}
                endValue={stat.endValue}
                suffix={stat.suffix}
                label={stat.label}
                sublabel={stat.sublabel}
                icon={stat.icon}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Bottom: Benefits – clean white */}
      <div className="border-t border-slate-200/80 px-4 py-14 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-[90rem]">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {BENEFITS.map((item) => (
              <div
                key={item.title}
                className="flex items-center gap-4 rounded-xl border border-slate-200/80 bg-slate-50/50 px-5 py-4 transition hover:border-slate-300 hover:bg-slate-50"
              >
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-slate-200/80 text-slate-600">
                  <BenefitIcon type={item.icon} />
                </div>
                <p className="text-sm font-semibold text-slate-800 sm:text-base">
                  {item.title}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
