// components/ThemeProvider.js
'use client';
import { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  const [isDark, setIsDark] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Check for saved theme preference or default to light
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    // Use saved theme if available, otherwise use system preference
    const shouldBeDark = savedTheme === 'dark' || (!savedTheme && prefersDark);
    setIsDark(shouldBeDark);
    applyTheme(shouldBeDark);
  }, []);

  const applyTheme = (dark) => {
    const root = document.documentElement;
    if (dark) {
      // Dark theme colors
      root.style.setProperty('--bg-color', '#0F172A'); // Darker background
      root.style.setProperty('--text-color', '#F1F5F9'); // Lighter text
      root.style.setProperty('--card-bg', '#1E293B'); // Dark cards
      root.style.setProperty('--border-color', '#334155'); // Dark borders
      root.style.setProperty('--secondary-bg', '#1E293B'); // Secondary background
      root.style.setProperty('--accent-bg', '#334155'); // Accent background
      root.style.setProperty('--light-bg', '#475569'); // Light background (for hover states)
      root.style.setProperty('--hover-bg', '#475569'); // Hover background
      root.style.setProperty('--primary-color', '#3B82F6'); // Primary blue
      root.style.setProperty('--primary-hover', '#2563EB'); // Darker blue on hover
      root.style.setProperty('--success-color', '#10B981'); // Success green
      root.style.setProperty('--error-color', '#EF4444'); // Error red
      root.style.setProperty('--warning-color', '#F59E0B'); // Warning yellow
      root.style.setProperty('--info-color', '#06B6D4'); // Info cyan
    } else {
      // Light theme colors
      root.style.setProperty('--bg-color', '#FFFFFF');
      root.style.setProperty('--text-color', '#1F2937');
      root.style.setProperty('--card-bg', '#FFFFFF');
      root.style.setProperty('--border-color', '#E5E7EB');
      root.style.setProperty('--secondary-bg', '#F9FAFB');
      root.style.setProperty('--accent-bg', '#F3F4F6');
      root.style.setProperty('--light-bg', '#F9FAFB');
      root.style.setProperty('--hover-bg', '#F3F4F6');
      root.style.setProperty('--primary-color', '#3B82F6');
      root.style.setProperty('--primary-hover', '#2563EB');
      root.style.setProperty('--success-color', '#10B981');
      root.style.setProperty('--error-color', '#EF4444');
      root.style.setProperty('--warning-color', '#F59E0B');
      root.style.setProperty('--info-color', '#06B6D4');
    }
    
    // Update meta theme-color for mobile browsers
    const themeColorMeta = document.querySelector('meta[name="theme-color"]');
    if (themeColorMeta) {
      themeColorMeta.content = dark ? '#0F172A' : '#FFFFFF';
    }
  };

  const toggleTheme = () => {
    const newTheme = !isDark;
    setIsDark(newTheme);
    applyTheme(newTheme);
    localStorage.setItem('theme', newTheme ? 'dark' : 'light');
  };

  // Prevent flash of incorrect theme
  if (!mounted) return null;

  return (
    <ThemeContext.Provider value={{ isDark, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}