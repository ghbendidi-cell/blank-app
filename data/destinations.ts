import type { Destination } from "@/lib/types";

const placeholderHero = (altFr: string, altAr: string): Destination["heroImage"] => ({
  url: null,
  altFr,
  altAr,
  isPlaceholder: true,
  aspectRatio: "16:9",
});

export const destinations: Destination[] = [
  {
    id: "dest-marrakech",
    slug: "marrakech",
    nameFr: "Marrakech",
    nameAr: "مراكش",
    countryCode: "MA",
    region: "maroc",
    descriptionFr:
      "La ville ocre, ses souks, la médina classée à l'UNESCO et l'Atlas en toile de fond. Idéale pour un week-end ou un séjour prolongé.",
    descriptionAr:
      "المدينة الحمراء بأسواقها ومدينتها العتيقة المصنفة تراثا عالميا وجبال الأطلس في الخلفية. مثالية لعطلة نهاية أسبوع أو إقامة أطول.",
    bestPeriodFr: "Mars à mai, septembre à novembre",
    bestPeriodAr: "من مارس إلى ماي، ومن شتنبر إلى نونبر",
    heroImage: placeholderHero("Vue de Marrakech", "منظر لمدينة مراكش"),
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
      "Istanbul, la Cappadoce et ses montgolfières, le Bosphore. Une destination très prisée des Marocains pour son rapport qualité-prix.",
    descriptionAr:
      "إسطنبول، الكابادوكيا ومناطيدها، مضيق البوسفور. وجهة مفضلة لدى المغاربة لجودتها وأسعارها المناسبة.",
    bestPeriodFr: "Avril à juin, septembre à octobre",
    bestPeriodAr: "من أبريل إلى يونيو، ومن شتنبر إلى أكتوبر",
    visaInfoFr: "Exemption de visa pour les ressortissants marocains (séjour touristique).",
    visaInfoAr: "إعفاء من التأشيرة للمواطنين المغاربة (إقامة سياحية).",
    heroImage: placeholderHero("Vue d'Istanbul", "منظر لإسطنبول"),
    featured: true,
  },
  {
    id: "dest-dubai",
    slug: "dubai-emirats",
    nameFr: "Dubaï & Émirats",
    nameAr: "دبي والإمارات",
    countryCode: "AE",
    region: "international",
    descriptionFr:
      "Shopping, désert, gratte-ciels et parcs d'attractions. Une destination moderne très demandée pour les groupes et familles.",
    descriptionAr:
      "التسوق، الصحراء، ناطحات السحاب والمدن الترفيهية. وجهة عصرية مطلوبة بكثرة للمجموعات والعائلات.",
    bestPeriodFr: "Novembre à mars",
    bestPeriodAr: "من نونبر إلى مارس",
    visaInfoFr: "Visa touristique requis, formalités prises en charge par l'agence.",
    visaInfoAr: "تأشيرة سياحية مطلوبة، الوكالة تتكفل بالإجراءات.",
    heroImage: placeholderHero("Vue de Dubaï", "منظر لدبي"),
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
      "La Mecque et Médine. Programmes Omra et Hajj encadrés au départ de Casablanca, avec accompagnement religieux.",
    descriptionAr:
      "مكة المكرمة والمدينة المنورة. برامج عمرة وحج مؤطرة انطلاقا من الدار البيضاء، مع مرافقة دينية.",
    bestPeriodFr: "Toute l'année (Omra), période du Hajj selon calendrier hégirien",
    bestPeriodAr: "على مدار السنة (العمرة)، فترة الحج حسب التقويم الهجري",
    visaInfoFr: "Visa Omra/Hajj géré intégralement par l'agence.",
    visaInfoAr: "تأشيرة العمرة/الحج يتم تدبيرها بالكامل من طرف الوكالة.",
    heroImage: placeholderHero("Vue de la Mosquée Al-Haram", "منظر للمسجد الحرام"),
    featured: true,
  },
  {
    id: "dest-andalousie",
    slug: "andalousie",
    nameFr: "Andalousie",
    nameAr: "الأندلس",
    countryCode: "ES",
    region: "europe",
    descriptionFr:
      "Séville, Grenade, Cordoue : le patrimoine andalou à quelques heures du Maroc, entre histoire commune et architecture mauresque.",
    descriptionAr:
      "إشبيلية، غرناطة، قرطبة: التراث الأندلسي على بعد ساعات من المغرب، بين تاريخ مشترك وعمارة مغربية أندلسية.",
    bestPeriodFr: "Avril à juin, septembre à octobre",
    bestPeriodAr: "من أبريل إلى يونيو، ومن شتنبر إلى أكتوبر",
    visaInfoFr: "Visa Schengen requis, dossier préparé avec l'agence.",
    visaInfoAr: "تأشيرة شنغن مطلوبة، يتم تحضير الملف مع الوكالة.",
    heroImage: placeholderHero("Vue de l'Alhambra de Grenade", "منظر لقصر الحمراء بغرناطة"),
    featured: false,
  },
];

export function getDestinationBySlug(slug: string) {
  return destinations.find((d) => d.slug === slug);
}
