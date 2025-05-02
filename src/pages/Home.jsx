import { motion } from "framer-motion";
import Typewriter from "typewriter-effect";
import { HashLink } from "react-router-hash-link";
import SpotifyActivity from "../components/SpotifyActivity";
import { FaMountain, FaMapMarkedAlt, FaLaptopCode } from "react-icons/fa";

function Home() {
  const scrollWithOffset = (el) => {
    const yCoordinate = el.getBoundingClientRect().top + window.pageYOffset;
    const yOffset = -80;
    window.scrollTo({ top: yCoordinate + yOffset, behavior: "smooth" });
  };

  const currentActivities = [
    {
      icon: <FaMapMarkedAlt className="text-blue-500" />,
      title: "Exploring California",
      description: "Making the most of my summer adventures on the West Coast",
    },
    {
      icon: <FaMountain className="text-green-500" />,
      title: "Getting Back Into Bouldering",
      description: "Challenging myself on new routes and problems",
    },
    {
      icon: <FaLaptopCode className="text-purple-500" />,
      title: "Building Side Projects",
      description: "Working on cool new ideas in my free time",
    },
  ];

  return (
    <div className="w-full relative">
      {/* Sidebar */}
      <motion.div
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="fixed right-8 top-32 w-80 z-10 hidden lg:block"
      >
        <SpotifyActivity />
      </motion.div>

      {/* Main content area */}
      <section className="max-container px-4 sm:px-8 flex flex-col items-center justify-center min-h-screen py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <h1 className="head-text mb-6">
            👋 Hey, I'm{" "}
            <span className="blue-gradient_text font-semibold">Derek</span>
          </h1>

          <h2 className="text-xl md:text-2xl text-gray-600 mb-8">
            <Typewriter
              options={{
                strings: [
                  "Computer Science Student",
                  "Software Engineer",
                  "Raver",
                  "Foodie",
                  "Traveller",
                  "Crocs Enthusiast",
                ],
                autoStart: true,
                loop: true,
                deleteSpeed: 50,
                delay: 70,
              }}
            />
          </h2>

          <div className="flex gap-4 justify-center mb-12">
            <HashLink smooth to="#projects" scroll={scrollWithOffset}>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="btn-primary px-6 py-3"
              >
                View Projects
              </motion.button>
            </HashLink>
            <HashLink smooth to="#about" scroll={scrollWithOffset}>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="btn-secondary px-6 py-3"
              >
                About Me
              </motion.button>
            </HashLink>
          </div>

          {/* What I'm Up To Currently Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="max-w-2xl mx-auto mb-12"
          >
            <h3 className="text-xl font-semibold mb-6 text-gray-800 dark:text-gray-200">
              What I'm Up To Currently
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {currentActivities.map((activity, index) => (
                <motion.div
                  key={index}
                  className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-5 border border-gray-100 dark:border-gray-700 hover:shadow-lg transition-all duration-300"
                  whileHover={{
                    y: -5,
                    transition: { duration: 0.2 },
                  }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.1 * index + 0.4 }}
                >
                  <div className="flex flex-col items-center text-center">
                    <div className="w-12 h-12 flex items-center justify-center rounded-full bg-gray-100 dark:bg-gray-700 mb-4">
                      <span className="text-2xl">{activity.icon}</span>
                    </div>
                    <h4 className="font-medium text-gray-800 dark:text-white mb-2">
                      {activity.title}
                    </h4>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      {activity.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Mobile Spotify Widget - only visible on small screens */}
          <div className="lg:hidden">
            <SpotifyActivity />
          </div>
        </motion.div>
      </section>
    </div>
  );
}

export default Home;
