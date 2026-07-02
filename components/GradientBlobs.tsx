const PRESETS = {
  destinations: ["bg-egypt", "bg-vietnam", "bg-turkey", "bg-hajj"],
  packs: ["bg-accent", "bg-brand", "bg-vietnam"],
} as const;

export default function GradientBlobs({ preset }: { preset: keyof typeof PRESETS }) {
  const colors = PRESETS[preset];

  return (
    <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden" aria-hidden="true">
      {colors.map((color, index) => (
        <div
          key={color}
          className={`absolute h-72 w-72 animate-blob rounded-full ${color} opacity-[0.12] blur-3xl sm:h-96 sm:w-96`}
          style={{
            top: `${(index * 37) % 80}%`,
            left: `${(index * 53) % 85}%`,
            animationDelay: `${index * 2.5}s`,
          }}
        />
      ))}
    </div>
  );
}
