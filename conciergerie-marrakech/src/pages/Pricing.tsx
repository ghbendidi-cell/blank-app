import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelection } from "../context/SelectionContext";
import { PRICING_TIERS } from "../data/services";
import { useLanguage } from "../i18n/LanguageContext";

type BillingPeriod = "monthly" | "annual";

export function Pricing() {
  const { t } = useLanguage();
  const { addMany } = useSelection();
  const navigate = useNavigate();
  const [billing, setBilling] = useState<BillingPeriod>("monthly");

  useEffect(() => {
    document.title = `${t.pricing.heading} — ${t.nav.brand}`;
  }, [t]);

  function handleAddTier(tier: (typeof PRICING_TIERS)[number]) {
    addMany(tier.includes);
    navigate("/contact");
  }

  return (
    <section className="px-6 py-28 sm:py-32">
      <div className="mx-auto max-w-3xl text-center">
        <h1 className="font-serif text-3xl text-ink sm:text-4xl">
          {t.pricing.heading}
        </h1>
        <p className="mt-4 max-w-prose mx-auto text-base leading-relaxed text-ink-light">
          {t.pricing.intro}
        </p>
      </div>

      <div className="mx-auto mt-16 max-w-4xl">
        <h2 className="text-center font-serif text-xl text-ink">
          {t.pricing.waysHeading}
        </h2>
        <div className="mt-8 grid gap-10 sm:grid-cols-2">
          <div>
            <h3 className="font-serif text-lg text-ink">
              {t.pricing.commissionTitle}
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-ink-light">
              {t.pricing.commissionText}
            </p>
          </div>
          <div>
            <h3 className="font-serif text-lg text-ink">
              {t.pricing.subscriptionTitle}
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-ink-light">
              {t.pricing.subscriptionText}
            </p>
          </div>
        </div>
      </div>

      <div className="mx-auto mt-20 max-w-4xl">
        <div className="flex justify-center">
          <div
            role="group"
            aria-label={`${t.pricing.billing.monthly} / ${t.pricing.billing.annual}`}
            className="inline-flex rounded-soft border border-ink/15 p-1 text-sm"
          >
            {(["monthly", "annual"] as BillingPeriod[]).map((period) => (
              <button
                key={period}
                type="button"
                onClick={() => setBilling(period)}
                aria-pressed={billing === period}
                className={`rounded-soft px-4 py-1.5 tracking-wide transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-olive ${
                  billing === period
                    ? "bg-olive text-cream"
                    : "text-ink-light hover:text-ink"
                }`}
              >
                {t.pricing.billing[period]}
              </button>
            ))}
          </div>
        </div>
        {billing === "annual" && (
          <p className="mt-3 text-center text-xs uppercase tracking-wide text-olive">
            {t.pricing.billing.annualBadge}
          </p>
        )}

        <div className="mt-12 grid gap-14 sm:grid-cols-2">
          {PRICING_TIERS.map((tier) => (
            <div key={tier.id} className="border-t border-ink/10 pt-8">
              <h3 className="font-serif text-2xl text-ink">
                {t.pricing.tiers[tier.id].name}
              </h3>
              <p className="mt-2 text-sm text-ink-light">
                {t.pricing.tiers[tier.id].tagline}
              </p>

              <p className="mt-6 text-xs uppercase tracking-wide text-ink-light/80">
                {t.pricing.includesHeading}
              </p>
              <ul className="mt-3 space-y-2">
                {tier.includes.map((slug) => (
                  <li
                    key={slug}
                    className="flex items-baseline gap-2 text-sm text-ink"
                  >
                    <span className="text-olive" aria-hidden="true">
                      &#10003;
                    </span>
                    {t.servicesDetail[slug].name}
                  </li>
                ))}
              </ul>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <button
                  type="button"
                  onClick={() => navigate("/contact")}
                  className="rounded-soft bg-olive px-6 py-2.5 text-sm tracking-wide text-cream transition-colors hover:bg-olive-dark focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-olive"
                >
                  {t.pricing.quoteCta}
                </button>
                <button
                  type="button"
                  onClick={() => handleAddTier(tier)}
                  className="rounded-soft border border-olive px-6 py-2.5 text-sm tracking-wide text-olive transition-colors hover:bg-olive hover:text-cream focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-olive"
                >
                  {t.pricing.addTierToSelection}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
