# Manual Testing Scenarios for Internationalization

This document outlines manual testing scenarios to validate the internationalization implementation. These tests should be performed by a human tester to ensure the functionality works as expected across different browsers and devices.

## Table of Contents

1. [Pre-requisites](#pre-requisites)
2. [Test Environment](#test-environment)
3. [Test Scenarios](#test-scenarios)
   - [Initial Language Detection](#initial-language-detection)
   - [Language Toggle Functionality](#language-toggle-functionality)
   - [Translation Accuracy](#translation-accuracy)
   - [Better-Auth Component Internationalization](#better-auth-component-internationalization)
   - [Locale-Specific Formatting](#locale-specific-formatting)
   - [Language Preference Persistence](#language-preference-persistence)
   - [Error Handling](#error-handling)
   - [Accessibility](#accessibility)
4. [Cross-Browser Testing](#cross-browser-testing)
5. [Mobile Responsiveness](#mobile-responsiveness)
6. [Validation Checklist](#validation-checklist)

## Pre-requisites

Before running these tests, ensure:

- [ ] Application is running locally (`npm run dev`)
- [ ] Database is set up and migrated (`npm run db:migrate`)
- [ ] All dependencies installed (`npm install`)
- [ ] Test user accounts exist (admin and regular user)
- [ ] Clear browser cache and cookies for clean testing

## Test Environment

### Browsers to Test
- [ ] Google Chrome (latest)
- [ ] Mozilla Firefox (latest)
- [ ] Safari (latest)
- [ ] Microsoft Edge (latest)

### Devices to Test
- [ ] Desktop (Windows, macOS, Linux)
- [ ] Tablet (iPad, Android)
- [ ] Mobile phone (iPhone, Android)

### Network Conditions
- [ ] Normal broadband connection
- [ ] Slow 3G simulation (optional)

## Test Scenarios

### Initial Language Detection

#### Scenario 1: Default Language Loading (German)
**Objective**: Verify the application loads in German by default when no language preference is set.

**Steps**:
1. Clear browser cache and cookies
2. Open a new incognito/private browser window
3. Navigate to the application homepage
4. Observe the language of UI elements

**Expected Results**:
- [ ] All UI text appears in German
- [ ] Language toggle shows DE as active
- [ ] Page title and meta descriptions are in German

#### Scenario 2: Browser Language Preference Override
**Objective**: Verify the application respects browser language preferences.

**Steps**:
1. Clear browser cache and cookies
2. Open a new incognito/private browser window
3. Set browser language preference to English
4. Navigate to the application homepage
5. Observe the language of UI elements

**Expected Results**:
- [ ] All UI text appears in English
- [ ] Language toggle shows EN as active
- [ ] Page title and meta descriptions are in English

### Language Toggle Functionality

#### Scenario 3: Switching from German to English
**Objective**: Verify language switching functionality works correctly.

**Steps**:
1. Navigate to the application homepage (should load in German by default)
2. Locate the language toggle [DE|EN]
3. Click on the language toggle or the EN portion
4. Wait for page to reload
5. Verify all text elements have changed to English

**Expected Results**:
- [ ] All UI text switches to English
- [ ] Language toggle updates to show EN as active
- [ ] URL reflects the language change (e.g., /en/ path)
- [ ] No page elements show untranslated text or translation keys

#### Scenario 4: Switching from English to German
**Objective**: Verify reverse language switching functionality.

**Steps**:
1. Ensure application is in English
2. Locate the language toggle [DE|EN]
3. Click on the language toggle or the DE portion
4. Wait for page to reload
5. Verify all text elements have changed to German

**Expected Results**:
- [ ] All UI text switches to German
- [ ] Language toggle updates to show DE as active
- [ ] URL reflects the language change (e.g., /de/ path)
- [ ] No page elements show untranslated text or translation keys

#### Scenario 5: Keyboard Navigation for Language Toggle
**Objective**: Verify language toggle is accessible via keyboard.

**Steps**:
1. Navigate to the application homepage
2. Press Tab key repeatedly to focus on the language toggle
3. Press Enter or Space to activate the toggle
4. Observe language switching behavior

**Expected Results**:
- [ ] Language toggle receives keyboard focus
- [ ] Language toggle activates with keyboard input
- [ ] Language switches successfully
- [ ] Focus is maintained appropriately after switching

### Translation Accuracy

#### Scenario 6: Homepage Translation Completeness
**Objective**: Verify all homepage content is properly translated.

**Steps**:
1. Load homepage in German
2. Note all visible text elements
3. Switch to English using language toggle
4. Compare text elements in both languages

**Expected Results**:
- [ ] All visible text elements have German translations
- [ ] All visible text elements have English translations
- [ ] No mixed-language content
- [ ] No untranslated text or translation keys visible

#### Scenario 7: Navigation Menu Translation
**Objective**: Verify navigation elements are properly translated.

**Steps**:
1. Load homepage in German
2. Check navigation menu items
3. Switch to English
4. Check navigation menu items again

**Expected Results**:
- [ ] Navigation menu items are in German when language is German
- [ ] Navigation menu items are in English when language is English
- [ ] All navigation links work correctly in both languages

### Better-Auth Component Internationalization

#### Scenario 8: Login Page Translation
**Objective**: Verify Better-Auth login components are properly internationalized.

**Steps**:
1. Navigate to the login page in German
2. Note all form labels, buttons, and helper text
3. Switch to English using language toggle
4. Note all form labels, buttons, and helper text

**Expected Results**:
- [ ] Email label translates from "E-Mail" to "Email"
- [ ] Password label translates from "Passwort" to "Password"
- [ ] Sign in button translates from "Anmelden" to "Sign In"
- [ ] Forgot password link translates appropriately
- [ ] All form validation messages are translated

#### Scenario 9: Register Page Translation
**Objective**: Verify Better-Auth registration components are properly internationalized.

**Steps**:
1. Navigate to the registration page in German
2. Note all form labels, buttons, and helper text
3. Switch to English using language toggle
4. Note all form labels, buttons, and helper text

**Expected Results**:
- [ ] Email label translates from "E-Mail" to "Email"
- [ ] Password label translates from "Passwort" to "Password"
- [ ] Confirm password label translates appropriately
- [ ] Register button translates from "Registrieren" to "Register"
- [ ] All form validation messages are translated

#### Scenario 10: OAuth Provider Buttons
**Objective**: Verify OAuth provider buttons are properly internationalized.

**Steps**:
1. Navigate to login/registration pages in German
2. Note OAuth provider button text (Google, GitHub)
3. Switch to English
4. Note OAuth provider button text again

**Expected Results**:
- [ ] Google button text translates appropriately
- [ ] GitHub button text translates appropriately
- [ ] All OAuth-related text is translated

### Locale-Specific Formatting

#### Scenario 11: Date Formatting
**Objective**: Verify dates are formatted according to locale standards.

**Steps**:
1. Find a page with date displays (e.g., user profiles, logs)
2. Note the date format in German
3. Switch to English
4. Note the date format in English

**Expected Results**:
- [ ] German dates follow European format (DD.MM.YYYY)
- [ ] English dates follow US format (MM/DD/YYYY)
- [ ] Time formats differ appropriately (24-hour vs 12-hour)

#### Scenario 12: Number Formatting
**Objective**: Verify numbers are formatted according to locale standards.

**Steps**:
1. Find a page with numeric displays (e.g., user counts, statistics)
2. Note the number format in German
3. Switch to English
4. Note the number format in English

**Expected Results**:
- [ ] German numbers use comma as decimal separator
- [ ] English numbers use period as decimal separator
- [ ] Large numbers have appropriate thousand separators

### Language Preference Persistence

#### Scenario 13: Session Persistence
**Objective**: Verify language preferences persist during a browsing session.

**Steps**:
1. Navigate to the application in German
2. Switch to English using the language toggle
3. Navigate to different pages within the application
4. Verify language remains English

**Expected Results**:
- [ ] Language preference is maintained across page navigations
- [ ] No unexpected language switching occurs

#### Scenario 14: Browser Restart Persistence
**Objective**: Verify language preferences persist after browser restart.

**Steps**:
1. Navigate to the application and switch to English
2. Close the browser completely
3. Reopen the browser
4. Navigate to the application again

**Expected Results**:
- [ ] Application loads in English
- [ ] Language preference is remembered from previous session

### Error Handling

#### Scenario 15: Missing Translation Fallback
**Objective**: Verify graceful fallback when translations are missing.

**Steps**:
1. Temporarily remove a translation key from one language file
2. Load the page where that translation would be used
3. Observe the behavior

**Expected Results**:
- [ ] Application falls back to German default for missing English translations
- [ ] No broken UI or error messages displayed to user
- [ ] Fallback behavior is consistent and predictable

#### Scenario 16: Invalid Locale Handling
**Objective**: Verify application handles invalid locale requests gracefully.

**Steps**:
1. Manually modify the URL to include an invalid locale (e.g., /fr/)
2. Observe the application behavior

**Expected Results**:
- [ ] Application redirects to default language (German)
- [ ] No 404 or error pages displayed
- [ ] User experience is not disrupted

### Accessibility

#### Scenario 17: Screen Reader Compatibility
**Objective**: Verify internationalization works with screen readers.

**Steps**:
1. Enable a screen reader (e.g., NVDA, VoiceOver)
2. Navigate to the application
3. Use the language toggle
4. Listen to announcements

**Expected Results**:
- [ ] Screen reader announces current language
- [ ] Screen reader announces language switching
- [ ] All translated content is properly announced

#### Scenario 18: High Contrast Mode
**Objective**: Verify language toggle is visible in high contrast mode.

**Steps**:
1. Enable high contrast mode in OS or browser
2. Navigate to the application
3. Observe the language toggle

**Expected Results**:
- [ ] Language toggle remains visible and readable
- [ ] Active language indication is clear
- [ ] No contrast issues with text or background

## Cross-Browser Testing

### Chrome
- [ ] All scenarios pass in latest Chrome

### Firefox
- [ ] All scenarios pass in latest Firefox

### Safari
- [ ] All scenarios pass in latest Safari

### Edge
- [ ] All scenarios pass in latest Edge

## Mobile Responsiveness

### Portrait Mode
- [ ] Language toggle is visible and usable
- [ ] All translated content fits properly
- [ ] No overlapping text or UI elements

### Landscape Mode
- [ ] Language toggle is visible and usable
- [ ] All translated content fits properly
- [ ] No overlapping text or UI elements

### Touch Interaction
- [ ] Language toggle responds to touch events
- [ ] No accidental toggles due to touch sensitivity

## Validation Checklist

### Core Functionality
- [ ] Default language loading works correctly
- [ ] Language switching functions properly
- [ ] All UI text is translated in both languages
- [ ] Better-Auth components are internationalized
- [ ] Locale-specific formatting is applied
- [ ] Language preferences are persistent

### Quality Assurance
- [ ] No untranslated text or translation keys visible
- [ ] No mixed-language content
- [ ] No broken UI elements due to text length differences
- [ ] All functionality works in all supported browsers
- [ ] All functionality works on mobile devices
- [ ] Accessibility standards are met

### Performance
- [ ] Language switching is responsive (under 1 second)
- [ ] No noticeable performance degradation with translations
- [ ] Translation files load efficiently

### Error Handling
- [ ] Graceful fallback for missing translations
- [ ] Proper handling of invalid locales
- [ ] No crashes or errors during language switching

### Security
- [ ] No sensitive information leaked through translations
- [ ] No XSS vulnerabilities in translated content
- [ ] Proper input sanitization for dynamic content

After completing all manual testing scenarios and ensuring all checkboxes are checked, the internationalization feature can be considered fully validated and ready for production use.