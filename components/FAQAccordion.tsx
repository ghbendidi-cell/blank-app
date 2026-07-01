export interface FAQItem {
  question: string;
  answer: string;
}

export default function FAQAccordion({ items }: { items: FAQItem[] }) {
  return (
    <div className="divide-y divide-slate-200 rounded-xl border border-slate-200">
      {items.map((item, index) => (
        <details key={index} className="group p-4">
          <summary className="flex cursor-pointer list-none items-center justify-between font-medium text-slate-900">
            {item.question}
            <span className="text-slate-400 transition group-open:rotate-45">+</span>
          </summary>
          <p className="mt-2 text-sm text-slate-600">{item.answer}</p>
        </details>
      ))}
    </div>
  );
}
