# Data Model for Replace Resend with Brevo for Email Service

## Entities

### Email Service
Represents the abstract service responsible for sending emails.

**Attributes:**
- `provider`: `('Brevo')` - The email service provider, fixed to Brevo.
- `apiKey`: `string` - The API key for authentication with the Brevo service.
- `senderEmail`: `string` - The email address from which emails will be sent.