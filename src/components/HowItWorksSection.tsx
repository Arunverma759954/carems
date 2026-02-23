"use client";

const STEPS = [
  {
    id: 1,
    title: "Sign Up",
    description:
      "You can book and track service requests by signing up on our app, following a simple process. So, download our app today.",
    icon: "search",
  },
  {
    id: 2,
    title: "Book Us",
    description:
      "Concerned about certain things? Just make a call to us and receive consultation on your queries and our services.",
    icon: "calendar",
  },
  {
    id: 3,
    title: "Expect Us",
    description:
      "Once your service request is confirmed, our team will update you on the time and date of the technician's arrival, and you can get your space repaired and refreshed ASAP.",
    icon: "document",
  },
  {
    id: 4,
    title: "Become a Member",
    description:
      "Are you in regular need of maintenance services? Become a member and get uninterrupted service at your doorsteps with just one call.",
    icon: "gear",
  },
];

export default function HowItWorksSection() {
  return (
    <section className="relative overflow-hidden bg-white px-4 py-20 sm:px-6 lg:px-8">
      {/* Top strip: Largest Home Service Provider + 24/7 + Call */}
      <div className="relative mx-auto max-w-[90rem]">
        <div
          className="flex flex-col items-stretch gap-6 rounded-3xl px-6 py-8 shadow-2xl sm:flex-row sm:items-center sm:justify-between sm:gap-8 sm:px-10 sm:py-8 lg:px-12"
          style={{
            background: "linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #0f172a 100%)",
            boxShadow: "0 25px 50px -12px rgba(15, 23, 42, 0.4), 0 0 0 1px rgba(255,255,255,0.05) inset",
          }}
        >
          <div className="flex flex-col justify-center">
            <p className="text-2xl font-extrabold uppercase leading-tight tracking-tight text-white sm:text-3xl lg:text-4xl">
              Largest
            </p>
            <p className="text-2xl font-extrabold uppercase leading-tight tracking-tight text-white sm:text-3xl lg:text-4xl">
              Home Service
            </p>
            <p className="text-2xl font-extrabold uppercase leading-tight tracking-tight text-white sm:text-3xl lg:text-4xl">
              Provider
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-4 sm:gap-6">
            <div className="flex items-center gap-4 rounded-2xl bg-amber-400/15 px-5 py-4 ring-1 ring-amber-400/30 backdrop-blur-sm">
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-amber-400/90 text-2xl font-black text-slate-900">
                24/7
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-amber-300/90">
                  Online
                </p>
                <p className="text-sm font-bold text-white">Support</p>
              </div>
            </div>
            <a
              href="tel:01141085151"
              className="flex items-center gap-4 rounded-2xl bg-white/10 px-5 py-4 ring-1 ring-white/20 transition hover:bg-white/15"
            >
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-red-600 text-white">
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
                </svg>
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                  Call us
                </p>
                <p className="text-base font-bold text-white">011-41085151/2/3</p>
              </div>
            </a>
          </div>
        </div>
      </div>

      {/* How it works – heading */}
      <div className="mx-auto mt-20 max-w-3xl text-center">
        <h2 className="text-3xl font-extrabold uppercase tracking-tight text-slate-800 sm:text-4xl lg:text-5xl">
          How it works
        </h2>
        <p className="mt-4 text-lg text-blue-600 sm:text-xl">
          Connect with us on your phone for easier access to our services!
        </p>
      </div>

      {/* Steps – new UI: timeline cards */}
      <div className="mx-auto mt-14 max-w-[90rem]">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          {STEPS.map((step, index) => (
            <div
              key={step.id}
              className="group relative flex flex-col rounded-2xl border border-slate-200/80 bg-white p-6 shadow-lg transition-all duration-300 hover:-translate-y-1 hover:border-blue-200 hover:shadow-xl"
            >
              {/* Step number + connector line (desktop) */}
              <div className="mb-5 flex items-center gap-4">
                <div
                  className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl text-lg font-bold text-white"
                  style={{
                    background: "linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)",
                    boxShadow: "0 4px 14px rgba(37, 99, 235, 0.4)",
                  }}
                >
                  {step.id}
                </div>
                {index < STEPS.length - 1 && (
                  <div className="hidden flex-1 border-t border-dashed border-slate-200 lg:block" aria-hidden />
                )}
              </div>
              {/* Icon */}
              <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-lg bg-slate-100 text-slate-600 transition group-hover:bg-blue-50 group-hover:text-blue-600">
                {step.icon === "search" && (
                  <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                )}
                {step.icon === "calendar" && (
                  <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                )}
                {step.icon === "document" && (
                  <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                )}
                {step.icon === "gear" && (
                  <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                )}
              </div>
              <h3 className="text-lg font-bold uppercase tracking-wide text-slate-800">
                {step.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
