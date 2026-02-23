"use client";

import { useEffect, useRef, useState, ReactNode } from "react";

type Direction = "up" | "left" | "right";

interface RevealOnScrollProps {
  children: ReactNode;
  direction?: Direction;
  delayMs?: number;
}

export default function RevealOnScroll({
  children,
  direction = "up",
  delayMs = 0,
}: RevealOnScrollProps) {
  const [visible, setVisible] = useState(false);
  const rootRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const node = rootRef.current;
    if (!node) return;

    let hasShown = false;

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (!entry || hasShown || !entry.isIntersecting) return;
        hasShown = true;

        if (delayMs > 0) {
          const timeoutId = setTimeout(() => setVisible(true), delayMs);
          return () => clearTimeout(timeoutId);
        }

        setVisible(true);
      },
      {
        threshold: 0.12,
        rootMargin: "0px 0px -6% 0px",
      }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [delayMs]);

  const directionClass =
    direction === "left"
      ? "section-reveal-left"
      : direction === "right"
      ? "section-reveal-right"
      : "section-reveal-up";

  const className = `section-reveal-base ${directionClass}${
    visible ? " visible" : ""
  }`;

  return (
    <div ref={rootRef} className={className}>
      {children}
    </div>
  );
}

