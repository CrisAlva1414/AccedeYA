import React from "react";

type AccessibilityLevel = "high" | "medium" | "low" | "none";

interface AccessibilityIconProps {
  level: AccessibilityLevel;
  size?: "sm" | "md" | "lg";
  showLabel?: boolean;
}

const AccessibilityIcon = ({ level, size = "md", showLabel = false }: AccessibilityIconProps) => {
  const sizeClasses = {
    sm: "w-4 h-4",
    md: "w-6 h-6",
    lg: "w-8 h-8",
  };
  
  const containerClasses = `inline-flex items-center justify-center rounded-full p-1 accessibility-${level}`;
  const iconSize = sizeClasses[size];
  
  const labels = {
    high: "Alto",
    medium: "Medio",
    low: "Bajo",
    none: "No Accesible",
  };

  return (
    <div className="flex items-center gap-1">
      <div className={containerClasses}>
        <svg 
          className={iconSize} 
          xmlns="http://www.w3.org/2000/svg" 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="2" 
          strokeLinecap="round" 
          strokeLinejoin="round"
        >
          <circle cx="12" cy="7" r="4" />
          <path d="M14 13.1a8.8 8.8 0 0 1 4 6.9" />
          <path d="M6 13.1a8.8 8.8 0 0 0-4 6.9" />
          <path d="m16 16-4 4-4-4" />
        </svg>
      </div>
      {showLabel && (
        <span className={`font-medium accessibility-${level} px-2 py-1 rounded-full text-xs`}>
          {labels[level]}
        </span>
      )}
    </div>
  );
};

export default AccessibilityIcon;
