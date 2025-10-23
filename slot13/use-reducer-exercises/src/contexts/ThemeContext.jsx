import React, { createContext, useContext, useState } from "react";

export const ThemeContext = createContext({
  theme: "light",
  toggleTheme: () => {},
});

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState("light");

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  const bgStyle = {
    background: theme === "light" ? "#f9fafb" : "#1e1e1e",
    color: theme === "light" ? "#212529" : "#f8f9fa",
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <div style={{ ...bgStyle, minHeight: "100vh", transition: "0.3s ease" }}>
        {children}
      </div>
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) throw new Error("useTheme must be used within ThemeProvider");
  return context;
};
