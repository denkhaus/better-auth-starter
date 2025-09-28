import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import LanguagePreferenceService from '@/services/language-preference-service';

// Mock localStorage
const localStorageMock = (() => {
  let store: Record<string, string> = {};
  
  return {
    getItem: (key: string) => store[key] || null,
    setItem: (key: string, value: string) => {
      store[key] = value.toString();
    },
    removeItem: (key: string) => {
      delete store[key];
    },
    clear: () => {
      store = {};
    }
  };
})();

describe('LanguagePreferenceService', () => {
  beforeEach(() => {
    // Mock window.localStorage
    Object.defineProperty(window, 'localStorage', {
      value: localStorageMock,
      writable: true,
    });
    
    // Clear localStorage before each test
    window.localStorage.clear();
  });

  afterEach(() => {
    // Clean up mocks
    vi.restoreAllMocks();
  });

  describe('setLanguagePreference', () => {
    it('should set language preference for anonymous users in localStorage', async () => {
      const result = await LanguagePreferenceService.setLanguagePreference(undefined, 'en');
      
      expect(result).toBe(true);
      expect(window.localStorage.getItem('user-locale')).toBe('en');
    });

    it('should reject invalid locales', async () => {
      await expect(LanguagePreferenceService.setLanguagePreference(undefined, 'invalid'))
        .rejects
        .toThrow('Invalid locale: invalid');
    });

    it('should handle errors gracefully', async () => {
      // Mock localStorage to throw an error
      const originalSetItem = window.localStorage.setItem;
      window.localStorage.setItem = vi.fn().mockImplementation(() => {
        throw new Error('Storage failed');
      });
      
      const result = await LanguagePreferenceService.setLanguagePreference(undefined, 'en');
      expect(result).toBe(false);
      
      // Restore original function
      window.localStorage.setItem = originalSetItem;
    });
  });

  describe('getLanguagePreference', () => {
    it('should get language preference for anonymous users from localStorage', async () => {
      window.localStorage.setItem('user-locale', 'de');
      
      const result = await LanguagePreferenceService.getLanguagePreference(undefined);
      expect(result).toBe('de');
    });

    it('should return null when no language preference is set', async () => {
      const result = await LanguagePreferenceService.getLanguagePreference(undefined);
      expect(result).toBeNull();
    });

    it('should handle errors gracefully', async () => {
      // Mock localStorage to throw an error
      const originalGetItem = window.localStorage.getItem;
      window.localStorage.getItem = vi.fn().mockImplementation(() => {
        throw new Error('Storage failed');
      });
      
      const result = await LanguagePreferenceService.getLanguagePreference(undefined);
      expect(result).toBeNull();
      
      // Restore original function
      window.localStorage.getItem = originalGetItem;
    });
  });

  describe('setAnonymousLanguagePreference', () => {
    it('should set anonymous language preference in localStorage', () => {
      LanguagePreferenceService.setAnonymousLanguagePreference('en');
      expect(window.localStorage.getItem('user-locale')).toBe('en');
    });

    it('should work in environments without localStorage', () => {
      // Temporarily remove localStorage
      const originalLocalStorage = window.localStorage;
      Object.defineProperty(window, 'localStorage', {
        value: undefined,
        writable: true,
      });
      
      // This should not throw an error
      expect(() => {
        LanguagePreferenceService.setAnonymousLanguagePreference('en');
      }).not.toThrow();
      
      // Restore localStorage
      Object.defineProperty(window, 'localStorage', {
        value: originalLocalStorage,
        writable: true,
      });
    });
  });

  describe('getAnonymousLanguagePreference', () => {
    it('should get anonymous language preference from localStorage', () => {
      window.localStorage.setItem('user-locale', 'de');
      
      const result = LanguagePreferenceService.getAnonymousLanguagePreference();
      expect(result).toBe('de');
    });

    it('should return null when no language preference is set', () => {
      const result = LanguagePreferenceService.getAnonymousLanguagePreference();
      expect(result).toBeNull();
    });

    it('should work in environments without localStorage', () => {
      // Temporarily remove localStorage
      const originalLocalStorage = window.localStorage;
      Object.defineProperty(window, 'localStorage', {
        value: undefined,
        writable: true,
      });
      
      // This should not throw an error
      expect(() => {
        const result = LanguagePreferenceService.getAnonymousLanguagePreference();
        expect(result).toBeNull();
      }).not.toThrow();
      
      // Restore localStorage
      Object.defineProperty(window, 'localStorage', {
        value: originalLocalStorage,
        writable: true,
      });
    });
  });

  describe('clearAnonymousLanguagePreference', () => {
    it('should remove language preference from localStorage', () => {
      window.localStorage.setItem('user-locale', 'en');
      
      LanguagePreferenceService.clearAnonymousLanguagePreference();
      expect(window.localStorage.getItem('user-locale')).toBeNull();
    });

    it('should work in environments without localStorage', () => {
      // Temporarily remove localStorage
      const originalLocalStorage = window.localStorage;
      Object.defineProperty(window, 'localStorage', {
        value: undefined,
        writable: true,
      });
      
      // This should not throw an error
      expect(() => {
        LanguagePreferenceService.clearAnonymousLanguagePreference();
      }).not.toThrow();
      
      // Restore localStorage
      Object.defineProperty(window, 'localStorage', {
        value: originalLocalStorage,
        writable: true,
      });
    });
  });
});