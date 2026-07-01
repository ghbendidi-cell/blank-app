import { useTranslations } from "next-intl";

export default function TrustBadges() {
  const t = useTranslations("home");
  const items = [
    { title: t("whyUs1Title"), text: t("whyUs1Text") },
    { title: t("whyUs2Title"), text: t("whyUs2Text") },
    { title: t("whyUs3Title"), text: t("whyUs3Text") },
  ];

  return (
    <div className="grid gap-6 sm:grid-cols-3">
      {items.map((item) => (
        <div key={item.title} className="rounded-xl border border-slate-200 p-6 text-center">
          <p className="font-semibold text-slate-900">{item.title}</p>
          <p className="mt-2 text-sm text-slate-600">{item.text}</p>
        </div>
      ))}
    </div>
  );
}
