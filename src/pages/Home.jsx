import { motion } from "framer-motion";
import Typewriter from "typewriter-effect";
import { HashLink } from "react-router-hash-link";
import SpotifyActivity from "../components/SpotifyActivity";
import { FaMountain, FaMapMarkedAlt, FaMusic } from "react-icons/fa";

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
      description: "West Coast Best Coast 🤷🏻‍♂️",
    },
    {
      icon: <FaMountain className="text-green-500" />,
      title: "Bouldering",
      description: "Outdoor bouldering is so fun",
    },
    {
      icon: <FaMusic className="text-purple-500" />,
      title: "Raving",
      description: "Making the most of my time on West Coast 😛",
    },
  ];

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 24,
      },
    },
    hover: {
      y: -10,
      scale: 1.03,
      boxShadow: "0 10px 20px rgba(0,0,0,0.1)",
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 10,
      },
    },
  };

  const iconVariants = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 500,
        damping: 25,
      },
    },
    hover: {
      scale: 1.1,
      rotate: [0, -10, 10, -10, 0],
      transition: {
        rotate: {
          repeat: Infinity,
          repeatType: "mirror",
          duration: 2,
        },
      },
    },
  };

  return (
    <div className="w-full" id="home">
      <section className="max-container px-4 sm:px-8 py-16">
        <div className="w-full grid lg:grid-cols-[minmax(0,1fr)_320px] gap-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center lg:text-left"
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

            <div className="flex gap-4 justify-center lg:justify-start mb-12">
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
              initial="hidden"
              animate="visible"
              variants={containerVariants}
              className="w-full max-w-3xl lg:max-w-none"
            >
              <div className="flex flex-col gap-2 mb-6">
                <span className="section-label justify-center lg:justify-start">
                  Currently into
                </span>
                <motion.h3
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="text-3xl font-bold text-gray-800 dark:text-gray-200"
                >
                  What I'm up to these days
                </motion.h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
                {currentActivities.map((activity, index) => (
                  <motion.div
                    key={index}
                    variants={itemVariants}
                    whileHover="hover"
                    className="bg-white/85 dark:bg-gray-800 rounded-xl shadow-md p-5 border border-gray-100 dark:border-gray-700 hover:shadow-xl transition-all duration-300"
                  >
                    <div className="flex items-center gap-4">
                      <motion.div
                        className="w-12 h-12 flex items-center justify-center rounded-full bg-gray-100 dark:bg-gray-700"
                        variants={iconVariants}
                        whileHover="hover"
                      >
                        <span className="text-2xl">{activity.icon}</span>
                      </motion.div>
                      <div>
                        <h4 className="font-semibold text-gray-800 dark:text-white">
                          {activity.title}
                        </h4>
                        <p className="text-sm text-gray-600 dark:text-gray-300">
                          {activity.description}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </motion.div>

          <motion.aside
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="hidden lg:block"
          >
            <div className="sticky top-28 space-y-4">
              <p className="section-label">Spotify activity</p>
              <SpotifyActivity />
            </div>
          </motion.aside>
        </div>

        <div className="lg:hidden w-full max-w-md mx-auto mt-12">
          <p className="section-label text-center mb-4">Spotify activity</p>
          <SpotifyActivity />
        </div>
      </section>
    </div>
  );
}

export default Home;
