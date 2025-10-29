import React from 'react';

export const PrinterIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
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
      d="M6.72 13.829c-.24.03-.48.062-.72.096m.72-.096a42.415 42.415 0 0110.56 0m-10.56 0L6.34 18m10.94-4.171c.24.03.48.062.72.096m-.72-.096L17.66 18m0 0l.229 2.523a1.125 1.125 0 01-1.12 1.227H7.231c-.662 0-1.18-.568-1.12-1.227L6.34 18m11.318 0c1.281.21 2.09 1.141 2.09 2.385V21c0 .552-.448 1-1 1H4.5c-.552 0-1-.448-1-1v-.615c0-1.243.809-2.175 2.09-2.385m11.318 0c-1.281-.21-2.09-.817-2.09-1.885v-1.666c0-1.068.809-1.675 2.09-1.885m-11.318 0c1.281-.21 2.09-.817 2.09-1.885v-1.666c0-1.068-.809-1.675-2.09-1.885" 
    />
  </svg>
);