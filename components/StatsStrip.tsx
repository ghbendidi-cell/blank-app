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
    <div className="grid grid-cols-3 divide-x divide-ink/10 border-y border-ink/10">
      {stats.map((stat) => (
        <div key={stat.label} className="px-2 py-6 text-center">
          <AnimatedCounter value={stat.value} suffix={stat.suffix} className="block font-display text-3xl italic text-ink sm:text-4xl" />
          <p className="mt-1 font-sans text-[11px] uppercase tracking-[0.14em] text-ink/55">{stat.label}</p>
        </div>
      ))}
    </div>
  );
}
