---
name: verify-implementation
description: Verify an implementation by running repository checks and validating acceptance criteria. Use after implementing an issue, before finalizing a feature, or when explicitly asked to verify changes.
---

# Verify Implementation

Validate the current implementation against the repository's quality standards and the task's acceptance criteria.

## Procedure

1. **Gather context.** Identify the issue, acceptance criteria, changed files, and affected workspaces.
2. **Discover checks.** Inspect the root and relevant workspace `package.json` files and Turborepo configuration to identify available validation commands.
3. **Run checks.** Execute the applicable checks defined below.
4. **Validate acceptance criteria.** Evaluate each criterion against the implementation and available test results.
5. **Report.** Provide a concise verification report using the format below.

## Quality Checks

Run the following checks when available and applicable:

- Lint
- Type checking
- Unit tests
- Integration tests
- Build

Prefer root-level scripts and existing Turborepo tasks over ad hoc commands.

Run additional smoke tests when necessary to verify acceptance criteria.

## Rules

- Do not invent commands or assume that a check exists.
- Do not modify implementation code, tests, or configuration to make checks pass.
- Do not disable checks or weaken assertions.
- Distinguish implementation failures from environment or dependency issues.
- Never report a check as passed unless it was successfully executed.
- Report missing checks and explain why any check was skipped or blocked.
- Do not consider verification successful if required checks or acceptance criteria fail or remain unverified.
- Do not commit, push, or modify GitHub issues.

## Report Format

### Verification Summary

**Status:** Passed | Failed | Incomplete

### Quality Checks

| Check | Status | Details |
|---|---|---|
| Lint | | |
| Typecheck | | |
| Unit tests | | |
| Integration tests | | |
| Build | | |

Available statuses: Passed, Failed, Skipped, Blocked, Not applicable.

### Acceptance Criteria

Report each acceptance criterion with its status and supporting evidence.

### Findings

Report failures, blockers, missing coverage, and remaining risks. Omit this section if there are none.
