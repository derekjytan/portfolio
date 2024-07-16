import React, { useState } from 'react';
import { arrow } from '../assets/icons';
import Footer from '../components/Footer';
import { projects } from '../constants/';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

/**
 * @typedef {Object} Props
 * @property {string} src - The source URL for the image.
 * @property {string} title - The title of the project.
 * @property {string} description - The description of the project.
 */

/**
 * @param {Props} props
 */
const ProjectCard = ({ src, title, description, link }) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [isAnimated, setIsAnimated] = useState(false);

  const handleFlip = () => {
    if (!isAnimated) {
      setIsFlipped(!isFlipped);
      setIsAnimated(true);
    }
  };

  return (
    <div onClick={handleFlip} className="w-[350px] h-[280px] rounded-md cursor-pointer">
      <motion.div
        className="flip-card-inner w-full h-full"
        initial={false}
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.6, animationDirection: 'normal' }}
        onAnimationComplete={() => setIsAnimated(false)}
      >
        <div className="flip-card-front w-75 h-full group relative bg-cover bg-center text-white rounded-lg p-4">
          <img src={src} alt={title} className="w-full h-48 object-cover" />
          <div className="absolute inset-0 w-full h-full rounded-md bg-black opacity-0 group-hover:opacity-40" />
          <div className="absolute inset-0 w-full h-full text-[20px] pb-10 hidden group-hover:flex items-center z-[20] justify-center">
            Learn More &gt;
          </div>
        </div>
        <div className="flip-card-back w-full h-full group relative bg-cover bg-center text-white rounded-lg p-4">
          <div className="absolute inset-0 w-full h-full rounded-md bg-black opacity-50 z-[-1]" />
          <div className="flex flex-col gap-20 py-3 z-[30]">
            <h1 className="text-white text-2xl font-semibold">{title}</h1>
            <p className="text-gray-200 text-[20px]">{description}</p>
            <div className="mt-5 flex items-center gap-2 font-poppins">
              <Link
                to={link}
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-blue-600"
              >
                Link
              </Link>
              <img src={arrow} alt="arrow" className="w-4 h-4 object-contain" />
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

const Projects = () => {
  return (
    <section className="max-container">
      <h1 className="head-text text-white">
        My{' '}
        <span className="blue-gradient_text drop-shadow font-semibold">
          Projects
        </span>
      </h1>

      <p className="text-slate-500 mt-2 leading-relaxed">
        I'm deeply committed to project-based learning, continuously seeking opportunities to expand my knowledge and skillset. Listed below are some highlights that I have thoroughly enjoyed working on.
      </p>

      <div className="flex flex-wrap my-20 gap-16 text-white">
        {projects.map((project) => (
          <ProjectCard
            key={project.name}
            src={project.iconUrl}
            title={project.name}
            description={project.description}
            link={project.link}
          />
        ))}
      </div>
      <Footer />
    </section>
  );
};

export default Projects;