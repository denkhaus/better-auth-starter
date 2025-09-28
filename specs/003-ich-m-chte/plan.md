
# Implementation Plan: Internationalization with Next-intl

**Branch**: `003-ich-m-chte` | **Date**: 2025-09-28 | **Spec**: [specs/003-ich-m-chte/spec.md](/specs/003-ich-m-chte/spec.md)
**Input**: Feature specification from `/specs/003-ich-m-chte/spec.md`

## Execution Flow (/plan command scope)
```
1. Load feature spec from Input path
   → If not found: ERROR "No feature spec at {path}"
2. Fill Technical Context (scan for NEEDS CLARIFICATION)
   → Detect Project Type from file system structure or context (web=frontend+backend, mobile=app+api)
   → Set Structure Decision based on project type
3. Fill the Constitution Check section based on the content of the constitution document.
4. Evaluate Constitution Check section below
   → If violations exist: Document in Complexity Tracking
   → If no justification possible: ERROR "Simplify approach first"
   → Update Progress Tracking: Initial Constitution Check
5. Execute Phase 0 → research.md
   → If NEEDS CLARIFICATION remain: ERROR "Resolve unknowns"
6. Execute Phase 1 → contracts, data-model.md, quickstart.md, agent-specific template file (e.g., `CLAUDE.md` for Claude Code, `.github/copilot-instructions.md` for GitHub Copilot, `GEMINI.md` for Gemini CLI, `QWEN.md` for Qwen Code or `AGENTS.md` for opencode).
7. Re-evaluate Constitution Check section
   → If new violations: Refactor design, return to Phase 1
   → Update Progress Tracking: Post-Design Constitution Check
8. Plan Phase 2 → Describe task generation approach (DO NOT create tasks.md)
9. STOP - Ready for /tasks command
```

**IMPORTANT**: The /plan command STOPS at step 7. Phases 2-4 are executed by other commands:
- Phase 2: /tasks command creates tasks.md
- Phase 3-4: Implementation execution (manual or via tools)

## Summary
This plan implements internationalization for a Next.js application using the next-intl library. The implementation will support German (default) and English languages, with a toggle UI for users to switch between languages. The solution will include proper fallback mechanisms for missing translations, locale-specific formatting for dates and numbers, and internationalization of Better-Auth components.

## Technical Context
**Language/Version**: TypeScript 5.x, React 19, Next.js 15.3.2  
**Primary Dependencies**: next-intl, Better Auth, React, Next.js  
**Storage**: Local storage for language preferences  
**Testing**: Vitest, React Testing Library  
**Target Platform**: Web application (SSR/Client components)
**Project Type**: Web application (frontend Next.js app with authentication)  
**Performance Goals**: Minimal impact on page load times, efficient client-side language switching
**Constraints**: Must maintain compatibility with existing Better-Auth components, preserve accessibility features
**Scale/Scope**: Support for 2 languages (de/en) with potential for future expansion

## Constitution Check
*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

Based on the constitution document:
- Library-First: Using next-intl library as the internationalization solution
- CLI Interface: Not applicable for this UI feature
- Test-First (NON-NEGOTIABLE): Will implement tests for internationalization
- Integration Testing: Testing of internationalized Better-Auth components
- Observability: Proper error handling for missing translations

## Project Structure

### Documentation (this feature)
```
specs/003-ich-m-chte/
├── plan.md              # This file (/plan command output)
├── research.md          # Phase 0 output (/plan command)
├── data-model.md        # Phase 1 output (/plan command)
├── quickstart.md        # Phase 1 output (/plan command)
├── contracts/           # Phase 1 output (/plan command)
└── tasks.md             # Phase 2 output (/tasks command - NOT created by /plan)
```

### Source Code (repository root)
Web application with existing Next.js structure. The internationalization will be implemented by:
1. Adding locale configuration to Next.js
2. Creating translation files in public/locales/
3. Updating layout.tsx to support multiple languages
4. Creating internationalized versions of UI components including Better-Auth components
5. Implementing language toggle functionality

```
src/
├── app/
│   ├── layout.tsx
│   ├── page.tsx
│   └── auth/
│       ├── login/
│       └── register/
├── components/
├── lib/
│   └── auth.ts
├── hooks/
└── utils/

public/
├── locales/
│   ├── en.json
│   └── de.json
└── ...

tests/
├── unit/
└── integration/
```

**Structure Decision**: This is a web application with existing Next.js structure. The internationalization will be implemented by:
1. Adding locale configuration to Next.js
2. Creating translation files in public/locales/
3. Updating layout.tsx to support multiple languages
4. Creating internationalized versions of UI components including Better-Auth components
5. Implementing language toggle functionality

## Phase 0: Outline & Research
1. **Extract unknowns from Technical Context** above:
   - For each NEEDS CLARIFICATION → research task
   - For each dependency → best practices task
   - For each integration → patterns task

2. **Generate and dispatch research agents**:
   ```
   For each unknown in Technical Context:
     Task: "Research {unknown} for {feature context}"
   For each technology choice:
     Task: "Find best practices for {tech} in {domain}"
   ```

3. **Consolidate findings** in `research.md` using format:
   - Decision: [what was chosen]
   - Rationale: [why chosen]
   - Alternatives considered: [what else evaluated]

**Output**: research.md with all NEEDS CLARIFICATION resolved

## Phase 1: Design & Contracts
*Prerequisites: research.md complete*

1. **Extract entities from feature spec** → `data-model.md`:
   - Language settings with user preferences
   - Locale-specific content configuration

2. **Generate API contracts** from functional requirements:
   - Language switching endpoints if needed
   - Translation loading endpoints

3. **Generate contract tests** from contracts:
   - Test locale switching functionality
   - Test fallback behavior for missing translations
   - Test Better-Auth component internationalization

4. **Extract test scenarios** from user stories:
   - Each story → integration test scenario
   - Quickstart test = language switching validation steps

5. **Update agent file incrementally** (O(1) operation):
   - Run `.specify/scripts/bash/update-agent-context.sh qwen`
     **IMPORTANT**: Execute it exactly as specified above. Do not add or remove any arguments.
   - If exists: Add only NEW tech from current plan
   - Preserve manual additions between markers
   - Update recent changes (keep last 3)
   - Keep under 150 lines for token efficiency
   - Output to repository root

**Output**: data-model.md, /contracts/*, failing tests, quickstart.md, agent-specific file

## Phase 2: Task Planning Approach
*This section describes what the /tasks command will do - DO NOT execute during /plan*

**Task Generation Strategy**:
- Load `.specify/templates/tasks-template.md` as base
- Generate tasks from Phase 1 design docs (contracts, data model, quickstart)
- Each contract → contract test task [P]
- Each entity → configuration task [P] 
- Each user story → integration test task
- Implementation tasks to make tests pass

**Ordering Strategy**:
- TDD order: Tests before implementation 
- Dependency order: Configuration before components before UI
- Mark [P] for parallel execution (independent files)

**Estimated Output**: 25-30 numbered, ordered tasks in tasks.md

**IMPORTANT**: This phase is executed by the /tasks command, NOT by /plan

## Phase 3+: Future Implementation
*These phases are beyond the scope of the /plan command*

**Phase 3**: Task execution (/tasks command creates tasks.md)  
**Phase 4**: Implementation (execute tasks.md following constitutional principles)  
**Phase 5**: Validation (run tests, execute quickstart.md, performance validation)

## Complexity Tracking
*Fill ONLY if Constitution Check has violations that must be justified*

| Violation | Why Needed | Simpler Alternative Rejected Because |
|-----------|------------|-------------------------------------|
| Integration with Better-Auth | Feature requires internationalized auth components | Would create inconsistent UX if auth remains in default language |

## Progress Tracking
*This checklist is updated during execution flow*

**Phase Status**:
- [x] Phase 0: Research complete (/plan command)
- [x] Phase 1: Design complete (/plan command)
- [ ] Phase 2: Task planning complete (/plan command - describe approach only)
- [ ] Phase 3: Tasks generated (/tasks command)
- [ ] Phase 4: Implementation complete
- [ ] Phase 5: Validation passed

**Gate Status**:
- [x] Initial Constitution Check: PASS
- [ ] Post-Design Constitution Check: PASS
- [x] All NEEDS CLARIFICATION resolved
- [x] Complexity deviations documented

---
*Based on Constitution v2.1.1 - See `/memory/constitution.md`*
