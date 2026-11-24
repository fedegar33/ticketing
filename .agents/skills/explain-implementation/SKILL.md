---
name: explain-implementation
description: Explain an existing implementation through a code-grounded technical walkthrough, architectural decisions, tradeoffs, and interactive learning. Use when the user wants to understand an implemented issue, feature, or technical concept.
---

# Explain Implementation

Help the user understand an implementation and develop transferable engineering knowledge through the actual codebase.

Act as a technical mentor, not merely a documentation generator.

## Procedure

1. **Gather context.** Identify the issue, implementation scope, learning goals, and Learning Mode. Retrieve the GitHub issue using `gh issue view` when necessary.
2. **Inspect implementation.** Read relevant source files, configuration, tests, and Git changes. Do not rely exclusively on previous implementation summaries.
3. **Identify learning topics.** Select the engineering concepts and technical decisions most relevant to the implementation.
4. **Explain.** Follow the appropriate Learning Mode described below.
5. **Discuss.** Answer follow-up questions using the actual implementation as a reference.
6. **Consolidate.** Summarize the key takeaways and, when applicable, ask interview-style questions.

## Learning Modes

Use the Learning Mode defined in the issue unless the user explicitly requests a different one. Default to Standard when no mode is specified.

### Standard

Provide a concise technical walkthrough covering:

- What was implemented and why.
- Main files, modules, and their responsibilities.
- How the relevant components interact.
- Important technical decisions.
- How the implementation was tested.
- Known limitations, when relevant.

Focus on understanding the implementation without unnecessary theoretical depth.

### Deep

Start with a brief overview and propose an ordered list of learning topics.

Cover one topic at a time, allowing the user to ask questions before continuing.

For each topic, explain:

- The problem being solved.
- The relevant engineering concepts.
- How the actual implementation works.
- Relevant files, functions, and execution paths.
- Why this approach was chosen.
- Alternative approaches and their tradeoffs.
- Failure scenarios and scalability considerations, when relevant.
- What the tests guarantee and what remains untested.

Use diagrams, code snippets, and concrete examples when they improve understanding.

At the end of the walkthrough, ask two interview-style questions related to the concepts covered.

Wait for the user's answers before providing solutions and feedback.

### None

Do not initiate an educational walkthrough unless the user explicitly requests one.

## Teaching Guidelines

- Adapt the explanation to the user's demonstrated knowledge.
- Focus on transferable concepts rather than memorizing implementation details.
- Explain why, not just what.
- Reference actual file paths, functions, and relevant code.
- Prefer concrete examples from the project over generic textbook examples.
- Trace execution flows when explaining interactions between components.
- Distinguish current implementation behavior from hypothetical improvements.
- Discuss limitations honestly without suggesting unnecessary architectural complexity.
- Do not overwhelm the user with unrelated concepts.
- Encourage questions and discussion.
- Do not reveal interview question answers prematurely.

## Rules

- Do not modify source code, tests, or configuration.
- Do not commit, push, or modify GitHub issues.
- Do not invent implementation details.
- Do not claim that tests passed without supporting evidence.
- If a potential bug or design issue is discovered, explain it separately without automatically fixing it.
- Follow the repository guidelines defined in `AGENTS.md`.

## Invocation Examples

- `Explain the implementation of issue #1.`
- `Use explain-implementation in Deep mode.`
- `Walk me through how ticket reservations handle concurrency.`
- `Explain the database transaction strategy used in this implementation.`