import { LanguageCode } from '../types';

/**
 * Shared Indian Rupee (INR) Formatter
 * Formats currency values in Indian numbering style (e.g., ₹1,25,000 or ₹110)
 * using the 'en-IN' locale.
 */

export function formatINR(amount: number, showDecimals = false): string {
  const safeAmount = isNaN(amount) ? 0 : amount;
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: showDecimals ? 2 : 0,
    minimumFractionDigits: showDecimals ? 2 : 0,
  }).format(safeAmount);
}

/**
 * Format hourly wage rate with ₹ symbol and localized '/hr' suffix (e.g., ₹140/hr, ₹140/மணி, ₹140/घंटा)
 */
export function formatHourlyRate(rate: number, language: LanguageCode = 'en'): string {
  const formatted = formatINR(rate, false);
  if (language === 'ta') {
    return `${formatted}/மணி`;
  }
  if (language === 'hi') {
    return `${formatted}/घंटा`;
  }
  return `${formatted}/hr`;
}

