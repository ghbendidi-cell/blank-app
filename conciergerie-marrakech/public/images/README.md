# Images

These placeholder posters ship with the site so it never looks broken —
they're plain SVG cards naming the file they stand in for. Replace them
with real photos (same filenames) whenever you have them; nothing else
needs to change.

| File | Used for |
|---|---|
| `hero-riad-patio-poster.svg` | Hero fallback / poster shown before the hero video plays |
| `gallery-souk-poster.svg` | Gallery — "The souk at dusk" |
| `gallery-medina-poster.svg` | Gallery — "Medina, early morning" |
| `gallery-terrace-sunset-poster.svg` | Gallery — "Sunset from the terrace" |
| `gallery-riad-patio-poster.svg` | Gallery — "A riad patio at rest" |
| `gallery-alley-poster.svg` | Gallery — "A quiet derb" |
| `gallery-artisan-poster.svg` | Gallery — "Craft, made by hand" |
| `about-portrait-placeholder.svg` | "Who I am" section portrait |
| `favicon.svg` | Browser tab icon (monogram "N" — replace with your real logo mark) |

To replace one: drop in a real photo under the **same filename**. If you'd
rather use a different extension (`.jpg`, `.webp`), update the matching
`src`/`poster` path in `src/components/` (`Hero.tsx`, `Gallery.tsx`,
`About.tsx`) and `index.html` for the favicon.

Recommended aspect ratios: hero poster 16:10 landscape, gallery posters
and the portrait 4:5 portrait.
