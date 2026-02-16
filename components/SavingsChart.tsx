'use client';

import React from 'react';
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { CalculationResults } from '@/types/calculator';
import { generateProjectionData } from '@/utils/calculations';

interface SavingsChartProps {
  results: CalculationResults;
}

export default function SavingsChart({ results }: SavingsChartProps) {
  // Data for monthly cost comparison bar chart
  const monthlyComparisonData = [
    {
      name: 'Monthly Cost',
      EV: results.monthlyEVCost,
      Petrol: results.monthlyPetrolCost,
    },
  ];

  // Data for 5-year savings projection
  const projectionData = generateProjectionData(results.monthlySavings);

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Monthly Cost Comparison Bar Chart */}
      <div className="bg-white rounded-lg shadow-md p-4 sm:p-6">
        <h3 className="text-lg sm:text-xl font-bold text-gray-800 mb-3 sm:mb-4">Monthly Cost Comparison</h3>
        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={monthlyComparisonData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" tick={{ fontSize: 12 }} />
            <YAxis label={{ value: 'Cost (£)', angle: -90, position: 'insideLeft', style: { fontSize: 12 } }} tick={{ fontSize: 12 }} />
            <Tooltip formatter={(value: number) => `£${value.toFixed(2)}`} />
            <Legend wrapperStyle={{ fontSize: '14px' }} />
            <Bar dataKey="EV" fill="#10b981" name="EV Cost" />
            <Bar dataKey="Petrol" fill="#ef4444" name="Petrol Cost" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* 5-Year Savings Projection Line Chart */}
      <div className="bg-white rounded-lg shadow-md p-4 sm:p-6">
        <h3 className="text-lg sm:text-xl font-bold text-gray-800 mb-3 sm:mb-4">5-Year Cumulative Savings</h3>
        <ResponsiveContainer width="100%" height={250}>
          <LineChart data={projectionData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis 
              dataKey="year" 
              label={{ value: 'Year', position: 'insideBottom', offset: -5, style: { fontSize: 12 } }}
              tick={{ fontSize: 12 }}
            />
            <YAxis 
              label={{ value: 'Savings (£)', angle: -90, position: 'insideLeft', style: { fontSize: 12 } }}
              tick={{ fontSize: 12 }}
            />
            <Tooltip formatter={(value: number) => `£${value.toFixed(2)}`} />
            <Legend wrapperStyle={{ fontSize: '14px' }} />
            <Line
              type="monotone"
              dataKey="savings"
              stroke="#3b82f6"
              strokeWidth={3}
              name="Cumulative Savings"
              dot={{ fill: '#3b82f6', r: 6 }}
            />
          </LineChart>
        </ResponsiveContainer>
        <div className="mt-3 sm:mt-4 text-center">
          <p className="text-xs sm:text-sm text-gray-600">
            Total savings after 5 years:{' '}
            <span className="font-bold text-blue-600 text-sm sm:text-base lg:text-lg">
              £{(results.monthlySavings * 12 * 5).toFixed(2)}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}
