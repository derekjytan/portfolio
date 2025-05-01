import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component";
import "react-vertical-timeline-component/style.min.css";
import { skills, experiences } from "../constants";
import { western, meta } from "../assets/icons";
import {
  FaDownload,
  FaBriefcase,
  FaToolbox,
  FaTrophy,
  FaGraduationCap,
  FaHeart,
  FaBasketballBall,
  FaMusic,
  FaMountain,
  FaBiking,
  FaPlane,
  FaUtensils,
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
  const categoryOrder = ["Frontend", "Backend", "Machine Learning", "Cloud"];

  return (
    <section className="max-container px-4 sm:px-8 py-12 sm:py-20">
      {/* Personal Information Section */}
      <div className="mb-16">
        <h3 className="subhead-text text-center sm:text-left mb-8">About Me</h3>

        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-slate-800 dark:to-gray-900 rounded-2xl p-4 sm:p-8 shadow-lg border border-transparent dark:border-gray-700">
          <div className="grid grid-cols-1 gap-6">
            {/* Work Card */}
            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
              <div className="flex items-start gap-4">
                <div className="bg-blue-100 dark:bg-blue-900/40 p-3 rounded-lg flex items-center justify-center min-w-[60px] min-h-[60px]">
                  <img
                    src={meta}
                    alt="Meta Logo"
                    className="w-10 h-10 object-contain"
                  />
                </div>
                <div>
                  <h4 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">
                    Work
                  </h4>
                  <p className="text-blue-600 dark:text-blue-400 text-lg font-medium mb-1">
                    Meta
                  </p>
                  <p className="text-gray-600 dark:text-gray-300">
                    Software Engineer
                  </p>
                </div>
              </div>
            </div>

            {/* Education Card */}
            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
              <div className="flex items-start gap-4">
                <div className="bg-purple-100 dark:bg-white p-3 rounded-lg flex items-center justify-center min-w-[60px] min-h-[60px]">
                  <img
                    src={western}
                    alt="Western University Logo"
                    className="w-10 h-10 object-contain"
                  />
                </div>
                <div>
                  <h4 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">
                    Education
                  </h4>
                  <p className="text-purple-600 dark:text-purple-400 text-lg font-medium mb-1">
                    Western University
                  </p>
                  <p className="text-gray-600 dark:text-gray-300">
                    Bachelor of Science, Computer Science
                  </p>
                </div>
              </div>
            </div>

            {/* Hobbies Card */}
            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
              <div className="flex items-center gap-4 mb-6">
                <div className="bg-pink-100 dark:bg-pink-900/40 p-3 rounded-lg min-w-[48px] min-h-[48px] flex items-center justify-center">
                  <FaHeart className="text-pink-600 dark:text-pink-400 text-xl" />
                </div>
                <h4 className="text-xl font-semibold text-gray-800 dark:text-white">
                  Interests & Hobbies
                </h4>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-700/60 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                  <FaBasketballBall className="text-orange-500 text-xl min-w-[20px]" />
                  <span className="text-gray-700 dark:text-gray-300">
                    Basketball
                  </span>
                </div>
                <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-700/60 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                  <FaMusic className="text-purple-500 text-xl min-w-[20px]" />
                  <span className="text-gray-700 dark:text-gray-300">
                    Raving
                  </span>
                </div>
                <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-700/60 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                  <FaMountain className="text-green-500 text-xl min-w-[20px]" />
                  <span className="text-gray-700 dark:text-gray-300">
                    Climbing
                  </span>
                </div>
                <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-700/60 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                  <FaBiking className="text-blue-500 text-xl min-w-[20px]" />
                  <span className="text-gray-700 dark:text-gray-300">
                    Biking
                  </span>
                </div>
                <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-700/60 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                  <FaPlane className="text-indigo-500 text-xl min-w-[20px]" />
                  <span className="text-gray-700 dark:text-gray-300">
                    Travelling
                  </span>
                </div>
                <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-700/60 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                  <FaUtensils className="text-red-500 text-xl min-w-[20px]" />
                  <span className="text-gray-700 dark:text-gray-300">
                    Food Adventures
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col">
        <h3 className="subhead-text text-center sm:text-left mb-8">
          Technical Skills
        </h3>

        <div className="space-y-8">
          {categoryOrder.map(
            (category) =>
              skillsByCategory[category] && (
                <div key={category} className="mb-6">
                  <h4 className="text-lg font-bold mb-3 text-gray-700 dark:text-gray-300 border-b border-gray-200 dark:border-gray-700 pb-2">
                    {category}
                  </h4>
                  <div className="flex flex-wrap gap-3">
                    {skillsByCategory[category].map((skill) => (
                      <div
                        key={skill.name}
                        className="bg-gray-50 dark:bg-gray-800 px-4 py-2 rounded-lg flex items-center gap-2 border border-gray-100 dark:border-gray-700"
                      >
                        <img
                          src={skill.imageUrl}
                          alt={skill.name}
                          className="w-5 h-5 object-contain dark:filter dark:brightness-90"
                        />
                        <span className="text-sm text-gray-700 dark:text-gray-300">
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

      <div className="py-16">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
          <h3 className="subhead-text text-center sm:text-left">
            Professional Experience
          </h3>
          {/* <a
            href="/resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 sm:mt-0 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            <FaDownload className="mr-2" />
            Download Resume
          </a> */}
        </div>

        <div className="mt-12">
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
                  boxShadow:
                    "var(--content-shadow, 0 3px 10px rgba(0,0,0,0.05))",
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

                {/* Tech stack display */}
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

                <div className="my-2">
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
                </div>
              </VerticalTimelineElement>
            ))}
          </VerticalTimeline>
        </div>
      </div>
    </section>
  );
};

export default About;
