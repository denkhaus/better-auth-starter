# Data Model: Implement Dark Mode

## Entities

### 1. ThemeState

- **Description**: Represents the UI theme state for the application.
- **Attributes**:
  - `theme: ('light' | 'dark')` - The current active theme.
  - `setTheme: (theme: 'light' | 'dark') => void` - Function to update the theme.
- **Storage**: The `theme` attribute is persisted in the browser's Local Storage, with a cookie fallback.
