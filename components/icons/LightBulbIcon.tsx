import React from 'react';

export const LightBulbIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
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
      d="M12 18v-5.25m0 0a6.01 6.01 0 001.5-11.39A6.01 6.01 0 006 11.25m6-5.25a6.01 6.01 0 015.137 2.868M12 18a2.25 2.25 0 01-2.25-2.25V6.75A2.25 2.25 0 0112 4.5m0 13.5a2.25 2.25 0 002.25-2.25V6.75a2.25 2.25 0 00-2.25-2.25M12 4.5A2.25 2.25 0 009.75 6.75v9.5A2.25 2.25 0 0012 18.5z" 
    />
  </svg>
);
