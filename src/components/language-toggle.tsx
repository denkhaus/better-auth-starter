'use client';

import { usePathname } from '@/i18n/routing';
import { useRouter } from '@/i18n/routing';
import { useLocale } from 'next-intl';
import { Button } from '@/components/ui/button';
import LanguagePreferenceService from '@/services/language-preference-service';
import { getNextLocale, getLocaleDisplayName, SUPPORTED_LOCALES } from '@/lib/locale-config';
import { useEffect, useState } from 'react';

export default function LanguageToggle() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);

  // Prevent hydration mismatch by only rendering after mount
  useEffect(() => {
    setMounted(true);
  }, []);

  const toggleLanguage = () => {
    const newLocale = getNextLocale(locale);
    
    // Store the new locale preference
    LanguagePreferenceService.setAnonymousLanguagePreference(newLocale);
    
    // Use next-intl's router for proper locale switching
    // Remove the current locale from pathname to get the base path
    const pathWithoutLocale = pathname.replace(/^\/[a-z]{2}(\/|$)/, '/');
    
    // Navigate using next-intl router which handles locale prefixes automatically
    router.push(pathWithoutLocale || '/', { locale: newLocale });
  };

  // Accessibility labels
  const currentLanguage = getLocaleDisplayName(locale);
  const nextLocale = getNextLocale(locale);
  const switchToLanguage = getLocaleDisplayName(nextLocale);

  // Prevent hydration mismatch by showing a simple fallback until mounted
  if (!mounted) {
    return (
      <Button
        variant="outline"
        size="sm"
        disabled
        className="text-xs sm:text-sm"
      >
        <span className="font-bold text-muted-foreground">
          {SUPPORTED_LOCALES.map(loc => loc.toUpperCase()).join(' | ')}
        </span>
      </Button>
    );
  }

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={toggleLanguage}
      aria-label={`Currently in ${currentLanguage}. Switch to ${switchToLanguage}`}
      aria-live="polite"
      role="switch"
      aria-checked={locale !== SUPPORTED_LOCALES[0]}
      className="text-xs sm:text-sm focus:ring-2 focus:ring-primary focus:ring-offset-2"
      title={`Switch to ${switchToLanguage}`}
    >
      <div className="flex items-center">
        {SUPPORTED_LOCALES.map((supportedLocale, index) => (
          <span key={supportedLocale} className="flex items-center">
            <span 
              className={`font-bold transition-colors ${
                locale === supportedLocale 
                  ? 'text-primary' 
                  : 'text-muted-foreground hover:text-foreground'
              }`}
              aria-hidden="true"
            >
              {supportedLocale.toUpperCase()}
            </span>
            {index < SUPPORTED_LOCALES.length - 1 && (
              <span 
                className="mx-2 text-muted-foreground" 
                aria-hidden="true"
              >
                |
              </span>
            )}
          </span>
        ))}
      </div>
      <span className="sr-only">
        Language selector. Currently in {currentLanguage}. Press to switch to {switchToLanguage}.
      </span>
    </Button>
  );
}