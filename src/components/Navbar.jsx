import { useState } from 'react';
import { Link } from 'react-router-dom';
import ThemeToggle from './ThemeToggle';
import { Film } from 'lucide-react';

const Navbar = ({ onToggleTheme, currentTheme }) => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="bg-white dark:bg-gray-900 shadow-lg sticky top-0 z-50 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex">
            <Link
              to="/"
              className="text-2xl font-bold text-green-600 dark:text-green-800 hover:text-green-700 dark:hover:text-green-300 transition-colors"
            >
           MovieExplorer
            </Link>
          </div>

          {/* Navigation Links (hidden on mobile) */}
          <div className="hidden md:flex mx-auto space-x-8"> 
            <Link
              to="/"
              className="text-green-700 dark:text-gray-200 hover:text-green-800 dark:hover:text-green-800 px-3 py-2 rounded-md text-sm font-medium transition-colors"
            >
              Home
            </Link>
            <Link
              to="/favorites"
              className="text-green-700 dark:text-green-800 hover:text-green-600 dark:hover:text-green-400 px-3 py-2 rounded-md text-sm font-medium transition-colors"
            >
              Favorites
            </Link>
          </div>
          <div className="flex items-center space-x-3 flex-shrink-0">
            <ThemeToggle onToggle={onToggleTheme} currentTheme={currentTheme} />
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="md:hidden p-2 rounded-lg bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
              aria-label="Toggle menu"
            >
              {menuOpen ? (
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              ) : (
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M3 5h14a1 1 0 000-2H3a1 1 0 000 2zm14 4H3a1 1 0 100 2h14a1 1 0 100-2zm0 6H3a1 1 0 100 2h14a1 1 0 100-2z"
                    clipRule="evenodd"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu Links (below nav, hidden on md+) */}
        {menuOpen && (
          <div className="md:hidden pb-3 space-y-1">
            <Link
              to="/"
              onClick={() => setMenuOpen(false)}
              className="block text-gray-700 dark:text-gray-200 hover:text-green-600 dark:hover:text-green-400 px-3 py-2 rounded-md text-sm font-medium"
            >
              Home
            </Link>
            <Link
              to="/favorites"
              onClick={() => setMenuOpen(false)}
              className="block text-gray-700 dark:text-gray-200 hover:text-green-600 dark:hover:text-green-400 px-3 py-2 rounded-md text-sm font-medium"
            >
              Favorites
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;