import React, { createContext, useContext, useState, useEffect } from "react";
import { ThemeProvider as StyledThemeProvider } from "styled-components";
import { themes } from "./theme";

const ThemeContext = createContext();

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};

export const ThemeProvider = ({ children }) => {
  const [currentTheme, setCurrentTheme] = useState("light");

  useEffect(() => {
    // Check localStorage for saved theme preference
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme && themes[savedTheme]) {
      setCurrentTheme(savedTheme);
    } else {
      // Default to light theme regardless of system preference
      setCurrentTheme("light");
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = currentTheme === "light" ? "dark" : "light";
    setCurrentTheme(newTheme);
    localStorage.setItem("theme", newTheme);
  };

  const setTheme = (themeName) => {
    if (themes[themeName]) {
      setCurrentTheme(themeName);
      localStorage.setItem("theme", themeName);
    }
  };

  const value = {
    currentTheme,
    theme: themes[currentTheme],
    toggleTheme,
    setTheme,
    isDark: currentTheme === "dark",
  };

  return (
    <ThemeContext.Provider value={value}>
      <StyledThemeProvider theme={themes[currentTheme]}>
        {children}
      </StyledThemeProvider>
    </ThemeContext.Provider>
  );
};
