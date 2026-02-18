import { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

export const ThemeProvider = ({ children }) => {
  const [isDark, setIsDark] = useState(() => {
    // Check localStorage first, then system preference
    const saved = localStorage.getItem('admin-theme');
    if (saved) return saved === 'dark';
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  useEffect(() => {
    localStorage.setItem('admin-theme', isDark ? 'dark' : 'light');
    // Update document class for global styles
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDark]);

  const toggleTheme = () => setIsDark(!isDark);

  // KRAFO Brand Colors
  const theme = {
    isDark,
    toggleTheme,
    colors: {
      // Primary brand color - Orange
      primary: '#F2600B',
      primaryHover: '#E55500',
      primaryLight: 'rgba(242, 96, 11, 0.1)',
      primaryGlow: 'rgba(242, 96, 11, 0.4)',
      
      // Backgrounds
      bg: isDark ? '#0a0a0a' : '#f8fafc',
      bgSecondary: isDark ? '#111111' : '#ffffff',
      bgTertiary: isDark ? '#1a1a1a' : '#f1f5f9',
      bgCard: isDark ? '#141414' : '#ffffff',
      bgHover: isDark ? '#1f1f1f' : '#f1f5f9',
      
      // Sidebar
      sidebarBg: isDark 
        ? 'linear-gradient(180deg, #0d0d0d 0%, #1a0a00 100%)' 
        : 'linear-gradient(180deg, #1e293b 0%, #0f172a 100%)',
      sidebarBgSolid: isDark ? '#0d0d0d' : '#1e293b',
      
      // Text
      text: isDark ? '#ffffff' : '#0f172a',
      textSecondary: isDark ? '#a1a1aa' : '#64748b',
      textMuted: isDark ? '#71717a' : '#94a3b8',
      
      // Borders
      border: isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)',
      borderLight: isDark ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.05)',
      
      // Status colors
      success: '#22c55e',
      successBg: isDark ? 'rgba(34, 197, 94, 0.1)' : 'rgba(34, 197, 94, 0.1)',
      error: '#ef4444',
      errorBg: isDark ? 'rgba(239, 68, 68, 0.1)' : 'rgba(239, 68, 68, 0.1)',
      warning: '#f59e0b',
      warningBg: isDark ? 'rgba(245, 158, 11, 0.1)' : 'rgba(245, 158, 11, 0.1)',
      info: '#3b82f6',
      infoBg: isDark ? 'rgba(59, 130, 246, 0.1)' : 'rgba(59, 130, 246, 0.1)',
    },
  };

  return (
    <ThemeContext.Provider value={theme}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeContext;
