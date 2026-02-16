'use client';

import React, { useState, useEffect } from 'react';
import InputForm from '@/components/InputForm';
import ResultsSummary from '@/components/ResultsSummary';
import SavingsChart from '@/components/SavingsChart';
import { UserInputs } from '@/types/calculator';
import { calculateCosts, getDefaultInputs } from '@/utils/calculations';

const STORAGE_KEY = 'ev-calculator-inputs';

export default function Home() {
  const [inputs, setInputs] = useState<UserInputs>(getDefaultInputs());
  const [mounted, setMounted] = useState(false);

  // Load from localStorage on mount
  useEffect(() => {
    setMounted(true);
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        const parsedInputs = JSON.parse(stored);
        setInputs(parsedInputs);
      } catch (error) {
        console.error('Failed to parse stored inputs:', error);
      }
    }
  }, []);

  // Save to localStorage whenever inputs change
  useEffect(() => {
    if (mounted) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(inputs));
    }
  }, [inputs, mounted]);

  const results = calculateCosts(inputs);

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
          <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900">
            ⚡ EV Charging Cost & Savings Calculator
          </h1>
          <p className="mt-1 sm:mt-2 text-sm sm:text-base text-gray-600">
            Compare your Tesla charging costs vs a petrol car
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 py-4 sm:py-6 lg:py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
          {/* Left Column - Input Form */}
          <div className="lg:col-span-1">
            <InputForm inputs={inputs} onInputsChange={setInputs} />
          </div>

          {/* Right Column - Results and Charts */}
          <div className="lg:col-span-2 space-y-6">
            {/* Results Summary Cards */}
            <ResultsSummary results={results} />

            {/* Charts */}
            <SavingsChart results={results} />
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-6 sm:mt-8 lg:mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
          <p className="text-center text-xs sm:text-sm text-gray-500">
            All calculations are estimates. Actual costs may vary based on driving habits and charging patterns.
          </p>
        </div>
      </footer>
    </main>
  );
}
