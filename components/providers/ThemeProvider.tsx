'use client'

/**
 * ThemeProvider Component
 * Wraps the app with next-themes for light/dark mode support
 * Handles system preference detection, localStorage persistence, and SSR
 */

import { ThemeProvider as NextThemesProvider } from 'next-themes'
import { type ThemeProviderProps } from 'next-themes'

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>
}
