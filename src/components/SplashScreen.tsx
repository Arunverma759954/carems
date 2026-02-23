"use client";

import Image from "next/image";
import { useEffect, useState, useRef, useCallback } from "react";

const LOGO_SIZE = 180;

// Animation duration – thoda kam, smooth (ms)
const INITIAL_DELAY = 300;
const HAND_ENTER_MS = 1100;   // dono haath tut kar aaye
const HAND_OPEN_MS = 700;     // haath open
const HAND_CLOSE_MS = 2000;   // haath dheere jude
const HOLD_MS = 450;          // full logo, phir fly
const FLY_MS = 900;           // navbar tak
const OVERLAY_FADE_MS = 400;

// Easing: judte waqt end pe dheere rukna (no jerk)
const EASE_CLOSE = "cubic-bezier(0.33, 1, 0.68, 1)";
const EASE_OPEN = "cubic-bezier(0.22, 0.61, 0.36, 1)";

type Phase =
  | "idle"
  | "hands-enter"   // dono hand tut kar aaye
  | "hands-open"    // thoda aur open (drama)
  | "hands-closed"  // jud kar
  | "hold"          // full logo hold
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

  // Phase timeline: idle → hands-enter → hands-open → hands-closed → hold → flying → done
  useEffect(() => {
    const t1 = setTimeout(() => setPhase("hands-enter"), INITIAL_DELAY);
    const t2 = setTimeout(
      () => setPhase("hands-open"),
      INITIAL_DELAY + HAND_ENTER_MS
    );
    const t3 = setTimeout(
      () => setPhase("hands-closed"),
      INITIAL_DELAY + HAND_ENTER_MS + HAND_OPEN_MS
    );
    const t4 = setTimeout(
      () => setPhase("hold"),
      INITIAL_DELAY + HAND_ENTER_MS + HAND_OPEN_MS + HAND_CLOSE_MS
    );
    const t5 = setTimeout(
      startFly,
      INITIAL_DELAY + HAND_ENTER_MS + HAND_OPEN_MS + HAND_CLOSE_MS + HOLD_MS
    );
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
      clearTimeout(t5);
    };
  }, [startFly]);

  useEffect(() => {
    if (phase !== "flying") return;
    const id = requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        const el = logoSlotRef.current;
        if (el) {
          const rect = el.getBoundingClientRect();
          const centerX =
            typeof window !== "undefined" ? window.innerWidth / 2 : 0;
          const centerY =
            typeof window !== "undefined" ? window.innerHeight / 2 : 0;
          const targetCenterX = rect.left + rect.width / 2;
          const targetCenterY = rect.top + rect.height / 2;
          setFlyStyle({
            left: rect.left,
            top: rect.top,
            width: rect.width,
            height: rect.height,
          });
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
  const handsIdle = phase === "idle";
  const handsEntering = phase === "hands-enter";
  const handsAreOpen = phase === "hands-open";
  const handsClosed = phase === "hands-closed";
  // Idle se hi dono haath dikhao (tut) - kabhi full logo pehle mat dikhao
  const showTwoHands =
    handsIdle ||
    handsEntering ||
    handsAreOpen ||
    handsClosed;
  const showFullLogo = phase === "hold" || phase === "flying";
  const applyingFly = phase === "flying";

  // Idle: haath off-screen (enter start). Enter end → open → closed (jud)
  const leftTransform = handsIdle
    ? "translateX(-220px) rotateY(-35deg)"
    : handsAreOpen
      ? "translateX(-75px) rotateY(-32deg)"
      : handsClosed
        ? "translateX(0) rotateY(0deg)"
        : "translateX(-50px) rotateY(-12deg)";

  const rightTransform = handsIdle
    ? "translateX(220px) rotateY(35deg)"
    : handsAreOpen
      ? "translateX(75px) rotateY(32deg)"
      : handsClosed
        ? "translateX(0) rotateY(0deg)"
        : "translateX(50px) rotateY(12deg)";

  const leftTransitionMs = handsIdle ? 0 : handsAreOpen ? HAND_OPEN_MS : HAND_CLOSE_MS;
  const rightTransitionMs = leftTransitionMs;
  const closeEasing = handsClosed ? EASE_CLOSE : EASE_OPEN;

  const leftAnimation = handsEntering
    ? `hand-enter-left ${HAND_ENTER_MS}ms cubic-bezier(0.22, 0.61, 0.36, 1) forwards`
    : "none";
  const rightAnimation = handsEntering
    ? `hand-enter-right ${HAND_ENTER_MS}ms cubic-bezier(0.22, 0.61, 0.36, 1) forwards`
    : "none";

  return (
    <div
      className={`fixed inset-0 z-70 flex items-center justify-center transition-opacity duration-700 ${
          phase === "done" || overlayHidden
          ? "pointer-events-none opacity-0"
          : "opacity-100"
      }`}
      style={{
        background: "linear-gradient(160deg, #0c1222 0%, #0f172a 40%, #0a0f1a 100%)",
        boxShadow: "inset 0 0 100px rgba(15, 23, 42, 0.2)",
      }}
    >
      {/* Logo clear dikhe – center pe soft glow */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background: "radial-gradient(ellipse 70% 55% at 50% 50%, rgba(255,255,255,0.07) 0%, transparent 58%)",
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
          transform: `translate(-50%, -50%) translate(${flyTransform.x}px, ${flyTransform.y}px) scale(${flyTransform.scale})`,
          transition: applyingFly
            ? `transform ${FLY_MS}ms cubic-bezier(0.22, 0.61, 0.36, 1)`
            : "none",
        }}
      >
        {showTwoHands ? (
          <div
            className="relative flex h-full w-full overflow-visible"
            style={{
              perspective: "1400px",
              transformStyle: "preserve-3d",
            }}
          >
            {/* Left hand: left side se aata hai, fir jud kar beech mein */}
            <div
              className="absolute inset-y-0 left-0 w-1/2 overflow-visible"
              style={{
                transformStyle: "preserve-3d",
                transformOrigin: "right center",
                transform: handsEntering ? undefined : leftTransform,
                transition: handsEntering || handsIdle
                  ? "none"
                  : `transform ${leftTransitionMs}ms ${closeEasing}`,
                animation: leftAnimation,
              }}
            >
              <div
                className="h-full w-[200%]"
                style={{
                  clipPath: "inset(0 50% 0 0)",
                  backgroundImage: "url(/logo1.png)",
                  backgroundSize: "100% 100%",
                  backgroundPosition: "left center",
                }}
              />
            </div>
            {/* Right hand: right side se aata hai, fir jud kar beech mein */}
            <div
              className="absolute inset-y-0 right-0 w-1/2 overflow-visible"
              style={{
                transformStyle: "preserve-3d",
                transformOrigin: "left center",
                transform: handsEntering ? undefined : rightTransform,
                transition: handsEntering || handsIdle
                  ? "none"
                  : `transform ${rightTransitionMs}ms ${closeEasing}`,
                animation: rightAnimation,
              }}
            >
              <div
                className="h-full w-[200%]"
                style={{
                  clipPath: "inset(0 0 0 50%)",
                  backgroundImage: "url(/logo1.png)",
                  backgroundSize: "100% 100%",
                  backgroundPosition: "right center",
                }}
              />
            </div>
          </div>
        ) : (
          <div className="relative h-full w-full">
            <Image
              src="/logo1.png"
              alt="CareMS"
              fill
              priority
              className="object-contain"
              sizes="180px"
            />
          </div>
        )}
      </div>

      {!isFlying && (
        <div
          className="pointer-events-none absolute left-1/2 top-1/2 h-56 w-56 -translate-x-1/2 -translate-y-1/2 rounded-full bg-red-500/25 blur-[60px]"
          aria-hidden
        />
      )}

      {/* Subtle loading text - only during hold */}
      {phase === "hold" && (
        <p className="pointer-events-none absolute bottom-[18%] left-1/2 -translate-x-1/2 text-xs font-medium uppercase tracking-[0.3em] text-white/40">
          Welcome
        </p>
      )}
    </div>
  );
}
