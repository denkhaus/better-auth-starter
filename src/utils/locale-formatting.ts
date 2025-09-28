/**
 * Locale-specific date and number formatting utilities
 */

import { DEFAULT_LOCALE } from '@/lib/locale-config';

/**
 * Format a date according to the specified locale
 * @param date - The date to format
 * @param locale - The locale to use for formatting (e.g., 'en', 'de')
 * @param options - Additional formatting options
 * @returns Formatted date string
 */
export const formatDate = (
  date: Date | string | number,
  locale: string = DEFAULT_LOCALE,
  options: Intl.DateTimeFormatOptions = {}
): string => {
  // Ensure we have a Date object
  const dateObj = date instanceof Date ? date : new Date(date);
  
  // Set default options if none provided
  const defaultOptions: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    ...options
  };
  
  return new Intl.DateTimeFormat(locale, defaultOptions).format(dateObj);
};

/**
 * Format a time according to the specified locale
 * @param date - The date/time to format
 * @param locale - The locale to use for formatting (e.g., 'en', 'de')
 * @param options - Additional formatting options
 * @returns Formatted time string
 */
export const formatTime = (
  date: Date | string | number,
  locale: string = DEFAULT_LOCALE,
  options: Intl.DateTimeFormatOptions = {}
): string => {
  // Ensure we have a Date object
  const dateObj = date instanceof Date ? date : new Date(date);
  
  // Set default options for time formatting
  const defaultOptions: Intl.DateTimeFormatOptions = {
    hour: '2-digit',
    minute: '2-digit',
    ...options
  };
  
  return new Intl.DateTimeFormat(locale, defaultOptions).format(dateObj);
};

/**
 * Format a date and time according to the specified locale
 * @param date - The date/time to format
 * @param locale - The locale to use for formatting (e.g., 'en', 'de')
 * @param options - Additional formatting options
 * @returns Formatted date and time string
 */
export const formatDateTime = (
  date: Date | string | number,
  locale: string = DEFAULT_LOCALE,
  options: Intl.DateTimeFormatOptions = {}
): string => {
  // Ensure we have a Date object
  const dateObj = date instanceof Date ? date : new Date(date);
  
  // Set default options for datetime formatting
  const defaultOptions: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    ...options
  };
  
  return new Intl.DateTimeFormat(locale, defaultOptions).format(dateObj);
};

/**
 * Format a number according to the specified locale
 * @param number - The number to format
 * @param locale - The locale to use for formatting (e.g., 'en', 'de')
 * @param options - Additional formatting options
 * @returns Formatted number string
 */
export const formatNumber = (
  number: number,
  locale: string = DEFAULT_LOCALE,
  options: Intl.NumberFormatOptions = {}
): string => {
  return new Intl.NumberFormat(locale, options).format(number);
};

/**
 * Format a currency amount according to the specified locale
 * @param amount - The amount to format
 * @param currency - The currency code (e.g., 'USD', 'EUR')
 * @param locale - The locale to use for formatting (e.g., 'en', 'de')
 * @param options - Additional formatting options
 * @returns Formatted currency string
 */
export const formatCurrency = (
  amount: number,
  currency: string = 'EUR',
  locale: string = DEFAULT_LOCALE,
  options: Intl.NumberFormatOptions = {}
): string => {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
    ...options
  }).format(amount);
};

/**
 * Format a percentage according to the specified locale
 * @param value - The value to format (e.g., 0.15 for 15%)
 * @param locale - The locale to use for formatting (e.g., 'en', 'de')
 * @param options - Additional formatting options
 * @returns Formatted percentage string
 */
export const formatPercentage = (
  value: number,
  locale: string = DEFAULT_LOCALE,
  options: Intl.NumberFormatOptions = {}
): string => {
  return new Intl.NumberFormat(locale, {
    style: 'percent',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
    ...options
  }).format(value);
};

// Helper functions for common locale-specific formats
export const formatDateShort = (date: Date | string | number, locale: string = DEFAULT_LOCALE): string => {
  return formatDate(date, locale, {
    year: '2-digit',
    month: '2-digit',
    day: '2-digit'
  });
};

export const formatDateLong = (date: Date | string | number, locale: string = DEFAULT_LOCALE): string => {
  return formatDate(date, locale, {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};

export const formatNumberCompact = (number: number, locale: string = DEFAULT_LOCALE): string => {
  return formatNumber(number, locale, {
    notation: 'compact'
  });
};