import createIntlMiddleware from 'next-intl/middleware';
import { type NextRequest } from 'next/server';
import { isPublicPath } from '@/lib/public-paths';
import { DEFAULT_LOGIN_REDIRECT, getLocaleRedirectPath } from '@/lib/config';
import { getSessionCookie } from 'better-auth/cookies';
import { localeConfig } from '@/lib/locale-config';

// Create the internationalization middleware
const intlMiddleware = createIntlMiddleware({
  // Define the supported locales
  locales: localeConfig.locales,
  // Default locale for the application
  defaultLocale: localeConfig.defaultLocale,
});

// Helper function to remove locale from pathname for public path checks
function getPathWithoutLocale(pathname: string): string {
  const locales = localeConfig.locales;
  for (const locale of locales) {
    if (pathname.startsWith(`/${locale}/`)) {
      return pathname.substring(`/${locale}`.length);
    }
  }
  // If the pathname is exactly a locale (like /en or /de), return /
  for (const locale of locales) {
    if (pathname === `/${locale}`) {
      return '/';
    }
  }
  return pathname;
}

export default async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // First, handle internationalization
  const intlResponse = intlMiddleware(request);

  // Remove locale from pathname for public path checks
  const pathWithoutLocale = getPathWithoutLocale(pathname);

  // Get authentication status for all routes
  const sessionCookie = getSessionCookie(request);

  // If user is already logged in and trying to access auth pages, redirect to dashboard
  if (sessionCookie && pathWithoutLocale.includes('/auth/')) {
    const locale = pathname.split('/')[1]; // Get the locale from the path
    const redirectPath = getLocaleRedirectPath(locale, DEFAULT_LOGIN_REDIRECT);
    return Response.redirect(new URL(redirectPath, request.url));
  }

  // Allow access to public paths without authentication
  if (isPublicPath(pathWithoutLocale)) {
    return intlResponse;
  }

  // For protected paths, check authentication
  if (!sessionCookie) {
    // Redirect to login with a return URL to the requested page
    const locale = pathname.split('/')[1]; // Get the locale from the path
    const loginUrl = new URL(`/${locale}/auth/login`, request.url);
    loginUrl.searchParams.set('callbackUrl', pathWithoutLocale);
    return Response.redirect(loginUrl);
  }

  return intlResponse;
}

export const config = {
  // Match all routes to handle both i18n and auth
  matcher: [
    // Skip all internal paths that should not be internationalized
    '/((?!api|_next/static|_next/image|favicon.ico|.*\\.).*)',
  ],
};