import type { ServiceSlug } from "../data/services";
import { useSelection } from "../context/SelectionContext";
import { useLanguage } from "../i18n/LanguageContext";

export function SelectionToggleButton({
  slug,
  className = "",
}: {
  slug: ServiceSlug;
  className?: string;
}) {
  const { isSelected, toggle } = useSelection();
  const { t } = useLanguage();
  const selected = isSelected(slug);

  return (
    <button
      type="button"
      onClick={() => toggle(slug)}
      aria-pressed={selected}
      className={`inline-block rounded-soft px-7 py-3 text-sm tracking-wide transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-olive ${
        selected
          ? "bg-olive text-cream hover:bg-olive-dark"
          : "border border-olive text-olive hover:bg-olive hover:text-cream"
      } ${className}`}
    >
      {selected ? t.selection.remove : t.selection.add}
    </button>
  );
}
