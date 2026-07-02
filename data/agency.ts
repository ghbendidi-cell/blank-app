import type { Agency } from "@/lib/types";

export const agency: Agency = {
  id: "agency-maarif",
  name: "Millenium Travel",
  addressFr: "25, Rue Aziz Bellal, Maârif, Casablanca",
  addressAr: "25، زنقة عزيز بلال، المعاريف، الدار البيضاء",
  city: "Casablanca",
  neighborhood: "Maârif",
  geo: { lat: 33.5822, lng: -7.6293 },
  phone: "+212522237365",
  whatsapp: "+212669324855",
  email: "info@milleniumtravel.ma",
  openingHours: [
    { dayFr: "Lundi – Vendredi", dayAr: "الاثنين - الجمعة", hours: "9h00 – 19h00" },
    { dayFr: "Samedi", dayAr: "السبت", hours: "9h30 – 17h00" },
    { dayFr: "Dimanche", dayAr: "الأحد", hours: "Fermé" },
  ],
};
