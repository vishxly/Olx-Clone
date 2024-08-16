/* eslint-disable react/prop-types */
import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { FaSun, FaMoon } from "react-icons/fa";

const Navbar = ({ darkMode, toggleDarkMode }) => {
  const { user, logout } = useContext(AuthContext);

  return (
    <div className="text-black transition-colors duration-300 dark:bg-black dark:text-white">
      <div className="w-full px-4 mx-auto sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="text-xl font-bold">
              OLX Clone
            </Link>
          </div>
          <div className="flex items-center">
            {user ? (
              <>
                <Link
                  to="/list-item"
                  className="px-3 py-2 text-sm font-medium rounded-md hover:bg-gray-700 hover:text-white"
                >
                  List Item
                </Link>
                <Link
                  to="/my-items"
                  className="px-3 py-2 text-sm font-medium rounded-md hover:bg-gray-700 hover:text-white"
                >
                  My Items
                </Link>
                <Link
                  to="/my-purchases"
                  className="px-3 py-2 text-sm font-medium rounded-md hover:bg-gray-700 hover:text-white"
                >
                  My Purchases
                </Link>
                <button
                  onClick={logout}
                  className="px-3 py-2 text-sm font-medium rounded-md hover:bg-gray-700 hover:text-white"
                >
                  Logout
                </button>
                <span className="px-3 py-2 text-sm font-medium text-red-500">
                  {user.email}
                </span>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="px-3 py-2 text-sm font-medium rounded-md hover:bg-gray-700 hover:text-white"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="px-3 py-2 text-sm font-medium rounded-md hover:bg-gray-700 hover:text-white"
                >
                  Register
                </Link>
              </>
            )}
            <button
              onClick={toggleDarkMode}
              className="p-2 ml-4 rounded-md hover:bg-gray-700 hover:text-white focus:outline-none"
            >
              {darkMode ? (
                <FaSun className="w-5 h-5" />
              ) : (
                <FaMoon className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
