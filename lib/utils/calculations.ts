import { UserInputs, CalculationResults, ProjectionData } from '@/types/calculator';
import { DEFAULT_VALUES, LITRES_PER_GALLON, CHART_CONFIG } from '@/lib/constants';

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
  
  // Petrol cost per mile = (petrol price per litre * LITRES_PER_GALLON) / MPG
  // Prevent division by zero
  const petrolCostPerMile = inputs.petrolCarMPG > 0 
    ? (inputs.petrolPrice * LITRES_PER_GALLON) / inputs.petrolCarMPG 
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
 * Generate projection data for cumulative savings over years
 */
export function generateProjectionData(monthlySavings: number): ProjectionData[] {
  const projectionData: ProjectionData[] = [];
  
  for (let year = 0; year <= CHART_CONFIG.PROJECTION_YEARS; year++) {
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
    electricityCost: DEFAULT_VALUES.ELECTRICITY_COST,
    publicChargingCost: DEFAULT_VALUES.PUBLIC_CHARGING_COST,
    homeChargingPercentage: DEFAULT_VALUES.HOME_CHARGING_PERCENTAGE,
    teslaEfficiency: DEFAULT_VALUES.TESLA_EFFICIENCY,
    petrolCarMPG: DEFAULT_VALUES.PETROL_CAR_MPG,
    petrolPrice: DEFAULT_VALUES.PETROL_PRICE,
    milesPerMonth: DEFAULT_VALUES.MILES_PER_MONTH,
  };
}
