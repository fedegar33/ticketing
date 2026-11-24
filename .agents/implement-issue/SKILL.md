---
name: implement-issue
description: Implement an existing GitHub issue by inspecting the repository, planning changes, writing code and tests, and verifying the implementation. Use when the user asks to implement or work on a GitHub issue.
---

# Implement Issue

Implement a GitHub issue according to its requirements and acceptance criteria, following the repository guidelines defined in `AGENTS.md`.

## Procedure

1. **Load issue.** Retrieve the issue using the GitHub Integration section below. Identify its description, acceptance criteria, technical notes, and learning goals.
2. **Inspect repository and workspace.** Understand the current architecture, relevant files, existing conventions, and Git working tree status. Verify that the current branch and worktree comply with the workspace isolation rules defined in `AGENTS.md` before making changes.
3. **Plan.** Present a concise implementation plan, including affected workspaces, key technical decisions, and testing strategy.
4. **Clarify and confirm.** Ask for clarification when requirements are ambiguous. Request approval before making significant architectural decisions or expanding the agreed scope.
5. **Implement.** Make the necessary changes and add or update relevant tests.
6. **Verify.** Follow the Validation section below.
7. **Report.** Summarize the implementation using the report format below.

## GitHub Integration

Use GitHub CLI (`gh`) to retrieve the issue:

```bash
gh issue view ISSUE_NUMBER
```

If the repository is ambiguous, resolve it explicitly using `--repo OWNER/REPO`.

Read relevant issue comments when they contain additional requirements or agreed decisions.

If the issue cannot be retrieved, report the blocker. Do not invent requirements or proceed based on assumptions.

## Implementation Rules

- Treat the issue and agreed decisions as the source of truth for scope.
- Follow existing repository conventions and `AGENTS.md`.
- Prefer simple, maintainable solutions over premature abstractions.
- Preserve existing behavior outside the scope of the issue.
- Add or update tests for new or modified behavior.
- Do not overwrite or revert unrelated user changes.
- Do not introduce unnecessary dependencies or infrastructure.
- If a requirement cannot be satisfied as written, discuss it with the user before changing the approach.
- Do not modify the issue, commit, push, or create a pull request.

## Validation

Use the `verify-implementation` skill to validate the implementation.

If verification fails due to implementation issues, fix them and repeat the relevant checks.

If verification is blocked by environmental issues or missing prerequisites, report the blocker.

Do not consider the implementation complete while required checks or acceptance criteria remain unverified.

## Report Format

### Implementation Summary

Briefly describe what was implemented.

### Key Changes

List the main files or modules changed and their responsibilities.

### Technical Decisions

Summarize relevant decisions and deviations from the original plan, if any.

### Verification

Include the final verification results from `verify-implementation`.

### Remaining Work

Report unresolved requirements, blockers, or known limitations. Omit if there are none.

### Learning

Preserve the issue's Learning Mode and learning goals for a subsequent walkthrough using `explain-implementation`.

Do not automatically start a detailed educational walkthrough.

## Invocation Examples

- `Implement issue #1.`
- `Use implement-issue for GitHub issue #5.`
- `Implement issue #3, but show me the plan before making any changes.`
