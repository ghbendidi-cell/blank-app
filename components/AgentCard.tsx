import { useLocale } from "next-intl";
import type { Locale } from "@/i18n/routing";
import type { Agent } from "@/lib/types";
import { pick, telLink, whatsappLink } from "@/lib/locale-content";
import ImagePlaceholder from "./ImagePlaceholder";

export default function AgentCard({ agent }: { agent: Agent }) {
  const locale = useLocale() as Locale;
  const role = pick(agent.roleFr, agent.roleAr, locale);

  return (
    <div className="overflow-hidden rounded-xl border border-slate-200 text-center">
      <div className="mx-auto mt-5 w-24 overflow-hidden rounded-full">
        <ImagePlaceholder image={agent.photo} locale={locale} />
      </div>
      <div className="p-4">
        <p className="font-semibold text-slate-900">{agent.fullName}</p>
        <p className="text-sm text-slate-500">{role}</p>
        <div className="mt-3 flex justify-center gap-3">
          <a href={telLink(agent.phone)} className="text-brand" aria-label={agent.phone}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
              <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.13.96.36 1.9.68 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.91.32 1.85.55 2.81.68A2 2 0 0122 16.92z" />
            </svg>
          </a>
          <a href={whatsappLink(agent.whatsapp, "")} target="_blank" rel="noopener noreferrer" className="text-[#25D366]">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2C6.48 2 2 6.48 2 12c0 1.85.5 3.58 1.37 5.07L2 22l5.06-1.33A9.94 9.94 0 0012 22c5.52 0 10-4.48 10-10S17.52 2 12 2z" />
            </svg>
          </a>
        </div>
      </div>
    </div>
  );
}
