
import React, { useState, useEffect } from 'react';
import { Sun, Moon, Palette } from 'lucide-react';

const themes = [
  { name: 'Light', value: 'light', icon: Sun },
  { name: 'Dark', value: 'dark', icon: Moon },
  { name: 'Blue', value: 'blue', icon: Palette },
  { name: 'Purple', value: 'purple', icon: Palette }
];

const ThemeSelector = () => {
  const [theme, setTheme] = useState('light');
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') || 'light';
    setTheme(savedTheme);
    document.documentElement.setAttribute('data-theme', savedTheme);
  }, []);

  const handleThemeChange = (newTheme) => {
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
    setIsOpen(false);
  };

  const ThemeIcon = themes.find(t => t.value === theme)?.icon || Sun;

  return (
    <div className="relative">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 rounded-full bg-secondary hover:bg-secondary/80 transition-colors"
        aria-label="Select theme"
      >
        <ThemeIcon className="w-5 h-5" />
      </button>
      
      {isOpen && (
        <div className="absolute right-0 top-full mt-2 bg-card border border-border p-2 rounded-md shadow-lg z-50 animate-fade-in">
          <div className="grid grid-cols-2 gap-2 w-48">
            {themes.map((t) => {
              const Icon = t.icon;
              return (
                <button
                  key={t.value}
                  className={`flex items-center gap-2 p-2 rounded-md transition-colors ${
                    theme === t.value 
                      ? 'bg-primary text-primary-foreground' 
                      : 'hover:bg-secondary'
                  }`}
                  onClick={() => handleThemeChange(t.value)}
                >
                  <Icon className="w-4 h-4" />
                  <span>{t.name}</span>
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default ThemeSelector;
