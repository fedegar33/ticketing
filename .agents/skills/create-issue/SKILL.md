---
name: create-issue
description: Turn an agreed feature, bug, or engineering task discussed in the current conversation into a concise GitHub Issue. Use when the user asks to draft or create an issue, including requests like /create-issue.
---

# Create GitHub Issue

Convert the **current conversation and agreed decisions** into one actionable issue. This skill creates issues; it does not implement them.

## Procedure

1. **Gather context.** Identify the desired outcome, scope, constraints, explicit decisions, and unresolved questions from the conversation. Inspect repository files only when needed to avoid inaccurate assumptions. Never treat a planned component as already implemented.
2. **Resolve repository and check duplicates.** Follow **GitHub Integration** below to identify the repository and search existing issues. If a similar issue exists, show it and ask whether to update it or create a distinct issue.
3. **Clarify sparingly.** Ask only questions that materially affect scope or testable outcomes. Preserve genuinely open design decisions as open questions; do not invent requirements.
4. **Draft.** Use the template below. Keep the issue small enough for one coherent implementation. Suggest splitting large scopes, but do not create multiple issues without approval.
5. **Confirm.** Display the full title and body. Explicitly request approval to publish. Do not publish based only on approval of the technical design.
6. **Publish after approval.** Follow **GitHub Integration** below. If publication is unavailable, provide a ready-to-paste draft and explain what is missing.
7. **Report.** Return the issue number and URL, or explain why publication did not happen. Do not start coding, commit, or push.

## GitHub Integration

Use the GitHub CLI (`gh`) to read and create issues. This section defines **how** to perform the GitHub operations referenced in the procedure; do not repeat these commands elsewhere.

1. **Verify access.** Run `gh auth status`. If `gh` is missing or unauthenticated, explain how to install it or run `gh auth login`; never request or display access tokens.
2. **Resolve the target.** Run `gh repo view --json nameWithOwner --jq .nameWithOwner` from the repository root. If the target is missing or ambiguous, ask for `owner/repo` and pass it with `--repo`; never guess.
3. **Search for duplicates.** Use `gh issue list --repo OWNER/REPO --state all --search "<relevant keywords>"` and inspect likely matches before drafting.
4. **Publish only after explicit approval.** Write the approved body to a temporary Markdown file, then run:

   ```bash
   gh issue create --repo OWNER/REPO --title "<approved title>" --body-file /path/to/approved-issue.md
   ```

5. **Confirm the result.** Report the URL returned by `gh issue create`. If the command fails, report the error and do not imply that the issue was created.

Do not store credentials in the repository or commit temporary issue-body files.

## Issue format

**Title:** `<type>: <short imperative or outcome>`

Use `feat`, `fix`, `chore`, `docs`, `refactor`, or `test` as appropriate.

```markdown
## Description
<Why this task matters and the desired result. Keep to 2–5 sentences.>

## Acceptance Criteria
- [ ] <Observable, verifiable result>
- [ ] <Observable, verifiable result>
- [ ] <Relevant tests or validation, when appropriate>

## Technical Notes
<Optional: agreed stack, constraints, existing interfaces, design decisions, and open questions. Omit if empty.>

## Learning Goals
<Optional: 1–3 concepts the user wants to understand. Omit if not relevant.>

**Learning Mode:** Deep | Standard | None
```

## Writing rules

- Write issues in English; converse with the user in their preferred language.
- Prefer behavioral requirements over prescriptive code-level solutions.
- Include architectural choices only if agreed or necessary for scope.
- Do not invent commands, paths, test suites, services, or existing code.
- Avoid vague criteria like "works correctly"; state how to verify success.
- For scaffolding issues, explicitly distinguish initial applications from fully implemented functionality.
- Default Learning Mode to **Deep** for architecture/system design, **Standard** for scaffolding and routine engineering, and **None** only if requested.
- Do not assign labels, milestones, assignees, or projects unless requested or already established.

## Invocation examples

- `/create-issue` — draft an issue from the current discussion.
- `Use create-issue for the initial monorepo scaffolding we agreed on.`

If the client does not expose skills as slash commands, invoke this skill by name in plain language. Do not claim slash-command support without checking the client.
