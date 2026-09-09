// Structural, language-independent service data. All display copy (name,
// descriptions, process steps, etc.) lives in src/i18n/translations.ts under
// `servicesDetail`, keyed by the same slug, so a slug here always has a
// matching translation entry in both languages.

export const SERVICE_SLUGS = [
  "menage-linge",
  "reporting",
  "interlocuteur-unique",
  "photos-videos",
  "tarification-dynamique",
  "transferts-experiences",
] as const;

export type ServiceSlug = (typeof SERVICE_SLUGS)[number];

export interface PricingTier {
  id: "essential" | "complete";
  includes: ServiceSlug[];
}

// "Essential" covers the three services every owner needs from day one;
// "Complete" is the full set. Deliberately just two tiers rather than a
// third, arbitrary middle option with no real distinction.
export const PRICING_TIERS: PricingTier[] = [
  {
    id: "essential",
    includes: ["menage-linge", "reporting", "interlocuteur-unique"],
  },
  {
    id: "complete",
    includes: [...SERVICE_SLUGS],
  },
];
