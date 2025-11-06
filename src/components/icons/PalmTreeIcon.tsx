import React from 'react';

export const PalmTreeIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
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
      d="M12 21V12m0 0a5.25 5.25 0 005.25-5.25H12m-5.25 5.25a5.25 5.25 0 015.25-5.25H12M12 12a5.25 5.25 0 00-5.25 5.25m5.25-5.25a5.25 5.25 0 01-5.25 5.25" 
    />
    <path 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      d="M3.75 6.75h16.5" 
    />
  </svg>
);