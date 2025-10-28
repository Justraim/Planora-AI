import React from 'react';

export const TempleIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
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
            d="M2.25 21h19.5m-18-18v18m16.5-18v18m-1.5-18l-1.5 18m-12-18l1.5 18m7.5-18l-1.5 18M3 3h18" 
        />
        <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 2.25L3 8.25h18L12 2.25z"
        />
    </svg>
);
