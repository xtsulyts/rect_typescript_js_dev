// hooks/useThemeToggle.ts
"use client";

import { useTheme } from "next-themes";

export const useThemeToggle = () => {
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return { theme, toggleTheme };
};