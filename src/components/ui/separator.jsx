import React from 'react';

// Separator component. Renders a horizontal line. Accepts className for custom styling.
export function Separator({ className = '', ...props }) {
  return <div className={`w-full h-px bg-gray-300 dark:bg-zinc-800 ${className}`} {...props} />;
}