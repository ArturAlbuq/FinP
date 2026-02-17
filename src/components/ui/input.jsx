import React from 'react';

// A styled input component that occupies full width by default and uses
// dark theme styling similar to the original FinP design. Additional
// classes can be supplied via className to further customise the input.
export function Input({ className = '', ...props }) {
  return (
    <input
      className={`flex h-10 w-full rounded-md border border-zinc-800 bg-zinc-950 px-3 py-2 text-sm text-white placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-zinc-600 focus:border-zinc-600 disabled:opacity-50 disabled:pointer-events-none ${className}`}
      {...props}
    />
  );
}