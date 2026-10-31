<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

## Repo shape

Single-page portfolio for Aaron Paul, built on the Next.js App Router. `app/page.tsx` composes the sections; `app/layout.tsx` owns fonts, metadata and JSON-LD. Section components live in `components/`, and all copy/links live in `lib/site.ts` (projects, experience, nav) and `lib/tech.ts` (stack + Simple Icons mappings). Design tokens and shared classes are in `app/globals.css` under `@theme inline`. There are no API routes and no database.

The portrait is `public/images/profile.jpeg` (note the extension); the About plate is `public/images/vitruvian-man.jpg`, a public-domain Leonardo da Vinci scan. Project visuals are hand-drawn SVG schematics, not product screenshots — keep them that way unless real screenshots exist. Public profile links, project repos and live demos are centralised in `lib/site.ts`; only `siteUrl` is still a placeholder.

Display type is the system Helvetica stack (`--font-display`, aliased to `--font-sans`); JetBrains Mono is the only loaded webfont. Keep Helvetica for headings and body, and reserve mono for labels, annotations and schematic text. The Y2K styling lives in reusable classes in `app/globals.css` (`tag`, `chrome-pill`, `sticker`, `plate-pastel`, `section-number`, `dot-leader`, `contact-tile`, `tech-cell`). Contact links are icon-only with accessible labels and native `title` tooltips — never render raw URLs or email addresses.

## Commands

- `npm run dev` — dev server on :3000. Also regenerates the managed block above and the `.next/` route types.
- `npm run build` — production build; also runs TypeScript.
- `npm run lint` — runs `eslint` with the flat config in `eslint.config.mjs`. There is no `next lint` in this version.
- `npx tsc --noEmit` — typecheck. There is no `typecheck` script. Run it only after `npm run dev`/`build` has populated `.next/`: on a clean checkout it fails with `Cannot find name 'LayoutProps'` until route types are generated.
- `npx playwright test` — the test runner is Playwright (config in `playwright.config.ts`, specs in `tests/`). It starts the dev server automatically unless one is already running. CI runs the same command via `.github/workflows/playwright.yml`.

## Framework quirks

- Next 16.4.3 with `cacheComponents: true` and `partialPrefetching: true` in `next.config.ts`. Caching/prerender semantics differ from the older model — read `node_modules/next/dist/docs/01-app/01-getting-started/08-caching.md` and `.../03-api-reference/01-directives/use-cache.md` before adding data fetching or `use cache`.
- Tailwind v4 is loaded by a Turbopack CSS rule in `next.config.ts` (`@tailwindcss/turbopack`), not PostCSS. There is no `postcss.config.*` or `tailwind.config.*`; don't add PostCSS setup. Theme tokens belong in `app/globals.css` under `@theme inline`.
- `LayoutProps`, `PageProps`, and typed route hrefs are generated into `.next/` — don't declare them by hand.
- The `@/*` alias maps to the repo root, so imports look like `@/app/...`.
- Scroll reveals use `components/reveal.tsx` (Motion). Reduced-motion visibility is handled in CSS via `[data-reveal]`, not `useReducedMotion`, because the hook causes an SSR hydration mismatch.
- Simple Icons no longer ships a LinkedIn mark; its path is inlined in `components/social-icon.tsx`. Java uses the OpenJDK mark.
