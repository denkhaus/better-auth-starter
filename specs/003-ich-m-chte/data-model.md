# Data Model: Internationalization with Next-intl

## Language Settings
**Entity**: LanguagePreference
- **Fields**:
  - userId (string, optional): Associated user ID if authenticated
  - locale (string): Current language code (e.g., "en", "de")
  - updatedAt (timestamp): When the preference was last updated

**Validation Rules**:
- locale must be one of the supported languages ("en", "de")
- If userId is provided, must reference an existing user

## Locale-Specific Content
**Entity**: TranslationBundle
- **Fields**:
  - locale (string): Language code (e.g., "en", "de")
  - namespace (string): Translation namespace or domain
  - translations (object): Key-value pairs of translation entries
  - updatedAt (timestamp): When the translations were last updated

**Validation Rules**:
- locale must be one of the supported languages ("en", "de")
- namespace must be a valid identifier
- translations must be a valid JSON object structure
- Each translation key must be a string

## State Transitions
- Language preference can be changed by user interaction
- Default language is used when no preference is set
- Language preference persists until explicitly changed by the user

## Relationships
- LanguagePreference may be associated with a User (optional, for authenticated users)
- TranslationBundle is independent of users, contains application-wide translations