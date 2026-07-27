import { AboutSection } from "@/components/sections/AboutSection";
import { BeforeAfterSection } from "@/components/sections/BeforeAfterSection";
import { ContactSection } from "@/components/sections/ContactSection";
import { HeroSection } from "@/components/sections/HeroSection";
import { MissionSection } from "@/components/sections/MissionSection";
import { ServicesSection } from "@/components/sections/ServicesSection";
import { WorkSection } from "@/components/sections/WorkSection";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <MissionSection />
      <BeforeAfterSection />
      <ServicesSection />
      <WorkSection />
      <AboutSection />
      <ContactSection />
    </>
  );
}
