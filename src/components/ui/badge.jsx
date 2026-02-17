import React from 'react';

// A badge component with a pill shape and subtle border. Can be customised via
// className or inline styles. Provides a consistent appearance for labels
// such as expense categories or status indicators.
export function Badge({ className = '', style, children, ...props }) {
  return (
    <span
      className={`inline-flex items-center rounded-full border border-zinc-700 bg-zinc-800 px-2 py-0.5 text-xs font-medium text-zinc-200 ${className}`}
      style={style}
      {...props}
    >
      {children}
    </span>
  );
}