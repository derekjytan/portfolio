import { motion } from "framer-motion";
import Typewriter from "typewriter-effect";
import { HashLink } from "react-router-hash-link";
import SpotifyActivity from "../components/SpotifyActivity";

function Home() {
  const scrollWithOffset = (el) => {
    const yCoordinate = el.getBoundingClientRect().top + window.pageYOffset;
    const yOffset = -80; // header height
    window.scrollTo({ top: yCoordinate + yOffset, behavior: "smooth" });
  };

  return (
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
              ],
              autoStart: true,
              loop: true,
              deleteSpeed: 50,
              delay: 70,
            }}
          />
        </h2>

        {/* <p className="text-gray-600 max-w-lg mx-auto mb-10 text-center">
          I'm a Computer Science student at Western University, currently
          working as a Software Engineer Intern at Meta!
        </p> */}

        <div className="flex gap-4 justify-center mb-16">
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

        <div className="max-w-md mx-auto">
          <SpotifyActivity />
        </div>
      </motion.div>
    </section>
  );
}

export default Home;
