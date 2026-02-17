import React from 'react';

// Basic label component. Forwards className and other props to a label element.
export function Label({ className = '', children, ...props }) {
  return (
    <label className={className} {...props}>
      {children}
    </label>
  );
}