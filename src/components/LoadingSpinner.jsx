
import React from 'react';

const LoadingSpinner = ({ variant = "default", size = "md", className = "" }) => {
  const sizeClasses = {
    sm: "h-4 w-4",
    md: "h-8 w-8",
    lg: "h-12 w-12",
    xl: "h-16 w-16"
  };
  
  const variants = {
    default: (
      <div className={`animate-spin rounded-full border-b-2 border-primary ${sizeClasses[size]} ${className}`}></div>
    ),
    dots: (
      <div className={`flex space-x-1 ${className}`}>
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className={`bg-primary rounded-full ${size === "sm" ? "h-1.5 w-1.5" : size === "lg" ? "h-3 w-3" : size === "xl" ? "h-4 w-4" : "h-2 w-2"}`}
            style={{ animationDelay: `${i * 0.15}s` }}
          ></div>
        ))}
      </div>
    ),
    pulse: (
      <div className={`flex justify-center items-center ${className}`}>
        <div className={`animate-pulse rounded-full bg-primary ${sizeClasses[size]}`}></div>
      </div>
    ),
    bounce: (
      <div className={`flex gap-1 ${className}`}>
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className={`bg-primary rounded-full animate-bounce ${size === "sm" ? "h-1.5 w-1.5" : size === "lg" ? "h-3 w-3" : size === "xl" ? "h-4 w-4" : "h-2 w-2"}`}
            style={{ animationDelay: `${i * 0.1}s` }}
          ></div>
        ))}
      </div>
    ),
    globe: (
      <div className={`relative ${className}`}>
        <div className={`animate-spin-slow rounded-full border border-primary border-opacity-20 ${sizeClasses[size]}`}>
          <div className="absolute top-0 right-0 w-3 h-3 rounded-full bg-primary"></div>
        </div>
        <div className={`absolute inset-0 rounded-full border-t-2 border-primary animate-spin ${sizeClasses[size]}`}></div>
      </div>
    )
  };

  return (
    <div className="flex justify-center items-center">
      {variants[variant]}
    </div>
  );
};

export default LoadingSpinner;
