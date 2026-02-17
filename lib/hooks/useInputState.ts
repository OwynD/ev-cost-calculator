import { useState } from 'react';
import { UserInputs } from '@/types/calculator';

export function useInputState(inputs: UserInputs, onInputChange: (field: keyof UserInputs, value: number) => void) {
  // Keep track of string values for each field to preserve user input like "0." or "0.0"
  const [fieldValues, setFieldValues] = useState<Record<string, string>>({});

  const handleChange = (field: keyof UserInputs, value: string) => {
    // Store the raw string value for display
    setFieldValues(prev => ({ ...prev, [field]: value }));
    
    // Allow empty string and convert to 0 for calculations
    if (value === '') {
      onInputChange(field, 0);
      return;
    }
    
    const numValue = parseFloat(value);
    if (!isNaN(numValue) && numValue >= 0) {
      onInputChange(field, numValue);
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
    const value = inputs[field];
    return value === 0 ? '0' : (value || '');
  };

  return {
    handleChange,
    handleBlur,
    getDisplayValue,
  };
}
