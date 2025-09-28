const DEFAULT_LOGIN_REDIRECT = "/dashboard";

export { DEFAULT_LOGIN_REDIRECT };

// Function to get the locale-aware redirect path
export function getLocaleRedirectPath(
  locale: string,
  path: string = DEFAULT_LOGIN_REDIRECT
): string {
  return `/${locale}${path}`;
}
