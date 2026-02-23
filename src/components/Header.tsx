"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";

const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Plan", href: "/plan" },
  { label: "Blog", href: "/blog" },
  { label: "Team", href: "/team" },
  { label: "Contact", href: "/contact" },
  { label: "Testimonial", href: "/testimonial" },
];

type HeaderProps = {
  logoSlotRef: React.RefObject<HTMLDivElement | null>;
  showLogo: boolean;
};

export default function Header({ logoSlotRef, showLogo }: HeaderProps) {
  const [activeLink, setActiveLink] = useState("Home");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Body scroll lock when menu open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  const closeMenu = () => setMobileMenuOpen(false);

  return (
    <header
      className="sticky top-0 z-50 w-full border-b border-blue-900/50 shadow-lg"
      style={{
        background: "linear-gradient(135deg, #1e40af 0%, #1e3a8a 40%, #172554 100%)",
      }}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-2 overflow-hidden pl-2 pr-2 sm:h-20 sm:pl-3 sm:pr-3 lg:pl-4 lg:pr-4">
        {/* Logo – left side */}
        <Link href="/" className="flex shrink-0 items-center gap-3 whitespace-nowrap">
          <div
            ref={logoSlotRef}
            className="relative h-20 w-20 shrink-0 sm:h-24 sm:w-24"
            aria-hidden={!showLogo}
          >
            {showLogo && (
              <Image
                src="/logo1.png"
                alt="CareMS Maintenance Services"
                fill
                className="object-contain"
                sizes="96px"
                priority
              />
            )}
          </div>
          <div className="hidden flex-col sm:flex">
            <span className="text-lg font-bold tracking-tight text-white">CARE</span>
            <span className="text-[10px] font-medium uppercase tracking-wider text-white/80">
              Maintenance Services
            </span>
          </div>
          <div className="flex flex-col sm:hidden">
            <span className="text-base font-bold text-white">CARE</span>
            <span className="text-[9px] text-white/80">MAINTENANCE</span>
          </div>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden items-center justify-center gap-1 xl:flex xl:gap-2">
          {NAV_LINKS.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              onClick={() => setActiveLink(item.label)}
              className={`relative shrink-0 whitespace-nowrap border-b-2 px-2.5 py-2 text-sm font-medium tracking-wide transition-colors duration-200 xl:px-3 ${
                activeLink === item.label
                  ? "border-red-400 text-red-300"
                  : "border-transparent text-white/80 hover:border-red-400 hover:text-white"
              }`}
            >
              {item.label}
              {item.label === "Services" && (
                <svg className="ml-0.5 inline h-3 w-3" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                    clipRule="evenodd"
                  />
                </svg>
              )}
            </Link>
          ))}
        </nav>

        {/* Contact – desktop */}
        <div className="hidden shrink-0 items-center gap-3 sm:flex xl:gap-5">
          <a
            href="tel:01141001188"
            className="flex items-center gap-2 whitespace-nowrap rounded-lg bg-white/10 px-3 py-2 text-sm font-medium text-white transition-colors hover:bg-red-900/40"
          >
            <span className="flex h-8 w-8 items-center justify-center rounded bg-black/40">
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
            </span>
            <span className="hidden md:inline">011-41001188</span>
          </a>
          <a
            href="mailto:info@carems.in"
            className="flex items-center gap-2 whitespace-nowrap rounded-lg bg-white/10 px-3 py-2 text-sm font-medium text-white transition-colors hover:bg-red-900/40"
          >
            <span className="flex h-8 w-8 items-center justify-center rounded bg-black/40">
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </span>
            <span className="hidden md:inline">info@carems.in</span>
          </a>
        </div>

        {/* Mobile menu button – stylish */}
        <button
          type="button"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className={`relative flex h-11 w-11 shrink-0 items-center justify-center rounded-xl transition-all duration-300 xl:hidden ${
            mobileMenuOpen
              ? "bg-white/20 text-white"
              : "bg-white/10 text-white hover:bg-white/20"
          }`}
          aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
        >
          <span className="sr-only">{mobileMenuOpen ? "Close menu" : "Open menu"}</span>
          <span className="flex h-5 w-6 flex-col items-center justify-center gap-1.5">
            <span
              className={`block h-0.5 w-5 rounded-full bg-current transition-all duration-300 ${
                mobileMenuOpen ? "translate-y-2 rotate-45" : ""
              }`}
            />
            <span
              className={`block h-0.5 w-5 rounded-full bg-current transition-all duration-300 ${
                mobileMenuOpen ? "opacity-0 scale-0" : ""
              }`}
            />
            <span
              className={`block h-0.5 w-5 rounded-full bg-current transition-all duration-300 ${
                mobileMenuOpen ? "-translate-y-2 -rotate-45" : ""
              }`}
            />
          </span>
        </button>
      </div>

      {/* Mobile menu – full-screen overlay + slide-in drawer */}
      <div
        className="fixed inset-0 z-40 xl:hidden"
        aria-hidden={!mobileMenuOpen}
      >
        {/* Backdrop */}
        <div
          onClick={closeMenu}
          className={`absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-300 ${
            mobileMenuOpen ? "opacity-100" : "pointer-events-none opacity-0"
          }`}
        />

        {/* Drawer panel – slides from right */}
        <div
          className={`absolute right-0 top-0 flex h-full w-full max-w-sm flex-col shadow-2xl transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] ${
            mobileMenuOpen ? "translate-x-0" : "translate-x-full"
          }`}
          style={{
            background: "linear-gradient(180deg, #0f172a 0%, #1e293b 40%, #0f172a 100%)",
            boxShadow: "-10px 0 40px rgba(0,0,0,0.3)",
          }}
        >
          {/* Drawer header */}
          <div className="flex items-center justify-between border-b border-slate-600/50 px-5 py-4">
            <span className="text-sm font-semibold uppercase tracking-wider text-slate-400">
              Menu
            </span>
            <button
              type="button"
              onClick={closeMenu}
              className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/20"
              aria-label="Close menu"
            >
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Nav links */}
          <nav className="flex-1 overflow-y-auto px-4 py-6">
            <ul className="flex flex-col gap-1">
              {NAV_LINKS.map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    onClick={closeMenu}
                    className={`flex items-center gap-3 rounded-xl px-4 py-3.5 text-base font-medium transition ${
                      activeLink === item.label
                        ? "bg-red-600/20 text-red-400"
                        : "text-slate-200 hover:bg-white/10 hover:text-white"
                    }`}
                  >
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white/10 text-red-400">
                      <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                      </svg>
                    </span>
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Contact strip at bottom */}
          <div className="border-t border-slate-600/50 p-5">
            <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-slate-500">
              Contact
            </p>
            <a
              href="tel:01141001188"
              className="flex items-center gap-3 rounded-xl bg-white/5 px-4 py-3 text-white transition hover:bg-white/10"
            >
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-red-600/20 text-red-400">
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </span>
              <span className="font-medium">011-41001188</span>
            </a>
            <a
              href="mailto:info@carems.in"
              className="mt-2 flex items-center gap-3 rounded-xl bg-white/5 px-4 py-3 text-white transition hover:bg-white/10"
            >
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-red-600/20 text-red-400">
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </span>
              <span className="font-medium">info@carems.in</span>
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}
