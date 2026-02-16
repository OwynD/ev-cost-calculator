'use client';

import React, { useState, useEffect } from 'react';
import { UserInputs } from '@/types/calculator';

interface InputFormProps {
  inputs: UserInputs;
  onInputsChange: (inputs: UserInputs) => void;
}

export default function InputForm({ inputs, onInputsChange }: InputFormProps) {
  // Keep track of string values for each field to preserve user input like "0." or "0.0"
  const [fieldValues, setFieldValues] = useState<Record<string, string>>({});

  const handleChange = (field: keyof UserInputs, value: string) => {
    // Store the raw string value for display
    setFieldValues(prev => ({ ...prev, [field]: value }));
    
    // Allow empty string and convert to 0 for calculations
    if (value === '') {
      onInputsChange({ ...inputs, [field]: 0 });
      return;
    }
    
    const numValue = parseFloat(value);
    if (!isNaN(numValue) && numValue >= 0) {
      onInputsChange({ ...inputs, [field]: numValue });
    }
  };

  const handleBlur = (field: keyof UserInputs) => {
    // Clear the string value when field loses focus
    setFieldValues(prev => {
      const next = { ...prev };
      delete next[field];
      return next;
    });
  };

  const getDisplayValue = (field: keyof UserInputs) => {
    // Use string value if user is currently editing, otherwise use the numeric value
    if (field in fieldValues) {
      return fieldValues[field];
    }
    return inputs[field] || '';
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-4 sm:p-6">
      <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-4 sm:mb-6">Your Details</h2>
      
      <div className="space-y-4 sm:space-y-5">
        {/* Electricity Cost */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Home Electricity Cost (£/kWh)
          </label>
          <input
            type="number"
            min="0"
            step="0.01"
            value={getDisplayValue('electricityCost')}
            onChange={(e) => handleChange('electricityCost', e.target.value)}
            onBlur={() => handleBlur('electricityCost')}
            onFocus={(e) => e.target.select()}
            placeholder="0.07"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 font-medium"
          />
        </div>

        {/* Public Charging Cost */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Public Charging Cost (£/kWh)
          </label>
          <input
            type="number"
            min="0"
            step="0.01"
            value={getDisplayValue('publicChargingCost')}
            onChange={(e) => handleChange('publicChargingCost', e.target.value)}
            onBlur={() => handleBlur('publicChargingCost')}
            onFocus={(e) => e.target.select()}
            placeholder="0.85"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 font-medium"
          />
        </div>

        {/* Home vs Public Charging Split */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Charging Location Split
          </label>
          <div className="space-y-2">
            <input
              type="range"
              min="0"
              max="100"
              value={inputs.homeChargingPercentage}
              onChange={(e) => handleChange('homeChargingPercentage', e.target.value)}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-500"
            />
            <div className="flex justify-between text-sm">
              <span className="text-orange-600 font-medium">
                ⚡ Public: {100 - inputs.homeChargingPercentage}%
              </span>
              <span className="text-green-600 font-medium">
                🏠 Home: {inputs.homeChargingPercentage}%
              </span>
            </div>
          </div>
        </div>

        {/* Tesla Efficiency */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Tesla Efficiency (Wh/mile)
          </label>
          <input
            type="number"
            min="0"
            step="1"
            value={getDisplayValue('teslaEfficiency')}
            onChange={(e) => handleChange('teslaEfficiency', e.target.value)}
            onBlur={() => handleBlur('teslaEfficiency')}
            onFocus={(e) => e.target.select()}
            placeholder="250"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 font-medium"
          />
          <p className="text-xs text-gray-500 mt-1">Model 3: ~250 Wh/mile</p>
        </div>

        {/* Petrol Car MPG */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Petrol Car MPG
          </label>
          <input
            type="number"
            min="0"
            step="0.1"
            value={getDisplayValue('petrolCarMPG')}
            onChange={(e) => handleChange('petrolCarMPG', e.target.value)}
            onBlur={() => handleBlur('petrolCarMPG')}
            onFocus={(e) => e.target.select()}
            placeholder="40"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 font-medium"
          />
        </div>

        {/* Petrol Price */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Petrol Price (£/litre)
          </label>
          <input
            type="number"
            min="0"
            step="0.01"
            value={getDisplayValue('petrolPrice')}
            onChange={(e) => handleChange('petrolPrice', e.target.value)}
            onBlur={() => handleBlur('petrolPrice')}
            onFocus={(e) => e.target.select()}
            placeholder="1.45"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 font-medium"
          />
        </div>

        {/* Miles Per Month */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Miles Per Month
          </label>
          <input
            type="number"
            min="0"
            step="10"
            value={getDisplayValue('milesPerMonth')}
            onChange={(e) => handleChange('milesPerMonth', e.target.value)}
            onBlur={() => handleBlur('milesPerMonth')}
            onFocus={(e) => e.target.select()}
            placeholder="800"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 font-medium"
          />
        </div>
      </div>
    </div>
  );
}
