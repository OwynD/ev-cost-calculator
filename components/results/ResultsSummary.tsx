'use client';

import React from 'react';
import { CalculationResults } from '@/types/calculator';
import { CostCard } from '@/components/cards/CostCard';
import { SavingsCard } from '@/components/cards/SavingsCard';
import { PercentageSavingsCard } from '@/components/cards/PercentageSavingsCard';

interface ResultsSummaryProps {
  results: CalculationResults;
}

export default function ResultsSummary({ results }: ResultsSummaryProps) {
  const savingsPercentage = results.monthlyPetrolCost > 0
    ? (results.monthlySavings / results.monthlyPetrolCost) * 100
    : 0;

  const showPercentage = results.monthlyPetrolCost > 0 && isFinite(results.monthlySavings);

  return (
    <div className="space-y-3 sm:space-y-4">
      {/* Monthly Costs Comparison */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
        <CostCard
          title="Monthly EV Cost"
          monthlyCost={results.monthlyEVCost}
          costPerMile={results.evCostPerMile}
          variant="ev"
        />
        <CostCard
          title="Monthly Petrol Cost"
          monthlyCost={results.monthlyPetrolCost}
          costPerMile={results.petrolCostPerMile}
          variant="petrol"
        />
      </div>

      {/* Savings Card */}
      <SavingsCard
        monthlySavings={results.monthlySavings}
        annualSavings={results.annualSavings}
      />

      {/* Percentage Savings */}
      <PercentageSavingsCard
        percentage={savingsPercentage}
        visible={showPercentage}
      />
    </div>
  );
}
