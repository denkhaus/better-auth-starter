import { getRequestConfig } from 'next-intl/server';
import { routing } from './routing';

export default getRequestConfig(async ({ requestLocale }) => {
  // This typically only refers to locales that are offered for the main app
  // (so not admin panel, API routes, etc.)
  let locale = await requestLocale;
  if (!locale) {
    locale = routing.defaultLocale;
  }

  return {
    locale,
    messages: {
      ...(await import(`../../public/locales/${locale}.json`)).default,
    },
  };
});