import { skills } from "../data/skillsData";

export default function SkillsSection() {
  return (
    <section id="skills" className="py-20 bg-gray-900 px-6">
      <div className="max-w-4xl mx-auto">
        {/* Section Heading */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-3">
            My <span className="text-indigo-500">Skills</span> & Tools
          </h2>
          <p className="text-gray-400">
            Ang mga teknolohiya at tools na ginagamit ko sa pagbuo ng web applications.
          </p>
        </div>

        {/* Skills Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          {skills.map((skill, index) => (
            <div 
              key={index}
              className="bg-gray-800/60 border border-gray-700/60 rounded-xl p-4 text-center hover:border-indigo-500 hover:scale-105 transition-all duration-300"
            >
              <h3 className="text-white font-semibold">{skill.name}</h3>
              <span className="text-xs text-indigo-400 mt-1 inline-block">
                {skill.category}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}