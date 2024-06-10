import React from 'react';
import { arrow } from '../assets/icons';
import Footer from '../components/Footer';
import { projects } from '../constants/';
import { Link } from 'react-router-dom';

// Define the ProjectCard component inside Projects.jsx

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
  return (
    <div className='relative overflow-hidden rounded-lg shadow-lg border border-[#2A0E61] lg:w-[400px] w-full'>
      <img 
        src={src}
        alt={title}
        className='w-full h-48 object-cover'
      />
      <div className='relative p-4'>
        <h1 className='text-2xl font-semibold text-white'>{title}</h1>
        <p className='mt-2 text-gray-300'>{description}</p>
        <div className='mt-5 flex items-center gap-2 font-poppins'>
          <Link 
            to={link}
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold text-blue-600"
          >
            Link
          </Link>
          <img 
            src={arrow}
            alt='arrow'
            className='w-4 h-4 object-contain'
          />
        </div>
      </div>
    </div>
  )
}

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
        I'm deeply committed to project based learning, continuously seeking
        opportunities to expand my knowledge and skillset. Listed below are some
        highlights that I have thoroughly enjoyed working on.
      </p>

      <div className='flex flex-wrap my-20 gap-16 text-white'>
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
  )
}

export default Projects;