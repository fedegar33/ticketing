# AGENTS.md

## Project Overview

This project is a ticketing platform inspired by Ticketmaster, designed as a practical learning environment for backend engineering, system design, and AI-assisted software development.

The goal is to build a realistic application incrementally while understanding architectural decisions, tradeoffs, and engineering fundamentals.

## Technology Stack

- Monorepo: Turborepo and pnpm workspaces
- Language: TypeScript
- Backend: Node.js and Fastify
- Database: PostgreSQL
- ORM: Drizzle
- Frontend: Next.js
- Infrastructure: Docker and Docker Compose

Introduce additional technologies only when justified by actual requirements.

## Architecture Principles

- Start with a modular monolith.
- Prefer simple, explicit, and maintainable solutions.
- Keep domain boundaries clear.
- Avoid premature abstractions and unnecessary shared packages.
- Do not introduce microservices, message brokers, caching layers, or API gateways until justified.
- Favor incremental architectural evolution over speculative design.
- Discuss significant architectural decisions and their tradeoffs with the user before implementation.

## Development Guidelines

- Inspect the existing codebase before making changes.
- Follow established repository conventions.
- Keep changes focused on the agreed task.
- Preserve existing behavior outside the task's scope.
- Add or update tests for new or modified behavior.
- Prefer deterministic, behavior-oriented tests.
- Avoid unnecessary dependencies.
- Never hardcode secrets or commit credentials.
- Document relevant configuration and setup changes.
- Ask for clarification when requirements materially affect the implementation.

## Git and Workspace Isolation

- Use a dedicated Git worktree and feature branch for each implementation task.
- Worktree creation and lifecycle are managed externally by the development environment.
- Operate only within the assigned workspace.
- Verify the current branch and worktree before making implementation changes.
- Never create, remove, or switch worktrees or branches without explicit user approval.
- Do not implement changes directly on the default branch.
- If the current workspace is not properly isolated, report the issue and wait for instructions.
- Preserve unrelated changes and never modify another task's workspace.
- Do not assume that runtime resources such as ports, databases, or Docker containers are isolated between worktrees.

## Git Conventions

- Keep commits focused and meaningful.
- Use Conventional Commits.
- Reference the associated GitHub issue when appropriate.
- Never commit, push, create pull requests, merge branches, or close issues without explicit user authorization.
- Never discard unrelated changes or perform destructive Git operations without approval.

## Issue-Based Workflow

GitHub Issues define the scope and acceptance criteria of implementation tasks.

The expected workflow is:

1. Discuss requirements and architectural decisions.
2. Create a GitHub issue using `create-issue`.
3. Start a dedicated worktree from the appropriate base branch.
4. Implement the issue using `implement-issue`.
5. Validate the implementation using `verify-implementation`.
6. Review and understand the implementation.
7. Finalize the feature after user approval.

Use the corresponding skill when available instead of duplicating its procedure.

Do not expand the scope of an issue without discussing it with the user.

## Validation

Every implementation must be validated before being considered complete.

Use the `verify-implementation` skill as the source of truth for the validation procedure.

- Prefer repository-defined scripts and Turborepo tasks.
- Verify both code quality and acceptance criteria.
- Fix implementation-related failures and repeat the relevant checks.
- Report missing checks, unresolved failures, and environmental blockers.
- Never claim successful validation without supporting evidence.

## Learning and Collaboration

Learning is a first-class goal of this project.

Respect the Learning Mode defined in each issue:

- **Deep:** Detailed technical walkthrough, architectural decisions, alternatives, tradeoffs, failure scenarios, and two interview-style questions.
- **Standard:** Concise explanation of the implementation, key decisions, and relevant files.
- **None:** No additional educational walkthrough.

When explaining an implementation:

- Reference actual files, functions, and code paths.
- Explain why decisions were made, not just what changed.
- Connect implementation details to relevant engineering concepts.
- Discuss limitations and alternatives when meaningful.
- Distinguish current implementation behavior from hypothetical improvements.

Do not automatically start a detailed educational walkthrough after implementation. Wait for the user to request it.

## Communication

- Communicate with the user in their preferred language.
- Write code, code comments, GitHub issues, commit messages, and technical documentation in English.
- Be concise and explicit about assumptions, decisions, and blockers.
- Distinguish verified facts from assumptions.
- Do not hide failures or incomplete work.