# Research: Internationalization with Next-intl

## Decision: Implementation approach for Next.js internationalization
**Rationale**: Using next-intl library provides a well-maintained, feature-complete solution for internationalization in Next.js applications with support for both server and client components
**Alternatives considered**: 
- next-i18next (older, less maintained)
- Custom solution with i18next (requires more setup and maintenance)

## Decision: Language toggle UI component
**Rationale**: Simple [DE|EN] toggle button highlighting the current language provides a clear, intuitive UI for language switching without taking up excessive screen space
**Alternatives considered**:
- Dropdown menu (more complex UI but allows for more languages)
- Flag icons (potentially problematic as language doesn't always correspond to country)

## Decision: Translation storage approach 
**Rationale**: Using JSON files in public/locales directory follows next-intl best practices and allows for easy management of translation keys
**Alternatives considered**:
- Database storage (more complex for static translations)
- Inline translations (harder to maintain and scale)

## Decision: Missing translation fallback mechanism
**Rationale**: Falling back to the default language (German) when a translation is missing ensures the app remains usable and avoids showing empty UI elements or translation keys to users
**Alternatives considered**:
- Displaying translation keys as text (poor user experience)
- Showing empty strings (confusing for users)

## Decision: Language preference persistence
**Rationale**: Using local storage for language preferences allows persistence across browser sessions without requiring authentication, while being simple to implement
**Alternatives considered**:
- Browser cookies (additional HTTP overhead)
- User profile storage (requires authentication)

## Decision: Date and number formatting
**Rationale**: Using next-intl's built-in formatting functions ensures proper locale-specific formatting that follows international standards for each language
**Alternatives considered**:
- Custom formatting functions (inconsistent with locale standards)

## Decision: Better-Auth component internationalization
**Rationale**: Since Better-Auth provides client components with default text, these need to be customized with next-intl to ensure the entire UI is consistent in the selected language
**Implementation approach**:
- Create wrapper components that use next-intl for translation
- Override Better-Auth's default text with translated versions
- Maintain the same UI and accessibility features