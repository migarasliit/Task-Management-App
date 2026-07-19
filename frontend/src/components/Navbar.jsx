// frontend/src/components/Navbar.jsx
import { useState, useEffect } from "react";
import { useTheme } from "../context/ThemeContext";

function Navbar() {
  const [dateTime, setDateTime] = useState(new Date());
  const { darkMode, toggleDarkMode } = useTheme();

  useEffect(() => {
    const timer = setInterval(() => {
      setDateTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <header className="bg-primary-600 text-white shadow-lg transition-colors duration-300">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex justify-between items-center">
          
          {/* Left Side: Logo & Title */}
          <div className="flex items-center space-x-3">
            <div className="bg-primary-500 p-2 rounded-lg shadow-inner">
              <svg
                className="w-6 h-6 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <h1 className="text-xl sm:text-2xl font-bold tracking-tight">
              Task Management System
            </h1>
          </div>

          {/* Right Side: Date, Time & Theme Toggle */}
          <div className="flex flex-col items-end space-y-2">
            <div className="text-right">
              <p className="text-xs sm:text-sm opacity-90 font-medium">
                {dateTime.toLocaleDateString("en-US", {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>
              <p className="text-base sm:text-lg font-bold tracking-wide font-mono">
                {dateTime.toLocaleTimeString()}
              </p>
            </div>
            
            {/* Dark Mode Toggle Button */}
            <button
              onClick={toggleDarkMode}
              className="flex items-center space-x-2 px-3 py-1.5 rounded-full bg-primary-500 hover:bg-primary-400 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary-300"
              aria-label="Toggle dark mode"
              title={darkMode ? "Switch to light mode" : "Switch to dark mode"}
            >
              {darkMode ? (
                <>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                  <span className="text-xs font-semibold">Light</span>
                </>
              ) : (
                <>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                  </svg>
                  <span className="text-xs font-semibold">Dark</span>
                </>
              )}
            </button>
          </div>

        </div>
      </div>
    </header>
  );
}

export default Navbar;