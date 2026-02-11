'use client';
import React, { createContext, useContext, useEffect, useState } from 'react';
import { Moon, Sun } from 'lucide-react';

// --- TYPES AND CONTEXT ---
interface ThemeContextType {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
  mounted: boolean;
}

interface ThemeProviderProps {
  children: React.ReactNode;
}

// Theme Context
const ThemeContext = createContext<ThemeContextType | null>(null);

// --- THEME PROVIDER LOGIC ---

/**
 * Applies or removes the 'dark' class on the <html> element.
 * Handles the DOM side-effect.
 */
const setRootClass = (newTheme: 'light' | 'dark'): void => {
  if (typeof document !== 'undefined') {
    // Only toggle the 'dark' class
    document.documentElement.classList.toggle('dark', newTheme === 'dark');
    // NOTE: Global transition classes are removed here based on feedback,
    // as the main content wrapper handles the transition.
  }
};

export function ThemeProvider({ children }: ThemeProviderProps): JSX.Element {
  const [theme, setTheme] = useState<'light' | 'dark'>('dark');
  const [mounted, setMounted] = useState(false);

  // 1. Initialization Effect (Runs ONCE on mount)
  useEffect(() => {
    if (typeof window === 'undefined') return;

    let storedRaw: string | null = null;
    try {
      // FIX 1A: Harden theme persistence read with try/catch
      storedRaw = localStorage.getItem('theme');
    } catch {
      // Ignore storage read failures
    }

    const stored = (storedRaw === 'light' || storedRaw === 'dark') ? storedRaw : null;

    // Use system preference if no valid stored theme is found
    const initial = stored ??
      (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');

    setTheme(initial);
    setRootClass(initial); // Initial application of class to prevent FOUC on initial render
    setMounted(true);
  }, []);

  // 2. Side Effect Listener (Runs on 'theme' state change)
  useEffect(() => {
    // Only run side effects once mounted and window is available
    if (!mounted || typeof window === 'undefined') return;

    // Run DOM side-effect
    setRootClass(theme);

    // FIX 1C/4: Harden theme persistence write with try/catch and isolate from state updater
    try {
      localStorage.setItem('theme', theme);
    } catch {
      // Ignore storage write failures
    }
  }, [theme, mounted]);


  // FIX 1B/4: Use functional state update for race-safe toggling and KEEP PURE.
  // Side effects (setRootClass, localStorage) are handled in the useEffect above.
  const toggleTheme = (): void => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, mounted }}>
      {children}
    </ThemeContext.Provider>
  );
}

// Hook to use theme
export function useTheme(): ThemeContextType {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return context;
}

// --- THEME TOGGLE COMPONENT (TAILWIND STYLED) ---
export function ThemeToggle(): JSX.Element {
  const { theme, toggleTheme, mounted } = useTheme();

  // Show a loading state until mounted
  if (!mounted) {
    return (
      <button
        // FIX 2: Added type="button"
        type="button"
        className="p-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 transition-colors duration-200"
        aria-label="Loading theme toggle"
        disabled
      >
        <div className="w-5 h-5" />
      </button>
    );
  }

  return (
    <button
      // FIX 2: Added type="button"
      type="button"
      onClick={toggleTheme}
      className="p-2 rounded-lg border border-gray-300 dark:border-gray-600
                 bg-white dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700
                 transition-colors duration-200 cursor-pointer flex items-center justify-center"
      aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
    >
      {theme === 'light' ? (
        <Sun className="w-5 h-5 text-yellow-500" />
      ) : (
        <Moon className="w-5 h-5 text-blue-400" />
      )}
    </button>
  );
}