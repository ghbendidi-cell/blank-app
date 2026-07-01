import type { Locale } from "@/i18n/routing";

export function pick(fr: string, ar: string | undefined, locale: Locale): string {
  if (locale === "ar") return ar ?? fr;
  return fr;
}

export function formatMad(amount: number, locale: Locale): string {
  const formatted = new Intl.NumberFormat(locale === "ar" ? "ar-MA" : "fr-MA", {
    maximumFractionDigits: 0,
  }).format(amount);
  return locale === "ar" ? `${formatted} درهم` : `${formatted} MAD`;
}

export function formatDate(dateString: string, locale: Locale): string {
  const date = new Date(dateString);
  if (Number.isNaN(date.getTime())) return dateString;
  return new Intl.DateTimeFormat(locale === "ar" ? "ar-MA" : "fr-MA", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(date);
}

export function whatsappLink(phone: string, message: string): string {
  const digits = phone.replace(/[^\d]/g, "");
  return `https://wa.me/${digits}?text=${encodeURIComponent(message)}`;
}

export function telLink(phone: string): string {
  return `tel:${phone.replace(/[^\d+]/g, "")}`;
}
