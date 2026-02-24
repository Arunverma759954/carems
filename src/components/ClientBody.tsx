"use client";

import { useRef, useState, useEffect } from "react";
import Header from "@/components/Header";
import SplashScreen from "@/components/SplashScreen";
import Footer from "@/components/Footer";
import BookServicePopup from "@/components/BookServicePopup";

export default function ClientBody({
  children,
}: {
  children: React.ReactNode;
}) {
  const logoSlotRef = useRef<HTMLDivElement>(null);
  const [splashDone, setSplashDone] = useState(false);
  const [contentRevealed, setContentRevealed] = useState(false);

  // Reveal content only after page (and images) have loaded – first-time visit feel
  useEffect(() => {
    let timeoutId: ReturnType<typeof setTimeout>;
    const reveal = () => {
      timeoutId = setTimeout(() => setContentRevealed(true), 80);
    };
    const cleanup = () => {
      if (timeoutId) clearTimeout(timeoutId);
    };
    if (typeof window === "undefined") return cleanup;
    if (document.readyState === "complete") {
      reveal();
      return cleanup;
    }
    window.addEventListener("load", reveal);
    return () => {
      window.removeEventListener("load", reveal);
      cleanup();
    };
  }, []);

  return (
    <>
      <SplashScreen
        logoSlotRef={logoSlotRef}
        onSplashDone={() => setSplashDone(true)}
      />
      {/* Header + logo sirf jab splash pura khatam ho jaye tab hi dikhaye */}
      {splashDone && <Header logoSlotRef={logoSlotRef} showLogo={true} />}
      <main
        className={`content-reveal ${contentRevealed ? "revealed" : ""}`}
      >
        {children}
      </main>
      <Footer />
      <BookServicePopup splashDone={splashDone} />
    </>
  );
}
