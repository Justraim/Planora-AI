import React from 'react';

const Logo: React.FC = () => {
  return (
    <div className="flex flex-col items-center font-sans">
      <div className="flex items-end">
        <span className="font-serif italic text-4xl text-primary" style={{ fontFamily: "'Playfair Display', serif" }}>
          Itinerae
        </span>
        <span className="font-sans font-bold text-4xl text-teal-500 ml-1 leading-none">
          AI
        </span>
      </div>
      <p className="text-xs font-medium text-secondary tracking-[0.2em] mt-1">
        YOUR TRIP, YOUR WAY
      </p>
    </div>
  );
};

export default Logo;
