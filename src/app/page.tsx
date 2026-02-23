import BannerSlider from "@/components/BannerSlider";
import ServicesSection from "@/components/ServicesSection";
import HowItWorksSection from "@/components/HowItWorksSection";
import QualityTestimonialSection from "@/components/QualityTestimonialSection";
import GetAppSection from "@/components/GetAppSection";
import StatsAndBenefitsSection from "@/components/StatsAndBenefitsSection";
import RevealOnScroll from "@/components/RevealOnScroll";

export default function Home() {
  return (
    <div className="min-h-screen bg-zinc-50">
      <BannerSlider />
      <main>
        <RevealOnScroll direction="up">
          <section className="mx-auto max-w-[90rem] px-4 py-12 text-center sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold text-zinc-800 sm:text-3xl">
              Welcome to CareMS Maintenance Services
            </h2>
            <p className="mt-3 text-zinc-600">
              24 hours emergency service • Install • Repair • Maintenance
            </p>
          </section>
        </RevealOnScroll>

        <RevealOnScroll direction="left">
          <ServicesSection />
        </RevealOnScroll>

        <RevealOnScroll direction="right">
          <HowItWorksSection />
        </RevealOnScroll>

        <RevealOnScroll direction="left">
          <QualityTestimonialSection />
        </RevealOnScroll>

        <RevealOnScroll direction="right">
          <GetAppSection />
        </RevealOnScroll>

        <RevealOnScroll direction="up">
          <StatsAndBenefitsSection />
        </RevealOnScroll>
      </main>
    </div>
  );
}
