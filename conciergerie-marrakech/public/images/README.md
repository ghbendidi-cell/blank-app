# Images

Five slots now use real photos; two are still placeholder SVG cards
(plain cream cards naming the file they stand in for) so the site never
looks broken while you gather the real thing.

| File | Used for | Status |
|---|---|---|
| `hero-riad-patio-poster.jpg` | Hero background | **Real photo** — riad courtyard, aerial angle with a hanging lantern. Source image is only 678×452 — soft/blurry on large desktop screens once stretched full-bleed. Replace with a higher-resolution version when you have one. |
| `gallery-souk-poster.svg` | Gallery — "The souk at dusk" | Placeholder |
| `gallery-medina-poster.jpg` | Gallery — "Medina, early morning" | **Real photo** — Koutoubia Mosque minaret |
| `gallery-terrace-sunset-poster.jpg` | Gallery — "A rooftop terrace, medina in view" | **Real photo** — caption was reworded from "Sunset from the terrace": the photo is clearly daytime, not sunset, so the original caption would have been inaccurate. Source is 678×452, same resolution caveat as the hero. |
| `gallery-riad-patio-poster.jpg` | Gallery — "A riad patio at rest" | **Real photo** — courtyard with a star-shaped fountain. Source is 599×333. |
| `gallery-alley-poster.svg` | Gallery — "A quiet derb" | Placeholder |
| `gallery-artisan-poster.webp` | Gallery — "Craft, made by hand" | **Real photo** — note: this shot's blue-painted walls read as Chefchaouen, not Marrakech; swap it if strict geographic accuracy matters to you. |
| `about-portrait-placeholder.svg` | "Who I am" section portrait | Placeholder — must be a real photo of you, never AI-generated |
| `favicon.svg` | Browser tab icon (monogram "D" — replace with your real logo mark) | Placeholder |

Two more riad courtyard photos you sent (two-story arched courtyard with
string lights, and a courtyard with a carved wooden door and red sofas)
aren't wired into the site — there was no honest slot left for them
without duplicating "riad patio" or mislabeling them as something they're
not. Ask if you'd like the gallery expanded past 6 items to fit them in,
or want to swap them in for the still-placeholder souk/derb slots (they'd
be captioned generically rather than as an actual souk or alley).

Poster filenames don't all share the same extension — `Gallery.tsx` and
`Hero.tsx` reference each one explicitly, so when you replace a
placeholder, update the extension in that component if it changes (e.g.
`.svg` → `.jpg`).

Recommended aspect ratios: hero poster 16:10 landscape, gallery posters
and the portrait 4:5 portrait (source photos are auto-cropped to fit via
`object-cover`, so slightly different ratios are fine). For the hero in
particular, aim for at least 1920px wide so it stays sharp on large
screens.
