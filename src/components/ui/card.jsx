import React from 'react';

// Simple Card wrapper component. Applies any passed className and style to a div.
export function Card({ className = '', style, children, ...props }) {
  return (
    <div className={className} style={style} {...props}>
      {children}
    </div>
  );
}

// CardContent is just a div wrapper for card body.
export function CardContent({ className = '', children, ...props }) {
  return (
    <div className={className} {...props}>
      {children}
    </div>
  );
}