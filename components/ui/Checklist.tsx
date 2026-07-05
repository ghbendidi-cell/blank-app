const TONE_CLASSES = {
  brand: "text-brand",
  accent: "text-accent",
  white: "text-white",
} as const;

export default function Checklist({
  items,
  tone = "brand",
  textClassName = "text-slate-600",
}: {
  items: string[];
  tone?: keyof typeof TONE_CLASSES;
  textClassName?: string;
}) {
  return (
    <ul className="space-y-2.5">
      {items.map((item) => (
        <li key={item} className={`flex items-start gap-2.5 text-sm ${textClassName}`}>
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            className={`mt-0.5 shrink-0 ${TONE_CLASSES[tone]}`}
          >
            <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}
