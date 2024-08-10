import React, { useState } from 'react';
import { arrow } from '../assets/icons';
import Footer from '../components/Footer';
import { projects } from '../constants/';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

/**
 * @typedef {Object} Props
 * @property {string} src - The source URL for the image.
 * @property {string} title - The title of the project.
 * @property {string} description - The description of the project.
 */

/**
 * @param {Props} props
 */
const ProjectCard = ({ src, title, description, onClick }) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [isAnimated, setIsAnimated] = useState(false);

  const handleFlip = () => {
    if (!isAnimated) {
      setIsFlipped(!isFlipped);
      setIsAnimated(true);
    }
  };

  return (
    <motion.div
      onClick={onClick || handleFlip}
      className="w-[550px] h-[350px] rounded-lg shadow-lg cursor-pointer perspective"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
    >
      <motion.div
        className="flip-card-inner w-full h-full"
        initial={false}
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.6 }}
        onAnimationComplete={() => setIsAnimated(false)}
        style={{ transformStyle: 'preserve-3d' }}
      >
        <div
          className="flip-card-front w-full h-full bg-white rounded-lg shadow-lg relative overflow-hidden"
          style={{ backfaceVisibility: 'hidden' }}
        >
          <img src={src} alt={title} className="w-full h-full object-cover rounded-lg" />
          <div className="absolute inset-0 w-full h-full bg-black opacity-0 hover:opacity-40 transition-opacity duration-300 z-10 flex items-center justify-center">
            <span className="text-white text-lg">Learn More &gt;</span>
          </div>
        </div>
        <div
          className="flip-card-back w-full h-full bg-blue-600 text-white rounded-lg shadow-lg p-4 flex flex-col justify-between"
          style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
        >
          <div className="flex flex-col gap-20 py-3 z-[30]">
            <h1 className="text-xl font-semibold">{title}</h1>
            <p className="text-gray-100">{description}</p>
          </div>
        </div>
      </motion.div>
    </motion.div>
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

      <div className="flex flex-wrap justify-center gap-10 my-20 text-white">
        {projects.map((project) => (
          <motion.div
            key={project.name}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.3, ease: 'easeOut' }}
            className="flex flex-col items-center"
          >
            <ProjectCard
              src={project.iconUrl}
              title={project.name}
              description={project.description}
            />
            <Link
              to={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 font-semibold text-blue-600 underline"
            >
              Visit Project
            </Link>
          </motion.div>
        ))}
      </div>
      <Footer />
    </section>
  );
};

export default Projects;