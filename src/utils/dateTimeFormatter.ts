import { LanguageCode } from '../types';

export function getLocale(language: LanguageCode): string {
  if (language === 'ta') return 'ta-IN';
  if (language === 'hi') return 'hi-IN';
  return 'en-IN';
}

export function formatDate(
  dateInput: string | Date,
  language: LanguageCode = 'en',
  options?: Intl.DateTimeFormatOptions
): string {
  try {
    const d = typeof dateInput === 'string' ? new Date(dateInput) : dateInput;
    if (isNaN(d.getTime())) return String(dateInput);
    return new Intl.DateTimeFormat(
      getLocale(language),
      options || {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      }
    ).format(d);
  } catch {
    return String(dateInput);
  }
}

export function formatDateTime(
  dateInput: string | Date,
  language: LanguageCode = 'en'
): string {
  try {
    const d = typeof dateInput === 'string' ? new Date(dateInput) : dateInput;
    if (isNaN(d.getTime())) return String(dateInput);
    return new Intl.DateTimeFormat(getLocale(language), {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(d);
  } catch {
    return String(dateInput);
  }
}

export function formatTime(
  dateInput: string | Date,
  language: LanguageCode = 'en'
): string {
  try {
    const d = typeof dateInput === 'string' ? new Date(dateInput) : dateInput;
    if (isNaN(d.getTime())) return String(dateInput);
    return new Intl.DateTimeFormat(getLocale(language), {
      hour: '2-digit',
      minute: '2-digit',
    }).format(d);
  } catch {
    return String(dateInput);
  }
}
