import { BeforeAfterSection } from "@/components/sections/BeforeAfterSection";
import { ContactSection } from "@/components/sections/ContactSection";
import { HeroSection } from "@/components/sections/HeroSection";
import { ServicesSection } from "@/components/sections/ServicesSection";
import { WorkSection } from "@/components/sections/WorkSection";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <BeforeAfterSection />
      <ServicesSection />
      <WorkSection />
      <ContactSection />
    </>
  );
}
