"use client";

import Image from "next/image";
import Link from "next/link";

const SERVICES = [
  { id: "electrical", label: "Electrical", image: "/3.webp" },
  { id: "plumbing", label: "Plumbing", image: "/5.webp" },
  { id: "pest-control", label: "Pest Control", image: "/6.webp" },
  { id: "ac-refill", label: "AC Refill", image: "/7.jpg" },
  { id: "carpenter", label: "Carpenter", image: "/8.webp" },
  { id: "water-filter", label: "Water Filter", image: "/9.webp" },
];

const FLOATING_LINKS = [
  { href: "tel:01141001188", label: "Call", bg: "bg-red-600", icon: "phone" },
  { href: "#contact", label: "Location", bg: "bg-orange-500", icon: "location" },
  {
    href: "https://wa.me/911141001188",
    target: "_blank",
    rel: "noopener noreferrer",
    label: "WhatsApp",
    bg: "bg-green-600",
    icon: "whatsapp",
  },
];

export default function ServicesSection() {
  return (
    <section className="relative overflow-hidden bg-zinc-50 px-4 py-20 sm:px-6 lg:px-8">
      {/* Premium background */}
      <div
        className="absolute inset-0 opacity-40"
        style={{
          backgroundImage: `radial-gradient(circle at 20% 30%, rgba(30, 64, 175, 0.08) 0%, transparent 50%),
            radial-gradient(circle at 80% 70%, rgba(220, 38, 38, 0.06) 0%, transparent 50%)`,
        }}
        aria-hidden
      />
      <div className="absolute inset-0 bg-[linear-gradient(to_bottom,transparent_0%,rgba(255,255,255,0.5)_100%)]" aria-hidden />

      {/* Blue accent line + heading */}
      <div className="relative mx-auto max-w-[90rem]">
        <div className="h-1 w-24 rounded-full bg-blue-600 sm:w-32" />
        <h2 className="mt-6 text-3xl font-extrabold uppercase tracking-tight text-zinc-800 sm:text-4xl lg:text-5xl">
          You&apos;re at the{" "}
          <span className="bg-linear-to-r from-blue-600 to-blue-700 bg-clip-text text-transparent">
            right place
          </span>
          !
        </h2>
        <p className="mt-3 max-w-2xl text-zinc-600 sm:text-lg">
          From electrical to plumbing, pest control to AC — we care for your dream home, office & farm house.
        </p>
      </div>

      {/* Services grid – premium cards */}
      <div className="relative mx-auto mt-14 max-w-[90rem]">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
          {SERVICES.map((service) => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </div>
      </div>

      {/* Floating contact bar – premium */}
      <div className="fixed right-0 top-1/2 z-40 hidden -translate-y-1/2 flex-col gap-1 rounded-l-2xl border border-zinc-200/80 bg-white/95 py-2 pl-1 pr-2 shadow-[0_0_40px_rgba(0,0,0,0.08)] backdrop-blur-md sm:flex">
        {FLOATING_LINKS.map((item) => (
          <a
            key={item.label}
            href={item.href}
            target={item.target}
            rel={item.rel}
            className={`flex h-12 w-12 items-center justify-center rounded-xl text-white shadow-lg transition-all duration-200 hover:scale-110 hover:shadow-xl active:scale-95 ${item.bg}`}
            aria-label={item.label}
          >
            {item.icon === "phone" && (
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
              </svg>
            )}
            {item.icon === "location" && (
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
              </svg>
            )}
            {item.icon === "whatsapp" && (
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
            )}
          </a>
        ))}
      </div>

      {/* Bottom: Google Play + URL – premium */}
      <div
        id="contact"
        className="relative mx-auto mt-20 max-w-7xl scroll-mt-20 rounded-2xl border border-zinc-200/80 bg-white/80 px-6 py-8 shadow-sm backdrop-blur-sm"
      >
        <div className="flex flex-col items-start gap-6 sm:flex-row sm:items-center sm:justify-between">
          <a
            href="https://play.google.com/store"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-4 rounded-xl border border-zinc-200 bg-white px-5 py-3 shadow-sm transition hover:border-blue-200 hover:shadow-md"
          >
            <svg className="h-10 w-10" viewBox="0 0 24 24" aria-hidden>
              <path fill="#000" d="M3.609 1.814L13.792 12 3.61 22.186a.996.996 0 01-.61-.92V2.734a1 1 0 01.609-.92zm10.89 10.893l2.302 2.302-10.937 6.333 8.635-8.635zm3.199-3.198l2.807 1.626a1 1 0 010 1.73l-2.808 1.626L15.206 12l2.492-2.491zM5.864 2.658L16.802 8.99l-2.302 2.302-8.636-8.634z" />
            </svg>
            <div className="text-left">
              <span className="block text-xs text-zinc-500">Get it on</span>
              <span className="block text-base font-semibold text-zinc-800">Google Play</span>
            </div>
          </a>
          <a
            href="https://www.carems.in/electrical-services.php"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-lg bg-blue-50 px-4 py-2.5 text-sm font-medium text-blue-600 transition hover:bg-blue-100"
          >
            carems.in/electrical-services
          </a>
        </div>
      </div>
    </section>
  );
}

function ServiceCard({
  service,
}: {
  service: { id: string; label: string; image: string };
}) {
  return (
    <Link
      href={`/services#${service.id}`}
      className="group relative block overflow-hidden rounded-2xl bg-white shadow-xl ring-1 ring-zinc-200/70 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:ring-2 hover:ring-blue-300/60"
    >
      <div className="relative aspect-4/3 w-full overflow-hidden">
        <Image
          src={service.image}
          alt={service.label}
          fill
          className="object-cover transition duration-500 group-hover:scale-110"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
        {/* Gradient so red label always readable */}
        <div
          className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent"
          aria-hidden
        />
        {/* Hover overlay */}
        <div className="absolute inset-0 flex items-center justify-center bg-blue-900/0 transition duration-300 group-hover:bg-blue-900/25" aria-hidden>
          <span className="translate-y-3 rounded-full bg-white/20 px-4 py-2 text-base font-semibold text-white opacity-0 backdrop-blur-sm transition duration-300 group-hover:translate-y-0 group-hover:opacity-100">
            View Service →
          </span>
        </div>
      </div>
      {/* Red label – best UI: ribbon style, clear text */}
      <div className="absolute bottom-0 left-0 right-0 flex justify-center px-3 pb-3 sm:px-4 sm:pb-4">
        <div
          className="relative flex min-h-[52px] items-center justify-center rounded-xl px-6 py-3 shadow-xl transition duration-300 group-hover:scale-[1.02]"
          style={{
            background: "linear-gradient(135deg, #dc2626 0%, #b91c1c 50%, #991b1b 100%)",
            boxShadow: "0 4px 14px rgba(185, 28, 28, 0.4), inset 0 1px 0 rgba(255,255,255,0.2)",
          }}
        >
          {/* Subtle top highlight */}
          <div className="absolute inset-x-2 top-0 h-px rounded-full bg-white/30" aria-hidden />
          <span className="relative text-sm font-bold uppercase tracking-[0.2em] text-white drop-shadow-md sm:text-base">
            {service.label}
          </span>
        </div>
      </div>
    </Link>
  );
}
