import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import { Sun, Moon } from 'lucide-react';

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <button
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      className="p-2 text-sm transition-all duration-500 ease-in-out transform hover:scale-110"
      aria-label="Toggle Dark Mode"
    >
      {theme === 'dark' ? (
        <Sun className="h-6 w-6 text-yellow-500 animate-spin" />
      ) : (
        <Moon className="h-6 w-6 text-blue-600 animate-pulse" />
      )}
    </button>
  );
}
