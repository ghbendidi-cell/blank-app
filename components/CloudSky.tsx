const CLOUDS = [
  { top: "3%", left: "6%", size: 420, opacity: 0.6, driftDur: "38s", floatDur: "7s" },
  { top: "16%", left: "70%", size: 340, opacity: 0.5, driftDur: "46s", floatDur: "9s" },
  { top: "32%", left: "22%", size: 380, opacity: 0.55, driftDur: "42s", floatDur: "8s" },
  { top: "48%", left: "78%", size: 300, opacity: 0.45, driftDur: "50s", floatDur: "10s" },
  { top: "63%", left: "10%", size: 360, opacity: 0.55, driftDur: "44s", floatDur: "7.5s" },
  { top: "78%", left: "62%", size: 320, opacity: 0.45, driftDur: "48s", floatDur: "8.5s" },
  { top: "92%", left: "30%", size: 360, opacity: 0.5, driftDur: "40s", floatDur: "9.5s" },
];

export default function CloudSky() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      <div className="absolute inset-0 bg-gradient-to-b from-[#e9f2f4] via-[#f8f5ef] to-[#e9f2f4]" />
      {CLOUDS.map((cloud, index) => (
        <div
          key={index}
          className="absolute animate-drift-cloud"
          style={{ top: cloud.top, left: cloud.left, animationDuration: cloud.driftDur, animationDelay: `${index * 2}s` }}
        >
          <div
            className="animate-float rounded-full bg-white blur-3xl"
            style={{ width: cloud.size, height: cloud.size * 0.55, opacity: cloud.opacity, animationDuration: cloud.floatDur }}
          />
        </div>
      ))}
    </div>
  );
}
