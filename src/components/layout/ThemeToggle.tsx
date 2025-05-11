"use client";

import { useEffect, useState } from 'react';
import { Moon, Sun } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function ThemeToggle() {
  // Initialize theme state. The script in RootLayout handles initial class on <html>.
  // This component syncs its icon and localStorage.
  const [theme, setTheme] = useState<'light' | 'dark'>('light'); // Default to light
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true); // Indicates component is mounted on the client
    // Determine the actual theme
    const storedTheme = localStorage.getItem('theme') as 'light' | 'dark' | null;
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (storedTheme) {
      setTheme(storedTheme);
    } else {
      setTheme(prefersDark ? 'dark' : 'light');
    }
  }, []); // Runs once on client mount

  useEffect(() => {
    // This effect runs after `theme` state might have been updated by the first effect.
    // It ensures the <html> class and localStorage are in sync with the `theme` state.
    if (mounted) { // Only run after client has mounted and initial theme determined
      if (theme === 'dark') {
        document.documentElement.classList.add('dark');
        localStorage.setItem('theme', 'dark');
      } else {
        document.documentElement.classList.remove('dark');
        localStorage.setItem('theme', 'light');
      }
    }
  }, [theme, mounted]); // Re-run when theme or mounted status changes

  const toggleTheme = () => {
    setTheme(prevTheme => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  if (!mounted) {
    // On the server, and on the client before `mounted` is true (i.e., before useEffect runs).
    // Render a disabled button with an icon corresponding to the initial 'light' theme state.
    // This ensures server and client initial render are identical.
    return (
      <Button variant="ghost" size="icon" aria-label="Toggle theme" disabled>
        <Moon className="h-5 w-5" /> {/* Corresponds to initial 'light' theme state */}
      </Button>
    );
  }

  // Once mounted and theme is determined, render the interactive button with the correct icon
  return (
    <Button variant="ghost" size="icon" onClick={toggleTheme} aria-label="Toggle theme">
      {theme === 'light' ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
    </Button>
  );
}
