import { projects } from "../data/projectsData";

export default function ProjectsSection() {
  return (
    <section id="projects" className="py-20 bg-gray-950 px-6">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-3">
            Featured <span className="text-indigo-500">Projects</span>
          </h2>
          <p className="text-gray-400">Mga sample projects na ginawa ko gamit ang React at Web Dev tools.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {projects.map((proj) => (
            <div key={proj.id} className="bg-gray-900 border border-gray-800 rounded-xl p-6 hover:border-indigo-500/50 transition-all">
              <h3 className="text-xl font-bold text-white mb-2">{proj.title}</h3>
              <p className="text-gray-400 text-sm mb-4">{proj.description}</p>
              
              <div className="flex flex-wrap gap-2 mb-6">
                {proj.tags.map((tag, idx) => (
                  <span key={idx} className="text-xs px-2.5 py-1 rounded bg-indigo-950 text-indigo-300 border border-indigo-800">
                    {tag}
                  </span>
                ))}
              </div>

              <div className="flex gap-4 text-sm font-medium">
                <a href={proj.githubUrl} target="_blank" rel="noreferrer" className="text-gray-300 hover:text-white">GitHub →</a>
                <a href={proj.liveUrl} target="_blank" rel="noreferrer" className="text-indigo-400 hover:text-indigo-300">Live Demo ↗</a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}