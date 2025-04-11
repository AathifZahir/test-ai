
import React from 'react';
import { Globe } from 'lucide-react';
import { Link } from 'react-router-dom';

const Logo = ({ size = 'md' }) => {
  const sizeClasses = {
    sm: 'text-xl',
    md: 'text-2xl',
    lg: 'text-3xl',
  };

  return (
    <Link to="/" className="flex items-center gap-2 hover:opacity-90 transition-opacity">
      <div className="relative">
        <Globe className="w-8 h-8 text-primary animate-spin-slow" />
        <div className="absolute inset-0 bg-gradient-to-r from-theme-blue to-theme-purple opacity-30 rounded-full blur-sm"></div>
      </div>
      <span className={`font-bold ${sizeClasses[size]} bg-clip-text text-transparent bg-gradient-to-r from-theme-blue to-theme-purple`}>
        GlobeWanderer
      </span>
    </Link>
  );
};

export default Logo;
