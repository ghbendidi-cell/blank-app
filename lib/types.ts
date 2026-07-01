export type Locale = "fr" | "ar";

export type TripType =
  | "maroc"
  | "international"
  | "omra"
  | "hajj"
  | "groupe"
  | "sur-mesure";

export type Region = "maroc" | "international" | "moyen-orient" | "europe" | "asie";

export interface ImagePlaceholder {
  url: string | null;
  altFr: string;
  altAr: string;
  isPlaceholder: boolean;
  aspectRatio: "16:9" | "4:3" | "1:1";
}

export interface Destination {
  id: string;
  slug: string;
  nameFr: string;
  nameAr: string;
  countryCode: string;
  region: Region;
  descriptionFr: string;
  descriptionAr: string;
  bestPeriodFr: string;
  bestPeriodAr: string;
  visaInfoFr?: string;
  visaInfoAr?: string;
  heroImage: ImagePlaceholder;
  featured: boolean;
}

export interface PriceVariant {
  labelFr: string;
  labelAr: string;
  price: number;
}

export interface ItineraryDay {
  dayNumber: number;
  titleFr: string;
  titleAr: string;
  descriptionFr: string;
  descriptionAr: string;
}

export interface Pack {
  id: string;
  slug: string;
  titleFr: string;
  titleAr: string;
  destinationId: string;
  tripType: TripType;
  durationDays: number;
  durationNights: number;
  priceFrom: number;
  currency: "MAD";
  priceVariants: PriceVariant[];
  departureDates: string[];
  inclusionsFr: string[];
  inclusionsAr: string[];
  exclusionsFr: string[];
  exclusionsAr: string[];
  itinerary: ItineraryDay[];
  images: ImagePlaceholder[];
  highlightsFr: string[];
  highlightsAr: string[];
  ratingAvg: number;
  ratingCount: number;
  isFeatured: boolean;
}

export interface Review {
  id: string;
  packId?: string;
  authorName: string;
  rating: 1 | 2 | 3 | 4 | 5;
  commentFr?: string;
  commentAr?: string;
  source: "site" | "google" | "facebook";
  verifiedClient: boolean;
  createdAt: string;
}

export interface Agent {
  id: string;
  fullName: string;
  roleFr: string;
  roleAr: string;
  photo: ImagePlaceholder;
  phone: string;
  whatsapp: string;
  email: string;
  languages: ("fr" | "ar" | "en")[];
}

export interface OpeningHour {
  dayFr: string;
  dayAr: string;
  hours: string;
}

export interface Agency {
  id: string;
  name: string;
  addressFr: string;
  addressAr: string;
  city: string;
  neighborhood: string;
  geo: { lat: number; lng: number };
  phone: string;
  whatsapp: string;
  email: string;
  openingHours: OpeningHour[];
}
