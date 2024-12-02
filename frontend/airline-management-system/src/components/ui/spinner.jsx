import React from 'react';

export function Spinner({ className, ...props }) {
  return (
    <div
      className={`animate-spin rounded-full border-2 border-current border-t-transparent text-primary h-4 w-4 ${className}`}
      {...props}
    >
      <span className="sr-only">Loading...</span>
    </div>
  );
}