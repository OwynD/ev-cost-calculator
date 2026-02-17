/**
 * Default values for user inputs
 */
export const DEFAULT_VALUES = {
  ELECTRICITY_COST: 0.07, // £0.07 per kWh (UK off-peak home charging)
  PUBLIC_CHARGING_COST: 0.85, // £0.85 per kWh (UK public charging average)
  HOME_CHARGING_PERCENTAGE: 80, // 80% of charging done at home
  TESLA_EFFICIENCY: 250, // 250 Wh per mile (Tesla Model 3 average)
  PETROL_CAR_MPG: 40, // 40 MPG (typical petrol car)
  PETROL_PRICE: 1.45, // £1.45 per litre (UK average)
  MILES_PER_MONTH: 800, // 800 miles per month (approx 10,000 miles per year)
} as const;

/**
 * UK gallon to litre conversion factor
 */
export const LITRES_PER_GALLON = 4.546;

/**
 * Local storage key for persisting user inputs
 */
export const STORAGE_KEY = 'ev-calculator-inputs';

/**
 * Input field configurations
 */
export const INPUT_FIELDS = [
  {
    key: 'electricityCost' as const,
    label: 'Home Electricity Cost (£/kWh)',
    type: 'number',
    min: 0,
    step: 0.01,
    placeholder: '0.07',
  },
  {
    key: 'publicChargingCost' as const,
    label: 'Public Charging Cost (£/kWh)',
    type: 'number',
    min: 0,
    step: 0.01,
    placeholder: '0.85',
  },
  {
    key: 'teslaEfficiency' as const,
    label: 'Tesla Efficiency (Wh/mile)',
    type: 'number',
    min: 0,
    step: 1,
    placeholder: '250',
    hint: 'Model 3: ~250 Wh/mile',
  },
  {
    key: 'petrolCarMPG' as const,
    label: 'Petrol Car MPG',
    type: 'number',
    min: 0,
    step: 0.1,
    placeholder: '40',
  },
  {
    key: 'petrolPrice' as const,
    label: 'Petrol Price (£/litre)',
    type: 'number',
    min: 0,
    step: 0.01,
    placeholder: '1.45',
  },
  {
    key: 'milesPerMonth' as const,
    label: 'Miles Per Month',
    type: 'number',
    min: 0,
    step: 10,
    placeholder: '800',
  },
] as const;

/**
 * Chart configuration
 */
export const CHART_CONFIG = {
  BAR_CHART_HEIGHT: 250,
  LINE_CHART_HEIGHT: 250,
  PROJECTION_YEARS: 5,
  COLORS: {
    EV: '#10b981',
    PETROL: '#ef4444',
    SAVINGS: '#3b82f6',
  },
} as const;
