import React from 'react';
import Footer from '../components/Footer';
import { projects } from '../constants/';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { PinContainer } from '../components/pin';
import { FaLocationArrow } from "react-icons/fa6";

const Projects = () => {
  return (
    <section className="max-container px-4 sm:px-8 py-20">
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
        className="flex flex-wrap items-center justify-center p-4 gap-16 mt-10"
        initial="hidden"
        animate="visible"
        variants={{
          visible: {
            transition: {
              staggerChildren: 0.2,
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
            className="lg:min-h-[32.5rem] h-[25rem] flex items-center justify-center sm:w-96 w-[80vw]"
            style={{
              backgroundImage: `url('/src/assets/images/bg.png')`,
            }}
          >
            <PinContainer title={project.name} href={project.link}>
              <div className="relative flex items-center justify-center w-full sm:w-[350px] h-[2-0px] overflow-hidden rounded-xl shadow-lg mb-4">
              <img 
                src={project.iconUrl} 
                alt={project.name} 
                className="w-full h-full object-cover rounded-xl" 
                style={{ top: '-5%', left: '-5%' }} 
              />
              </div>
              <h1 className="font-bold lg:text-2xl md:text-xl text-base line-clamp-1">
                {project.name}
              </h1>
              <p className="text-gray-100 text-sm text-center mb-4"
                style={{
                  color: "#BEC1DD",
                  margin: "1vh 0",
                }}
              >
                {project.description}
              </p>

              <div className="flex flex-wrap items-center justify-start mt-7 mb-3">
                {project.tech.map((tech, index) => (
                  <img 
                    key={index} 
                    src={tech.imageUrl} 
                    className="logo-container border border-white/[0.2] rounded-full w-8 h-8 flex justify-center items-center p-2 m-1" 
                    alt={`tech-${index}`} 
                  />
                ))}
              </div>
              <div className="flex justify-center items-center">
                <p className="text-blue-600 text-sm font-semibold">
                  Check Live Site
                </p>
                <FaLocationArrow className="ml-2" color="#CBACF9" />
              </div>
            </PinContainer>
          </motion.div>
        ))}
      </motion.div>
      <Footer />
    </section>
  );
};

export default Projects;