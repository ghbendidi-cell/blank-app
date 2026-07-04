const HERO_VIDEO =
  "https://d8j0ntlcm91z4.cloudfront.net/user_3FzLTlt28p4tBZh58xHOYeBE65G/hf_20260704_114706_cb082684-057f-4989-a48e-8b9527da300c.mp4";
const HERO_POSTER =
  "https://d8j0ntlcm91z4.cloudfront.net/user_3FzLTlt28p4tBZh58xHOYeBE65G/hf_20260703_110106_b272cb33-03c5-4375-9304-cd32379e2673.png";

export default function HeroBackground() {
  return (
    <div className="absolute inset-0 h-full w-full overflow-hidden">
      <video
        className="h-full w-full object-cover"
        src={HERO_VIDEO}
        poster={HERO_POSTER}
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
      />
    </div>
  );
}
