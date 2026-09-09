# Images

Three slots now use real photos; the rest are still placeholder SVG cards
(plain cream cards naming the file they stand in for) so the site never
looks broken while you gather the real thing.

| File | Used for | Status |
|---|---|---|
| `hero-riad-patio-poster.jpg` | Hero background | **Real photo** — Menara Gardens pavilion & reflecting pool. Atmospheric stand-in, not an actual riad interior — swap for real property photography before launch. |
| `gallery-souk-poster.svg` | Gallery — "The souk at dusk" | Placeholder |
| `gallery-medina-poster.jpg` | Gallery — "Medina, early morning" | **Real photo** — Koutoubia Mosque minaret |
| `gallery-terrace-sunset-poster.svg` | Gallery — "Sunset from the terrace" | Placeholder |
| `gallery-riad-patio-poster.svg` | Gallery — "A riad patio at rest" | Placeholder |
| `gallery-alley-poster.svg` | Gallery — "A quiet derb" | Placeholder |
| `gallery-artisan-poster.webp` | Gallery — "Craft, made by hand" | **Real photo** — note: this shot's blue-painted walls read as Chefchaouen, not Marrakech; swap it if strict geographic accuracy matters to you. |
| `about-portrait-placeholder.svg` | "Who I am" section portrait | Placeholder — must be a real photo of you, never AI-generated |
| `favicon.svg` | Browser tab icon (monogram "D" — replace with your real logo mark) | Placeholder |

Poster filenames don't all share the same extension anymore — `Gallery.tsx`
and `Hero.tsx` reference each one explicitly, so when you replace a
placeholder, update the extension in that component if it changes (e.g.
`.svg` → `.jpg`).

Recommended aspect ratios: hero poster 16:10 landscape, gallery posters
and the portrait 4:5 portrait (source photos are auto-cropped to fit via
`object-cover`, so slightly different ratios are fine).
