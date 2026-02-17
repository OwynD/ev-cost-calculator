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
 * Format number to specified decimal places
 */
export function formatNumber(value: number, decimals: number = 2): string {
  if (!isFinite(value) || isNaN(value)) {
    return '0';
  }
  return value.toFixed(decimals);
}

/**
 * Format percentage
 */
export function formatPercentage(value: number, decimals: number = 1): string {
  if (!isFinite(value) || isNaN(value)) {
    return '0%';
  }
  return `${value.toFixed(decimals)}%`;
}
