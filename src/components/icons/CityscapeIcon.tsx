import React from 'react';

export const CityscapeIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
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
      d="M2.25 21h19.5m-18-18v18m16.5-18v18m-1.5-18h-12a2.25 2.25 0 00-2.25 2.25v15.75m14.25 0v-15.75a2.25 2.25 0 012.25-2.25H21" 
    />
    <path 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      d="M7.5 12h.008v.008H7.5V12zm3 0h.008v.008H10.5V12zm3 0h.008v.008H13.5V12zm-3-3h.008v.008H10.5V9zm3 0h.008v.008H13.5V9zm-3-3h.008v.008H10.5V6zm3 0h.008v.008H13.5V6z"
    />
  </svg>
);