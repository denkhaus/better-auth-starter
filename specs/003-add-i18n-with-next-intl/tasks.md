# Tasks: Internationalization with Next-intl

**Input**: Design documents from `/specs/003-add-i18n-with-next-intl/`
**Prerequisites**: plan.md (required), research.md, data-model.md, contracts/

## Execution Flow (main)
```
1. Load plan.md from feature directory
   → If not found: ERROR "No implementation plan found"
   → Extract: tech stack, libraries, structure
2. Load optional design documents:
   → data-model.md: Extract entities → model tasks
   → contracts/: Each file → contract test task
   → research.md: Extract decisions → setup tasks
3. Generate tasks by category:
   → Setup: project init, dependencies, linting
   → Tests: contract tests, integration tests
   → Core: models, services, CLI commands
   → Integration: DB, middleware, logging
   → Polish: unit tests, performance, docs
4. Apply task rules:
   → Different files = mark [P] for parallel
   → Same file = sequential (no [P])
   → Tests before implementation (TDD)
5. Number tasks sequentially (T001, T002...)
6. Generate dependency graph
7. Create parallel execution examples
8. Validate task completeness:
   → All contracts have tests?
   → All entities have models?
   → All endpoints implemented?
9. Return: SUCCESS (tasks ready for execution)
```

## Format: `[ID] [P?] Description`
- **[P]**: Can run in parallel (different files, no dependencies)
- Include exact file paths in descriptions

## Path Conventions
- **Single project**: `src/`, `tests/` at repository root
- **Web app**: `backend/src/`, `frontend/src/`
- **Mobile**: `api/src/`, `ios/src/` or `android/src/`
- Paths shown below assume single project - adjust based on plan.md structure

## Phase 3.1: Setup
- [x] T001 Install next-intl dependency in package.json
- [x] T002 Create locales directory structure at public/locales/
- [x] T003 [P] Create initial English translation file at public/locales/en.json
- [x] T004 [P] Create initial German translation file at public/locales/de.json
- [x] T005 Configure Next.js for internationalization in next.config.ts
- [x] T006 [P] Create Language Toggle component at src/components/language-toggle.tsx

## Phase 3.2: Tests First (TDD) ⚠️ MUST COMPLETE BEFORE 3.3
**CRITICAL: These tests MUST be written and MUST FAIL before ANY implementation**
- [x] T007 [P] Contract test GET /api/locale/{locale} in tests/contract/test_locale_api.ts
- [x] T008 [P] Contract test POST /api/user/locale in tests/contract/test_user_locale_api.ts
- [x] T009 [P] Integration test default language loading in tests/integration/test_default_language.ts
- [x] T010 [P] Integration test language switching in tests/integration/test_language_switching.ts
- [x] T011 [P] Integration test translation fallback in tests/integration/test_fallback_behavior.ts
- [x] T012 [P] Integration test Better-Auth internationalization in tests/integration/test_auth_i18n.ts
- [x] T013 [P] Integration test language preference persistence in tests/integration/test_language_persistence.ts

## Phase 3.3: Core Implementation (ONLY after tests are failing)
- [x] T014 Create LanguagePreference service in src/services/language-preference-service.ts
- [x] T015 Implement GET /api/locale/{locale} endpoint in src/app/api/locale/[locale]/route.ts
- [x] T016 Implement POST /api/user/locale endpoint in src/app/api/user/locale/route.ts
- [x] T017 Configure Next.js middleware for locale detection in middleware.ts
- [x] T018 Update layout.tsx to support multiple languages using next-intl
- [x] T019 Create client-side language context for state management in src/contexts/language-context.tsx
- [x] T020 Internationalize homepage content in src/app/page.tsx
- [x] T021 Create better-auth internationalization wrapper in src/lib/auth-i18n.ts
- [x] T022 Update login page for internationalization in src/app/auth/login/page.tsx
- [x] T023 Update register page for internationalization in src/app/auth/register/page.tsx

## Phase 3.4: Integration
- [x] T024 Connect language toggle to locale switching functionality
- [x] T025 Implement locale-specific date and number formatting
- [x] T026 Integrate language preferences with local storage
- [x] T027 Update README.md to document internationalization feature
- [x] T028 Add internationalization mention to homepage in both languages

## Phase 3.5: Polish
- [x] T029 [P] Unit tests for LanguagePreference service in tests/unit/test_language_service.ts
- [x] T030 [P] Unit tests for translation fallback logic in tests/unit/test_fallback_logic.ts
- [x] T031 Performance tests for translation loading speed
- [x] T032 [P] Update documentation in docs/i18n-usage.md
- [x] T033 Add accessibility attributes to language toggle
- [x] T034 Run manual-testing.md validation scenarios

## Dependencies
- T001 blocks T015, T018
- T003-T004 blocks T015
- Tests (T007-T013) before implementation (T014-T023)
- T014 blocks T016
- T015 blocks T018
- T018 blocks T020, T022, T023
- T019 blocks T024
- Implementation before polish (T029-T034)

## Parallel Example
```
# Launch T003-T004 together:
Task: "Create initial English translation file at public/locales/en.json"
Task: "Create initial German translation file at public/locales/de.json"

# Launch T007-T013 together:
Task: "Contract test GET /api/locale/{locale} in tests/contract/test_locale_api.ts"
Task: "Contract test POST /api/user/locale in tests/contract/test_user_locale_api.ts"
Task: "Integration test default language loading in tests/integration/test_default_language.ts"
Task: "Integration test language switching in tests/integration/test_language_switching.ts"
Task: "Integration test translation fallback in tests/integration/test_fallback_behavior.ts"
Task: "Integration test Better-Auth internationalization in tests/integration/test_auth_i18n.ts"
Task: "Integration test language preference persistence in tests/integration/test_language_persistence.ts"

# Launch T029-T030 together:
Task: "Unit tests for LanguagePreference service in tests/unit/test_language_service.ts"
Task: "Unit tests for translation fallback logic in tests/unit/test_fallback_logic.ts"
```

## Notes
- [P] tasks = different files, no dependencies
- Verify tests fail before implementing
- Commit after each task
- Avoid: vague tasks, same file conflicts

## Task Generation Rules
*Applied during main() execution*

1. **From Contracts**:
   - Each contract file → contract test task [P]
   - Each endpoint → implementation task

2. **From Data Model**:
   - Each entity → model creation task [P]
   - Relationships → service layer tasks

3. **From User Stories**:
   - Each story → integration test [P]
   - Quickstart scenarios → validation tasks

4. **Ordering**:
   - Setup → Tests → Models → Services → Endpoints → Polish
   - Dependencies block parallel execution

## Validation Checklist
*GATE: Checked by main() before returning*

- [x] All contracts have corresponding tests
- [x] All entities have model tasks
- [x] All tests come before implementation
- [x] Parallel tasks truly independent
- [x] Each task specifies exact file path
- [x] No task modifies same file as another [P] task
