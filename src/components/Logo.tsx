import React from 'react';

const Logo: React.FC = () => {
  return (
    <div className="flex flex-col items-center">
      <div className="flex items-baseline">
        <span 
          className="text-4xl font-bold text-accent-soft tracking-tight italic" 
          style={{ fontFamily: "'Playfair Display', serif" }}
        >
          Itinerae
        </span>
        <span 
          className="text-4xl font-extrabold text-accent" 
          style={{ fontFamily: "'Inter', sans-serif", marginLeft: '4px' }}
        >
          AI
        </span>
      </div>
      <p 
        className="text-xs text-gray-400 tracking-widest mt-1 font-medium"
        style={{ fontFamily: "'Inter', sans-serif" }}
      >
        YOUR TRIP, YOUR WAY
      </p>
    </div>
  );
};

export default Logo;