import Navbar from "./components/Navbar";
import HeroSection from "./sections/HeroSection";
import ProjectsSection from "./sections/ProjectsSection";
import ServicesAboutSection from "./sections/ServicesAboutSection";
import TestimonialsSection from "./sections/TestimonialsSection";
import ContactFooterSection from "./sections/ContactFooterSection"; // 👈 dagdag ito

function App() {
  return (
    <div className="bg-gray-100 min-h-screen font-sans text-gray-900 antialiased selection:bg-gray-300">
      <Navbar />
      <HeroSection />
      <ProjectsSection />
      <ServicesAboutSection />
      <TestimonialsSection />
      <ContactFooterSection /> {/* 👈 dagdag ito */}
    </div>
  );
}

export default App;