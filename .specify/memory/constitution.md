<!--
Sync Impact Report:
- Version change: 0.3.0 → 0.4.0
- List of modified principles: none
- Added sections: IX. Development Server Autonomy
- Removed sections: none
- Templates requiring updates:
  - ✅ .specify/templates/plan-template.md
- Follow-up TODOs: none
-->
# NextJS Starter Constitution

## Core Principles

### I. Implement Dark Mode
A dark mode shall be implemented to provide a better user experience in low-light environments.

### II. Replace Resend with Brevo
The email service provider will be switched from Resend to Brevo to leverage different features or pricing.

### III. Strict Type Safety
TypeScript code MUST be written with strict type safety. The use of `any` is forbidden unless explicitly justified for a specific, unavoidable reason.

### IV. Separation of Concerns
A strict separation of concerns MUST be enforced application-wide. Business logic and computation MUST be isolated in libraries (`/lib`) or hooks (`/hooks`), not embedded directly in UI components.

### V. Reusability and File Size
Components SHOULD be designed for reusability. All files MUST NOT exceed a maximum length of 500 lines to maintain readability and focus.

### VI. Secure API Key Management
All service or API keys MUST be managed securely on the backend. Client-side applications MUST NOT directly access or store these keys. All API calls requiring sensitive keys MUST be proxied through the backend.

### VII. Immutable UI Component Base
This application uses shadcn UI components. The base styles and structure of these components MUST NOT be modified directly. All customizations and style changes MUST be implemented in derived, higher-level components.

### VIII. Standardized Component Scaffolding
New UI components from the shadcn library MUST be added to the project exclusively through the official `shadcn-cli` tool to ensure consistency and proper integration.

### IX. Development Server Autonomy
The development server is managed by the user and runs as a background process. The agent MUST NOT start, stop, or restart the dev server. The agent MAY execute other commands such as `npm run build`, `npm run lint`, or type-checking commands.

## [SECTION_2_NAME]

[SECTION_2_CONTENT]

## [SECTION_3_NAME]

[SECTION_3_CONTENT]

## Governance

This constitution guides the project's development. Amendments require updating this document and propagating changes to related templates.

**Version**: 0.4.0 | **Ratified**: 2025-09-28 | **Last Amended**: 2025-09-28