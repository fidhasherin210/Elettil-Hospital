import { Header } from "@/components/Header";
import { HeroSection } from "@/sections/HeroSection";
import { AboutSection } from "@/sections/AboutSection";
import { DepartmentsSection } from "@/sections/DepartmentsSection";
import { DoctorsSection } from "@/sections/DoctorsSection";
import { ContactSection } from "@/sections/ContactSection";
import { Footer } from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <HeroSection />
        <AboutSection />
        <DepartmentsSection />
        <DoctorsSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
