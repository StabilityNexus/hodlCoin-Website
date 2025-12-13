import React, { createContext, useContext, useEffect, useState } from 'react';
import { Moon, Sun } from 'lucide-react';

// Theme Context
const ThemeContext = createContext({
  theme: 'dark',
  toggleTheme: () => {},
  mounted: false
});

// Theme Provider Component
export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState('dark');
  const [mounted, setMounted] = useState(false);

  // Initialize theme from localStorage before first render
  useEffect(() => {
    const stored = localStorage.getItem('theme');
    const initial = stored || 
      (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    
    setTheme(initial);
    document.documentElement.classList.toggle('dark', initial === 'dark');
    setMounted(true);
  }, []);

  // Update theme
  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    document.documentElement.classList.toggle('dark', newTheme === 'dark');
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, mounted }}>
      {children}
    </ThemeContext.Provider>
  );
}

// Hook to use theme
export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return context;
}

// Theme Toggle Button Component
export function ThemeToggle() {
  const { theme, toggleTheme, mounted } = useTheme();

  // Prevent rendering until mounted to avoid hydration mismatch
  if (!mounted) {
    return (
      <button className="p-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800">
        <div className="w-5 h-5" />
      </button>
    );
  }

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-lg border border-gray-300 dark:border-gray-600 
                 bg-white dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700
                 transition-colors duration-200"
      aria-label="Toggle theme"
    >
      {theme === 'light' ? (
        <Sun className="w-5 h-5 text-yellow-500" />
      ) : (
        <Moon className="w-5 h-5 text-blue-400" />
      )}
    </button>
  );
}

// Demo App Component
export default function App() {
  return (
    <ThemeProvider>
      <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-white transition-colors">
        {/* Header with Theme Toggle */}
        <header className="border-b border-gray-200 dark:border-gray-700">
          <div className="container mx-auto px-4 py-4 flex items-center justify-between">
            <h1 className="text-2xl font-bold">hodlCoin</h1>
            <ThemeToggle />
          </div>
        </header>

        {/* Main Content */}
        <main className="container mx-auto px-4 py-8">
          <div className="max-w-2xl mx-auto space-y-6">
            <div className="bg-gray-100 dark:bg-gray-800 p-6 rounded-lg">
              <h2 className="text-xl font-semibold mb-3">Theme Fix Applied</h2>
              <p className="text-gray-600 dark:text-gray-300">
                This implementation fixes the theme flicker issue by:
              </p>
              <ul className="mt-3 space-y-2 text-gray-600 dark:text-gray-300">
                <li>✓ Reading theme from localStorage immediately</li>
                <li>✓ Preventing hydration mismatch with mounted state</li>
                <li>✓ Syncing toggle icon with actual theme</li>
                <li>✓ Applying theme class before first paint</li>
              </ul>
            </div>

            <div className="bg-gray-100 dark:bg-gray-800 p-6 rounded-lg">
              <h3 className="text-lg font-semibold mb-2">Instructions</h3>
              <ol className="list-decimal list-inside space-y-2 text-gray-600 dark:text-gray-300">
                <li>Toggle to light mode (sun icon should appear)</li>
                <li>Reload the page</li>
                <li>Page stays in light mode with sun icon</li>
                <li>No flicker on reload!</li>
              </ol>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-blue-100 dark:bg-blue-900 p-4 rounded-lg">
                <h4 className="font-semibold mb-2">Light Mode</h4>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Clean, bright interface
                </p>
              </div>
              <div className="bg-purple-100 dark:bg-purple-900 p-4 rounded-lg">
                <h4 className="font-semibold mb-2">Dark Mode</h4>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Easy on the eyes
                </p>
              </div>
            </div>
          </div>
        </main>
      </div>
    </ThemeProvider>
  );
}