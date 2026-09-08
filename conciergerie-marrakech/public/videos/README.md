# Drop your videos here

Filenames the site already expects (see `src/components/Hero.tsx` and
`src/components/Gallery.tsx`). Keep these exact names and the site picks
them up automatically — no code changes needed.

| File | Used for | Suggested length | Target size |
|---|---|---|---|
| `hero-riad-patio.mp4` | Full-screen hero background | 10–20s loop | under 6 MB (above the fold, keep it light) |
| `gallery-souk.mp4` | Gallery — "The souk at dusk" | 5–10s loop | under 3 MB |
| `gallery-medina.mp4` | Gallery — "Medina, early morning" | 5–10s loop | under 3 MB |
| `gallery-terrace-sunset.mp4` | Gallery — "Sunset from the terrace" | 5–10s loop | under 3 MB |
| `gallery-riad-patio.mp4` | Gallery — "A riad patio at rest" | 5–10s loop | under 3 MB |
| `gallery-alley.mp4` | Gallery — "A quiet derb" | 5–10s loop | under 3 MB |
| `gallery-artisan.mp4` | Gallery — "Craft, made by hand" | 5–10s loop | under 3 MB |

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
