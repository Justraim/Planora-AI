import React from 'react';

export const RestaurantIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
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
      d="M12 21v-8m0 0c0-1.105.895-2 2-2s2 .895 2 2v8M12 13H10c-1.657 0-3-1.343-3-3V3" 
    />
    <path 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      d="M7 6H5m2 0h2m-2-3v3" 
    />
  </svg>
);
