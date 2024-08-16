import { Link } from "react-router-dom";
import { FaFacebook, FaTwitter, FaInstagram } from "react-icons/fa"; // Import icons

const Footer = () => {
  return (
    <footer className="py-3 text-black dark:bg-black dark:text-white">
      <div className="container flex flex-col items-center justify-between mx-auto md:flex-row">
        <div className="mb-4 text-center md:text-left md:mb-0">
          <p>&copy; {new Date().getFullYear()} MyApp. All rights reserved.</p>
        </div>
        <div className="flex flex-col space-x-4 md:flex-row md:space-x-8">
          <Link to="#" className="hover:text-indigo-400">
            Privacy Policy
          </Link>
          <Link to="#" className="hover:text-indigo-400">
            Terms of Service
          </Link>
        </div>
        <div className="flex space-x-4 md:ml-auto">
          <a
            href="https://www.facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-indigo-400"
          >
            <FaFacebook />
          </a>
          <a
            href="https://www.twitter.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-indigo-400"
          >
            <FaTwitter />
          </a>
          <a
            href="https://www.instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-indigo-400"
          >
            <FaInstagram />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
