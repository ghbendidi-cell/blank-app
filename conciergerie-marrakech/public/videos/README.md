# Drop your videos here

Filenames the site already expects (see `src/components/Hero.tsx`,
`src/components/Gallery.tsx`, `src/components/ServiceCard.tsx` and
`src/pages/ServiceDetail.tsx`). Keep these exact names and the site picks
them up automatically — no code changes needed.

| File | Used for | Suggested length | Target size |
|---|---|---|---|
| `hero-riad-patio.mp4` | Full-screen hero background | 10–20s loop | under 6 MB (above the fold, keep it light) |
| `gallery-souk.mp4` | Gallery — "The souk at dusk" | 5–10s loop | under 3 MB |
| `gallery-medina.mp4` | Gallery — "Medina, early morning" | 5–10s loop | under 3 MB |
| `gallery-terrace-sunset.mp4` | Gallery — "A rooftop terrace, medina in view" | 5–10s loop | under 3 MB |
| `gallery-riad-patio.mp4` | Gallery — "A riad patio at rest" | 5–10s loop | under 3 MB |
| `gallery-alley.mp4` | Gallery — "A quiet derb" | 5–10s loop | under 3 MB |
| `gallery-artisan.mp4` | Gallery — "Craft, made by hand" | 5–10s loop | under 3 MB |
| `gallery-riad-balconies.mp4` | Gallery — "A gallery overlooking the courtyard" | 5–10s loop | under 3 MB |
| `gallery-riad-lounge.mp4` | Gallery — "A quiet sitting room" | 5–10s loop | under 3 MB |
| `service-menage-linge.mp4` | Service page + listing card — "Housekeeping & linen, every stay" | 5–10s loop | under 3 MB |
| `service-reporting.mp4` | Service page + listing card — "Detailed monthly reporting" | 5–10s loop | under 3 MB |
| `service-interlocuteur-unique.mp4` | Service page + listing card — "One point of contact, always reachable" | 5–10s loop | under 3 MB |
| `service-photos-videos.mp4` | Service page + listing card — "Professional photography & video updates" | 5–10s loop | under 3 MB |
| `service-tarification-dynamique.mp4` | Service page + listing card — "Pricing adjusted continuously" | 5–10s loop | under 3 MB |
| `service-transferts-experiences.mp4` | Service page + listing card — "Airport transfers & local experiences" | 5–10s loop | under 3 MB |

Each `service-*.mp4` is reused in two places: the small card on
`/services` and the wider banner at the top of that service's own page —
one file covers both, no need for a separate version of each.

## Notes

- If a file is missing, the site does not break: it falls back to the
  matching poster image in `public/images/` and simply never shows a
  video for that slot.
- Videos autoplay muted, looped, inline. Make sure there's no audio you
  care about — it will never be heard.
- On mobile, the gallery videos are not loaded at all (a still image is
  shown instead) to save bandwidth; the hero video still plays on mobile.
- Compress with H.264 (`.mp4`), no audio track, e.g.:
  `ffmpeg -i input.mov -an -vcodec libx264 -crf 28 -preset veryslow -vf "scale=1280:-2" output.mp4`
