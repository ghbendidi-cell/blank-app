import Image from "next/image";

const HERO_IMAGE =
  "https://d8j0ntlcm91z4.cloudfront.net/user_3FzLTlt28p4tBZh58xHOYeBE65G/hf_20260703_110106_b272cb33-03c5-4375-9304-cd32379e2673.png";

export default function HeroBackground() {
  return (
    <div className="absolute inset-0 h-full w-full overflow-hidden">
      <div className="absolute inset-0 h-full w-full animate-kenburns">
        <Image
          src={HERO_IMAGE}
          alt="Vue depuis un hublot d'avion au-dessus des nuages, lumière dorée de fin de journée"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
      </div>
    </div>
  );
}
