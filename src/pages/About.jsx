import { motion } from "framer-motion";
import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component";
import "react-vertical-timeline-component/style.min.css";
import { skills, experiences } from "../constants";
import { western, meta } from "../assets/icons";
import {
  FaGraduationCap,
  FaHeart,
  FaBasketballBall,
  FaMusic,
  FaMountain,
  FaBiking,
  FaPlane,
  FaUtensils,
  FaBriefcase,
  FaCode,
} from "react-icons/fa";

const About = () => {
  // Group skills by their type
  const skillsByCategory = skills.reduce((acc, skill) => {
    if (!acc[skill.type]) {
      acc[skill.type] = [];
    }
    acc[skill.type].push(skill);
    return acc;
  }, {});

  // Order of categories
  const categoryOrder = ["Languages", "Frameworks", "Cloud"];

  const hobbies = [
    {
      icon: FaBasketballBall,
      name: "Basketball",
      color: "text-orange-500",
      bg: "bg-orange-50 dark:bg-orange-900/20",
    },
    {
      icon: FaMusic,
      name: "Raving",
      color: "text-purple-500",
      bg: "bg-purple-50 dark:bg-purple-900/20",
    },
    {
      icon: FaMountain,
      name: "Climbing",
      color: "text-green-500",
      bg: "bg-green-50 dark:bg-green-900/20",
    },
    {
      icon: FaBiking,
      name: "Biking",
      color: "text-blue-500",
      bg: "bg-blue-50 dark:bg-blue-900/20",
    },
    {
      icon: FaPlane,
      name: "Travelling",
      color: "text-indigo-500",
      bg: "bg-indigo-50 dark:bg-indigo-900/20",
    },
    {
      icon: FaUtensils,
      name: "Food Adventures",
      color: "text-red-500",
      bg: "bg-red-50 dark:bg-red-900/20",
    },
  ];

  return (
    <section className="max-container px-4 sm:px-8 py-12 sm:py-20">
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mb-16 text-center"
      >
        <h1 className="head-text mb-6">
          <span className="blue-gradient_text">About Me</span>
        </h1>
        <div className="max-w-3xl mx-auto">
          <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 leading-relaxed mb-6">
            I'm a Computer Science student at Western University, currently on a
            study abroad term at National University of Singapore!
          </p>
          <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 leading-relaxed">
            Outside of work, you'll find me exploring new places, at the gym,
            and adding new spots for my beli!
          </p>
        </div>
      </motion.div>

      {/* Info Grid */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="grid grid-cols-1 md:grid-cols-12 gap-6 mb-20"
      >
        {/* Work - Spans 6 columns */}
        <div className="md:col-span-6 glass-panel p-6 hover:shadow-lg transition-shadow">
          <div className="flex items-center gap-4 mb-4">
            <motion.div
              whileHover={{ rotate: 360, scale: 1.1 }}
              transition={{ duration: 0.6 }}
              className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-xl"
            >
              <img
                src={meta}
                alt="Meta Logo"
                className="w-8 h-8 object-contain"
              />
            </motion.div>
            <div>
              <div className="flex items-center gap-2">
                <FaBriefcase className="text-blue-500 text-sm" />
                <span className="text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                  Current Role
                </span>
              </div>
              <h3 className="text-xl font-bold text-gray-800 dark:text-white">
                Software Engineer
              </h3>
              <p className="text-gray-600 dark:text-gray-300">Meta</p>
            </div>
          </div>
        </div>

        {/* Education - Spans 6 columns */}
        <div className="md:col-span-6 glass-panel p-6 hover:shadow-lg transition-shadow">
          <div className="flex items-center gap-4 mb-4">
            <motion.div
              whileHover={{ rotate: 360, scale: 1.1 }}
              transition={{ duration: 0.6 }}
              className="p-3 bg-purple-50 dark:bg-purple-900/20 rounded-xl"
            >
              <img
                src={western}
                alt="Western University Logo"
                className="w-8 h-8 object-contain"
              />
            </motion.div>
            <div>
              <div className="flex items-center gap-2">
                <FaGraduationCap className="text-purple-500 text-sm" />
                <span className="text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                  Education
                </span>
              </div>
              <h3 className="text-xl font-bold text-gray-800 dark:text-white">
                Computer Science
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Western University
              </p>
            </div>
          </div>
        </div>

        {/* Hobbies - Spans full width */}
        <div className="md:col-span-12 glass-panel p-8">
          <div className="flex items-center gap-3 mb-6">
            <FaHeart className="text-pink-500 text-xl" />
            <h3 className="text-xl font-bold text-gray-800 dark:text-white">
              Interests & Hobbies
            </h3>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {hobbies.map((hobby) => {
              const Icon = hobby.icon;
              return (
                <motion.div
                  key={hobby.name}
                  whileHover={{ scale: 1.05 }}
                  className={`${hobby.bg} p-4 rounded-xl flex flex-col items-center justify-center gap-2 cursor-default transition-colors group`}
                >
                  <motion.div
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.6 }}
                  >
                    <Icon className={`${hobby.color} text-2xl`} />
                  </motion.div>
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300 text-center">
                    {hobby.name}
                  </span>
                </motion.div>
              );
            })}
          </div>
        </div>
      </motion.div>

      {/* Skills Section */}
      <div className="mb-20">
        <h3 className="subhead-text text-center sm:text-left mb-8">
          Technical Skills
        </h3>

        <div className="space-y-8">
          {categoryOrder.map(
            (category) =>
              skillsByCategory[category] && (
                <div key={category} className="mb-6">
                  <h4 className="text-lg font-bold mb-4 text-gray-800 dark:text-white">
                    {category}
                  </h4>
                  <div className="flex flex-wrap gap-3">
                    {skillsByCategory[category].map((skill) => (
                      <div
                        key={skill.name}
                        className="group bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 px-4 py-2.5 rounded-xl flex items-center gap-3 hover:border-blue-500/30 hover:shadow-sm transition-all"
                      >
                        <motion.div
                          whileHover={{ rotate: 360 }}
                          transition={{ duration: 0.6 }}
                          className="w-6 h-6 flex items-center justify-center"
                        >
                          <img
                            src={skill.imageUrl}
                            alt={skill.name}
                            className="w-full h-full object-contain"
                          />
                        </motion.div>
                        <span className="text-sm font-medium text-gray-600 dark:text-gray-300 group-hover:text-gray-900 dark:group-hover:text-white transition-colors">
                          {skill.name}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )
          )}
        </div>
      </div>

      {/* Experience Section */}
      <div className="py-10">
        <h3 className="subhead-text text-center mb-12">
          Professional Experience
        </h3>
        <VerticalTimeline lineColor="var(--line-color, #e5e7eb)">
          {experiences.map((experience) => (
            <VerticalTimelineElement
              key={experience.company_name}
              date={experience.date}
              icon={
                <div className="flex justify-center items-center w-full h-full">
                  <img
                    src={experience.icon}
                    alt={experience.company_name}
                    className="w-[60%] h-[60%] object-contain dark:filter dark:brightness-90"
                  />
                </div>
              }
              iconStyle={{
                background: "var(--icon-bg, #ffffff)",
                boxShadow:
                  "0 0 0 4px var(--icon-border, #3b82f6), inset 0 2px 0 rgba(0,0,0,.08), 0 3px 0 4px rgba(0,0,0,.05)",
              }}
              contentStyle={{
                background: "var(--content-bg, #ffffff)",
                boxShadow: "var(--content-shadow, 0 3px 10px rgba(0,0,0,0.05))",
                borderRadius: "12px",
                border: "1px solid var(--content-border, #f3f4f6)",
                padding: "24px",
              }}
              contentArrowStyle={{
                borderRight: "10px solid var(--content-bg, #ffffff)",
              }}
              className="vertical-timeline-element--work"
            >
              <div>
                <h3 className="text-gray-800 dark:text-white text-xl font-semibold">
                  {experience.title}
                </h3>
                <p
                  className="text-blue-500 dark:text-blue-400 font-medium"
                  style={{ margin: "4px 0 12px 0" }}
                >
                  {experience.company_name}
                </p>
              </div>

              {experience.tech && experience.tech.length > 0 && (
                <div className="mb-4 flex flex-wrap gap-2 pb-4 border-b border-gray-100 dark:border-gray-700">
                  {experience.tech.map((tech, index) => (
                    <div key={index} className="group relative">
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
              )}

              <ul className="list-disc ml-5 space-y-2">
                {experience.points.map((point, index) => (
                  <li
                    key={`experience-point-${index}`}
                    className="text-gray-600 dark:text-gray-300 font-normal text-sm"
                  >
                    {point}
                  </li>
                ))}
              </ul>
            </VerticalTimelineElement>
          ))}
        </VerticalTimeline>
      </div>
    </section>
  );
};

export default About;
