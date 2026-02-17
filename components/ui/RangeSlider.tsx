import React from 'react';

interface RangeSliderProps {
  label: string;
  value: number;
  onChange: (value: string) => void;
  min?: number;
  max?: number;
  leftLabel: string;
  rightLabel: string;
  className?: string;
}

export function RangeSlider({
  label,
  value,
  onChange,
  min = 0,
  max = 100,
  leftLabel,
  rightLabel,
  className = '',
}: RangeSliderProps) {
  return (
    <div className={className}>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        {label}
      </label>
      <div className="space-y-2">
        <input
          type="range"
          min={min}
          max={max}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full h-2 bg-gradient-to-r from-gray-200/80 to-gray-300/80 backdrop-blur-sm rounded-full appearance-none cursor-pointer accent-blue-500 shadow-inner"
        />
        <div className="flex justify-between text-sm">
          <span className="text-orange-600 font-medium">{leftLabel}</span>
          <span className="text-green-600 font-medium">{rightLabel}</span>
        </div>
      </div>
    </div>
  );
}
