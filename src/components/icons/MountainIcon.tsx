import React from 'react';

export const MountainIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    fill="none" 
    viewBox="0 0 24 24" 
    strokeWidth={1.5} 
    stroke="currentColor" 
    {...props}
  >
    <path 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      d="m2.25 12.093 4.026 1.838 4.026-1.838-2.25-1.026-2.25 1.026-4.026-1.838 2.25-1.026 4.026 1.838 2.25 1.026 2.25-1.026 4.026-1.838 2.25 1.026L21.75 12.093l-4.026 1.838-4.026-1.838-2.25 1.026-2.25-1.026-4.026 1.838z"
    />
     <path 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      d="m12 14.25 4.026 1.838L12 18.25l-4.026-2.162z"
    />
  </svg>
);