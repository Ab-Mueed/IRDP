// NavBar.jsx
import { Sun, Moon } from "lucide-react";
import useToggleTheme from "@/hooks/useToggleTheme";

export default function NavBar() {
  const { isDarkMode, toggleTheme } = useToggleTheme();

  return (
    <nav className="border-b dark:border-b-[#363b3d]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 py-2">
        <div className="flex justify-between h-16 items-center">
          <a
            href="/"
            className="text-xl font-semibold py-3 md:text-2xl dark:text-[#e8e6e3]"
          >
            HireFit <br />{" "}
            <span className="italic text-sm md:text-lg dark:text-[#e8e6e3]">
              {" "}
              Resume-Job Compatibility Check
            </span>
          </a>
          <button
            onClick={toggleTheme}
            // className="p-2 bg-gray-800 dark:bg-[#586063] text-white rounded-full hover:bg-gray-600"
          >
            {/* Display Sun icon for light mode, Moon icon for dark mode */}
            {isDarkMode ? (
              <Moon className="h-5 w-5 text-white" />
            ) : (
              <Sun className="h-5 w-5" />
            )}
          </button>
        </div>
      </div>
    </nav>
  );
}
