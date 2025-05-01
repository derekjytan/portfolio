import React from "react";
import { projects } from "../constants/";
import { motion } from "framer-motion";
import { FaGithub, FaExternalLinkAlt, FaCode } from "react-icons/fa";

const ProjectCard = ({ project, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      className="mb-12 pb-12 border-b border-gray-200 dark:border-gray-700 last:border-0 last:pb-0"
    >
      <div className="flex flex-col md:flex-row gap-8">
        <div className="md:w-1/3">
          <div className="rounded-lg overflow-hidden shadow-sm border border-gray-100 dark:border-gray-700">
            <img
              src={project.iconUrl}
              alt={project.name}
              className="w-full h-48 md:h-full object-cover"
            />
          </div>
        </div>

        <div className="md:w-2/3">
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-3">
            <h3 className="text-2xl font-bold text-gray-800 dark:text-white">
              {project.name}
            </h3>
            <div className="flex gap-4 mt-2 md:mt-0">
              {project.github && (
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center text-gray-600 hover:text-gray-800 dark:text-gray-300 dark:hover:text-white transition-colors"
                >
                  <FaGithub className="mr-1" />
                  <span>Repository</span>
                </a>
              )}

              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-300 transition-colors"
              >
                <FaExternalLinkAlt className="mr-1" />
                <span>Demo</span>
              </a>
            </div>
          </div>

          <p className="text-gray-600 dark:text-gray-300 mb-4">
            {project.description}
          </p>

          <div className="mb-4">
            <h4 className="text-sm uppercase tracking-wider text-gray-500 dark:text-gray-400 font-semibold mb-2">
              Tech Stack
            </h4>
            <div className="flex flex-wrap gap-2.5">
              {project.tech.map((tech, techIndex) => (
                <div key={techIndex} className="group relative">
                  <div className="bg-gray-50 dark:bg-gray-800 p-1.5 rounded-md border border-gray-100 dark:border-gray-700 hover:shadow-sm transition-all">
                    <img
                      src={tech.imageUrl}
                      alt={tech.name}
                      className="w-5 h-5 object-contain"
                    />
                  </div>
                  <span className="absolute bottom-full mb-1.5 left-1/2 -translate-x-1/2 bg-gray-800 text-white text-xs rounded py-1 px-2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-10">
                    {tech.name}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {project.keyFeatures && (
            <div>
              <h4 className="text-sm uppercase tracking-wider text-gray-500 dark:text-gray-400 font-semibold mb-2">
                Key Features
              </h4>
              <ul className="list-disc pl-5 text-gray-600 dark:text-gray-300 space-y-1 text-sm">
                {project.keyFeatures.map((feature, idx) => (
                  <li key={idx}>{feature}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

const Projects = () => {
  return (
    <section className="max-container px-4 sm:px-8 py-20">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-12"
      >
        <h1 className="head-text text-center mb-2">
          <span className="blue-gradient_text font-semibold">Projects</span>
        </h1>
        <p className="text-gray-600 dark:text-gray-300 text-center max-w-xl mx-auto mb-8">
          Check out some of the cool projects I've worked on!
        </p>
      </motion.div>

      <div>
        {projects.map((project, index) => (
          <ProjectCard key={project.name} project={project} index={index} />
        ))}
      </div>
    </section>
  );
};

export default Projects;
