/**
 * LanguagePreference Service
 * Handles user language preferences, both authenticated and anonymous
 */

// In a real application, this would connect to a database
// For now, we'll use an in-memory approach with localStorage for client-side usage
class LanguagePreferenceService {
  private readonly STORAGE_KEY = 'user-locale';

  /**
   * Sets a user's language preference
   * @param userId - Optional user ID for authenticated users
   * @param locale - The locale to set (e.g., 'en', 'de')
   * @returns Promise resolving to success status
   */
  async setLanguagePreference(userId: string | undefined, locale: string): Promise<boolean> {
    // Import here to avoid circular dependencies
    const { isSupportedLocale } = await import('@/lib/locale-config');
    
    // Validate locale
    if (!isSupportedLocale(locale)) {
      throw new Error(`Invalid locale: ${locale}`);
    }

    try {
      if (userId) {
        // For authenticated users, this would connect to a database
        // This would be an API call to the backend in a real implementation
        console.log(`Setting language preference for user ${userId} to ${locale}`);
        // In a real app, this would make an API call to persist the preference
        // await fetch('/api/user/locale', { method: 'POST', body: JSON.stringify({userId, locale}) });
      } else {
        // For anonymous users, store in localStorage
        if (typeof window !== 'undefined') {
          localStorage.setItem(this.STORAGE_KEY, locale);
        }
      }
      
      return true;
    } catch (error) {
      console.error('Error setting language preference:', error);
      return false;
    }
  }

  /**
   * Gets a user's language preference
   * @param userId - Optional user ID for authenticated users
   * @returns Promise resolving to the user's preferred locale or null
   */
  async getLanguagePreference(userId: string | undefined): Promise<string | null> {
    try {
      if (userId) {
        // For authenticated users, this would fetch from database via API
        // const response = await fetch(`/api/user/locale/${userId}`);
        // const data = await response.json();
        // return data.locale;
        console.log(`Getting language preference for user ${userId}`);
        return null; // Placeholder - in real app, this would return from DB
      } else {
        // For anonymous users, check localStorage
        if (typeof window !== 'undefined') {
          const storedLocale = localStorage.getItem(this.STORAGE_KEY);
          return storedLocale || null;
        }
        return null;
      }
    } catch (error) {
      console.error('Error getting language preference:', error);
      return null;
    }
  }

  /**
   * Sets the locale in local storage for anonymous users
   * @param locale - The locale to set (e.g., 'en', 'de')
   */
  setAnonymousLanguagePreference(locale: string): void {
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        localStorage.setItem(this.STORAGE_KEY, locale);
      }
    } catch (error) {
      console.error('Error setting anonymous language preference:', error);
    }
  }

  /**
   * Gets the locale from local storage for anonymous users
   * @returns The stored locale or null
   */
  getAnonymousLanguagePreference(): string | null {
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        const storedLocale = localStorage.getItem(this.STORAGE_KEY);
        return storedLocale || null;
      }
      return null;
    } catch (error) {
      console.error('Error getting anonymous language preference:', error);
      return null;
    }
  }

  /**
   * Clears the language preference from local storage for anonymous users
   */
  clearAnonymousLanguagePreference(): void {
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        localStorage.removeItem(this.STORAGE_KEY);
      }
    } catch (error) {
      console.error('Error clearing anonymous language preference:', error);
    }
  }
}

const languagePreferenceService = new LanguagePreferenceService();
export default languagePreferenceService;