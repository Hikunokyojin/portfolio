# Plan: Projects section — Technical Spec (Solution B)

Source: /ecc:multi-frontend; Antigravity analyzer + architect, synthesized by Claude.
User decisions: Solution B; no per-project repo/live links; no expand toggle.

## Data (src/data/profile.ts)
- Replace `body` with `spec: { problem, built, result }` (facts only, from About Me/profile.md and Templates/resume-bullet-bank.md).
- Add `period` and `role` per project (from profile): SAGE Jul 2026–present / Course project (VIT BCSE355L);
  LMBridge May–Jul 2026 / Summer intern, Unisys; Aegis 2026 / Research project; ThreadHaul-Daemon 2026 / Team of 3;
  This Portfolio 2026 / Solo build.
- Keep `highlight` as the single metric line; rename tags to match skill names exactly (e.g. "AWS Lambda", "Win32 APIs") so tag highlighting needs no aliases.

## UI (src/App.tsx, Projects)
- Row: header (serif name left; mono period · role right), mono metric line in accent, subtitle.
- `<dl>` with Problem / Built / Result: 72px mono label column on sm+, stacked on mobile.
- Tags as small mono pills; tag equal to the active skill filter gets accent text + accent border.
- Layout-shift fix: permanent `border-l-2 pl-4 sm:pl-5`; toggle only `border-l-accent` / `border-l-transparent`.
- Filter banner wrapped in `aria-live="polite"`.
- Keep opacity-25 for non-matches, "More on GitHub" link, motion-reduce respected.

## Verify
- No horizontal shift when toggling filter (measure text x position before/after).
- 390x844 and 1440x900, light + dark; no overflow; build passes.
- Antigravity review of the diff, then deploy.
