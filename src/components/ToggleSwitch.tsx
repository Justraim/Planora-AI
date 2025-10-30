import React from 'react';

interface Props {
  enabled: boolean;
  onChange: (enabled: boolean) => void;
  ariaLabel?: string;
}

const ToggleSwitch: React.FC<Props> = ({ enabled, onChange, ariaLabel }) => {
  return (
    <label htmlFor="toggle" className="flex items-center cursor-pointer">
      <div className="relative">
        <input
          id="toggle"
          type="checkbox"
          className="sr-only"
          checked={enabled}
          onChange={() => onChange(!enabled)}
          aria-label={ariaLabel}
        />
        <div className="toggle-bg bg-surface border-2 border-border h-6 w-11 rounded-full transition-colors ease-in-out duration-200"></div>
      </div>
    </label>
  );
};

export default ToggleSwitch;
