import type { Destination } from "@/lib/types";

const photo = (url: string, altFr: string, altAr: string): Destination["heroImage"] => ({
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
    heroImage: photo("/images/louxor-egypte.jpg", "Avenue des sphinx, Louxor", "طريق الكباش، الأقصر"),
    gallery: [
      photo("/images/egypte-pyramide-saqqara.jpg", "Pyramide à degrés de Saqqarah", "هرم سقارة المدرج"),
      photo("/images/egypte-felouques-nil.jpg", "Felouques sur le Nil", "مراكب شراعية على النيل"),
      photo("/images/egypte-drapeau-nil.jpg", "Bord du Nil, Le Caire", "ضفاف النيل، القاهرة"),
    ],
    accentColor: "egypt",
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
    heroImage: photo("/images/baie-along-vietnam.jpg", "Baie d'Along, Vietnam", "خليج هالونغ، فيتنام"),
    gallery: [
      photo("/images/vietnam-hoi-an.jpg", "Front de mer de Hoi An", "واجهة هوي آن البحرية"),
      photo("/images/vietnam-po-nagar.jpg", "Tours Po Nagar, Nha Trang", "أبراج بو ناغار، نها ترانغ"),
      photo("/images/vietnam-village-encens.jpg", "Village de bâtons d'encens, Vietnam", "قرية أعواد البخور، فيتنام"),
    ],
    accentColor: "vietnam",
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
    heroImage: photo("/images/istanbul-bosphore.jpg", "Vue sur le Bosphore, Istanbul", "منظر على مضيق البوسفور، إسطنبول"),
    gallery: [
      photo("/images/turquie-topkapi-bosphore.jpg", "Palais de Topkapi et Bosphore", "قصر توبكابي والبوسفور"),
      photo("/images/turquie-kekova.jpg", "Côte de Kekova, Turquie", "ساحل كيكوفا، تركيا"),
      photo("/images/turquie-oludeniz-aerien.jpg", "Vue aérienne d'Ölüdeniz", "منظر جوي لأولوديينيز"),
    ],
    accentColor: "turkey",
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
    heroImage: photo("/images/mecque-omra.jpg", "La Mosquée Al-Haram et la Kaaba, La Mecque", "المسجد الحرام والكعبة المشرفة، مكة المكرمة"),
    gallery: [
      photo("/images/mecque-tour-horloge.jpg", "Tour de l'Horloge, La Mecque", "برج الساعة، مكة المكرمة"),
      photo("/images/mecque-grande-mosquee.jpg", "Grande mosquée", "المسجد الكبير"),
    ],
    accentColor: "hajj",
    featured: true,
  },
];

export function getDestinationBySlug(slug: string) {
  return destinations.find((d) => d.slug === slug);
}
