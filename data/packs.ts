import type { Pack } from "@/lib/types";

const photo = (url: string, altFr: string, altAr: string): Pack["images"][number] => ({
  url,
  altFr,
  altAr,
  isPlaceholder: false,
  aspectRatio: "4:3",
});

export const packs: Pack[] = [
  {
    id: "pack-egypte-caire-sharm",
    slug: "egypte-caire-sharm-el-sheikh",
    titleFr: "Égypte — Le Caire & Sharm El Sheikh",
    titleAr: "مصر - القاهرة وشرم الشيخ",
    destinationId: "dest-egypte",
    tripType: "international",
    durationDays: 10,
    durationNights: 9,
    priceFrom: 17500,
    currency: "MAD",
    priceVariants: [
      { labelFr: "Chambre double / personne", labelAr: "غرفة مزدوجة / للشخص", price: 17500 },
    ],
    departureDates: [],
    inclusionsFr: ["Vol aller-retour", "Hébergement en chambre double", "Petit-déjeuner"],
    inclusionsAr: ["رحلة ذهاب وإياب", "الإقامة في غرفة مزدوجة", "الإفطار"],
    exclusionsFr: ["Déjeuners et dîners", "Excursions optionnelles", "Dépenses personnelles"],
    exclusionsAr: ["وجبات الغداء والعشاء", "الرحلات الاختيارية", "المصاريف الشخصية"],
    itinerary: [
      {
        dayNumber: 1,
        titleFr: "Le Caire",
        titleAr: "القاهرة",
        descriptionFr: "Découverte du Caire : Pyramides de Gizeh et sites historiques.",
        descriptionAr: "اكتشاف القاهرة: أهرامات الجيزة والمواقع التاريخية.",
      },
      {
        dayNumber: 2,
        titleFr: "Sharm El Sheikh",
        titleAr: "شرم الشيخ",
        descriptionFr: "Transfert vers Sharm El Sheikh pour la partie balnéaire du séjour, mer Rouge.",
        descriptionAr: "التنقل نحو شرم الشيخ لقسم الاستجمام بالرحلة على البحر الأحمر.",
      },
    ],
    images: [
      photo("/images/louxor-egypte.jpg", "Avenue des sphinx, Louxor", "طريق الكباش، الأقصر"),
      photo("/images/egypte-pyramide-saqqara.jpg", "Pyramide à degrés de Saqqarah", "هرم سقارة المدرج"),
      photo("/images/egypte-felouques-nil.jpg", "Felouques sur le Nil", "مراكب شراعية على النيل"),
    ],
    highlightsFr: ["Le Caire & Sharm El Sheikh", "9 nuits / 10 jours", "Culture et mer Rouge"],
    highlightsAr: ["القاهرة وشرم الشيخ", "9 ليالي / 10 أيام", "ثقافة وبحر أحمر"],
    ratingAvg: 0,
    ratingCount: 0,
    isFeatured: true,
  },
  {
    id: "pack-vietnam",
    slug: "vietnam-12-nuits-14-jours",
    titleFr: "Vietnam — 12 nuits / 14 jours",
    titleAr: "فيتنام - 12 ليلة / 14 يوما",
    destinationId: "dest-vietnam",
    tripType: "international",
    durationDays: 14,
    durationNights: 12,
    priceFrom: 32900,
    currency: "MAD",
    priceVariants: [
      { labelFr: "Chambre double / personne", labelAr: "غرفة مزدوجة / للشخص", price: 32900 },
    ],
    departureDates: [],
    inclusionsFr: ["Vol aller-retour", "Hébergement en chambre double", "Petit-déjeuner"],
    inclusionsAr: ["رحلة ذهاب وإياب", "الإقامة في غرفة مزدوجة", "الإفطار"],
    exclusionsFr: ["Déjeuners et dîners", "Excursions optionnelles", "Dépenses personnelles"],
    exclusionsAr: ["وجبات الغداء والعشاء", "الرحلات الاختيارية", "المصاريف الشخصية"],
    itinerary: [
      {
        dayNumber: 1,
        titleFr: "Rizières en terrasses",
        titleAr: "المدرجات الأرزية",
        descriptionFr: "Découverte des paysages de rizières en terrasses du nord du Vietnam.",
        descriptionAr: "اكتشاف مناظر المدرجات الأرزية بشمال فيتنام.",
      },
      {
        dayNumber: 2,
        titleFr: "Baie d'Along",
        titleAr: "خليج هالونغ",
        descriptionFr: "Croisière en jonque traditionnelle sur la baie d'Along.",
        descriptionAr: "رحلة بحرية بقارب تقليدي في خليج هالونغ.",
      },
      {
        dayNumber: 3,
        titleFr: "Da Nang",
        titleAr: "دا نانغ",
        descriptionFr: "Découverte de Da Nang et de son célèbre pont du Dragon.",
        descriptionAr: "اكتشاف مدينة دا نانغ وجسرها الشهير المسمى جسر التنين.",
      },
    ],
    images: [
      photo("/images/baie-along-vietnam.jpg", "Baie d'Along, Vietnam", "خليج هالونغ، فيتنام"),
      photo("/images/vietnam-hoi-an.jpg", "Front de mer de Hoi An", "واجهة هوي آن البحرية"),
      photo("/images/vietnam-po-nagar.jpg", "Tours Po Nagar, Nha Trang", "أبراج بو ناغار، نها ترانغ"),
    ],
    highlightsFr: ["Baie d'Along en jonque", "Rizières en terrasses", "12 nuits / 14 jours"],
    highlightsAr: ["خليج هالونغ بالقارب التقليدي", "المدرجات الأرزية", "12 ليلة / 14 يوما"],
    ratingAvg: 0,
    ratingCount: 0,
    isFeatured: true,
  },
  {
    id: "pack-istanbul",
    slug: "turquie-istanbul-7-nuits",
    titleFr: "Turquie — Istanbul, 7 nuits / 8 jours",
    titleAr: "تركيا - إسطنبول، 7 ليال / 8 أيام",
    destinationId: "dest-turquie",
    tripType: "international",
    durationDays: 8,
    durationNights: 7,
    priceFrom: 9900,
    currency: "MAD",
    priceVariants: [
      { labelFr: "Chambre double / personne", labelAr: "غرفة مزدوجة / للشخص", price: 9900 },
    ],
    departureDates: [],
    inclusionsFr: [
      "Billet d'avion aller-retour",
      "7 nuits en petit-déjeuner en chambre double",
      "Assistance d'un guide arabophone",
      "Transfert aéroport / hôtel / aéroport",
    ],
    inclusionsAr: [
      "تذكرة الطائرة ذهابا وإيابا",
      "7 ليالي إقامة مع الإفطار في غرفة مزدوجة",
      "مرافقة مرشد ناطق بالعربية",
      "النقل من وإلى المطار",
    ],
    exclusionsFr: ["Déjeuners et dîners", "Visa (exemption pour les Marocains)", "Dépenses personnelles"],
    exclusionsAr: ["وجبات الغداء والعشاء", "التأشيرة (معفى عنها للمغاربة)", "المصاريف الشخصية"],
    itinerary: [
      {
        dayNumber: 1,
        titleFr: "Arrivée à Istanbul",
        titleAr: "الوصول إلى إسطنبول",
        descriptionFr: "Accueil à l'aéroport et transfert à l'hôtel.",
        descriptionAr: "الاستقبال بالمطار والنقل إلى الفندق.",
      },
      {
        dayNumber: 2,
        titleFr: "Istanbul historique",
        titleAr: "إسطنبول التاريخية",
        descriptionFr: "Visite du quartier historique avec le guide arabophone.",
        descriptionAr: "زيارة الحي التاريخي برفقة المرشد الناطق بالعربية.",
      },
    ],
    images: [
      photo("/images/istanbul-bosphore.jpg", "Vue sur le Bosphore, Istanbul", "منظر على مضيق البوسفور، إسطنبول"),
      photo("/images/turquie-topkapi-bosphore.jpg", "Palais de Topkapi et Bosphore", "قصر توبكابي والبوسفور"),
      photo("/images/turquie-oludeniz-aerien.jpg", "Vue aérienne d'Ölüdeniz", "منظر جوي لأولوديينيز"),
    ],
    highlightsFr: ["Vol + hôtel inclus", "Guide arabophone", "Sans visa pour les Marocains"],
    highlightsAr: ["الطيران والفندق مشمولان", "مرشد ناطق بالعربية", "بدون تأشيرة للمغاربة"],
    ratingAvg: 0,
    ratingCount: 0,
    isFeatured: true,
  },
  {
    id: "pack-hajj-2027",
    slug: "hajj-1448h-2027",
    titleFr: "Hajj 1448H — 2027",
    titleAr: "برنامج الحج 1448 هـ - 2027",
    destinationId: "dest-arabie-saoudite",
    tripType: "hajj",
    durationDays: 0,
    durationNights: 0,
    priceFrom: 68000,
    currency: "MAD",
    priceVariants: [
      { labelFr: "Chambre quadruple / personne", labelAr: "غرفة رباعية / للشخص", price: 68000 },
      { labelFr: "Chambre triple / personne", labelAr: "غرفة ثلاثية / للشخص", price: 76000 },
      { labelFr: "Chambre double / personne", labelAr: "غرفة مزدوجة / للشخص", price: 87000 },
    ],
    departureDates: [],
    inclusionsFr: [
      "Billet d'avion aller-retour (vols directs)",
      "Hébergement à La Mecque et Médine",
      "4 nuits à Médine",
      "Hébergement les jours de Tachriq à Mina/Arafat (secteur B) en pension complète",
      "Encadrement religieux tout au long de la saison du Hajj",
      "Transferts à l'intérieur de l'Arabie Saoudite",
      "Visites à Médine",
      "Frais Barid Bank (carte du pèlerin)",
    ],
    inclusionsAr: [
      "تذكرة الطائرة ذهابا وإيابا (خطوط مباشرة)",
      "الإقامة بمكة المكرمة والمدينة المنورة",
      "4 ليالي بالمدينة المنورة",
      "الإقامة أيام التشريق بمنى وعرفات (مربع ب) مع الإعاشة الكاملة",
      "تأطير ديني طيلة موسم الحج",
      "التنقلات داخل المملكة العربية السعودية",
      "المزارات بالمدينة المنورة",
      "مصاريف بريد بنك (بطاقة الحاج)",
    ],
    exclusionsFr: [
      "Frais du sacrifice (Hadi)",
      "Supplément lit additionnel pour hôtels 5 étoiles en chambre triple/quadruple",
    ],
    exclusionsAr: ["مصاريف الهدي", "إضافة سرير إضافي بالفنادق خمس نجوم للغرف الثلاثية والرباعية"],
    itinerary: [
      {
        dayNumber: 1,
        titleFr: "Médine",
        titleAr: "المدينة المنورة",
        descriptionFr: "Arrivée et séjour de 4 nuits à Médine, visites et prières à la Mosquée du Prophète.",
        descriptionAr: "الوصول وإقامة 4 ليالي بالمدينة المنورة، الزيارات والصلاة بالمسجد النبوي.",
      },
      {
        dayNumber: 2,
        titleFr: "La Mecque",
        titleAr: "مكة المكرمة",
        descriptionFr: "Route vers La Mecque, hébergement proche des lieux saints.",
        descriptionAr: "الطريق نحو مكة المكرمة، الإقامة قريبا من الأماكن المقدسة.",
      },
      {
        dayNumber: 3,
        titleFr: "Mina, Arafat et Muzdalifa",
        titleAr: "منى وعرفات ومزدلفة",
        descriptionFr: "Jours de Tachriq à Mina et Arafat avec encadrement religieux et pension complète.",
        descriptionAr: "أيام التشريق بمنى وعرفات مع تأطير ديني وإعاشة كاملة.",
      },
    ],
    images: [
      photo("/images/mecque-omra.jpg", "La Mosquée Al-Haram et la Kaaba, La Mecque", "المسجد الحرام والكعبة المشرفة، مكة المكرمة"),
      photo("/images/mecque-tour-horloge.jpg", "Tour de l'Horloge, La Mecque", "برج الساعة، مكة المكرمة"),
      photo("/images/mecque-grande-mosquee.jpg", "Grande mosquée", "المسجد الكبير"),
    ],
    highlightsFr: ["Encadrement religieux complet", "4 nuits à Médine incluses", "Hôtels proches des lieux saints"],
    highlightsAr: ["تأطير ديني كامل", "4 ليالي بالمدينة المنورة مشمولة", "فنادق قريبة من الأماكن المقدسة"],
    ratingAvg: 0,
    ratingCount: 0,
    isFeatured: true,
  },
];

export function getPackBySlug(slug: string) {
  return packs.find((p) => p.slug === slug);
}

export function getPacksByDestination(destinationId: string) {
  return packs.filter((p) => p.destinationId === destinationId);
}

export function getSimilarPacks(pack: Pack, limit = 3) {
  return packs
    .filter((p) => p.id !== pack.id && (p.destinationId === pack.destinationId || p.tripType === pack.tripType))
    .slice(0, limit);
}
