import { motion } from "framer-motion";

export default function ExperienceSection() {
  const experiences = [
    {
      year: "2024 — Present",
      role: "Frontend Developer",
      company: "Freelance / Projects",
    },
    {
      year: "2023 — 2024",
      role: "Web Developer",
      company: "Personal Portfolio & Clients",
    },
    {
      year: "2022 — 2023",
      role: "Junior Web Developer",
      company: "Web Development Studies",
    },
  ];

  return (
    <section className="bg-gray-100 py-16 px-6">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-2xl font-medium text-gray-900 mb-8">
          Experience
        </h2>

        <div className="flex flex-col gap-4">
          {experiences.map((exp, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="bg-gray-200/60 border border-gray-300/40 rounded-2xl p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-2"
            >
              <div>
                <h3 className="text-gray-900 font-medium text-base">
                  {exp.role}
                </h3>
                <p className="text-gray-500 text-sm">{exp.company}</p>
              </div>
              <span className="text-gray-400 text-sm font-mono sm:text-right">
                {exp.year}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}