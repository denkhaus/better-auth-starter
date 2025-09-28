# Internationalization (i18n) Usage Guide

This document provides guidelines and best practices for using the internationalization (i18n) system in this project, which is powered by [next-intl](https://next-intl-docs.vercel.app/).

## Table of Contents

1. [Overview](#overview)
2. [Directory Structure](#directory-structure)
3. [Adding New Languages](#adding-new-languages)
4. [Using Translations in Components](#using-translations-in-components)
5. [Translation File Structure](#translation-file-structure)
6. [Locale-Specific Formatting](#locale-specific-formatting)
7. [Language Toggle Component](#language-toggle-component)
8. [Best Practices](#best-practices)

## Overview

The project supports multiple languages with German as the default language. Currently, English and German are supported. The internationalization system provides:

- Automatic locale detection based on browser preferences
- Language toggle component for manual switching
- Translation management via JSON files
- Locale-specific date and number formatting
- Persistent language preferences using localStorage

## Directory Structure

```
public/
└── locales/
    ├── en.json          # English translations
    └── de.json          # German translations

src/
├── app/
│   └── [locale]/        # Locale-aware routes
│       ├── layout.tsx   # Main layout with next-intl provider
│       └── page.tsx     # Homepage with translations
├── components/
│   └── language-toggle.tsx  # Language switching component
├── contexts/
│   └── language-context.tsx # Language state management
├── i18n/
│   └── routing.ts       # next-intl routing configuration
├── lib/
│   └── auth-i18n.ts     # Better-Auth internationalization wrapper
├── services/
│   └── language-preference-service.ts  # Language preference management
└── utils/
    └── locale-formatting.ts  # Locale-specific formatting utilities
```

## Adding New Languages

To add support for a new language:

1. Create a new translation file in `public/locales/` (e.g., `fr.json` for French)
2. Add the new locale to the supported locales array in `src/i18n/routing.ts`:
   ```typescript
   export const routing = defineRouting({
     locales: ['en', 'de', 'fr'], // Add 'fr' here
     defaultLocale: 'de',
   });
   ```
3. Update the middleware.ts file if needed to handle the new locale
4. Translate all keys in the new JSON file

## Using Translations in Components

To use translations in your React components:

### Basic Usage

```tsx
import { useTranslations } from 'next-intl';

export default function MyComponent() {
  const t = useTranslations('common');
  
  return (
    <div>
      <h1>{t('welcome')}</h1>
      <p>{t('feature_description')}</p>
    </div>
  );
}
```

### With Parameters

Translation files support parameterized strings:

```tsx
import { useTranslations } from 'next-intl';

export default function MyComponent() {
  const t = useTranslations('errors');
  
  return (
    <div>
      <p>{t('password_min_length', { min: 8 })}</p>
    </div>
  );
}
```

### Namespaces

Organize translations using namespaces:

```tsx
import { useTranslations } from 'next-intl';

export default function MyComponent() {
  const tCommon = useTranslations('common');
  const tAuth = useTranslations('auth');
  const tErrors = useTranslations('errors');
  
  return (
    <div>
      <h1>{tCommon('welcome')}</h1>
      <label>{tAuth('email')}</label>
      <p className="error">{tErrors('email_required')}</p>
    </div>
  );
}
```

## Translation File Structure

Translation files are organized by namespaces:

```json
{
  "common": {
    "welcome": "Welcome",
    "login": "Login"
  },
  "auth": {
    "email": "Email",
    "password": "Password"
  },
  "errors": {
    "email_required": "Email is required"
  }
}
```

Keep translation keys consistent across all language files to ensure proper internationalization.

## Locale-Specific Formatting

The project includes utility functions for locale-specific formatting of dates, numbers, and currencies:

### Date Formatting

```tsx
import { formatDate, formatTime, formatDateTime } from '@/utils/locale-formatting';

export default function MyComponent() {
  const date = new Date();
  
  return (
    <div>
      <p>Date: {formatDate(date, 'en')}</p>
      <p>Time: {formatTime(date, 'en')}</p>
      <p>Date & Time: {formatDateTime(date, 'en')}</p>
    </div>
  );
}
```

### Number Formatting

```tsx
import { formatNumber, formatCurrency, formatPercentage } from '@/utils/locale-formatting';

export default function MyComponent() {
  return (
    <div>
      <p>Number: {formatNumber(1234.56, 'en')}</p>
      <p>Currency: {formatCurrency(1234.56, 'USD', 'en')}</p>
      <p>Percentage: {formatPercentage(0.15, 'en')}</p>
    </div>
  );
}
```

## Language Toggle Component

The language toggle component allows users to switch between supported languages:

```tsx
import LanguageToggle from '@/components/language-toggle';

export default function MyComponent() {
  return (
    <header>
      <LanguageToggle />
    </header>
  );
}
```

The component automatically:
- Detects the current language
- Updates the UI to highlight the active language
- Stores language preferences in localStorage
- Navigates to the appropriate localized route

## Best Practices

### 1. Consistent Key Naming
Use descriptive, consistent keys across all translation files:
```json
{
  "auth": {
    "email": "Email",
    "password": "Password",
    "sign_in": "Sign In"
  }
}
```

### 2. Namespace Organization
Group related translations under logical namespaces:
- `common` - General UI elements
- `auth` - Authentication-related strings
- `errors` - Error messages
- `dates` - Date-related terms

### 3. Parameter Usage
Use parameters for dynamic content:
```json
{
  "errors": {
    "password_min_length": "Password must be at least {min} characters"
  }
}
```

### 4. Avoid Hardcoded Strings
Always use translation keys instead of hardcoded strings in components:
```tsx
// Good
<h1>{t('common.welcome')}</h1>

// Bad
<h1>Welcome</h1>
```

### 5. Test All Languages
Ensure your UI works correctly in all supported languages, as text length can vary significantly between languages.

### 6. Handle Missing Translations
The system falls back to the default language (German) when translations are missing, but it's best to ensure all keys are translated.

## Troubleshooting

### Missing Translations
If you see untranslated keys in the UI:
1. Check that the key exists in all translation files
2. Verify the namespace is correct
3. Ensure the component is using the correct namespace with `useTranslations`

### Language Toggle Not Working
If the language toggle isn't switching languages:
1. Check browser console for errors
2. Verify the locale is correctly updated in the URL
3. Ensure localStorage is accessible

## Further Reading

- [next-intl Documentation](https://next-intl-docs.vercel.app/)
- [MDN Intl API](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl)