import Navbar from "./components/Navbar";
import HeroSection from "./sections/HeroSection";
import ProjectsSection from "./sections/ProjectsSection";
import ExperienceSection from "./sections/ExperienceSection";
import ServicesAboutSection from "./sections/ServicesAboutSection";
import TestimonialsSection from "./sections/TestimonialsSection";
import ContactFooterSection from "./sections/ContactFooterSection";

function App() {
  return (
    // Outer background (off-white/light-gray)
    <div className="bg-[#f8f8f8] min-h-screen text-gray-900 font-sans antialiased selection:bg-gray-200">
      <Navbar />

      {/* Center Framed Box with Left and Right Vertical Borders */}
      <div className="max-w-4xl mx-auto bg-white border-x border-gray-200 min-h-screen relative shadow-sm">
        <HeroSection />
        <ProjectsSection />
        <ExperienceSection />
        <ServicesAboutSection />
        <TestimonialsSection />
        <ContactFooterSection />
      </div>
    </div>
  );
}

export default App;