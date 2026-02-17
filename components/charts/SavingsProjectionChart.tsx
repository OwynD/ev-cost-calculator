'use client';

import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { Card, CardHeader, CardContent } from '@/components/ui';
import { CHART_CONFIG } from '@/lib/constants';
import { ProjectionData } from '@/types/calculator';

interface SavingsProjectionChartProps {
  projectionData: ProjectionData[];
  totalFiveYearSavings: number;
}

export function SavingsProjectionChart({ projectionData, totalFiveYearSavings }: SavingsProjectionChartProps) {
  return (
    <Card>
      <CardHeader>
        <h3 className="text-lg sm:text-xl font-bold text-gray-900">5-Year Cumulative Savings</h3>
      </CardHeader>
      <CardContent className="pt-0">
        <ResponsiveContainer width="100%" height={CHART_CONFIG.LINE_CHART_HEIGHT}>
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
              stroke={CHART_CONFIG.COLORS.SAVINGS}
              strokeWidth={3}
              name="Cumulative Savings"
              dot={{ fill: CHART_CONFIG.COLORS.SAVINGS, r: 6 }}
            />
          </LineChart>
        </ResponsiveContainer>
        <div className="mt-3 sm:mt-4 text-center">
          <p className="text-xs sm:text-sm text-gray-600">
            Total savings after 5 years:{' '}
            <span className="font-bold text-blue-600 text-sm sm:text-base lg:text-lg">
              £{totalFiveYearSavings.toFixed(2)}
            </span>
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
