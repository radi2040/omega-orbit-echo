## Project rules
- All user-facing copy is bilingual via `L = { en, de }` objects from `src/lib/i18n.tsx`, rendered with `useT()`; content lives in `src/content/*`, not inline in components — keeps English/German in sync.
- Lab simulations are pure deterministic functions in `src/lib/sim/*` with tests in `src/lib/sim/sim.test.ts`; UI components only render their results — keeps models auditable and testable.
- Every factual claim carries an evidence class (`src/content/evidence.ts`); research entries must be real, identifiable works — the site's credibility depends on it.
- Domain accents are applied with `data-accent` + `.accent-*` classes in `src/styles.css`, never hardcoded colors.
