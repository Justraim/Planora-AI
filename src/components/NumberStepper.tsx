import React from 'react';
import { MinusIcon } from './icons/MinusIcon';
import { PlusIcon } from './icons/PlusIcon';

interface Props {
  id: string;
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
}

const NumberStepper: React.FC<Props> = ({ id, value, onChange, min = 1, max }) => {
  const handleDecrement = () => {
    if (value > min) {
      onChange(value - 1);
    }
  };

  const handleIncrement = () => {
    if (max === undefined || value < max) {
      onChange(value + 1);
    }
  };

  return (
    <div className="flex items-center gap-2">
      <button
        type="button"
        onClick={handleDecrement}
        disabled={value <= min}
        className="p-2 rounded-full bg-gray-200 text-gray-700 hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        aria-label="Decrement"
      >
        <MinusIcon className="w-4 h-4" />
      </button>
      <input
        type="text" // Use text to display value without browser's default number controls
        id={id}
        name={id}
        value={value}
        readOnly // Make input read-only as changes are handled by buttons
        className="w-full text-center px-2 py-2 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
        aria-live="polite"
      />
      <button
        type="button"
        onClick={handleIncrement}
        disabled={max !== undefined && value >= max}
        className="p-2 rounded-full bg-gray-200 text-gray-700 hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        aria-label="Increment"
      >
        <PlusIcon className="w-4 h-4" />
      </button>
    </div>
  );
};

export default NumberStepper;
