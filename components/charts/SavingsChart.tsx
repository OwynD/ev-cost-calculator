'use client';

import React from 'react';
import { CalculationResults } from '@/types/calculator';
import { generateProjectionData } from '@/lib/utils/calculations';
import { MonthlyCostChart } from './MonthlyCostChart';
import { SavingsProjectionChart } from './SavingsProjectionChart';

interface SavingsChartProps {
  results: CalculationResults;
}

export default function SavingsChart({ results }: SavingsChartProps) {
  const projectionData = generateProjectionData(results.monthlySavings);
  const totalFiveYearSavings = results.monthlySavings * 12 * 5;

  return (
    <div className="space-y-4 sm:space-y-6">
      <MonthlyCostChart
        evCost={results.monthlyEVCost}
        petrolCost={results.monthlyPetrolCost}
      />
      <SavingsProjectionChart
        projectionData={projectionData}
        totalFiveYearSavings={totalFiveYearSavings}
      />
    </div>
  );
}
