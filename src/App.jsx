import Navbar from "./components/Navbar";
import HeroSection from "./sections/HeroSection";
import SkillsSection from "./sections/SkillsSection";
import ProjectsSection from "./sections/ProjectsSection";
import ContactSection from "./sections/ContactSection"; // 👈 dagdag
import Footer from "./components/Footer";               // 👈 dagdag

function App() {
  return (
    <div className="bg-gray-950 min-h-screen text-gray-100 font-sans">
      <Navbar />
      <HeroSection />
      <SkillsSection />
      <ProjectsSection />
      <ContactSection />
      <Footer />
    </div>
  );
}

export default App;