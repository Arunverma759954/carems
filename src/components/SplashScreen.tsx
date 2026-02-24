"use client";

import Image from "next/image";
import { useEffect, useState, useRef, useCallback } from "react";

const LOGO_SIZE = 180;

const INITIAL_DELAY = 200;
const PENCIL_DRAW_MS = 1400;  // circle pencil-draw
const LOGO_SCALE_MS = 900;    // logo scaling in
const HOLD_MS = 600;
const FLY_MS = 900;
const OVERLAY_FADE_MS = 400;

type Phase =
  | "idle"
  | "pencil-draw"   // circle draws like pencil
  | "logo-scale"    // logo scales in
  | "hold"
  | "flying"
  | "done";

type Props = {
  logoSlotRef: React.RefObject<HTMLDivElement | null>;
  onSplashDone: () => void;
};

export default function SplashScreen({ logoSlotRef, onSplashDone }: Props) {
  const [phase, setPhase] = useState<Phase>("idle");
  const [flyStyle, setFlyStyle] = useState<{
    left: number;
    top: number;
    width: number;
    height: number;
  } | null>(null);
  const [flyTransform, setFlyTransform] = useState<{
    x: number;
    y: number;
    scale: number;
  }>({ x: 0, y: 0, scale: 1 });
  const [overlayHidden, setOverlayHidden] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const startFly = useCallback(() => setPhase("flying"), []);

  useEffect(() => {
    const t1 = setTimeout(() => setPhase("pencil-draw"), INITIAL_DELAY);
    const t2 = setTimeout(() => setPhase("logo-scale"), INITIAL_DELAY + PENCIL_DRAW_MS);
    const t3 = setTimeout(() => setPhase("hold"), INITIAL_DELAY + PENCIL_DRAW_MS + LOGO_SCALE_MS);
    const t4 = setTimeout(
      startFly,
      INITIAL_DELAY + PENCIL_DRAW_MS + LOGO_SCALE_MS + HOLD_MS
    );
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
    };
  }, [startFly]);

  useEffect(() => {
    if (phase !== "flying") return;
    const id = requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        const el = logoSlotRef.current;
        if (el) {
          const rect = el.getBoundingClientRect();
          const centerX = typeof window !== "undefined" ? window.innerWidth / 2 : 0;
          const centerY = typeof window !== "undefined" ? window.innerHeight / 2 : 0;
          const targetCenterX = rect.left + rect.width / 2;
          const targetCenterY = rect.top + rect.height / 2;
          setFlyStyle({ left: rect.left, top: rect.top, width: rect.width, height: rect.height });
          setFlyTransform({
            x: targetCenterX - centerX,
            y: targetCenterY - centerY,
            scale: rect.width / LOGO_SIZE,
          });
        } else {
          setPhase("done");
          onSplashDone();
          setOverlayHidden(true);
        }
      });
    });
    return () => cancelAnimationFrame(id);
  }, [phase, logoSlotRef]);

  useEffect(() => {
    if (phase !== "flying" || !flyStyle) return;
    const t = setTimeout(() => {
      setPhase("done");
      onSplashDone();
    }, FLY_MS);
    return () => clearTimeout(t);
  }, [phase, flyStyle, onSplashDone]);

  useEffect(() => {
    if (phase !== "done") return;
    const t = setTimeout(() => setOverlayHidden(true), OVERLAY_FADE_MS);
    return () => clearTimeout(t);
  }, [phase]);

  if (phase === "done" && overlayHidden) return null;

  const isFlying = phase === "flying" && flyStyle;
  const showDrawing = phase === "pencil-draw" || phase === "logo-scale" || phase === "hold" || phase === "flying";
  const showLogo = phase === "logo-scale" || phase === "hold" || phase === "flying";
  const logoScaling = phase === "logo-scale";

  return (
    <div
      className={`fixed inset-0 z-[70] flex items-center justify-center transition-opacity duration-700 ${
        phase === "done" || overlayHidden ? "pointer-events-none opacity-0" : "opacity-100"
      }`}
      style={{
        background: "radial-gradient(circle at center, #0f172a 0%, #020617 100%)",
        boxShadow: "inset 0 0 120px rgba(0,0,0,0.4)",
      }}
    >
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background: "radial-gradient(circle at 50% 50%, rgba(59,130,246,0.08) 0%, transparent 55%)",
        }}
        aria-hidden
      />

      <div
        ref={containerRef}
        className="absolute flex items-center justify-center"
        style={{
          left: "50%",
          top: "50%",
          width: LOGO_SIZE,
          height: LOGO_SIZE,
          transform: isFlying
            ? `translate(-50%, -50%) translate(${flyTransform.x}px, ${flyTransform.y}px) scale(${flyTransform.scale})`
            : "translate(-50%, -50%)",
          transition: isFlying ? `transform ${FLY_MS}ms cubic-bezier(0.22, 1, 0.36, 1)` : "none",
        }}
      >
        {/* Pencil-draw circle: draws around the logo like a pencil outline */}
        {showDrawing && (
          <svg
            className="absolute inset-0 h-full w-full -rotate-90"
            viewBox="0 0 100 100"
            fill="none"
            strokeWidth="2"
            strokeLinecap="round"
            style={{
              stroke: "url(#pencil-gradient)",
              strokeDasharray: 302,
              animation: phase === "pencil-draw"
                ? `pencil-draw-circle ${PENCIL_DRAW_MS}ms cubic-bezier(0.22, 1, 0.36, 1) forwards`
                : "none",
              strokeDashoffset: phase === "pencil-draw" ? 302 : 0,
            }}
          >
            <defs>
              <linearGradient id="pencil-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#94a3b8" />
                <stop offset="50%" stopColor="#64748b" />
                <stop offset="100%" stopColor="#475569" />
              </linearGradient>
            </defs>
            <circle cx="50" cy="50" r="48" />
          </svg>
        )}

        {/* Logo: scales in (pencil ke baad) */}
        {showLogo && (
          <div
            className={`relative h-full w-full ${logoScaling ? "splash-logo-scale-in" : ""}`}
          >
            <Image
              src="/logo1.png"
              alt="CareMS"
              fill
              priority
              className="object-contain drop-shadow-lg"
              sizes="180px"
            />
          </div>
        )}
      </div>

      {phase === "hold" && (
        <p className="pointer-events-none absolute bottom-[20%] left-1/2 -translate-x-1/2 text-xs font-semibold uppercase tracking-[0.25em] text-white/50">
          Welcome
        </p>
      )}
    </div>
  );
}
