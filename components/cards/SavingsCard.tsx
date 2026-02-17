import React from 'react';
import { formatCurrency } from '@/lib/utils/formatters';

interface SavingsCardProps {
  monthlySavings: number;
  annualSavings: number;
}

export function SavingsCard({ monthlySavings, annualSavings }: SavingsCardProps) {
  return (
    <div className="bg-gradient-to-br from-blue-500/90 via-blue-600/90 to-indigo-600/90 backdrop-blur-xl rounded-2xl p-4 sm:p-6 text-white shadow-2xl border border-white/20">
      <p className="text-xs sm:text-sm opacity-90 mb-1">Monthly Savings</p>
      <p className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-2">
        {formatCurrency(monthlySavings)}
      </p>
      <div className="h-px bg-white/40 my-2 sm:my-3 shadow-sm"></div>
      <p className="text-xs sm:text-sm opacity-90 mb-1">Annual Savings</p>
      <p className="text-xl sm:text-2xl lg:text-3xl font-bold">
        {formatCurrency(annualSavings)}
      </p>
    </div>
  );
}
