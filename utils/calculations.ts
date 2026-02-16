import { UserInputs, CalculationResults, ProjectionData } from '@/types/calculator';

/**
 * Calculate EV and petrol costs and savings
 */
export function calculateCosts(inputs: UserInputs): CalculationResults {
  // Calculate blended charging cost based on home vs public charging percentage
  const homeChargingRatio = inputs.homeChargingPercentage / 100;
  const publicChargingRatio = 1 - homeChargingRatio;
  const blendedChargingCost = 
    (inputs.electricityCost * homeChargingRatio) + 
    (inputs.publicChargingCost * publicChargingRatio);
  
  // EV cost per mile = (Wh per mile / 1000) * blended charging cost
  const evCostPerMile = (inputs.teslaEfficiency / 1000) * blendedChargingCost;
  
  // Monthly EV cost = EV cost per mile * miles per month
  const monthlyEVCost = evCostPerMile * inputs.milesPerMonth;
  
  // Petrol cost per mile = (petrol price per litre * 4.546) / MPG
  // 4.546 litres in a gallon (UK gallon)
  // Prevent division by zero
  const petrolCostPerMile = inputs.petrolCarMPG > 0 
    ? (inputs.petrolPrice * 4.546) / inputs.petrolCarMPG 
    : 0;
  
  // Monthly petrol cost = petrol cost per mile * miles per month
  const monthlyPetrolCost = petrolCostPerMile * inputs.milesPerMonth;
  
  // Monthly savings = petrol monthly cost - EV monthly cost
  const monthlySavings = monthlyPetrolCost - monthlyEVCost;
  
  // Annual savings = monthly savings * 12
  const annualSavings = monthlySavings * 12;
  
  return {
    evCostPerMile,
    monthlyEVCost,
    petrolCostPerMile,
    monthlyPetrolCost,
    monthlySavings,
    annualSavings,
  };
}

/**
 * Generate projection data for 5 years of cumulative savings
 */
export function generateProjectionData(monthlySavings: number): ProjectionData[] {
  const projectionData: ProjectionData[] = [];
  
  for (let year = 0; year <= 5; year++) {
    projectionData.push({
      year,
      savings: monthlySavings * 12 * year,
    });
  }
  
  return projectionData;
}

/**
 * Get default user inputs
 */
export function getDefaultInputs(): UserInputs {
  return {
    electricityCost: 0.07, // £0.07 per kWh (UK off-peak home charging)
    publicChargingCost: 0.85, // £0.85 per kWh (UK public charging average)
    homeChargingPercentage: 80, // 80% of charging done at home
    teslaEfficiency: 250, // 250 Wh per mile (Tesla Model 3 average)
    petrolCarMPG: 40, // 40 MPG (typical petrol car)
    petrolPrice: 1.45, // £1.45 per litre (UK average)
    milesPerMonth: 800, // 800 miles per month (approx 10,000 miles per year)
  };
}

/**
 * Format currency value to £ format
 */
export function formatCurrency(value: number): string {
  if (!isFinite(value) || isNaN(value)) {
    return '£0.00';
  }
  return `£${value.toFixed(2)}`;
}

/**
 * Format number to 2 decimal places
 */
export function formatNumber(value: number): string {
  return value.toFixed(2);
}
