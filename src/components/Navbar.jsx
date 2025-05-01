import { useState, useEffect } from "react";
import { HashLink } from "react-router-hash-link";
import { motion } from "framer-motion";
import { FaHome, FaUser, FaBriefcase, FaMoon, FaSun } from "react-icons/fa";

const Navbar = () => {
  const [darkMode, setDarkMode] = useState(() => {
    // Check for saved theme preference or use system preference
    const savedTheme = localStorage.getItem("theme");
    return (
      savedTheme === "dark" ||
      (!savedTheme && window.matchMedia("(prefers-color-scheme: dark)").matches)
    );
  });

  const [activeLink, setActiveLink] = useState("home");

  const scrollWithOffset = (el) => {
    const yCoordinate = el.getBoundingClientRect().top + window.pageYOffset;
    const yOffset = -80; // header height
    window.scrollTo({ top: yCoordinate + yOffset, behavior: "smooth" });
  };

  // Apply dark mode when state changes
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  // Track scroll position to update active link
  useEffect(() => {
    const handleScroll = () => {
      const sections = ["home", "about", "projects"];
      const scrollPosition = window.scrollY + 150;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const top = element.offsetTop;
          const height = element.offsetHeight;

          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveLink(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Initial check

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: "spring", stiffness: 260, damping: 20 }}
      className="fixed top-0 left-0 right-0 flex justify-center z-20 py-4"
    >
      <motion.nav
        className="flex items-center gap-2 px-4 py-2 rounded-full shadow-lg backdrop-blur-sm bg-white/90 dark:bg-gray-900/90 border border-gray-200 dark:border-gray-700 transition-all duration-300"
        whileHover={{ scale: 1.02 }}
        transition={{ type: "spring", stiffness: 400, damping: 17 }}
      >
        <NavItem
          to="#home"
          icon={<FaHome className="text-xl" />}
          label="Home"
          isActive={activeLink === "home"}
          onClick={() => setActiveLink("home")}
          scrollWithOffset={scrollWithOffset}
        />

        <NavItem
          to="#about"
          icon={<FaUser className="text-xl" />}
          label="About"
          isActive={activeLink === "about"}
          onClick={() => setActiveLink("about")}
          scrollWithOffset={scrollWithOffset}
        />

        <NavItem
          to="#projects"
          icon={<FaBriefcase className="text-xl" />}
          label="Projects"
          isActive={activeLink === "projects"}
          onClick={() => setActiveLink("projects")}
          scrollWithOffset={scrollWithOffset}
        />

        <motion.button
          whileHover={{ scale: 1.1, rotate: 5 }}
          whileTap={{ scale: 0.9 }}
          onClick={toggleDarkMode}
          className="p-3 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-200 transition-colors duration-200 relative group"
          aria-label="Toggle dark mode"
        >
          <motion.div
            initial={false}
            animate={{ rotate: darkMode ? 180 : 0 }}
            transition={{ duration: 0.5 }}
          >
            {darkMode ? (
              <FaSun className="text-xl text-amber-500" />
            ) : (
              <FaMoon className="text-xl text-indigo-500" />
            )}
          </motion.div>
          <span className="absolute -bottom-9 left-1/2 -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">
            {darkMode ? "Light mode" : "Dark mode"}
          </span>
        </motion.button>
      </motion.nav>
    </motion.header>
  );
};

const NavItem = ({ to, icon, label, isActive, onClick, scrollWithOffset }) => {
  return (
    <HashLink
      smooth
      to={to}
      scroll={scrollWithOffset}
      className="p-3 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-200 transition-colors duration-200 relative group"
      aria-label={label}
      onClick={onClick}
    >
      <motion.div
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        animate={{
          color: isActive
            ? "var(--color-active, rgb(59, 130, 246))"
            : "var(--color-inactive, currentColor)",
        }}
      >
        {icon}
      </motion.div>
      <span className="absolute -bottom-9 left-1/2 -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">
        {label}
      </span>
      {isActive && (
        <motion.div
          layoutId="activeIndicator"
          className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-blue-500 dark:bg-blue-400 rounded-full"
          initial={false}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
        />
      )}
    </HashLink>
  );
};

export default Navbar;
