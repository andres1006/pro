"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

type Theme = "light" | "dark" | "system";
type AccentColor = "cyan" | "purple" | "blue" | "green";

interface ThemeContextType {
  theme: Theme;
  accentColor: AccentColor;
  setTheme: (theme: Theme) => void;
  setAccentColor: (color: AccentColor) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>(() => {
    // Intentar recuperar el tema guardado
    if (typeof window !== "undefined") {
      const savedTheme = localStorage.getItem("theme") as Theme;
      return savedTheme || "dark";
    }
    return "dark";
  });

  const [accentColor, setAccentColor] = useState<AccentColor>(() => {
    // Intentar recuperar el color de acento guardado
    if (typeof window !== "undefined") {
      const savedColor = localStorage.getItem("accentColor") as AccentColor;
      return savedColor || "cyan";
    }
    return "cyan";
  });

  useEffect(() => {
    // Guardar preferencias en localStorage
    localStorage.setItem("theme", theme);
    localStorage.setItem("accentColor", accentColor);

    // Aplicar tema
    const root = window.document.documentElement;
    root.classList.remove("light", "dark");

    if (theme === "system") {
      const systemTheme = window.matchMedia("(prefers-color-scheme: dark)")
        .matches
        ? "dark"
        : "light";
      root.classList.add(systemTheme);
    } else {
      root.classList.add(theme);
    }

    // Aplicar color de acento
    root.style.setProperty("--accent-color", accentColor);

    // Actualizar colores específicos basados en el color de acento
    const colors = {
      cyan: {
        primary: "rgb(6 182 212)",
        secondary: "rgb(14 116 144)",
      },
      purple: {
        primary: "rgb(147 51 234)",
        secondary: "rgb(126 34 206)",
      },
      blue: {
        primary: "rgb(59 130 246)",
        secondary: "rgb(37 99 235)",
      },
      green: {
        primary: "rgb(34 197 94)",
        secondary: "rgb(22 163 74)",
      },
    };

    root.style.setProperty("--color-primary", colors[accentColor].primary);
    root.style.setProperty("--color-secondary", colors[accentColor].secondary);
  }, [theme, accentColor]);

  return (
    <ThemeContext.Provider
      value={{ theme, accentColor, setTheme, setAccentColor }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}
