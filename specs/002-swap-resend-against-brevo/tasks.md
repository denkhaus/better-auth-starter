# Tasks for Replace Resend with Brevo for Email Service

This document outlines the actionable, dependency-ordered tasks for implementing the "Replace Resend with Brevo for Email Service" feature.

## Setup Tasks

- [X] T001: Install Brevo SDK dependency.
  - **File**: `package.json`
  - **Command**: `npm install @getbrevo/brevo`
  - **Description**: Add the official Brevo SDK to the project dependencies.

- [X] T002: Remove Resend SDK dependency.
  - **File**: `package.json`
  - **Command**: `npm uninstall resend`
  - **Description**: Remove the Resend library and its related configurations from the project.

## Core Tasks

- [X] T003: Update environment variables for Brevo API key and sender email.
  - **File**: `.env.example`, `.env.local` (and potentially `src/lib/config.ts` if hardcoded values exist)
  - **Description**: Modify existing environment variables or add new ones to store the Brevo API key and the default sender email address.

- [X] T004: Refactor existing email sending logic to use Brevo SDK.
  - **File**: `src/lib/email.ts` (or other files where email sending logic resides)
  - **Description**: Identify all instances where the Resend library was used for sending emails and refactor the code to utilize the newly integrated Brevo SDK. This includes user verification, password resets, and any other email communications.

## Test Tasks [P]

- [X] T005 [P]: Create an integration test to verify successful email sending via Brevo API.
  - **File**: `tests/integration/email.test.ts` (new file)
  - **Description**: Implement a test that triggers an email sending event and asserts that the email is successfully sent using the Brevo API (e.g., by mocking the Brevo API call and checking its invocation).

- [X] T006 [P]: Create an integration test to verify dependency management.
  - **File**: `tests/integration/dependencies.test.ts` (new file)
  - **Description**: Implement a test that checks the `package.json` file to ensure the Resend library is removed and the Brevo SDK is present.

- [X] T007 [P]: Create an integration test to verify error handling with an invalid Brevo API key.
  - **File**: `tests/integration/email-error.test.ts` (new file)
  - **Description**: Implement a test that simulates an invalid Brevo API key and asserts that appropriate error handling is triggered and logged, without exposing sensitive information.

## Polish Tasks [P]

- [X] T008 [P]: Update relevant documentation (e.g., README) to reflect the change from Resend to Brevo.
  - **File**: `README.md`
  - **Description**: Add a section to the `README.md` file documenting the migration from Resend to Brevo for email services, including any new configuration or implications for developers.

## Parallel Execution Guidance

Tasks marked with `[P]` can be executed in parallel as they are independent of each other. For example, T005, T006, T007, and T008 can be worked on concurrently after the core tasks are completed.
