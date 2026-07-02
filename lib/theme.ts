export type AccentColor = "egypt" | "vietnam" | "turkey" | "hajj";

export const destinationTheme: Record<
  AccentColor,
  { badge: string; text: string; bgLight: string; gradient: string; ring: string }
> = {
  egypt: {
    badge: "bg-egypt text-white",
    text: "text-egypt-dark",
    bgLight: "bg-egypt-light",
    gradient: "from-egypt/90 via-egypt-dark/60 to-transparent",
    ring: "ring-egypt",
  },
  vietnam: {
    badge: "bg-vietnam text-white",
    text: "text-vietnam-dark",
    bgLight: "bg-vietnam-light",
    gradient: "from-vietnam/90 via-vietnam-dark/60 to-transparent",
    ring: "ring-vietnam",
  },
  turkey: {
    badge: "bg-turkey text-white",
    text: "text-turkey-dark",
    bgLight: "bg-turkey-light",
    gradient: "from-turkey/90 via-turkey-dark/60 to-transparent",
    ring: "ring-turkey",
  },
  hajj: {
    badge: "bg-hajj text-gold-light",
    text: "text-hajj-dark",
    bgLight: "bg-hajj-light",
    gradient: "from-hajj/90 via-hajj-dark/70 to-transparent",
    ring: "ring-hajj",
  },
};
