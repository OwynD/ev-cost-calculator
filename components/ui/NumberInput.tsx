import React from 'react';

interface NumberInputProps {
  label: string;
  value: string | number;
  onChange: (value: string) => void;
  onBlur?: () => void;
  onFocus?: (e: React.FocusEvent<HTMLInputElement>) => void;
  min?: number;
  step?: number;
  placeholder?: string;
  hint?: string;
  className?: string;
}

export function NumberInput({
  label,
  value,
  onChange,
  onBlur,
  onFocus,
  min = 0,
  step = 0.01,
  placeholder,
  hint,
  className = '',
}: NumberInputProps) {
  return (
    <div className={className}>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        {label}
      </label>
      <input
        type="number"
        min={min}
        step={step}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onBlur={onBlur}
        onFocus={onFocus}
        placeholder={placeholder}
        className="w-full px-4 py-2 bg-white/50 backdrop-blur-sm border border-gray-200/50 rounded-xl focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 focus:bg-white/80 text-gray-900 font-medium transition-all duration-200 shadow-sm"
      />
      {hint && (
        <p className="text-xs text-gray-500 mt-1">{hint}</p>
      )}
    </div>
  );
}
