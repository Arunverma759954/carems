"use client";

import Link from "next/link";
import { useState } from "react";

const QUICK_LINKS = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
  { label: "Career", href: "/career" },
  { label: "Privacy Policy", href: "/privacy" },
];

const SERVICES = [
  "Plumbing Services",
  "Pest Control",
  "Electrical Maintenance",
  "Carpentering Services",
  "AC Refill",
  "Security Guard",
  "Corporates Services",
  "Microwave Oven Maintenance",
  "Washing Machine Maintenance",
  "Packers and Movers",
];

const SOCIAL = [
  { name: "Facebook", href: "#", icon: "facebook" },
  { name: "Twitter", href: "#", icon: "twitter" },
  { name: "YouTube", href: "#", icon: "youtube" },
  { name: "Instagram", href: "#", icon: "instagram" },
];

export default function Footer() {
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) setEmail("");
  };

  return (
    <footer
      className="relative border-t border-slate-700/50 text-slate-300"
      style={{
        background: "linear-gradient(180deg, #0f172a 0%, #0c1222 50%, #020617 100%)",
      }}
    >
      <div className="mx-auto max-w-[90rem] px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-10">
          {/* Quick Links */}
          <div className="lg:col-span-4">
            <h3 className="text-sm font-bold uppercase tracking-widest text-white">
              Quick Links
            </h3>
            <div className="mt-3 h-0.5 w-12 rounded-full bg-red-500" />
            <ul className="mt-6 space-y-3.5">
              {QUICK_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="flex items-center gap-2.5 text-sm text-slate-400 transition hover:translate-x-0.5 hover:text-white"
                  >
                    <span className="text-red-400">→</span>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Our Services */}
          <div className="lg:col-span-4">
            <h3 className="text-sm font-bold uppercase tracking-widest text-white">
              Our Services
            </h3>
            <div className="mt-3 h-0.5 w-12 rounded-full bg-red-500" />
            <ul className="mt-6 grid grid-cols-1 gap-x-6 gap-y-3.5 sm:grid-cols-2">
              {SERVICES.map((name) => (
                <li key={name}>
                  <Link
                    href="/services"
                    className="flex items-center gap-2.5 text-sm text-slate-400 transition hover:translate-x-0.5 hover:text-white"
                  >
                    <span className="text-red-400">→</span>
                    {name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Subscribe */}
          <div className="lg:col-span-4">
            <h3 className="text-sm font-bold uppercase tracking-widest text-white">
              Subscribe to Newsletter
            </h3>
            <div className="mt-3 h-0.5 w-12 rounded-full bg-red-500" />
            <p className="mt-6 text-sm leading-relaxed text-slate-400">
              Join our newsletter and get updates in your inbox every week. No spam.
            </p>
            <form
              onSubmit={handleSubmit}
              className="mt-4 flex gap-0 overflow-hidden rounded-2xl bg-slate-800/60 ring-1 ring-slate-600/80 transition focus-within:ring-2 focus-within:ring-red-500/50"
            >
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="min-w-0 flex-1 border-0 bg-transparent px-5 py-3.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-0"
              />
              <button
                type="submit"
                className="shrink-0 bg-red-600 px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-red-500"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Social + Google Play */}
        <div className="mt-14 flex flex-col items-center justify-between gap-8 border-t border-slate-700/60 pt-12 sm:flex-row">
          <div className="flex items-center gap-3">
            {SOCIAL.map((s) => (
              <a
                key={s.name}
                href={s.href}
                aria-label={s.name}
                className="flex h-11 w-11 items-center justify-center rounded-xl bg-slate-800/80 text-slate-400 ring-1 ring-slate-700/80 transition hover:-translate-y-0.5 hover:bg-slate-700 hover:text-white hover:shadow-lg"
              >
                {s.icon === "facebook" && (
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                  </svg>
                )}
                {s.icon === "twitter" && (
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  </svg>
                )}
                {s.icon === "youtube" && (
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                  </svg>
                )}
                {s.icon === "instagram" && (
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                  </svg>
                )}
              </a>
            ))}
          </div>
          <a
            href="https://play.google.com/store"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 rounded-xl bg-slate-800/80 px-5 py-3 text-white ring-1 ring-slate-700/80 transition hover:-translate-y-0.5 hover:bg-slate-700 hover:shadow-lg"
          >
            <svg className="h-9 w-9" viewBox="0 0 24 24" aria-hidden>
              <path fill="currentColor" d="M3.609 1.814L13.792 12 3.61 22.186a.996.996 0 01-.61-.92V2.734a1 1 0 01.609-.92zm10.89 10.893l2.302 2.302-10.937 6.333 8.635-8.635zm3.199-3.198l2.807 1.626a1 1 0 010 1.73l-2.808 1.626L15.206 12l2.492-2.491zM5.864 2.658L16.802 8.99l-2.302 2.302-8.636-8.634z" />
            </svg>
            <div className="text-left">
              <span className="block text-[10px] text-slate-400">Get it on</span>
              <span className="block text-sm font-semibold">Google Play</span>
            </div>
          </a>
        </div>
      </div>

      {/* Copyright bar */}
      <div
        className="border-t border-slate-800/80 py-5"
        style={{ background: "rgba(2, 6, 23, 0.8)" }}
      >
        <p className="text-center text-sm text-slate-500">
          Copyright © 2022–2025 CareMS.in. All Rights Reserved.
        </p>
      </div>
    </footer>
  );
}
