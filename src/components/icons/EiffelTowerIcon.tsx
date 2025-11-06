import React from 'react';

export const EiffelTowerIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
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
      d="M12 21.75L9 12h6l-3 9.75z" 
    />
    <path 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      d="M10.5 12l-1.8-5.4A1.5 1.5 0 0110.2 4.5h3.6a1.5 1.5 0 011.5 2.1L13.5 12" 
    />
    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 12h7.5" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 9h4.5" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5V2.25" />
  </svg>
);