"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

const SERVICES = [
  { id: "plumbing", label: "Plumbing", icon: "wrench" },
  { id: "lifting", label: "Heavy Lifting", icon: "crane" },
  { id: "moving", label: "Moving", icon: "dolly" },
  { id: "appliance", label: "Appliance", icon: "washing" },
  { id: "auto", label: "Auto", icon: "car" },
  { id: "delivery", label: "Delivery", icon: "truck" },
  { id: "staffing", label: "Staffing", icon: "team" },
  { id: "payment", label: "Payment", icon: "card" },
];

const POPUP_DELAY_MS = 3000;

export default function BookServicePopup() {
  const [show, setShow] = useState(false);
  const [selectedService, setSelectedService] = useState<string | null>(null);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");

  useEffect(() => {
    const t = setTimeout(() => setShow(true), POPUP_DELAY_MS);
    return () => clearTimeout(t);
  }, []);

  const close = () => setShow(false);

  if (!show) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="popup-title"
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm animate-[fadeIn_0.3s_ease-out]"
        onClick={close}
        aria-hidden
      />

      {/* Modal */}
      <div
        className="relative w-full max-w-md overflow-hidden rounded-2xl shadow-2xl animate-[fadeIn_0.35s_ease-out] sm:max-w-lg"
        style={{
          background: "linear-gradient(180deg, #1e3a8a 0%, #1e293b 50%, #0f172a 100%)",
          boxShadow: "0 25px 50px -12px rgba(0,0,0,0.5)",
        }}
      >
        {/* Close button */}
        <button
          type="button"
          onClick={close}
          className="absolute right-3 top-3 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/20"
          aria-label="Close"
        >
          <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div className="px-6 pb-6 pt-8 sm:px-8 sm:pt-10">
          {/* Header */}
          <div className="text-center">
            <h2 id="popup-title" className="text-xl font-bold text-white sm:text-2xl">
              Ready for Reliable Repairs?
            </h2>
            <p className="mt-1 text-sm text-white/90">Book a Service in a Blink!</p>
          </div>

          <div className="mt-6 space-y-4">
            <div>
              <label htmlFor="popup-name" className="mb-1.5 block text-sm font-medium text-white">
                Name
              </label>
              <input
                id="popup-name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter Name"
                className="w-full rounded-xl border-0 bg-slate-100/95 px-4 py-3 text-slate-800 placeholder-slate-500 focus:ring-2 focus:ring-red-500/50"
              />
            </div>
            <div>
              <label htmlFor="popup-phone" className="mb-1.5 block text-sm font-medium text-white">
                Phone
              </label>
              <input
                id="popup-phone"
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="Enter Phone Number"
                className="w-full rounded-xl border-0 bg-slate-100/95 px-4 py-3 text-slate-800 placeholder-slate-500 focus:ring-2 focus:ring-red-500/50"
              />
            </div>
            <div>
              <label htmlFor="popup-address" className="mb-1.5 block text-sm font-medium text-white">
                Address
              </label>
              <input
                id="popup-address"
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="Enter Address"
                className="w-full rounded-xl border-0 bg-slate-100/95 px-4 py-3 text-slate-800 placeholder-slate-500 focus:ring-2 focus:ring-red-500/50"
              />
            </div>

            {/* What are you looking for? */}
            <div>
              <p className="mb-3 text-sm font-medium text-white">What are you looking for?</p>
              <div className="grid grid-cols-4 gap-2">
                {SERVICES.map((s) => (
                  <button
                    key={s.id}
                    type="button"
                    onClick={() => setSelectedService(selectedService === s.id ? null : s.id)}
                    className={`flex flex-col items-center justify-center rounded-xl py-3 transition ${
                      selectedService === s.id
                        ? "bg-red-600/30 ring-2 ring-red-500 text-white"
                        : "bg-slate-800/80 text-red-400 hover:bg-slate-700/80"
                    }`}
                  >
                    <ServiceIcon type={s.icon} />
                    <span className="mt-1 text-[10px] font-medium text-white/90 sm:text-xs">{s.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Get started button */}
            <Link
              href="/contact"
              onClick={close}
              className="mt-6 flex w-full items-center justify-between rounded-xl bg-red-600 px-5 py-4 font-bold text-white shadow-lg transition hover:bg-red-500 active:scale-[0.98]"
            >
              <span>Get started</span>
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-900/50">
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

function ServiceIcon({ type }: { type: string }) {
  const c = "h-6 w-6 sm:h-7 sm:w-7";
  if (type === "wrench")
    return (
      <svg className={c} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    );
  if (type === "crane")
    return (
      <svg className={c} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
      </svg>
    );
  if (type === "dolly")
    return (
      <svg className={c} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
      </svg>
    );
  if (type === "washing")
    return (
      <svg className={c} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
      </svg>
    );
  if (type === "car")
    return (
      <svg className={c} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1h9m5-9v2m0 4v2m0-6V6a1 1 0 011-1h2a1 1 0 011 1v2" />
      </svg>
    );
  if (type === "truck")
    return (
      <svg className={c} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1h9m1-8V6a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0" />
      </svg>
    );
  if (type === "team")
    return (
      <svg className={c} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    );
  if (type === "card")
    return (
      <svg className={c} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
      </svg>
    );
  return null;
}
