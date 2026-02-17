'use client';

import React from 'react';
import { UserInputs } from '@/types/calculator';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui';
import { NumberInput } from '@/components/ui/NumberInput';
import { RangeSlider } from '@/components/ui/RangeSlider';
import { useInputState } from '@/lib/hooks/useInputState';
import { INPUT_FIELDS } from '@/lib/constants';

interface InputFormProps {
  inputs: UserInputs;
  onInputChange: (field: keyof UserInputs, value: number) => void;
}

export default function InputForm({ inputs, onInputChange }: InputFormProps) {
  const { handleChange, handleBlur, getDisplayValue } = useInputState(inputs, onInputChange);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Your Details</CardTitle>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="space-y-4 sm:space-y-5">
          {/* Render all input fields from configuration */}
          {INPUT_FIELDS.slice(0, 2).map((field) => (
            <NumberInput
              key={field.key}
              label={field.label}
              value={getDisplayValue(field.key)}
              onChange={(value) => handleChange(field.key, value)}
              onBlur={() => handleBlur(field.key)}
              onFocus={(e) => e.target.select()}
              min={field.min}
              step={field.step}
              placeholder={field.placeholder}
            />
          ))}

          {/* Charging Location Slider */}
          <RangeSlider
            label="Charging Location Split"
            value={inputs.homeChargingPercentage}
            onChange={(value) => handleChange('homeChargingPercentage', value)}
            leftLabel={`⚡ Public: ${100 - inputs.homeChargingPercentage}%`}
            rightLabel={`🏠 Home: ${inputs.homeChargingPercentage}%`}
          />

          {/* Remaining input fields */}
          {INPUT_FIELDS.slice(2).map((field) => (
            <NumberInput
              key={field.key}
              label={field.label}
              value={getDisplayValue(field.key)}
              onChange={(value) => handleChange(field.key, value)}
              onBlur={() => handleBlur(field.key)}
              onFocus={(e) => e.target.select()}
              min={field.min}
              step={field.step}
              placeholder={field.placeholder}
              hint={'hint' in field ? field.hint : undefined}
            />
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
