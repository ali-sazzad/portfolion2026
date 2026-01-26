import { Container } from "@/components/site/Container";

import { HeroSection } from "@/components/site/sections/HeroSection";
import { AboutSection } from "@/components/site/sections/AboutSection";
import { SkillsSection } from "@/components/site/sections/SkillsSection";
import { EducationSection } from "@/components/site/sections/EducationSection";
import { ExperienceSection } from "@/components/site/sections/ExperienceSection";
import { AchievementsSection } from "@/components/site/sections/AchievementsSection";
import { ContactSection } from "@/components/site/sections/ContactSection";
import { SiteFooter } from "@/components/site/sections/SiteFooter";

export default function HomePage() {
  return (
    <div>
      <Container>
        <HeroSection />
        <AboutSection />
        <SkillsSection />
        <EducationSection />
        <ExperienceSection />
        <AchievementsSection />
        <ContactSection />
        <SiteFooter />
      </Container>
    </div>
  );
}
