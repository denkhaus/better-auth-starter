# Tasks: Implement Dark Mode

**Input**: Design documents from `/specs/001-implement-dark-mode/`

## Phase 3.1: Setup
- [X] T001 [P] Install Zustand for state management: `npm install zustand`
- [X] T002 [P] Install Vitest and required testing libraries: `npm install -D vitest @vitejs/plugin-react @testing-library/react`
- [X] T003 [P] Configure Vitest by creating a `vitest.config.ts` file.

## Phase 3.2: Core Implementation
- [X] T004 Create the theme store in `src/store/theme-store.ts` using Zustand to manage `theme` and `setTheme`.
- [X] T005 Create a hook `src/hooks/use-theme.ts` that uses the theme store and handles persistence to Local Storage (with cookie fallback).
- [X] T006 Create the `ThemeToggle.tsx` component in `src/components/ui/` that uses the `useTheme` hook and renders a sun/moon toggle button.
- [X] T007 Integrate the `ThemeToggle` component into the main navigation bar in `src/components/landing/navbar.tsx`.
- [X] T008 Update the root layout in `src/app/layout.tsx` to apply the theme class to the `<html>` or `<body>` tag based on the theme from the store.

## Phase 3.3: Tests
- [X] T009 [P] Write unit tests for the theme store in `src/store/theme-store.test.ts` to verify state changes.
- [X] T010 [P] Write tests for the `useTheme` hook in `src/hooks/use-theme.test.ts` to verify persistence logic.
- [X] T011 [P] Write a component test for `ThemeToggle.tsx` in `src/components/ui/ThemeToggle.test.tsx` to verify rendering and user interaction.

## Phase 3.4: Polish
- [X] T012 Review the implementation and ensure the fade transition is smooth.
- [X] T013 Run the manual tests described in `quickstart.md` to ensure all acceptance criteria are met.

## Dependencies
- `T001`, `T002`, `T003` must be completed before all other tasks.
- `T004` must be completed before `T005`.
- `T005` must be completed before `T006`.
- `T006` must be completed before `T007`.
- Core implementation tasks (`T004`-`T008`) should be completed before testing tasks (`T009`-`T011`).
