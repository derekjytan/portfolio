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
const ProjectCard = ({ src, title, description, tech, onClick }) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [isAnimated, setIsAnimated] = useState(false);

  const handleFlip = () => {
    if (!isAnimated) {
      setIsFlipped(!isFlipped);
      setIsAnimated(true);
    }
  };

  // Animation variants
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { 
        duration: 0.6,
        ease: "easeInOut", 
      } 
    },
  };

  return (
    <motion.div
      onClick={onClick || handleFlip}
      className="w-full sm:w-[300px] h-[200px] rounded-lg shadow-lg cursor-pointer perspective"
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
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
          <div className="flex flex-col gap-4 py-3 z-[30]">
            <h1 className="text-lg font-semibold">{title}</h1>
            <p className="text-gray-100 text-sm">{description}</p>
            <p className="text-gray-100 text-xs">{tech}</p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

const Projects = () => {
  return (
    <section className="max-container px-4 sm:px-8">
      <h1 className="head-text text-white text-center">
        My{' '}
        <span className="blue-gradient_text drop-shadow font-semibold">
          Projects
        </span>
      </h1>

      <p className="text-slate-500 mt-2 leading-relaxed text-center">
        Check out some of the cool projects I've worked on!
      </p>

      <motion.div
        className="flex flex-wrap justify-center gap-8 my-20 text-white"
        initial="hidden"
        animate="visible"
        variants={{
          visible: {
            transition: {
              staggerChildren: 0.2, // Staggered effect for individual animations
            },
          },
        }}
      >
        {projects.map((project, index) => (
          <motion.div
            key={project.name}
            custom={index}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: {
                opacity: 1,
                y: 0,
                transition: {
                  duration: 0.6, // Using easeInOut for smooth transition
                  ease: "easeInOut",
                  delay: index * 0.2, // Staggering each card
                },
              },
            }}
            className="flex flex-col items-center w-full sm:w-auto"
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
      </motion.div>
      <Footer />
    </section>
  );
};

export default Projects;