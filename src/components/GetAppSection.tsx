"use client";

import Image from "next/image";
import Link from "next/link";

export default function GetAppSection() {
  return (
    <section className="relative overflow-hidden px-4 py-20 sm:px-6 lg:px-8">
      {/* Background – premium cream/yellow */}
      <div
        className="absolute inset-0"
        style={{
          background: "linear-gradient(165deg, #fefce8 0%, #fef9c3 30%, #fef3c7 60%, #fffbeb 100%)",
        }}
        aria-hidden
      />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_0%,rgba(255,255,255,0.8)_0%,transparent_70%)]" aria-hidden />

      <div className="relative mx-auto flex max-w-[90rem] flex-col items-center gap-12 lg:flex-row lg:items-center lg:justify-between lg:gap-16">
        {/* Left: Get the App CTA */}
        <div className="flex max-w-xl flex-col items-center text-center lg:items-start lg:text-left">
          <div className="flex items-center gap-3">
            <Image
              src="/logo1.png"
              alt="CareMS"
              width={56}
              height={56}
              className="h-14 w-14 object-contain"
            />
            <div>
              <p className="text-lg font-bold text-red-600">CARE</p>
              <p className="text-xs font-medium uppercase tracking-wider text-red-600/90">
                Maintenance Services
              </p>
            </div>
          </div>
          <h2 className="mt-8 text-3xl font-extrabold uppercase tracking-tight text-red-600 sm:text-4xl lg:text-4xl">
            Get the App
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-slate-700">
            Download the App and manage your services on your mobile phone.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4 lg:justify-start">
            <a
              href="https://play.google.com/store"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 rounded-xl bg-slate-900 px-5 py-3.5 text-white shadow-lg transition hover:bg-slate-800 hover:shadow-xl"
            >
              <svg className="h-9 w-9" viewBox="0 0 24 24" aria-hidden>
                <path fill="currentColor" d="M3.609 1.814L13.792 12 3.61 22.186a.996.996 0 01-.61-.92V2.734a1 1 0 01.609-.92zm10.89 10.893l2.302 2.302-10.937 6.333 8.635-8.635zm3.199-3.198l2.807 1.626a1 1 0 010 1.73l-2.808 1.626L15.206 12l2.492-2.491zM5.864 2.658L16.802 8.99l-2.302 2.302-8.636-8.634z" />
              </svg>
              <div className="text-left">
                <span className="block text-[10px] text-slate-400">Get it on</span>
                <span className="block text-sm font-semibold">Google Play</span>
              </div>
            </a>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center rounded-xl bg-red-600 px-8 py-3.5 text-base font-bold text-white shadow-lg transition hover:bg-red-700 hover:shadow-xl"
            >
              Book Now
            </Link>
          </div>
        </div>

        {/* Right: Phone mockup with 9.jpg (app screenshot) */}
        <div className="relative flex justify-center lg:flex-1">
          <div
            className="relative rounded-[2.5rem] border-10 border-slate-800 bg-slate-900 p-2 shadow-2xl"
            style={{
              boxShadow: "0 50px 80px -20px rgba(0,0,0,0.35), 0 0 0 1px rgba(0,0,0,0.1)",
            }}
          >
            {/* Notch */}
            <div className="absolute left-1/2 top-0 z-10 h-6 w-32 -translate-x-1/2 rounded-b-2xl bg-slate-900" />
            <div className="relative aspect-9/19 w-[280px] overflow-hidden rounded-3xl bg-white sm:w-[300px]">
              <Image
                src="/9.jpg"
                alt="CareMS App - Services"
                fill
                className="object-cover object-top"
                sizes="300px"
                priority
              />
            </div>
          </div>
        </div>
      </div>

      {/* Bottom: repeated Google Play CTA */}
      <div className="relative mx-auto mt-16 max-w-[90rem] border-t border-amber-200/60 pt-10">
        <div className="flex justify-center">
          <a
            href="https://play.google.com/store"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 rounded-xl border-2 border-slate-800 bg-slate-900 px-6 py-3.5 text-white shadow-lg transition hover:bg-slate-800"
          >
            <svg className="h-8 w-8" viewBox="0 0 24 24" aria-hidden>
              <path fill="currentColor" d="M3.609 1.814L13.792 12 3.61 22.186a.996.996 0 01-.61-.92V2.734a1 1 0 01.609-.92zm10.89 10.893l2.302 2.302-10.937 6.333 8.635-8.635zm3.199-3.198l2.807 1.626a1 1 0 010 1.73l-2.808 1.626L15.206 12l2.492-2.491zM5.864 2.658L16.802 8.99l-2.302 2.302-8.636-8.634z" />
            </svg>
            <span className="font-semibold">Get it on Google Play</span>
          </a>
        </div>
      </div>
    </section>
  );
}
