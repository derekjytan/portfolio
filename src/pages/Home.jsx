import { motion } from "framer-motion";
import Typewriter from "typewriter-effect";
import { HashLink } from "react-router-hash-link";
import SpotifyActivity from "../components/SpotifyActivity";
import { FaMountain, FaMapMarkedAlt, FaMusic } from "react-icons/fa";
import { useEffect, useState } from "react";

function Home() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    // Add event listener
    window.addEventListener("scroll", handleScroll);

    // Remove event listener on cleanup
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

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

  const showSpotify = scrollY < window.innerHeight - 200;

  return (
    <div className="w-full relative" id="home">
      {/* Spotify Sidebar - only visible on desktop and when at the top of the page */}
      <motion.div
        initial={{ opacity: 0, x: 50 }}
        animate={{
          opacity: showSpotify ? 1 : 0,
          x: showSpotify ? 0 : 50,
          pointerEvents: showSpotify ? "auto" : "none",
        }}
        transition={{ duration: 0.3 }}
        className="fixed right-8 top-32 w-80 z-10 hidden lg:block"
        style={{ display: showSpotify ? "block" : "none" }}
      >
        <SpotifyActivity />
      </motion.div>

      {/* Main content area */}
      <section className="max-container px-4 sm:px-8 flex flex-col items-center">
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
            initial="hidden"
            animate="visible"
            variants={containerVariants}
            className="max-w-2xl mx-auto mb-12"
          >
            <motion.h3
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-xl font-semibold mb-6 text-gray-800 dark:text-gray-200"
            >
              What I'm Up To Currently
            </motion.h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {currentActivities.map((activity, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  whileHover="hover"
                  className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-5 border border-gray-100 dark:border-gray-700 hover:shadow-lg transition-all duration-300"
                >
                  <div className="flex flex-col items-center text-center">
                    <motion.div
                      className="w-12 h-12 flex items-center justify-center rounded-full bg-gray-100 dark:bg-gray-700 mb-4"
                      variants={iconVariants}
                      whileHover="hover"
                    >
                      <span className="text-2xl">{activity.icon}</span>
                    </motion.div>
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

          {/* Mobile Spotify Widget - only visible on small screens and only at the top */}
          {showSpotify && (
            <div className="lg:hidden">
              <SpotifyActivity />
            </div>
          )}
        </motion.div>
      </section>
    </div>
  );
}

export default Home;
