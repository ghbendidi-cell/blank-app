# Images

Seven slots now use real photos; two are still placeholder SVG cards
(plain cream cards naming the file they stand in for) so the site never
looks broken while you gather the real thing. The gallery grid grew from
6 to 8 items to fit two more real photos in honestly, rather than
mislabeling them as souk/derb shots they aren't.

| File | Used for | Status |
|---|---|---|
| `hero-riad-patio-poster.jpg` | Hero background | **Real photo** — riad courtyard, aerial angle with a hanging lantern. Source image is only 678×452 — soft/blurry on large desktop screens once stretched full-bleed. Replace with a higher-resolution version when you have one. |
| `gallery-souk-poster.svg` | Gallery — "The souk at dusk" | Placeholder |
| `gallery-medina-poster.jpg` | Gallery — "Medina, early morning" | **Real photo** — Koutoubia Mosque minaret |
| `gallery-terrace-sunset-poster.jpg` | Gallery — "A rooftop terrace, medina in view" | **Real photo** — caption was reworded from "Sunset from the terrace": the photo is clearly daytime, not sunset, so the original caption would have been inaccurate. Source is 678×452, same resolution caveat as the hero. |
| `gallery-riad-patio-poster.jpg` | Gallery — "A riad patio at rest" | **Real photo** — courtyard with a star-shaped fountain. Source is 599×333. |
| `gallery-alley-poster.svg` | Gallery — "A quiet derb" | Placeholder |
| `gallery-artisan-poster.webp` | Gallery — "Craft, made by hand" | **Real photo** — note: this shot's blue-painted walls read as Chefchaouen, not Marrakech; swap it if strict geographic accuracy matters to you. |
| `gallery-riad-balconies-poster.jpg` | Gallery — "A gallery overlooking the courtyard" | **Real photo** — two-story arched courtyard with string lights. Source is 547×365. |
| `gallery-riad-lounge-poster.jpg` | Gallery — "A quiet sitting room" | **Real photo** — courtyard seating area with a carved wooden door. Source is 549×364. |
| `about-portrait-placeholder.svg` | "Who I am" section portrait | Placeholder — must be a real photo of you, never AI-generated |
| `favicon.svg` | Browser tab icon (monogram "D" — replace with your real logo mark) | Placeholder |
| `service-menage-linge-poster.svg` | Service card + page banner — "Housekeeping & linen, every stay" | Placeholder |
| `service-reporting-poster.svg` | Service card + page banner — "Detailed monthly reporting" | Placeholder |
| `service-interlocuteur-unique-poster.svg` | Service card + page banner — "One point of contact, always reachable" | Placeholder |
| `service-photos-videos-poster.svg` | Service card + page banner — "Professional photography & video updates" | Placeholder |
| `service-tarification-dynamique-poster.svg` | Service card + page banner — "Pricing adjusted continuously" | Placeholder |
| `service-transferts-experiences-poster.svg` | Service card + page banner — "Airport transfers & local experiences" | Placeholder |

All of the real photos so far are quite low-resolution (under 700px
wide) since they came in as web-sized images. They read fine at gallery
card size but will look soft if you ever need a larger crop — ask for
the originals if you have them.

Poster filenames don't all share the same extension — `Gallery.tsx`,
`Hero.tsx`, `ServiceCard.tsx` and `ServiceDetail.tsx` reference each one
explicitly, so when you replace a placeholder, update the extension in
that component if it changes (e.g. `.svg` → `.jpg`).

Recommended aspect ratios: hero poster 16:10 landscape, gallery posters
and the portrait 4:5 portrait (source photos are auto-cropped to fit via
`object-cover`, so slightly different ratios are fine). For the hero in
particular, aim for at least 1920px wide so it stays sharp on large
screens.
