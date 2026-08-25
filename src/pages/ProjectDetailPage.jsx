import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import ThreeDCarousel from "../components/ThreeDCarousel";

const PROJECTS_DATA = [
  {
    id: 1,
    category: 'WEB SYSTEM',
    title: 'School Management System III - Capstone Project',
    image: '/projects/project1.png',
    gallery: [
      '/projects/EMS/project1.png',
      '/projects/EMS/project2.png',
      '/projects/EMS/project3.png',
      '/projects/EMS/project4.png',
      '/projects/EMS/project5.png',
      '/projects/EMS/project6.png',
      '/projects/EMS/project7.png',
      '/projects/EMS/project8.png',
      '/projects/EMS/project9.png',
      '/projects/EMS/project10.png',
    ],
    githubUrl: 'https://github.com/Amieljake929/Enrollment-Management-System---Cluster-7.git',
    liveDemo: '',
    description: 'This project is an AI-enhanced School Management System designed to streamline the enrollment process for Senior High School and College students through an intuitive, centralized portal. Beyond digitalizing standard admission procedures, the platform integrates Machine Learning capabilities powered by Hugging Face APIs to deliver an intelligent AI Course Assessment and Recommendation engine. By analyzing academic profiles and interests, this feature actively assists uncertain students in discovering their ideal educational path, reducing career misalignment and empowering students to make confident, informed decisions about their academic future.',
    techStack: ['Laravel Framework', 'PHP Backend', 'Node.js', 'Express', 'MySQL', 'HTML5','CSS3', 'JavaScript', 'RESTful APIs', 'JSON', 'Hostinger'],
    features: [
      'Dual-Level Digital Enrollment Portal – A unified platform that streamlines the application and admission process for both Senior High School and College applicants.',
      'AI-Powered Course Assessment – Machine Learning integration via Hugging Face APIs that evaluates student profiles and suggests the most suitable academic paths for undecided students.',
      'Streamlined School Administration – Digitizes manual workflows to accelerate document processing, track applicant status in real-time, and lessen administrative overhead.',
    ],
  },
  {
    id: 2,
    category: 'WEB SYSTEM',
    title: 'Barangay Management System - BMS',
    image: '/projects/project2.png',
    gallery: [
      '/projects/BMS/project9.png',
      '/projects/BMS/project8.png',
      '/projects/BMS/project7.png',
      '/projects/BMS/project6.png',
      '/projects/BMS/project5.png',
      '/projects/BMS/project4.png',
      '/projects/BMS/project3.png',
      '/projects/BMS/project2.png',
      '/projects/BMS/project1.png',
      '/projects/project2.png',
    ],
    githubUrl: 'https://github.com/Amieljake929/Barangay-Bagbag-System.git',
    liveDemo: '',
    description: 'The Barangay Management System (BMS) is a custom web-based digital platform developed for Barangay Bagbag as our primary client to modernize local governance, streamline administrative operations, and improve public service delivery. Accessible through any standard web browser, the system serves as a centralized portal that eliminates long waiting times and tedious physical paperwork by enabling residents to conveniently request official documents online. Simultaneously, the BMS equips Barangay Bagbag officials and staff with powerful administrative tools to manage resident records, process applications efficiently, and coordinate community affairs in real time.',
    techStack: ['Plain PHP', 'HTML5', 'Tailwind CSS', 'MySQL', 'JavaScript', 'RESTful APIs', 'JSON', 'Hostinger'],
    features: [
      'Online Document Request & Processing: Seamless web submission and automated tracking for essential official records, including Barangay Clearances, Certificates of Indigency, Business Permits, Cedulas, and Blotter filings.',
      'Community Incident Reporting: A secure digital channel that allows residents to report local incidents, public safety concerns, and general inquiries directly to barangay authorities for rapid response.',
      'Events & Announcements Portal: A centralized digital newsboard that keeps the community informed with real-time updates on upcoming events, public health advisories, and official barangay projects.',
    ],
  },
  {
    id: 3,
    category: 'WEB APP',
    title: 'Kaffa - Coffee Shop Website',
    image: '/projects/project4.png',
    gallery: [
      '/projects/Kaffa/project9.png',
      '/projects/Kaffa/project8.png',
      '/projects/Kaffa/project7.png',
      '/projects/Kaffa/project6.png',
      '/projects/Kaffa/project5.png',
      '/projects/Kaffa/project4.png',
      '/projects/Kaffa/project3.png',
      '/projects/Kaffa/project2.png',
      '/projects/Kaffa/project1.png',
      '/projects/project4.png',
    ],
    githubUrl: 'https://github.com/Amieljake929/Kaffa.git',
    liveDemo: '',
    description: 'The Kaffa - Coffee Shop Website is an interactive, web-based platform designed to showcase Kaffa is a premium coffee selection and provide customers with a seamless digital dining experience. Built for speed and convenience, the platform allows coffee enthusiasts to explore the menu, customize their favorite brews and pastries, and place online orders effortlessly from any browser or device. By digitizing daily transactions, Kaffa streamlines order management for staff while delivering a fast, user-friendly ordering journey for every customer.',
    techStack: ['HTML5', 'Framer Motion', 'Tailwind CSS', 'Javascript', 'JSON'],
    features: [
      'Interactive Digital Menu: An organized display of Kaffa signature coffees, beverages, and food items, complete with customization options for size, sweetness level, and add-ons.',
      'Seamless Add-to-Cart System: A dynamic shopping cart that lets customers review items, modify quantities, and calculate order totals in real time before checking out.',
      'Integrated Online Ordering: A streamlined order management pipeline that transmits customer orders directly to the store for faster preparation, fulfillment, and customer pickup or delivery.',
    ],
  },
  {
    id: 4,
    category: 'WEBSITE',
    title: 'Personal Portfolio Website',
    image: '/projects/project5.png',
    gallery: [
      '/projects/Portfolio/project9.png',
      '/projects/Portfolio/project8.png',
      '/projects/Portfolio/project7.png',
      '/projects/Portfolio/project6.png',
      '/projects/Portfolio/project5.png',
      '/projects/Portfolio/project4.png',
      '/projects/Portfolio/project3.png',
      '/projects/Portfolio/project2.png',
      '/projects/Portfolio/project1.png',
      '/projects/project5.png',
    ],
    githubUrl: 'https://github.com/Amieljake929/React-Portfolio.git',
    liveDemo: '',
    description: 'The Personal Portfolio Website is a minimalist digital showcase designed to present professional projects, skills, and design capabilities with clarity and elegance. Built using design inspiration and components from Kombo Framer and Bryl Lim, the website offers an engaging, clean, and interactive user experience across all devices. The platform emphasizes content over clutter, allowing visitors and potential clients to seamlessly navigate through featured works, view project details, and connect directly.',
    techStack: ['React', 'Tailwind CSS', 'Framer Motion', 'Lenis Scroll', 'React Router', 'JavaScript', 'JSON', 'Vercel'],
    features: [
      'Minimalist UI/UX Design: A clean, distraction-free layout inspired by Kombo Framer and Bryl Lim that highlights design aesthetics, typography, and visual hierarchy.',
      'Interactive Project Showcase: An organized portfolio gallery featuring detailed project pages, interactive previews, and case studies.',
      'Responsive Layout & Direct Contact: A fully responsive web interface equipped with smooth transitions and an integrated contact form for client inquiries and collaborations.',
    ],
  },
  {
    id: 5,
    category: 'WEB SYSTEM',
    title: 'Local Tour Guide - Travel Website',
    image: '/projects/project6.jpg',
    gallery: [
      '/projects/TourGuide/project3.png',
      '/projects/TourGuide/project2.png',
      '/projects/TourGuide/project1.png',
      '/projects/project6.jpg',
    ],
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
    gallery: [
      '/projects/PRCQC/project3.png',
      '/projects/PRCQC/project2.png',
      '/projects/PRCQC/project1.png',
      '/projects/project7.png',
    ],
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

  // Fallback sa main image kapag walang gallery array
  const displayImages = project.gallery && project.gallery.length > 0 ? project.gallery : [project.image];

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="py-4 sm:py-6 w-full max-w-5xl mx-auto px-4 sm:px-6"
    >
      {/* Back Button */}
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

      {/* 3D Image Carousel Showcase */}
      <div className="mb-10 w-full">
        <ThreeDCarousel images={displayImages} />
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