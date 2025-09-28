/**
 * Central locale configuration
 * All supported locales are defined here - no environment variables needed
 */

export const SUPPORTED_LOCALES = ['en', 'de', 'fr'] as const;
export const DEFAULT_LOCALE = 'de' as const;

/**
 * Locale configuration object for next-intl
 */
export const localeConfig = {
  locales: SUPPORTED_LOCALES,
  defaultLocale: DEFAULT_LOCALE,
} as const;

/**
 * Type-safe locale type
 */
export type SupportedLocale = (typeof SUPPORTED_LOCALES)[number];

/**
 * Check if a locale is supported
 */
export function isSupportedLocale(locale: string): locale is SupportedLocale {
  return (SUPPORTED_LOCALES as readonly string[]).includes(locale);
}

/**
 * Get the next locale in the list (for language toggle)
 */
export function getNextLocale(currentLocale: string): SupportedLocale {
  const locales = SUPPORTED_LOCALES as readonly string[];
  const currentIndex = locales.indexOf(currentLocale);
  if (currentIndex === -1) {
    return DEFAULT_LOCALE as SupportedLocale;
  }

  const nextIndex = (currentIndex + 1) % locales.length;
  return locales[nextIndex] as SupportedLocale;
}

/**
 * Get locale display name (for UI)
 */
export function getLocaleDisplayName(locale: string): string {
  const displayNames: Record<string, string> = {
    en: "English",
    de: "Deutsch",
    fr: "Français",
  };

  return displayNames[locale] || locale.toUpperCase();
}
