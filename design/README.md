# Design folder (master copy)

**iPad Prompter design system v1.3 · 4 Nov 2026 · FROZEN.** Same version line as the design system artifact.
From the start of Block 3 this folder is the master; the app imports from it (no copies). New design ideas go to Later, not here.

- `tokens.css` — built from the artifact's `tokens.json` v1.1 (the artifact's generated `tokens.css` was stale: no `circle-armed`, still had the serif font).
- `components.css` — component styles (`.p-*`), copied from the artifact's `components/bundle.css` v1.1.
- `fonts/` — FiraGO 400/500/600 (Latin only, trimmed) and Noto Sans Georgian 500 (Georgian + Latin). Both OFL 1.1, from the Fontsource npm packages (the artifact's own font files cannot be read from outside it; same families).

## Changes
- **v1.3 (4 Nov 2026):** no visual change. The Script pad (`.p-pad`) now shows the iPad screen itself (same scaled drawing as `.p-preview`; `.p-pad__t` removed), and both windows take the iPad's aspect ratio (sized in JS). `.p-pad` is `box-sizing:border-box`.
- **v1.2 (4 Nov 2026):** added `.p-preview` (miniature of the iPad reading view, used at the top of Look) and `.p-switch` (two-way view switch, phone Look: Preview / Script text). v1.1 bug fix: toggle knob centered (border drawn as inset shadow).
