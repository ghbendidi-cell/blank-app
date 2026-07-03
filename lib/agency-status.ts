export interface AgencyOpenStatus {
  isOpen: boolean;
  nextOpeningFr: string;
  nextOpeningAr: string;
}

// Basé sur les horaires réels de l'agence (data/agency.ts) :
// Lundi-Vendredi 9h-19h, Samedi 9h30-17h, Dimanche fermé.
export function getAgencyOpenStatus(now = new Date()): AgencyOpenStatus {
  const day = now.getDay(); // 0 = dimanche ... 6 = samedi
  const hour = now.getHours() + now.getMinutes() / 60;

  if (day === 0) {
    return { isOpen: false, nextOpeningFr: "lundi à 9h00", nextOpeningAr: "الاثنين على الساعة 9:00" };
  }
  if (day === 6) {
    const isOpen = hour >= 9.5 && hour < 17;
    return { isOpen, nextOpeningFr: "9h30", nextOpeningAr: "9:30" };
  }
  const isOpen = hour >= 9 && hour < 19;
  const nextOpeningFr = hour >= 19 && day === 5 ? "samedi à 9h30" : "9h00";
  const nextOpeningAr = hour >= 19 && day === 5 ? "السبت على الساعة 9:30" : "9:00";
  return { isOpen, nextOpeningFr, nextOpeningAr };
}
