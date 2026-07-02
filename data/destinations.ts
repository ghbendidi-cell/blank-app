import type { Destination } from "@/lib/types";

const photoHero = (url: string, altFr: string, altAr: string): Destination["heroImage"] => ({
  url,
  altFr,
  altAr,
  isPlaceholder: false,
  aspectRatio: "16:9",
});

export const destinations: Destination[] = [
  {
    id: "dest-egypte",
    slug: "egypte",
    nameFr: "Égypte",
    nameAr: "مصر",
    countryCode: "EG",
    region: "moyen-orient",
    descriptionFr:
      "Le Caire et Sharm El Sheikh : culture, soleil et évasion au même voyage. Pyramides de Gizeh, croisière sur le Nil et plages de la mer Rouge.",
    descriptionAr:
      "القاهرة وشرم الشيخ: ثقافة، شمس ونزهة في نفس الرحلة. أهرامات الجيزة، ونيل وشواطئ البحر الأحمر.",
    bestPeriodFr: "Octobre à avril",
    bestPeriodAr: "من أكتوبر إلى أبريل",
    heroImage: photoHero("/images/louxor-egypte.jpg", "Avenue des sphinx, Louxor", "طريق الكباش، الأقصر"),
    featured: true,
  },
  {
    id: "dest-vietnam",
    slug: "vietnam",
    nameFr: "Vietnam",
    nameAr: "فيتنام",
    countryCode: "VN",
    region: "asie",
    descriptionFr:
      "Rizières en terrasses, la baie d'Along et ses jonques traditionnelles, Da Nang et son pont du Dragon : un Vietnam entre nature et modernité.",
    descriptionAr:
      "المدرجات الأرزية، خليج هالونغ وقواربه التقليدية، دا نانغ وجسر التنين: فيتنام بين الطبيعة والحداثة.",
    bestPeriodFr: "Octobre à avril",
    bestPeriodAr: "من أكتوبر إلى أبريل",
    visaInfoFr: "Visa requis, formalités prises en charge par l'agence.",
    visaInfoAr: "تأشيرة مطلوبة، الوكالة تتكفل بالإجراءات.",
    heroImage: photoHero("/images/baie-along-vietnam.jpg", "Baie d'Along, Vietnam", "خليج هالونغ، فيتنام"),
    featured: true,
  },
  {
    id: "dest-turquie",
    slug: "turquie",
    nameFr: "Turquie",
    nameAr: "تركيا",
    countryCode: "TR",
    region: "international",
    descriptionFr:
      "Istanbul : mosquées historiques, Bosphore et quartiers colorés. Une destination très prisée des Marocains pour son rapport qualité-prix.",
    descriptionAr:
      "إسطنبول: مساجد تاريخية، مضيق البوسفور وأحياء ملونة. وجهة مفضلة لدى المغاربة لجودتها وأسعارها المناسبة.",
    bestPeriodFr: "Avril à juin, septembre à octobre",
    bestPeriodAr: "من أبريل إلى يونيو، ومن شتنبر إلى أكتوبر",
    visaInfoFr: "Exemption de visa pour les ressortissants marocains (séjour touristique).",
    visaInfoAr: "إعفاء من التأشيرة للمواطنين المغاربة (إقامة سياحية).",
    heroImage: photoHero("/images/istanbul-bosphore.jpg", "Vue sur le Bosphore, Istanbul", "منظر على مضيق البوسفور، إسطنبول"),
    featured: true,
  },
  {
    id: "dest-arabie-saoudite",
    slug: "arabie-saoudite",
    nameFr: "Arabie Saoudite (Omra & Hajj)",
    nameAr: "المملكة العربية السعودية (العمرة والحج)",
    countryCode: "SA",
    region: "moyen-orient",
    descriptionFr:
      "La Mecque et Médine. Programme Hajj encadré au départ de Casablanca, avec accompagnement religieux et hébergement proche des lieux saints.",
    descriptionAr:
      "مكة المكرمة والمدينة المنورة. برنامج حج مؤطر انطلاقا من الدار البيضاء، مع مرافقة دينية وإقامة قريبة من الأماكن المقدسة.",
    bestPeriodFr: "Période du Hajj selon calendrier hégirien",
    bestPeriodAr: "فترة الحج حسب التقويم الهجري",
    visaInfoFr: "Visa Hajj géré intégralement par l'agence.",
    visaInfoAr: "تأشيرة الحج يتم تدبيرها بالكامل من طرف الوكالة.",
    heroImage: photoHero("/images/mecque-omra.jpg", "La Mosquée Al-Haram et la Kaaba, La Mecque", "المسجد الحرام والكعبة المشرفة، مكة المكرمة"),
    featured: true,
  },
];

export function getDestinationBySlug(slug: string) {
  return destinations.find((d) => d.slug === slug);
}
