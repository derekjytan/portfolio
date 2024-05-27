import { VerticalTimeline, VerticalTimelineElement }  from 
'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';

import { skills, experiences} from '../constants'
import { BasicDepthPacking } from 'three';
import CTA from '../components/CTA'
import Footer from '../components/Footer';

const About = () => {
  return (
    <section className='max-container'>
      <h1 className="head-text text-white">
          Hey, I'm{' '}
          <span className="blue-gradient_text font-semibold drop-shadow">
            {' '}
            Derek!
          </span>{' '}
        </h1>

        <div className='mt-5 flex flex-col gap-3 text-slate-500'>
          <p>
            A software developer studying Software Engineering at Western University.
          </p>
        </div>

        <div className='py-10 flex flex-col'>
          <h3 className='subhead-text text-white'>Technical Skills</h3>

          <div className='mt-16 flex flex-wrap gap-12'>
            {skills.map((skill) => (
              <div key={skill.name} className='block-container w-20 h-20'>
                <div className='btn-back rounded-xl'/>
                <div className='btn-front rounded-xl flex justify-center
                items-center'>
                  <img
                    src={skill.imageUrl}
                    alt={skill.name}
                    className='w=1/2 h=1/2 object-contain'
                  />
                </div>
                <p className="text-sm text-center mt-20 py-1 text-slate-300">
                {skill.name}
              </p>
              </div>
            ))}
          </div>
        </div>

        <div className='py-16'>
          <h3 className='subhead-text text-white'>Professional Experience</h3>
            <div className='mt-5 flex flex-col gap-3 text-slate-500'>
              <p>
                Below is an overview of the companies I've collaborated with from past internships, refining my skills alongside talented professionals.
              </p>
          </div>

          <div className='mt-12 flex'>
            <VerticalTimeline>
              {experiences.map((experience) => (
                <VerticalTimelineElement
                  key={experience.company_name}
                  date={experience.date}
                  icon={<div className='flex justify-center items-center
                  w-full h-full'>
                    <img 
                      src={experience.icon}
                      alt={experience.company_name}
                      className='w-[60%] h-[60%] object-contain'
                    />
                  </div> }
                  iconStyle={{ background: experience.iconBg }}
                  contentStyle={{
                    borderBottom: '8px',
                    borderStyle: 'solid',
                    borderBottomColor: experience.iconBg,
                    boxShadow: 'none',
                  }}  
                >
                  <div>
                    <h3 className='text-black text-xl font-poppins 
                    font-semibold'>
                      {experience.title}
                    </h3>
                    <p className='text-black-500 font-medium font-base'
                    style={{ margin:0 }}> 
                      {experience.company_name}
                    </p>
                  </div>

                  <ul className='my-5 list-disc ml-5 space-y-2'>
                    {experience.points.map((point, index) => (
                      <li key={`experience-point-${index}`} className='text-black-500/50 font-normal pl-1 
                      text-sm'>
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

export default About