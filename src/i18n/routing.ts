import {defineRouting} from 'next-intl/routing';
import {createNavigation} from 'next-intl/navigation';
import { localeConfig } from '@/lib/locale-config';

export const routing = defineRouting({
  // A list of all locales that are supported
  locales: localeConfig.locales,

  // Used when no locale matches
  defaultLocale: localeConfig.defaultLocale,
});

// lightweight wrappers around Next.js' navigation API
// that will consider the routing configuration
export const {Link, redirect, usePathname, useRouter} = createNavigation(routing);