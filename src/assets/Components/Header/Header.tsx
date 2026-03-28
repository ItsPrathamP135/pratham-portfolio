import { useState } from 'react';
import { BookOpen, Sun, Moon, Home, Code2, FileText, Menu, X } from "lucide-react";
import { useTheme } from "../../Context/ThemeContext";
import { useNavigate, useLocation } from "react-router-dom";

// Mock theme context for demo


const Header = () => {
  const { darkMode, setDarkMode } = useTheme();
  const navigate = useNavigate();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

    const isActive = (path: string): boolean => {
    return location.pathname === path;
  };

  const handleNavigation = (path: string) => {
    navigate(path);
    setIsMenuOpen(false);
  };

  const navItems = [
    { path: "/", label: "Home", icon: Home, matchStart: false },
    { path: "/dsa", label: "DSA", icon: Code2, matchStart: true },
    { path: "/notes", label: "Notes", icon: FileText, matchStart: false },
  ];

  return (
    <header
      className={`${
        darkMode ? "bg-gray-800" : "bg-white"
      } shadow-lg transition-colors sticky top-0 z-50`}
    >
      <div className="mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo - Left Corner */}
          <div
            className="flex items-center gap-3 cursor-pointer"
            onClick={() => handleNavigation("/")}
          >
            <BookOpen className="w-8 h-8 text-teal-500" />
            <h1
              className={`text-xl sm:text-2xl font-bold ${
                darkMode ? "text-white" : "text-gray-800"
              }`}
            >
              Code in Transit
            </h1>
          </div>

          {/* Desktop Navigation - Right Corner */}
          <nav className="hidden md:flex items-center gap-8">
            {navItems.map(({ path, label, icon: Icon, matchStart }) => {
              const active = matchStart
                ? location.pathname.startsWith(path)
                : isActive(path);
              
              return (
                <a
                  key={path}
                  onClick={() => handleNavigation(path)}
                  className={`cursor-pointer font-medium transition-colors duration-200 flex items-center gap-2 ${
                    active
                      ? "text-teal-500"
                      : darkMode
                      ? "text-white hover:text-teal-400"
                      : "text-black hover:text-teal-500"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{label}</span>
                </a>
              );
            })}

            {/* Dark Mode Toggle */}
            <a
              onClick={() => setDarkMode(!darkMode)}
              className={`cursor-pointer font-medium transition-colors duration-200 flex items-center gap-2 ${
                darkMode
                  ? "text-white hover:text-teal-400"
                  : "text-black hover:text-teal-500"
              }`}
            >
              {darkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
              <span>Change Mode</span>
            </a>
          </nav>

          {/* Mobile Controls - Right Corner */}
          <div className="flex md:hidden items-center gap-3">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className={`transition-colors outline-none border-none bg-transparent ${
                darkMode ? "text-white" : "text-gray-800"
              }`}
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {isMenuOpen && (
          <div className={`md:hidden ${darkMode ? "bg-gray-800" : "bg-white"}`}>
            <nav className="py-4 flex flex-col">
              {navItems.map(({ path, label, icon: Icon, matchStart }) => {
                const active = matchStart
                  ? location.pathname.startsWith(path)
                  : isActive(path);
                
                return (
                  <a
                    key={path}
                    onClick={() => handleNavigation(path)}
                    className={`cursor-pointer px-4 py-3 font-medium transition-colors flex items-center gap-3 ${
                      active
                        ? "text-teal-500"
                        : darkMode
                        ? "text-white hover:text-teal-400"
                        : "text-black hover:text-teal-500"
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    <span>{label}</span>
                  </a>
                );
              })}

              {/* Dark Mode Toggle in Drawer */}
              <a
                onClick={() => {
                  setDarkMode(!darkMode);
                  setIsMenuOpen(false);
                }}
                className={`cursor-pointer px-4 py-3 font-medium transition-colors flex items-center gap-3 ${
                  darkMode
                    ? "text-white hover:text-teal-400"
                    : "text-black hover:text-teal-500"
                }`}
              >
                {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                <span>Change Mode</span>
              </a>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;