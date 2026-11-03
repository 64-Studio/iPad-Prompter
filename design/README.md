# Design folder (master copy)

**iPad Prompter design system v1.1 · 3 Nov 2026 · FROZEN.** Same version line as the design system artifact.
From the start of Block 3 this folder is the master; the app imports from it (no copies). New design ideas go to Later, not here.

- `tokens.css` — built from the artifact's `tokens.json` v1.1 (the artifact's generated `tokens.css` was stale: no `circle-armed`, still had the serif font).
- `components.css` — component styles (`.p-*`), copied from the artifact's `components/bundle.css` v1.1.
- `fonts/` — FiraGO 400/500/600 (Latin only, trimmed) and Noto Sans Georgian 500 (Georgian + Latin). Both OFL 1.1, from the Fontsource npm packages (the artifact's own font files cannot be read from outside it; same families).
