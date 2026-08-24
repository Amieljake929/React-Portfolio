import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const PROJECTS_DATA = [
  {
    id: 1,
    category: 'WEB SYSTEM',
    title: 'School Management System III - Capstone Project',
    image: '/projects/project1.png',
    githubUrl: 'https://github.com/Amieljake929/Enrollment-Management-System---Cluster-7.git',
    liveDemo: '',
    description: 'A comprehensive school management platform designed to streamline student enrollment, course registration, and administrative record management.',
    techStack: ['Laravel Framework', 'PHP Backend', 'Node.js', 'Express', 'MySQL', 'HTML5','CSS3', 'JavaScript', 'RESTful APIs', 'JSON', 'Hostinger'],
    features: [
      'Student and administrator authentication roles',
      'Automated grade calculation and reporting',
      'Real-time enrollment status tracking',
    ],
  },
  {
    id: 2,
    category: 'WEB SYSTEM',
    title: 'Barangay Management System - BMS',
    image: '/projects/project2.png',
    githubUrl: 'https://github.com/Amieljake929/Barangay-Bagbag-System.git',
    liveDemo: '',
    description: 'A digitized local municipal management portal to manage official clearance requests, resident databases, and blotter filings.',
    techStack: ['Plain PHP', 'HTML5', 'Tailwind CSS', 'MySQL', 'JavaScript', 'RESTful APIs', 'JSON', 'Hostinger'],
    features: [
      'Online barangay clearance request processing',
      'Centralized resident record management',
      'Incident and blotter report tracking',
    ],
  },
  {
    id: 3,
    category: 'WEB APP',
    title: 'Kaffa - Coffee Shop Website',
    image: '/projects/project4.png',
    githubUrl: 'https://github.com/Amieljake929/Kaffa.git',
    liveDemo: '',
    description: 'An interactive web app for a coffee shop showcasing menu options, item customizations, and order flow simulations.',
    techStack: ['HTML5', 'Framer Motion', 'Tailwind CSS', 'Javascript', 'JSON'],
    features: [
      'Interactive product menu filtering',
      'Custom drink option picker',
      'Fluid page transitions and UI micro-interactions',
    ],
  },
  {
    id: 4,
    category: 'WEBSITE',
    title: 'Personal Portfolio Website',
    image: '/projects/project5.png',
    githubUrl: 'https://github.com/Amieljake929/React-Portfolio.git',
    liveDemo: '',
    description: 'A modern single-page portfolio with interactive interactive UI elements, smooth scrolling, and page route transitions.',
    techStack: ['React', 'Tailwind CSS', 'Framer Motion', 'Lenis Scroll', 'React Router', 'JavaScript', 'JSON', 'Vercel'],
    features: [
      'Interactive 3D laptop drag showcase',
      'Responsive mobile-first layout',
      'Dynamic routing and custom transitions',
    ],
  },
  {
    id: 5,
    category: 'WEB SYSTEM',
    title: 'Local Tour Guide - Travel Website',
    image: '/projects/project6.jpg',
    githubUrl: 'https://github.com/christianbacay042504-coder/coderistyarn2.git',
    liveDemo: '',
    description: 'A web platform assisting tourists in exploring local destinations, booking tour itineraries, and leaving venue feedback.',
    techStack: ['Plain PHP', 'HTML5','Tailwind CSS', 'REST API'],
    features: [
      'Destination search and categorizations',
      'Tour guide booking system',
      'User ratings and review portal',
    ],
  },
  {
    id: 6,
    category: 'WEB SYSTEM',
    title: 'PRCQC - System for Philippine Red Cross - Quezon City Chapter',
    image: '/projects/project7.png',
    githubUrl: 'https://github.com/Amieljake929',
    liveDemo: '',
    description: 'An administrative web system built for chapter operations, inventory tracking, and volunteer management.',
    techStack: ['Laravel Framework', 'PHP Backend', 'Tailwind CSS', 'JSON'],
    features: [
      'Volunteer activity logging',
      'Donation and inventory record keeping',
      'Administrative analytics overview',
    ],
  },
];

export default function ProjectDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const project = PROJECTS_DATA.find((item) => String(item.id) === String(id));

  if (!project) {
    return (
      <div className="py-20 text-center">
        <h2 className="text-2xl font-bold text-gray-900">Project Not Found</h2>
        <button
          onClick={() => navigate('/projects')}
          className="mt-4 px-4 py-2 bg-gray-900 text-white rounded-lg text-sm font-medium cursor-pointer"
        >
          Back to Projects
        </button>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="py-4 sm:py-6 w-full max-w-4xl mx-auto"
    >
      {/* Redesigned Back Button */}
      <div className="mb-6">
        <button
          onClick={() => navigate(-1)}
          className="inline-flex items-center gap-2 px-3.5 py-1.5 border border-gray-200 rounded-full text-xs font-medium text-gray-600 bg-white hover:bg-gray-50 hover:text-gray-900 hover:border-gray-300 transition-all cursor-pointer shadow-sm"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-3.5 h-3.5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back
        </button>
      </div>

      {/* Category & Title Header */}
      <div className="mb-6">
        <span className="text-[11px] font-bold text-gray-400 tracking-wider uppercase block mb-1">
          {project.category}
        </span>
        <h1 className="text-2xl sm:text-4xl font-bold text-gray-900 leading-tight">
          {project.title}
        </h1>
      </div>

      {/* Hero Image */}
      <div className="w-full aspect-[16/9] bg-gray-100 rounded-2xl overflow-hidden border border-gray-200 shadow-sm mb-8">
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover object-top"
        />
      </div>

      {/* Details Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2 space-y-6">
          <div>
            <h2 className="text-lg font-bold text-gray-900 mb-2">Overview</h2>
            <p className="text-gray-600 text-sm leading-relaxed">{project.description}</p>
          </div>

          <div>
            <h2 className="text-lg font-bold text-gray-900 mb-2">Key Features</h2>
            <ul className="list-disc list-inside text-sm text-gray-600 space-y-1.5">
              {project.features.map((feature, idx) => (
                <li key={idx}>{feature}</li>
              ))}
            </ul>
          </div>
        </div>

        {/* Sidebar Info */}
        <div className="bg-gray-50 p-6 rounded-xl border border-gray-200 h-fit space-y-6">
          <div>
            <h3 className="text-xs font-bold uppercase text-gray-400 mb-2.5">Technologies</h3>
            <div className="flex flex-wrap gap-1.5">
              {project.techStack.map((tech, idx) => (
                <span
                  key={idx}
                  className="px-2.5 py-1 bg-white border border-gray-200 rounded-md text-xs font-medium text-gray-700"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-2 pt-3 border-t border-gray-200">
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full text-center px-4 py-2 bg-gray-900 text-white rounded-lg text-xs font-medium hover:bg-gray-700 transition-colors cursor-pointer"
            >
              View Repository
            </a>
            {project.liveDemo && (
              <a
                href={project.liveDemo}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full text-center px-4 py-2 border border-gray-300 text-gray-700 rounded-lg text-xs font-medium hover:bg-gray-100 transition-colors cursor-pointer"
              >
                Live Demo
              </a>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}