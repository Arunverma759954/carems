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
          className="group relative flex flex-col items-stretch gap-10 overflow-hidden rounded-[3rem] px-8 py-12 shadow-3xl sm:flex-row sm:items-center sm:justify-between sm:px-12 lg:px-20"
          style={{
            background: "linear-gradient(135deg, #020617 0%, #0f172a 50%, #020617 100%)",
            boxShadow: "0 40px 80px -20px rgba(0, 0, 0, 0.6), inset 0 0 0 1px rgba(255,255,255,0.1)",
          }}
        >
          {/* Animated Background Aura */}
          <div className="absolute -left-20 -top-20 h-64 w-64 rounded-full bg-blue-600/20 blur-[100px] transition-all duration-1000 group-hover:bg-blue-500/30" />
          <div className="absolute -right-20 -bottom-20 h-64 w-64 rounded-full bg-red-600/10 blur-[100px] transition-all duration-1000 group-hover:bg-red-500/20" />

          <div className="relative z-10 flex flex-col justify-center">
            <h3 className="text-4xl font-black uppercase leading-[0.9] tracking-tighter text-white sm:text-5xl lg:text-7xl">
              Largest<br />
              <span className="text-blue-500">Home Service</span><br />
              Provider
            </h3>
          </div>
          <div className="relative z-10 flex flex-wrap items-center gap-6">
            <div className="flex items-center gap-5 rounded-3xl bg-white/5 px-6 py-5 ring-1 ring-white/10 backdrop-blur-xl">
              <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-amber-400 text-3xl font-black text-slate-950 shadow-[0_0_30px_rgba(251,191,36,0.4)]">
                24/7
              </div>
              <div>
                <p className="text-xs font-black uppercase tracking-[0.2em] text-amber-400">
                  Global
                </p>
                <p className="text-lg font-bold text-white">Support</p>
              </div>
            </div>
            <a
              href="tel:01141085151"
              className="group/btn flex items-center gap-5 rounded-3xl bg-red-600 px-6 py-5 shadow-2xl transition-all hover:bg-white hover:scale-105"
            >
              <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-white/20 text-white transition-colors group-hover/btn:bg-red-600">
                <svg className="h-8 w-8" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
                </svg>
              </div>
              <div>
                <p className="text-xs font-black uppercase tracking-[0.2em] text-white/60 group-hover/btn:text-red-600/60">
                  Dial Now
                </p>
                <p className="text-lg font-black text-white group-hover/btn:text-red-600">011-41085151</p>
              </div>
            </a>
          </div>
        </div>
      </div>

      {/* How it works – heading */}
      <div className="mx-auto mt-24 max-w-4xl text-center">
        <h2 className="text-4xl font-black uppercase tracking-tight text-slate-800 sm:text-5xl lg:text-7xl">
          How it works
        </h2>
        <p className="mt-6 text-xl text-blue-600 font-semibold sm:text-2xl">
          Connect with us on your phone for easier access to our services!
        </p>
      </div>

      {/* Steps – new UI: timeline cards */}
      <div className="mx-auto mt-20 max-w-[90rem]">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-4">
          {STEPS.map((step, index) => (
            <div
              key={step.id}
              className="group relative flex flex-col rounded-[2.5rem] border border-slate-100 bg-white p-8 shadow-xl transition-all duration-500 hover:-translate-y-3 hover:shadow-3xl hover:border-blue-500/30"
            >
              <div className="absolute -right-4 -top-4 text-8xl font-black text-slate-50 transition-colors group-hover:text-blue-50/50">
                0{step.id}
              </div>

              <div className="relative z-10 mb-8 flex h-16 w-16 items-center justify-center rounded-2xl bg-slate-50 text-slate-600 transition-all duration-500 group-hover:bg-blue-600 group-hover:text-white group-hover:rotate-12 group-hover:shadow-[0_15px_35px_rgba(37,99,235,0.4)]">
                {step.icon === "search" && (
                  <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                )}
                {step.icon === "calendar" && (
                  <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                )}
                {step.icon === "document" && (
                  <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                )}
                {step.icon === "gear" && (
                  <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                )}
              </div>
              <h3 className="relative z-10 text-2xl font-black uppercase tracking-tight text-slate-900 leading-tight">
                {step.title}
              </h3>
              <p className="relative z-10 mt-4 text-base font-medium leading-relaxed text-slate-500">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
