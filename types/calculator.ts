export interface UserInputs {
  electricityCost: number; // £ per kWh
  publicChargingCost: number; // £ per kWh
  homeChargingPercentage: number; // % of charging done at home (0-100)
  teslaEfficiency: number; // Wh per mile
  petrolCarMPG: number; // Miles per gallon
  petrolPrice: number; // £ per litre
  milesPerMonth: number; // Miles driven per month
}

export interface CalculationResults {
  evCostPerMile: number;
  monthlyEVCost: number;
  petrolCostPerMile: number;
  monthlyPetrolCost: number;
  monthlySavings: number;
  annualSavings: number;
}

export interface ChartData {
  name: string;
  ev: number;
  petrol: number;
}

export interface ProjectionData {
  year: number;
  savings: number;
}
