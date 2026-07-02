import ParallaxImage from "./animations/ParallaxImage";

export default function HeroBackground() {
  return (
    <ParallaxImage
      src="/images/chefchaouen-maroc.jpg"
      alt="Ruelle de Chefchaouen, Maroc"
      className="absolute inset-0 h-full w-full"
      strength={60}
    />
  );
}
