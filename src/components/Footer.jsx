import { Link } from "react-router-dom";
import { socialLinks } from "../constants";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="flex flex-col md:flex-row justify-between items-center w-full px-4 py-4 gap-4">
        <p className="text-gray-600 dark:text-gray-400">
          <strong className="text-gray-800 dark:text-gray-200">
            Derek Tan
          </strong>{" "}
          © {new Date().getFullYear()}
        </p>

        <div className="flex gap-4 justify-center items-center">
          {socialLinks.map((link) => (
            <a
              key={link.name}
              href={link.link}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-500 hover:text-blue-500 dark:text-gray-400 dark:hover:text-blue-400 transition-colors"
            >
              <img
                src={link.iconUrl}
                alt={link.name}
                className="w-5 h-5 object-contain dark:filter dark:invert dark:opacity-80"
              />
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
