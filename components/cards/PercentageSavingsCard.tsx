import React from 'react';

interface PercentageSavingsCardProps {
  percentage: number;
  visible: boolean;
}

export function PercentageSavingsCard({ percentage, visible }: PercentageSavingsCardProps) {
  if (!visible) return null;

  return (
    <div className="bg-purple-50/60 backdrop-blur-xl border border-purple-200/30 rounded-2xl p-3 sm:p-4 shadow-lg">
      <p className="text-xs sm:text-sm text-purple-700 font-medium mb-1">You Save</p>
      <p className="text-2xl sm:text-3xl font-bold text-purple-900">
        {percentage.toFixed(1)}%
      </p>
      <p className="text-xs text-purple-600 mt-1">vs petrol costs</p>
    </div>
  );
}
