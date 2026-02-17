import React from 'react';
import { formatCurrency } from '@/lib/utils/formatters';

interface CostCardProps {
  title: string;
  monthlyCost: number;
  costPerMile: number;
  variant: 'ev' | 'petrol';
}

export function CostCard({ title, monthlyCost, costPerMile, variant }: CostCardProps) {
  const styles = {
    ev: {
      background: 'bg-green-50/60',
      border: 'border-green-200/30',
      titleColor: 'text-green-700',
      valueColor: 'text-green-900',
      subtextColor: 'text-green-600',
    },
    petrol: {
      background: 'bg-red-50/60',
      border: 'border-red-200/30',
      titleColor: 'text-red-700',
      valueColor: 'text-red-900',
      subtextColor: 'text-red-600',
    },
  };

  const style = styles[variant];

  return (
    <div className={`${style.background} backdrop-blur-xl border ${style.border} rounded-2xl p-3 sm:p-4 shadow-lg`}>
      <p className={`text-xs sm:text-sm ${style.titleColor} font-semibold mb-1`}>{title}</p>
      <p className={`text-xl sm:text-2xl font-bold ${style.valueColor}`}>
        {formatCurrency(monthlyCost)}
      </p>
      <p className={`text-xs ${style.subtextColor} mt-1`}>
        {formatCurrency(costPerMile)}/mile
      </p>
    </div>
  );
}
