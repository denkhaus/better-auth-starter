# Quickstart: Internationalization Testing

## Setup
1. Ensure the application is running with internationalization implemented
2. Verify locale files exist for both English and German
3. Confirm language toggle UI is visible in the header/navigation

## Test Scenarios

### Default Language Behavior
1. Clear your browser's local storage
2. Navigate to the application homepage
3. Verify the UI is displayed in German (default language)
4. Check that all text elements show German content
5. Verify that date/number formats follow German locale standards

### Language Switching
1. With the application in German, click the language toggle [DE|EN]
2. Verify the UI switches to English
3. Confirm all text elements show English content
4. Verify that date/number formats follow English locale standards
5. Click the toggle again to switch back to German
6. Confirm the UI switches back to German with appropriate formatting

### Better-Auth Component Internationalization
1. Navigate to the authentication pages (login/register)
2. Verify all auth component text is displayed in the currently selected language
3. Test form labels, button text, and error messages in both languages
4. Confirm that the language selection persists when navigating between auth and main pages

### Missing Translation Fallback
1. If possible, temporarily remove a translation key from one locale file
2. Load the page where that translation would be used
3. Verify that the fallback language (German) is used instead of showing an empty string or error

### Language Preference Persistence
1. Switch the language to English
2. Refresh the page or close and reopen the browser
3. Verify that English is still selected when the application loads
4. Repeat with German to confirm the persistence works for both languages

### Homepage Feature Mention
1. Navigate to the homepage in both English and German
2. Verify that the internationalization feature is mentioned in both languages
3. Confirm the text is properly translated according to the locale

### README Documentation
1. Open the project's README.md file
2. Verify that there is a section documenting the internationalization feature
3. Confirm that the documentation includes setup and usage instructions for the feature