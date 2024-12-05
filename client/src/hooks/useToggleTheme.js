import { useState } from "react";

export default function useToggleTheme() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode); // Toggle theme state
    if (isDarkMode) {
      document.documentElement.classList.remove("dark");
    } else {
      document.documentElement.classList.add("dark");
    }
  };

  return {
    isDarkMode,
    toggleTheme,
  };
}
