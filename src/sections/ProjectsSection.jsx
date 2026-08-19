import { useRef } from "react";
import {
  motion,
  useAnimationFrame,
  useMotionValue,
  useTransform,
} from "framer-motion";

export default function ProjectsSection() {
  const projects = [
    { id: 1, title: "Simplify Conversations", tag: "Web App", img: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&q=80" },
    { id: 2, title: "Discover The Beauty Of Nature", tag: "Landing Page", img: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&q=80" },
    { id: 3, title: "Design With Icons", tag: "Design System", img: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=800&q=80" },
    { id: 4, title: "Crypto Portfolio Tracker", tag: "SaaS Platform", img: "https://images.unsplash.com/photo-1621416894569-0f39ed31d247?w=800&q=80" },
    { id: 5, title: "Minimalist E-Commerce", tag: "Online Store", img: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&q=80" },
    { id: 6, title: "AI Voice Assistant", tag: "Mobile App", img: "https://images.unsplash.com/photo-1589254065878-42c9da997008?w=800&q=80" },
    { id: 7, title: "Creative Agency Studio", tag: "Branding", img: "https://images.unsplash.com/photo-1542744094-3a3121699563?w=800&q=80" },
    { id: 8, title: "Fintech Mobile Dashboard", tag: "iOS App", img: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80" },
  ];

  const doubleProjects = [...projects, ...projects];

  const baseX = useMotionValue(0);
  const speedRef = useRef(1); 

  const x = useTransform(baseX, (v) => `${v}%`);

  useAnimationFrame((_, delta) => {
    // Ginawa nating 4 mula 12 para mas mabagal at chill ang takbo
    let moveBy = (delta / 1000) * 2 * speedRef.current;
    
    let currentX = baseX.get() - moveBy;
    if (currentX <= -50) {
      currentX = 0; 
    }
    baseX.set(currentX);
  });

  return (
    <section id="projects" className="bg-white py-12 border-b border-gray-100 relative">
      {/* Header Section */}
      <div className="px-8 sm:px-12 flex justify-between items-baseline mb-6">
        <h2 className="text-lg sm:text-xl font-bold text-gray-900 tracking-tight">
          Selected Work
        </h2>
        <a 
          href="#" 
          className="text-xs text-gray-500 hover:text-gray-900 underline underline-offset-4 transition-colors"
        >
          view more
        </a>
      </div>

      {/* Marquee Wrapper */}
      <div className="w-screen relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] overflow-hidden select-none">
        <motion.div 
          style={{ x }}
          onMouseEnter={() => { speedRef.current = 0.3; }} // Mas mabagal pa nang kaunti kapag hino-hover
          onMouseLeave={() => { speedRef.current = 1; }}   
          className="flex gap-5 py-2 w-max"
        >
          {doubleProjects.map((proj, index) => (
            <div 
              key={`${proj.id}-${index}`} 
              className="w-[250px] sm:w-[300px] flex-shrink-0 cursor-pointer group"
            >
              {/* Device Frame Box */}
              <div className="bg-[#f3f3f3] border border-gray-200/70 rounded-2xl p-3 mb-2.5 shadow-2xs group-hover:border-gray-300 transition-all">
                {/* Window Dots */}
                <div className="flex items-center gap-1.5 mb-2.5 px-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-gray-300"></span>
                  <span className="w-1.5 h-1.5 rounded-full bg-gray-300"></span>
                  <span className="w-1.5 h-1.5 rounded-full bg-gray-300"></span>
                </div>
                
                {/* Image Placeholder */}
                <div className="w-full aspect-[4/3] rounded-xl overflow-hidden bg-gray-200">
                  <img
                    src={proj.img}
                    alt={proj.title}
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500 group-hover:scale-105"
                  />
                </div>
              </div>

              {/* Title & Category */}
              <div className="px-1">
                <h3 className="text-xs sm:text-sm font-bold text-gray-900 truncate group-hover:text-black">
                  {proj.title}
                </h3>
                <p className="text-[11px] text-gray-400 font-normal mt-0.5">
                  {proj.tag}
                </p>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}