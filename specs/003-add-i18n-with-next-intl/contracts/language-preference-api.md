# Contract: Language Preference API

## Overview
API contract for managing user language preferences in the internationalization feature.

## Endpoints

### GET /api/locale/{locale}
**Purpose**: Load translation bundle for specified locale
**Parameters**:
- locale (path): Language code (e.g., "en", "de")

**Request**:
```
GET /api/locale/de
Headers:
- Accept: application/json
```

**Response**:
```
Status: 200 OK
Content-Type: application/json
{
  "locale": "de",
  "namespace": "common",
  "translations": {
    "welcome": "Willkommen",
    "login": "Anmelden",
    "logout": "Abmelden"
  }
}
```

**Error Responses**:
- 404: Locale not supported
- 500: Translation bundle unavailable

### POST /api/user/locale
**Purpose**: Set authenticated user's language preference
**Requires Authentication**: Yes

**Request**:
```
POST /api/user/locale
Content-Type: application/json
{
  "locale": "en"
}
```

**Response**:
```
Status: 200 OK
{
  "success": true,
  "locale": "en",
  "message": "Language preference updated"
}
```

**Error Responses**:
- 400: Invalid locale provided
- 401: User not authenticated
- 500: Failed to update preference