'use client';

import React from 'react';
import { CalculationResults } from '@/types/calculator';
import { formatCurrency } from '@/utils/calculations';

interface ResultsSummaryProps {
  results: CalculationResults;
}

export default function ResultsSummary({ results }: ResultsSummaryProps) {
  return (
    <div className="space-y-3 sm:space-y-4">
      {/* Monthly Costs Comparison */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
        <div className="bg-green-50 border-2 border-green-200 rounded-lg p-3 sm:p-4">
          <p className="text-xs sm:text-sm text-green-700 font-medium mb-1">Monthly EV Cost</p>
          <p className="text-xl sm:text-2xl font-bold text-green-900">
            {formatCurrency(results.monthlyEVCost)}
          </p>
          <p className="text-xs text-green-600 mt-1">
            {formatCurrency(results.evCostPerMile)}/mile
          </p>
        </div>

        <div className="bg-red-50 border-2 border-red-200 rounded-lg p-3 sm:p-4">
          <p className="text-xs sm:text-sm text-red-700 font-medium mb-1">Monthly Petrol Cost</p>
          <p className="text-xl sm:text-2xl font-bold text-red-900">
            {formatCurrency(results.monthlyPetrolCost)}
          </p>
          <p className="text-xs text-red-600 mt-1">
            {formatCurrency(results.petrolCostPerMile)}/mile
          </p>
        </div>
      </div>

      {/* Savings Cards */}
      <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg p-4 sm:p-6 text-white shadow-lg">
        <p className="text-xs sm:text-sm opacity-90 mb-1">Monthly Savings</p>
        <p className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-2">
          {formatCurrency(results.monthlySavings)}
        </p>
        <div className="h-px bg-white opacity-30 my-2 sm:my-3"></div>
        <p className="text-xs sm:text-sm opacity-90 mb-1">Annual Savings</p>
        <p className="text-xl sm:text-2xl lg:text-3xl font-bold">
          {formatCurrency(results.annualSavings)}
        </p>
      </div>

      {/* Savings Percentage */}
      {results.monthlyPetrolCost > 0 && isFinite(results.monthlySavings) && (
        <div className="bg-purple-50 border-2 border-purple-200 rounded-lg p-3 sm:p-4">
          <p className="text-xs sm:text-sm text-purple-700 font-medium mb-1">You Save</p>
          <p className="text-2xl sm:text-3xl font-bold text-purple-900">
            {((results.monthlySavings / results.monthlyPetrolCost) * 100).toFixed(1)}%
          </p>
          <p className="text-xs text-purple-600 mt-1">vs petrol costs</p>
        </div>
      )}
    </div>
  );
}
