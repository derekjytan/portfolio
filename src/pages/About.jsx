import { VerticalTimeline, VerticalTimelineElement } from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css'
import { motion } from 'framer-motion'
import { skills, experiences } from '../constants'
import Footer from '../components/Footer'

// Define stagger container for skills
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

// Define individual skill animation
const skillVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.3, ease: "easeOut" } }, 
};

const About = () => {
  return (
    <section className='max-container px-4 sm:px-8'>
      <h1 className="head-text text-white text-center">
        👋 Hey, I'm{' '}
        <span className="blue-gradient_text font-semibold drop-shadow">
          {' '}
          Derek!
        </span>{' '}
      </h1>

      <div className='mt-5 flex flex-col gap-3 text-slate-500'>
        <ul className='list-none'>
          <li>📚 - Currently at Western University pursuing a degree in Computer Science.</li>
          <li>🛠️ - I've done a variety of work involving full-stack, machine learning, game development, and research!</li>
          <li>✈️ - In my free time, I love playing basketball, biking, going on food adventures, and traveling.</li>
        </ul>
      </div>

      <div className='py-10 flex flex-col'>
        <h3 className='subhead-text text-white text-center sm:text-left'>Technical Skills</h3>

        <motion.div
          className='mt-8 flex flex-wrap justify-center gap-12'
          variants={containerVariants}
          initial='hidden'
          animate='visible'
        >
          {skills.map((skill) => (
            <motion.div
              key={skill.name}
              className='block-container w-20 h-20'
              variants={skillVariants}
            >
              <div className='btn-back rounded-xl' />
              <div className='btn-front rounded-xl flex justify-center items-center'>
                <img
                  src={skill.imageUrl}
                  alt={skill.name}
                  className='w-1/2 h-1/2 object-contain'
                />
              </div>
              <p className="text-sm text-center mt-20 py-1 text-slate-300">
                {skill.name}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>

      <div className='py-16'>
        <h3 className='subhead-text text-white text-center sm:text-left'>Professional Experience</h3>

        <div className='mt-12'>
          <VerticalTimeline>
            {experiences.map((experience) => (
              <VerticalTimelineElement
                key={experience.company_name}
                date={experience.date}
                icon={
                  <div className='flex justify-center items-center w-full h-full'>
                    <img
                      src={experience.icon}
                      alt={experience.company_name}
                      className='w-[60%] h-[60%] object-contain'
                    />
                  </div>
                }
                iconStyle={{ background: experience.iconBg }}
                contentStyle={{
                  borderBottom: '8px',
                  borderStyle: 'solid',
                  borderBottomColor: experience.iconBg,
                  boxShadow: 'none',
                }}
                dateClassName='text-white mx-3'
              >
                <div>
                  <h3 className='text-black text-xl font-poppins font-semibold text-center sm:text-left'>
                    {experience.title}
                  </h3>
                  <p className='text-black-500 font-medium font-base text-center sm:text-left' style={{ margin: 0 }}>
                    {experience.company_name}
                  </p>
                </div>

                <ul className='my-5 list-disc ml-5 space-y-2 text-center sm:text-left'>
                  {experience.points.map((point, index) => (
                    <li key={`experience-point-${index}`} className='text-black-500/50 font-normal pl-1 text-sm'>
                      {point}
                    </li>
                  ))}
                </ul>
              </VerticalTimelineElement>
            ))}
          </VerticalTimeline>
        </div>
      </div>
      <Footer />
    </section>
  )
}

export default About;