"use client";

import Image from "next/image";
import { useEffect, useState, useCallback } from "react";

const LOGO_SIZE = 200;

const INITIAL_DELAY = 400;
const STROKE_DRAW_MS = 1150;
const LOGO_REVEAL_DELAY_MS = 280;
const LOGO_REVEAL_MS = 1800;
const DRAW_PHASE_MS = STROKE_DRAW_MS + LOGO_REVEAL_MS;
const HOLD_MS = 750;
const FLY_MS = 900;
const OVERLAY_FADE_MS = 400;

type Phase = "idle" | "draw" | "hold" | "flying" | "done";

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

  const startFly = useCallback(() => setPhase("flying"), []);

  useEffect(() => {
    const t1 = setTimeout(() => setPhase("draw"), INITIAL_DELAY);
    const t2 = setTimeout(
      () => setPhase("hold"),
      INITIAL_DELAY + DRAW_PHASE_MS
    );
    const t3 = setTimeout(
      startFly,
      INITIAL_DELAY + DRAW_PHASE_MS + HOLD_MS
    );
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
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
  }, [phase, logoSlotRef, onSplashDone]);

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
  const isDraw = phase === "draw";
  const isHold = phase === "hold";

  return (
    <div
      className={`fixed inset-0 z-[70] flex items-center justify-center transition-opacity duration-700 ${phase === "done" || overlayHidden ? "pointer-events-none opacity-0" : "opacity-100"
        }`}
      style={{
        background:
          "radial-gradient(ellipse 80% 70% at 50% 40%, #1e293b 0%, transparent 50%), radial-gradient(circle at 50% 50%, #0f172a 0%, #020617 100%)",
        boxShadow: "inset 0 0 180px rgba(0,0,0,0.35)",
      }}
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
        }}
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background: "radial-gradient(circle at 50% 50%, rgba(59,130,246,0.06) 0%, transparent 60%)",
        }}
        aria-hidden
      />

      <div
        className="absolute inset-0 flex items-center justify-center"
        style={{
          perspective: "1400px",
          perspectiveOrigin: "center center",
        }}
      >
        <div
          className="absolute overflow-visible"
          style={{
            left: "50%",
            top: "50%",
            width: LOGO_SIZE,
            height: LOGO_SIZE,
            transformStyle: "preserve-3d",
            transform: isFlying
              ? `translate(-50%, -50%) translate(${flyTransform.x}px, ${flyTransform.y}px) scale(${flyTransform.scale})`
              : "translate(-50%, -50%)",
            transition: isFlying ? `transform ${FLY_MS}ms cubic-bezier(0.22, 1, 0.36, 1)` : "none",
          }}
        >
          {phase !== "idle" && (
            <div
              className="relative h-full w-full"
              style={{
                transformStyle: "preserve-3d",
                backfaceVisibility: "hidden",
                transform: isFlying ? "none" : "rotateX(-18deg) rotateY(2deg)",
                transition: isFlying ? "transform 0.1s" : "transform 0.4s ease-out",
              }}
            >
              {/* Logo – scratch reveal (initially fully hidden so koi flash na ho) */}
              <div className="absolute inset-0 overflow-hidden">
                <div
                  className={`absolute inset-0 ${isDraw ? "splash-logo-reveal-wipe" : ""}`}
                  style={{
                    clipPath: isDraw
                      ? "polygon(0 0, 0 0, 0 100%, 0 100%)"
                      : "inset(0 0 0 0)",
                    opacity: isDraw ? 0 : 1,
                  }}
                >
                  <div className={`relative h-full w-full ${isHold ? "splash-logo-finish-pop" : ""}`}>
                    <Image
                      src="/logo1.png"
                      alt="CareMS"
                      fill
                      priority
                      className="object-contain drop-shadow-2xl"
                      sizes="200px"
                    />
                  </div>
                </div>

                {/* 3D Pencil */}
                {isDraw && (
                  <div className="absolute inset-0 z-10" style={{ transformStyle: "preserve-3d" }} aria-hidden>
                    <div
                      className="splash-pencil-3d-move top-1/2 h-9 w-9 -translate-y-1/2 -translate-x-1/2"
                      style={{
                        width: "36px",
                        height: "36px",
                        transformStyle: "preserve-3d",
                      }}
                    >
                      <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        className="h-full w-full"
                        style={{
                          filter: "drop-shadow(0 4px 8px rgba(0,0,0,0.4))",
                        }}
                      >
                        <defs>
                          <linearGradient id="pencil-body-3d" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="#cbd5e1" />
                            <stop offset="50%" stopColor="#94a3b8" />
                            <stop offset="100%" stopColor="#64748b" />
                          </linearGradient>
                        </defs>
                        <path
                          d="M12 19l7-7 3 3-7 7-3-3z M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z M2 2l7.586 7.586a2 2 0 012.828 0L22 12"
                          stroke="url(#pencil-body-3d)"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M12 19l-3 3-4-4 3-3 4 4z"
                          fill="#64748b"
                          stroke="#475569"
                          strokeWidth="1.2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      {isHold && (
        <p className="pointer-events-none absolute bottom-[18%] left-1/2 -translate-x-1/2 text-xs font-semibold uppercase tracking-[0.3em] text-white/40">
          Welcome
        </p>
      )}
    </div>
  );
}
