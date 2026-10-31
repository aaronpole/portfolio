# Aaron Paul — Portfolio

A single-page personal site for Aaron Paul, a Computer Science and Business Systems student, developer and creative technologist.

The visual direction is **Field Notes with a Y2K layer**: warm paper and technical annotations, plus pastel capsule tags, dotted leaders, rounded plates, chrome pills and bold Helvetica display type. Numbered sections and hand-drawn schematic plates keep the page readable rather than decorative.

## Stack

- Next.js 16 (App Router) + TypeScript
- Tailwind CSS v4 (loaded through Turbopack, no PostCSS config)
- Motion for scroll reveals
- Lucide for interface icons, Simple Icons for brand/tech marks
- `next/image` for the portrait and the Vitruvian Man plate
- Playwright for browser tests

## Local development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Content

All copy and links live in `lib/site.ts`: the live GitHub / LinkedIn / Instagram / email destinations, project repositories and live demos. Only `siteUrl` is still a placeholder — replace it with the deployed domain before publishing. The technology stack and Simple Icons mappings are in `lib/tech.ts`.

Media lives in `public/images/`: `profile.jpeg` is the portrait and `vitruvian-man.jpg` is the public-domain Leonardo da Vinci notebook plate used in About. Project visuals are deliberately labelled schematics, not fabricated product screenshots.

Contact links are icon tiles with accessible labels and native tooltips; raw handles and email addresses are never rendered as visible text.

## Checks

```bash
npm run lint
npm run build
npx tsc --noEmit
npx playwright test
```

Playwright covers the hero and sections, repository and live-demo links, icon-only contact links, the Vitruvian plate, Bash in the stack, Mafia annotation collisions, desktop and mobile navigation, the mobile index dialog, keyboard skip link, reduced-motion behaviour and horizontal overflow at 360 / 768 / 1440px.
