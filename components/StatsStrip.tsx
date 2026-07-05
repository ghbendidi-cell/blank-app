import { useTranslations } from "next-intl";
import AnimatedCounter from "./animations/AnimatedCounter";

export default function StatsStrip({ destinationsCount, packsCount }: { destinationsCount: number; packsCount: number }) {
  const t = useTranslations("home.stats");
  const yearsActive = new Date().getFullYear() - 2011;

  const stats = [
    { value: yearsActive, suffix: "+", label: t("years") },
    { value: destinationsCount, suffix: "", label: t("destinations") },
    { value: packsCount, suffix: "", label: t("packs") },
  ];

  return (
    <div className="grid grid-cols-3 divide-x divide-white/20 rounded-2xl bg-brand-dark/40 backdrop-blur-sm">
      {stats.map((stat) => (
        <div key={stat.label} className="px-2 py-4 text-center">
          <AnimatedCounter value={stat.value} suffix={stat.suffix} className="block font-display text-2xl font-bold text-white sm:text-3xl" />
          <p className="mt-1 text-xs text-white/80 sm:text-sm">{stat.label}</p>
        </div>
      ))}
    </div>
  );
}
