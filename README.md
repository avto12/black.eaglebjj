# Black Eagle BJJ — landing page (design demo)

Single-page Next.js site. All sections live on `/` and the navigation scrolls to them.

## Run

```bash
npm install
npm run dev      # http://localhost:3000
npm run build && npm start
```

## Where to edit

- **All copy, links, photos, coaches, results:** `src/content/site.ts`
  Anything with `demo: true` shows a visible "დემო" marker until replaced.
- **Photos:** currently free-licensed Unsplash images (unsplash.com/license) as stand-ins.
  Put team photos in `public/photos/` and point `src` at `/photos/…`.
- **Sections:** `src/components/sections/*` (one file per section).
- **Colours / type:** `src/app/globals.css` (`@theme` tokens), fonts in `src/app/fonts.ts` (self-hosted).
- Before launch: set the real domain in `metadataBase` (`src/app/layout.tsx`) and remove `robots: noindex`.

## Stack

Next.js 16 (App Router, TS strict) · React 19 · Tailwind CSS 4 · shadcn/ui-style primitives (Radix + cva) ·
Motion (header, menu, hero intro, gallery, lightbox) · GSAP ScrollTrigger (scroll reveals) · Lenis · Embla · Lucide.
Respects `prefers-reduced-motion`.
