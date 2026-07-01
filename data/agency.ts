import type { Agency } from "@/lib/types";

// Coordonnées fictives — à remplacer par les vraies informations de l'agence avant mise en production.
export const agency: Agency = {
  id: "agency-maarif",
  name: "Millenium Travel — Maarif",
  addressFr: "Boulevard Massira Al Khadra, Maarif, Casablanca",
  addressAr: "شارع المسيرة الخضراء، المعاريف، الدار البيضاء",
  city: "Casablanca",
  neighborhood: "Maarif",
  geo: { lat: 33.5822, lng: -7.6293 },
  phone: "+212522000000",
  whatsapp: "+212600000000",
  email: "contact@milleniumtravel.ma",
  openingHours: [
    { dayFr: "Lundi – Vendredi", dayAr: "الاثنين - الجمعة", hours: "9h00 – 19h00" },
    { dayFr: "Samedi", dayAr: "السبت", hours: "9h30 – 17h00" },
    { dayFr: "Dimanche", dayAr: "الأحد", hours: "Fermé" },
  ],
};
