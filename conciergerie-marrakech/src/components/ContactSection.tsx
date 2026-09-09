import { useState, type FormEvent } from "react";
import { CONTACT_FORM_NAME } from "../config";
import { useSelection } from "../context/SelectionContext";
import { useLanguage } from "../i18n/LanguageContext";
import { formatTemplate } from "../lib/format";
import { WhatsAppButton } from "./WhatsAppButton";

function encodeFormData(form: HTMLFormElement): string {
  return new URLSearchParams(
    new FormData(form) as unknown as Record<string, string>
  ).toString();
}

export function ContactSection({
  headingLevel = "h2",
}: {
  /** Use "h1" when this section is the page's own heading (dedicated /contact page). */
  headingLevel?: "h1" | "h2";
}) {
  const Heading = headingLevel;
  const { t } = useLanguage();
  const { selected, remove } = useSelection();
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">(
    "idle"
  );

  const selectedNames = selected.map((slug) => t.servicesDetail[slug].name);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    setStatus("submitting");
    try {
      await fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: encodeFormData(form),
      });
      setStatus("success");
      form.reset();
    } catch {
      setStatus("error");
    }
  }

  const inputClasses =
    "w-full rounded-soft border border-ink/15 bg-cream px-4 py-2.5 text-sm text-ink placeholder:text-ink-light/60 focus:border-olive focus:outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-olive";
  const labelClasses = "text-xs uppercase tracking-wide text-ink-light";

  return (
    <section id="contact" className="px-6 py-24 sm:py-28">
      <div className="mx-auto max-w-2xl text-center">
        <Heading className="font-serif text-3xl text-ink sm:text-4xl">
          {t.contact.heading}
        </Heading>
        <p className="mt-3 text-ink-light">{t.contact.subheading}</p>
      </div>

      <div className="mx-auto mt-12 max-w-2xl">
        {selectedNames.length > 0 && (
          <div className="mb-8 rounded-soft border border-olive/25 bg-olive/5 px-5 py-4">
            <p className="text-xs uppercase tracking-wide text-ink-light">
              {t.contact.selectionSummaryHeading}
            </p>
            <ul className="mt-2 flex flex-wrap gap-2">
              {selected.map((slug) => (
                <li key={slug}>
                  <button
                    type="button"
                    onClick={() => remove(slug)}
                    aria-label={formatTemplate(t.contact.removeSelectionAria, {
                      name: t.servicesDetail[slug].name,
                    })}
                    className="inline-flex items-center gap-1.5 rounded-soft border border-olive/40 bg-cream px-3 py-1 text-sm text-ink transition-colors hover:border-olive focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-olive"
                  >
                    {t.servicesDetail[slug].name}
                    <span aria-hidden="true" className="text-ink-light">
                      &times;
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}
        {status === "success" ? (
          <p
            role="status"
            className="rounded-soft border border-olive/30 bg-olive/5 px-6 py-8 text-center font-serif text-lg text-ink"
          >
            {t.contact.form.success}
          </p>
        ) : (
          <form
            name={CONTACT_FORM_NAME}
            method="POST"
            data-netlify="true"
            netlify-honeypot="company"
            onSubmit={handleSubmit}
            className="grid gap-5 sm:grid-cols-2"
          >
            <input type="hidden" name="form-name" value={CONTACT_FORM_NAME} />
            {selectedNames.length > 0 && (
              <input
                type="hidden"
                name="selected_services"
                value={selectedNames.join(", ")}
              />
            )}
            <p className="hidden">
              <label>
                Company
                <input name="company" tabIndex={-1} autoComplete="off" />
              </label>
            </p>

            <label className="flex flex-col gap-1.5 sm:col-span-1">
              <span className={labelClasses}>{t.contact.form.name}</span>
              <input name="name" type="text" required className={inputClasses} />
            </label>

            <label className="flex flex-col gap-1.5 sm:col-span-1">
              <span className={labelClasses}>{t.contact.form.email}</span>
              <input name="email" type="email" required className={inputClasses} />
            </label>

            <label className="flex flex-col gap-1.5 sm:col-span-1">
              <span className={labelClasses}>{t.contact.form.phone}</span>
              <input
                name="phone"
                type="tel"
                placeholder="+44 7..."
                required
                className={inputClasses}
              />
            </label>

            <label className="flex flex-col gap-1.5 sm:col-span-1">
              <span className={labelClasses}>{t.contact.form.propertyType}</span>
              <select name="property_type" required className={inputClasses}>
                {t.contact.form.propertyTypeOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </label>

            <label className="flex flex-col gap-1.5 sm:col-span-2">
              <span className={labelClasses}>{t.contact.form.neighbourhood}</span>
              <input name="neighbourhood" type="text" className={inputClasses} />
            </label>

            <label className="flex flex-col gap-1.5 sm:col-span-2">
              <span className={labelClasses}>{t.contact.form.message}</span>
              <textarea
                name="message"
                rows={4}
                required
                className={inputClasses}
              />
            </label>

            <div className="sm:col-span-2">
              <button
                type="submit"
                disabled={status === "submitting"}
                className="w-full rounded-soft bg-olive px-7 py-3 text-sm tracking-wide text-cream transition-colors hover:bg-olive-dark disabled:opacity-60 sm:w-auto"
              >
                {t.contact.form.submit}
              </button>
              {status === "error" && (
                <p className="mt-3 text-sm text-olive-dark" role="alert">
                  {t.contact.whatsapp.label}
                </p>
              )}
            </div>
          </form>
        )}

        <div className="mt-10 flex items-center gap-4 text-xs uppercase tracking-wide text-ink-light">
          <span className="h-px flex-1 bg-ink/10" />
          {t.contact.orDivider}
          <span className="h-px flex-1 bg-ink/10" />
        </div>

        <div className="mt-6 flex justify-center">
          <WhatsAppButton extraContext={selectedNames} />
        </div>
      </div>
    </section>
  );
}
