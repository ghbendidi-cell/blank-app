import { WHATSAPP_NUMBER } from "../config";
import { useLanguage } from "../i18n/LanguageContext";

export function WhatsAppButton({ className = "" }: { className?: string }) {
  const { t } = useLanguage();
  const href = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
    t.contact.whatsapp.message
  )}`;

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex items-center justify-center gap-2 rounded-soft border border-olive px-7 py-3 text-sm tracking-wide text-olive transition-colors hover:bg-olive hover:text-cream focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-olive ${className}`}
    >
      <svg
        viewBox="0 0 24 24"
        aria-hidden="true"
        className="h-4 w-4 fill-current"
      >
        <path d="M17.5 14.4c-.3-.1-1.7-.9-2-1-.3-.1-.5-.1-.6.1-.2.3-.7 1-.9 1.2-.2.2-.3.2-.6.1-.3-.1-1.2-.5-2.3-1.5-.9-.8-1.4-1.7-1.6-2-.2-.3 0-.5.1-.6.1-.1.3-.3.4-.5.1-.1.2-.3.2-.4.1-.2 0-.4 0-.5-.1-.1-.6-1.5-.8-2-.2-.5-.4-.4-.6-.4h-.5c-.2 0-.5.1-.7.3-.2.3-.9.9-.9 2.1 0 1.2.9 2.4 1 2.6.1.2 1.8 2.8 4.4 3.9.6.3 1.1.4 1.5.5.6.2 1.2.2 1.6.1.5-.1 1.7-.7 1.9-1.3.2-.6.2-1.2.2-1.3-.1-.1-.3-.2-.5-.3z" />
        <path d="M12 2.1C6.5 2.1 2.1 6.5 2.1 12c0 1.9.5 3.6 1.4 5.1L2 22l5-1.4c1.4.8 3.1 1.3 4.9 1.3 5.5 0 10-4.4 10-9.9S17.5 2.1 12 2.1zm0 18c-1.7 0-3.3-.5-4.6-1.3l-.3-.2-3 .8.8-2.9-.2-.3C4 14.7 3.6 13.4 3.6 12c0-4.6 3.8-8.4 8.4-8.4s8.4 3.8 8.4 8.4-3.8 8.1-8.4 8.1z" />
      </svg>
      {t.contact.whatsapp.label}
    </a>
  );
}
