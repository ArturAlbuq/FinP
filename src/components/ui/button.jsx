import React from 'react';

// A button component with sensible default styling. It still forwards any
// additional props and allows overriding styles via className. The default
// styles aim to resemble the original design: dark background, subtle border,
// and appropriate padding. Disabled buttons show reduced opacity.
export function Button({ className = '', children, type = 'button', ...props }) {
  return (
    <button
      type={type}
      className={`inline-flex items-center justify-center rounded-md border border-zinc-800 bg-zinc-900 px-3 py-2 text-sm font-medium text-white hover:bg-zinc-800 focus:outline-none focus:ring-2 focus:ring-zinc-600 disabled:opacity-50 disabled:pointer-events-none ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}