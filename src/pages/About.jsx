import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component";
import "react-vertical-timeline-component/style.min.css";
import { skills, experiences } from "../constants";
import { FaDownload, FaBriefcase, FaToolbox, FaTrophy } from "react-icons/fa";

const About = () => {
  // Group skills by their type
  const skillsByCategory = skills.reduce((acc, skill) => {
    if (!acc[skill.type]) {
      acc[skill.type] = [];
    }
    acc[skill.type].push(skill);
    return acc;
  }, {});

  // Order of categories we want to display
  const categoryOrder = [
    "Frontend",
    "Backend",
    "Cloud",
    "Version Control",
    "Software",
  ];

  return (
    <section className="max-container px-4 sm:px-8 py-20">
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
          <a
            href="/resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 sm:mt-0 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            <FaDownload className="mr-2" />
            Download Resume
          </a>
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
