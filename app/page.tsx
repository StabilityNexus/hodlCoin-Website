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
export function ThemeProvider({ children }: ThemeProviderProps): JSX.Element {
  const [theme, setTheme] = useState<'light' | 'dark'>('dark');
  const [mounted, setMounted] = useState(false);

  // Function to apply the 'dark' class to the root element
  const setRootClass = (newTheme: 'light' | 'dark'): void => {
    if (typeof document !== 'undefined') {
      document.documentElement.classList.toggle('dark', newTheme === 'dark');
      // Ensure the smooth transition class is applied after initial render
      document.documentElement.classList.add('transition-colors', 'duration-300');
    }
  };

  // Initialize theme on mount
  useEffect(() => {
    if (typeof window === 'undefined') return;

    // FIX 1A: Harden theme persistence read with try/catch
    let storedRaw: string | null = null;
    try {
      storedRaw = localStorage.getItem('theme');
    } catch {
      // Ignore storage read failures (privacy modes / denied storage)
    }

    const stored = (storedRaw === 'light' || storedRaw === 'dark') ? storedRaw : null;
    
    // Use system preference if no valid stored theme is found
    const initial = stored ?? 
      (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    
    setTheme(initial);
    setRootClass(initial);
    setMounted(true);
  }, []);

  // Toggle theme function
  // FIX 1B: Use functional state update for race-safe toggling
  const toggleTheme = (): void => {
    setTheme((prev) => {
      const next = prev === 'light' ? 'dark' : 'light';
      setRootClass(next);
      
      // FIX 1C: Harden theme persistence write with try/catch
      try {
        if (typeof window !== 'undefined') {
          localStorage.setItem('theme', next);
        }
      } catch {
        // Ignore storage write failures
      }
      return next;
    });
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

// --- MAIN PAGE COMPONENTS (TAILWIND STYLED) ---

// HomePage Component (renamed from App for Next.js conventions)
export default function HomePage(): JSX.Element {
  return (
    <ThemeProvider>
      <HomePageContent />
    </ThemeProvider>
  );
}

function HomePageContent(): JSX.Element {
  const { mounted } = useTheme(); 
  
  // FIX 3 (Major SSR/Performance): Removed the early return that blanked the page
  // The 'mounted' check is now only used where truly necessary (ThemeToggle)
  // The main div ensures the necessary base classes are present for Tailwind SSR
  return (
    // Base classes for full screen, dark mode transition, and text color
    <div className="min-h-screen bg-white text-gray-900 dark:bg-gray-900 dark:text-white transition-colors duration-300">
      
      {/* Header */}
      <header className="border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-800 py-4">
        <div className="max-w-6xl mx-auto px-4 flex justify-between items-center">
          <span className="text-2xl font-bold m-0">hodlCoin</span>
          <div className="flex items-center space-x-4">
            {/* Conditional visibility for the label until mounted, if needed, 
                but keeping it visible is generally fine since it uses base classes */}
            <span className="text-sm text-gray-500 dark:text-gray-400">
              Theme Toggle →
            </span>
            <ThemeToggle />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 py-8">
        
        {/* Hero Section */}
        <div className="text-center mb-16 pt-8">
          <h1 className="text-5xl font-extrabold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-violet-500 to-pink-500">
            hodlCoin Staking Platform
          </h1>
          <p className="text-lg text-gray-500 dark:text-gray-400 max-w-3xl mx-auto mb-8 leading-relaxed">
            Self-Stabilizing Staking vaults where the price is mathematically proven to always increase!<br />
            Unstaking fees benefit vault creators and those who keep staking longer.
          </p>
          
          <h2 className="text-3xl font-bold mb-6">
            Choose the blockchain where you would like to stake:
          </h2>
          
          <div className="flex flex-wrap gap-4 justify-center">
            <button type="button" className="px-8 py-3 text-lg font-semibold rounded-lg border-none bg-gradient-to-r from-violet-500 to-pink-500 text-white cursor-pointer hover:opacity-90 transition-opacity">
              EVM Chains
            </button>
            <button type="button" className="px-8 py-3 text-lg font-semibold rounded-lg border-none bg-gradient-to-r from-violet-500 to-pink-500 text-white cursor-pointer hover:opacity-90 transition-opacity">
              Ergo
            </button>
            <button type="button" className="px-8 py-3 text-lg font-semibold rounded-lg border-none bg-gradient-to-r from-violet-500 to-pink-500 text-white cursor-pointer hover:opacity-90 transition-opacity">
              Alephium
            </button>
          </div>
        </div>

        {/* How HodlCoin Works */}
        <div className="mb-16">
          <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6">
            <h2 className="text-3xl font-bold mb-4">
              How hodlCoin Works
            </h2>
            <div className="h-1 w-20 bg-gradient-to-r from-violet-500 to-pink-500 rounded-sm mb-6" />
            
            <p className="text-base text-gray-500 dark:text-gray-400 mb-4 leading-relaxed">
              HodlCoin is a staking protocol that encourages staking ("hodling") assets for long periods of time. When hodling, users deposit coins of a given asset in a vault and receive a proportional amount of corresponding hodlCoins.
            </p>
            <p className="text-base text-gray-500 dark:text-gray-400 leading-relaxed">
              When unhodling, users must pay an unstaking fee that benefits the vault's creator and users who continue hodling longer. Moreover, anyone (especially vault creators) can distribute rewards to hodlers, to further incentivize hodling.
            </p>
          </div>
        </div>

        {/* Why HodlCoin Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-center">
            Why hodlCoin
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* For Vault Creators */}
            <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6">
              <h3 className="text-2xl font-semibold mb-2">
                For Vault Creators
              </h3>
              <div className="h-0.5 w-12 bg-gradient-to-r from-violet-500 to-pink-500 rounded-sm mb-5" />
              
              <ul className="list-none p-0 flex flex-col space-y-4">
                <li className="flex space-x-3">
                  <div className="w-2 h-2 rounded-full bg-violet-500 flex-shrink-0 mt-1.5" />
                  <div>
                    <h4 className="font-semibold mb-1">Reward your Loyal Tokenholders</h4>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Efficiently distribute rewards to all your tokenholders with a single transaction.</p>
                  </div>
                </li>
                <li className="flex space-x-3">
                  <div className="w-2 h-2 rounded-full bg-violet-500 flex-shrink-0 mt-1.5" />
                  <div>
                    <h4 className="font-semibold mb-1">Signal your Long-Term Commitment</h4>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Stake your own tokens in a vault with a high unstaking fee, to show your community that you are holding for the long run.</p>
                  </div>
                </li>
                <li className="flex space-x-3">
                  <div className="w-2 h-2 rounded-full bg-violet-500 flex-shrink-0 mt-1.5" />
                  <div>
                    <h4 className="font-semibold mb-1">Earn Unstaking Fees</h4>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Receive a portion of fees when users unstake early.</p>
                  </div>
                </li>
              </ul>
            </div>

            {/* For Stakers */}
            <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6">
              <h3 className="text-2xl font-semibold mb-2">
                For Stakers
              </h3>
              <div className="h-0.5 w-12 bg-gradient-to-r from-violet-500 to-pink-500 rounded-sm mb-5" />
              
              <ul className="list-none p-0 flex flex-col space-y-4">
                <li className="flex space-x-3">
                  <div className="w-2 h-2 rounded-full bg-violet-500 flex-shrink-0 mt-1.5" />
                  <div>
                    <h4 className="font-semibold mb-1">Earn from Others' Impatience</h4>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Benefit from unstaking fees paid by users who exit early.</p>
                  </div>
                </li>
                <li className="flex space-x-3">
                  <div className="w-2 h-2 rounded-full bg-violet-500 flex-shrink-0 mt-1.5" />
                  <div>
                    <h4 className="font-semibold mb-1">Long-Term Value Growth</h4>
                    <p className="text-sm text-gray-500 dark:text-gray-400">The price of the hodlCoin is mathematically guaranteed to grow w.r.t. the price of the underlying coin, if you hodl longer than others.</p>
                  </div>
                </li>
                <li className="flex space-x-3">
                  <div className="w-2 h-2 rounded-full bg-violet-500 flex-shrink-0 mt-1.5" />
                  <div>
                    <h4 className="font-semibold mb-1">Receive Rewards</h4>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Get additional rewards distributed by vault creators who want to incentivize staking.</p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}