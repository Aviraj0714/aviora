<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# Agent Instructions

## Main Rule
* Work with minimal changes. Do not rewrite unrelated code. Do not scan the full project unless required.

## Token Saving Rules
* Inspect only files needed for the current task.
* Do not read the whole codebase unless asked.
* Do not output full files unless requested.
* Use targeted edits instead of rewriting large files.
* Keep final response short.
* Mention only changed files and what changed.
* Do not explain obvious code.
* Do not repeat the user request.
* Do not create unnecessary abstractions.
* Do not install new packages unless absolutely needed.

## Code Style
* Write clean, simple, production-ready code.
* Use TypeScript properly.
* Avoid any `any` unless there is no better option.
* Follow existing folder structure.
* Follow existing naming conventions.
* Reuse existing utilities, hooks, components, and styles.
* Do not refactor working code unless requested.
* Avoid duplicate code.

## Component Rules
* Create small reusable components.
* Keep page files mostly for layout and data flow.
* Move repeated UI into components.
* Move business logic into hooks, server actions, or utilities.
* Avoid very large JSX blocks.
* Keep components focused on one responsibility.
* Keep "use client" as low as possible.

## Next.js Rules
* Use Server Components by default.
* Use Client Components only for state, effects, browser APIs, or user interactions.
* Use server actions or API routes for backend logic.
* Validate input before database operations.
* Add loading, error, and empty states where needed.
* Never expose secrets to the client.

## UI Rules
* Use existing design system components first.
* Keep UI minimal, clean, responsive, and consistent.
* Avoid one-off styling.
* Use consistent spacing, typography, and colors.
* Do not redesign unrelated screens.

## Database/Auth Rules
* Do not change schema unless asked.
* Reuse existing database client.
* Always verify authenticated user before saving private data.
* Always associate user-owned data with `userId`.
* Do not duplicate user records.
* Store only necessary user information.

## Workflow

### Before coding:
1. Identify the smallest set of files needed.
2. Check existing components/utilities first.
3. Make the smallest safe change.

### After coding:
1. Run type check or relevant test if available.
2. Summarize changed files only.
3. Keep response concise.
