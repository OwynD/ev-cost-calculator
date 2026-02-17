'use client';

import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { Card, CardHeader, CardContent } from '@/components/ui';
import { CHART_CONFIG } from '@/lib/constants';

interface MonthlyCostChartProps {
  evCost: number;
  petrolCost: number;
}

export function MonthlyCostChart({ evCost, petrolCost }: MonthlyCostChartProps) {
  const data = [
    {
      name: 'Monthly Cost',
      EV: evCost,
      Petrol: petrolCost,
    },
  ];

  return (
    <Card>
      <CardHeader>
        <h3 className="text-lg sm:text-xl font-bold text-gray-900">Monthly Cost Comparison</h3>
      </CardHeader>
      <CardContent className="pt-0">
        <ResponsiveContainer width="100%" height={CHART_CONFIG.BAR_CHART_HEIGHT}>
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" tick={{ fontSize: 12 }} />
            <YAxis
              label={{ value: 'Cost (£)', angle: -90, position: 'insideLeft', style: { fontSize: 12 } }}
              tick={{ fontSize: 12 }}
            />
            <Tooltip formatter={(value: number) => `£${value.toFixed(2)}`} />
            <Legend wrapperStyle={{ fontSize: '14px' }} />
            <Bar dataKey="EV" fill={CHART_CONFIG.COLORS.EV} name="EV Cost" />
            <Bar dataKey="Petrol" fill={CHART_CONFIG.COLORS.PETROL} name="Petrol Cost" />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
