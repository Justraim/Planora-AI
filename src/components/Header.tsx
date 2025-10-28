import React from 'react';
import Logo from './Logo';

interface Props {
  onLogoClick: () => void;
}

const Header: React.FC<Props> = ({ onLogoClick }) => {
  return (
    <header className="bg-white/50 backdrop-blur-lg border-b border-gray-200/50 sticky top-0 z-10 shadow-sm">
      <div className="container mx-auto px-4 py-4 flex items-center justify-center">
        <button onClick={onLogoClick} aria-label="Go to homepage">
          <Logo />
        </button>
      </div>
    </header>
  );
};

export default Header;
