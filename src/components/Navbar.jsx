import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

function Navbar({
  search,
  setSearch,
  deleteMode,
  setDeleteMode,
  showSearch,
  darkMode,
  setDarkMode,
  hideActions,
}) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/80 dark:bg-gray-900/80 backdrop-blur-md shadow-sm"
          : "bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 py-3 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        {/* Logo + Dark Toggle */}
        <div className="flex justify-between items-center w-full md:w-auto">
          <Link to="/" className="text-2xl font-bold text-rose-500">
            Airbnb
          </Link>

          <button
            onClick={() => setDarkMode(!darkMode)}
            className="text-sm px-4 py-2 rounded-full border dark:border-gray-600 dark:text-white 
                       transform active:scale-95 transition duration-200 hover:bg-gray-100 dark:hover:bg-gray-800"
          >
            {darkMode ? "☀ Light" : "🌙 Dark"}
          </button>
        </div>

        {/* Search */}
        {showSearch && (
          <input
            type="text"
            placeholder="Search stays..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full md:w-64 px-4 py-2.5 border border-gray-300 dark:border-gray-600 
                       bg-white dark:bg-gray-800 dark:text-white 
                       rounded-full text-sm focus:outline-none 
                       focus:ring-2 focus:ring-rose-500 
                       transition duration-200"
          />
        )}

        {/* Action Buttons */}
        {!hideActions && (
          <div className="flex gap-3 w-full md:w-auto">
            <button
              onClick={() => setDeleteMode((prev) => !prev)}
              className={`flex-1 md:flex-none text-sm px-4 py-2 rounded-full 
                 transform active:scale-95 transition duration-200 ${
                   deleteMode
                     ? "bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-white"
                     : "bg-rose-500 hover:bg-rose-600 text-white"
                 }`}
            >
              {deleteMode ? "Cancel" : "Delete"}
            </button>

            <Link
              to="/add-listing"
              className="flex-1 md:flex-none text-sm px-4 py-2 bg-black dark:bg-white 
                 dark:text-black text-white shadow-md hover:shadow-lg 
                 rounded-full text-center 
                 transform active:scale-95 transition duration-200 hover:opacity-90"
            >
              Add Listing
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
