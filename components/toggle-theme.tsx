'use client'

import * as React from 'react'
import { Moon, Sun } from 'lucide-react'
import { useTheme } from 'next-themes'

/**
 * Render a clickable theme toggle that switches the app between light and dark modes.
 *
 * The control reflects the resolved theme (preferring `resolvedTheme` over `theme`) and shows a non-interactive placeholder until the component is mounted on the client. Clicking the control toggles the active theme between `light` and `dark`.
 *
 * @returns A JSX element that visually represents the theme toggle and handles user interaction to switch themes.
 */
export function ModeToggle() {
  const { theme, setTheme, resolvedTheme } = useTheme()
  const [mounted, setMounted] = React.useState(false)

  // useEffect only runs on the client, so now we can safely show the UI
  React.useEffect(() => {
    setMounted(true)
  }, [])

  function toggleTheme() {
    // Use resolvedTheme to get the actual theme value (light/dark), not 'system'
    const currentTheme = resolvedTheme || theme
    const newTheme = currentTheme === 'light' ? 'dark' : 'light'
    setTheme(newTheme)
  }

  // Use resolvedTheme to get the actual theme value (light/dark), not 'system'
  // Wait for both mounted and resolvedTheme to be available
  const currentTheme = resolvedTheme || theme
  const isReady = mounted && resolvedTheme !== undefined

  if (!isReady) {
    return (
      <div
        className="flex items-center space-x-4"
        aria-label="Toggle theme"
        role="button"
      >
        <div className="flex items-center w-20 h-10 rounded-full bg-gray-300 relative p-1 cursor-pointer transition-colors">
          <div className="w-8 h-8 rounded-full shadow-md bg-white"></div>
          <Sun
            className="absolute left-2 top-1/2 transform -translate-y-1/2 opacity-100"
            size={24}
            color="orange"
          />
          <Moon
            className="absolute right-2 top-1/2 transform -translate-y-1/2 opacity-0"
            size={24} 
            color="yellow"
          />
        </div>
      </div>
    )
  }

  return (
    <div
      className="flex items-center space-x-4"
      onClick={toggleTheme}
      aria-label="Toggle theme"
      role="button"
    >
      <div className="flex items-center w-20 h-10 rounded-full bg-gray-300 dark:bg-gray-600 relative p-1 cursor-pointer transition-colors active:scale-95">
        <div
          className={`w-8 h-8 rounded-full shadow-md transform transition-transform duration-300 ease-in-out ${
            currentTheme === 'light'
              ? 'translate-x-0 bg-white'
              : 'translate-x-10 bg-black'
          }`}
        ></div>

        <Sun
          className={`absolute left-2 top-1/2 transform -translate-y-1/2 transition-opacity duration-300 ease-in-out ${
            currentTheme === 'light' ? 'opacity-100' : 'opacity-0'
          }`}
          size={24}
          color="orange"
        />
        <Moon
          className={`absolute right-2 top-1/2 transform -translate-y-1/2 transition-opacity duration-300 ease-in-out ${
            currentTheme === 'light' ? 'opacity-0' : 'opacity-100'
          }`}
          size={24} 
          color="yellow"
        />
      </div>
    </div>
  )
}