import React, { createContext, useContext, useEffect, useState } from "react";

// Create a context for the theme
const ThemeContext = createContext();

// ThemeProvider component
export const ThemeProvider = ({ children, defaultTheme = "dark" }) => {
  // Get the theme from localStorage or use the default theme
  const [theme, setTheme] = useState(() => {
    const savedTheme = localStorage.getItem("theme");
    return savedTheme || defaultTheme;
  });

  // Toggle between light and dark themes
  const toggleTheme = () => {
    setTheme((prevTheme) => {
      const newTheme = prevTheme === "dark" ? "light" : "dark";
      // Save the new theme to localStorage
      localStorage.setItem("theme", newTheme);
      return newTheme;
    });
  };

  // Apply the theme to the document element
  useEffect(() => {
    document.documentElement.classList.remove("light", "dark");
    document.documentElement.classList.add(theme);
  }, [theme]);

  // Provide the theme and toggle function to the context
  return (
    <ThemeContext.Provider value={{ theme, setTheme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

// Custom hook to use the theme context
export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};