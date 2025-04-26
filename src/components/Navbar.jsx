import { useState, useEffect } from "react";
import { HashLink } from "react-router-hash-link";
import { FaHome, FaUser, FaLaptopCode, FaMoon, FaSun } from "react-icons/fa";

const Navbar = () => {
  const [darkMode, setDarkMode] = useState(() => {
    // Check for saved theme preference or use system preference
    const savedTheme = localStorage.getItem("theme");
    return (
      savedTheme === "dark" ||
      (!savedTheme && window.matchMedia("(prefers-color-scheme: dark)").matches)
    );
  });

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

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <header className="fixed top-0 left-0 right-0 flex justify-center z-20 py-4">
      <nav className="flex items-center gap-2 px-4 py-2 rounded-full shadow-lg dark:shadow-blue-900/20 transition-all duration-300 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700">
        <HashLink
          smooth
          to="#home"
          scroll={scrollWithOffset}
          className="p-3 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-200 transition"
          aria-label="Home"
        >
          <FaHome className="text-xl" />
        </HashLink>

        <HashLink
          smooth
          to="#about"
          scroll={scrollWithOffset}
          className="p-3 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-200 transition"
          aria-label="About"
        >
          <FaUser className="text-xl" />
        </HashLink>

        <HashLink
          smooth
          to="#projects"
          scroll={scrollWithOffset}
          className="p-3 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-200 transition"
          aria-label="Projects"
        >
          <FaLaptopCode className="text-xl" />
        </HashLink>

        <button
          onClick={toggleDarkMode}
          className="p-3 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-200 transition"
          aria-label="Toggle dark mode"
        >
          {darkMode ? (
            <FaSun className="text-xl" />
          ) : (
            <FaMoon className="text-xl" />
          )}
        </button>
      </nav>
    </header>
  );
};

export default Navbar;
