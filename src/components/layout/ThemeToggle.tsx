import React from 'react';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';

interface ThemeToggleProps {
  showLabel?: boolean;
  className?: string;
}

export const ThemeToggle: React.FC<ThemeToggleProps> = ({ showLabel = false, className = '' }) => {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
      title={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
      className={`group relative inline-flex items-center space-x-1.5 px-2.5 py-1.5 rounded-full text-xs font-medium border transition-all duration-200 select-none ${
        isDark
          ? 'bg-navy-900 hover:bg-navy-850 text-slate-300 border-navy-700 hover:border-slate-600 shadow-sm'
          : 'bg-white hover:bg-slate-50 text-slate-700 border-slate-300 hover:border-slate-400 shadow-sm'
      } ${className}`}
    >
      <div className="relative w-4 h-4 flex items-center justify-center">
        {isDark ? (
          <Moon className="w-3.5 h-3.5 text-blue-400 transition-transform duration-200 group-hover:-rotate-12" />
        ) : (
          <Sun className="w-3.5 h-3.5 text-amber-500 transition-transform duration-200 group-hover:rotate-45" />
        )}
      </div>

      {showLabel && (
        <span className="font-medium text-[11px] sm:text-xs tracking-tight">
          {isDark ? 'Dark Mode' : 'Light Mode'}
        </span>
      )}
    </button>
  );
};
