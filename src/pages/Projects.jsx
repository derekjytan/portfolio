import Footer from '../components/Footer';
import { projects } from '../constants/';

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
          <div className='lg:w-[400px] w-full' key={project.name}>
            <div className='block-container w-12 h-12'>
              <div className={`btn-back rounded-xl ${project.theme}`}/>
              <div className='btn-front rounded-xl flex justify-center 
              items-center'>
                <img 
                src={project.iconUrl}
                alt='Project Icon'
                className='w-1/2 h-1/2 object-contain'
                />
              </div>
            </div>
            <div className='mt-5 flex flex-col'>
              <h4>
                {project.name}
              </h4>
              <p>
                {project.description}
              </p>
            </div>
          </div>
        ))}
      </div>
      <Footer />
    </section>
  )
}

export default Projects