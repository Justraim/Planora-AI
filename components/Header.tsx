import React from 'react';
import { PaperAirplaneIcon } from './icons/PaperAirplaneIcon';

const Header: React.FC = () => {
  return (
    <header className="bg-white/50 backdrop-blur-lg border-b border-gray-200/50 sticky top-0 z-10 shadow-sm">
      <div className="container mx-auto px-4 py-4 flex items-center justify-center">
        <PaperAirplaneIcon className="h-8 w-8 text-blue-600 mr-3" />
        <h1 className="text-3xl font-bold text-gray-800 tracking-tight">
          AI Trip Planner
        </h1>
      </div>
    </header>
  );
};

export default Header;