import type { Review } from "@/lib/types";

export const reviews: Review[] = [
  {
    id: "rev-1",
    packId: "pack-istanbul-7j",
    authorName: "Sara M.",
    rating: 5,
    commentFr: "Séjour parfaitement organisé, hôtel très bien situé et le guide était excellent. L'équipe de l'agence à Maarif a été très réactive.",
    commentAr: "إقامة منظمة بشكل ممتاز، الفندق في موقع جيد جدا والمرشد كان رائعا. فريق الوكالة بالمعاريف كان متجاوبا جدا.",
    source: "site",
    verifiedClient: true,
    createdAt: "2026-05-12",
  },
  {
    id: "rev-2",
    packId: "pack-omra-eco",
    authorName: "Mohammed A.",
    rating: 5,
    commentFr: "Omra très bien encadrée, hôtels proches des lieux saints comme promis. Je recommande vivement Millenium Travel.",
    commentAr: "عمرة مؤطرة بشكل جيد جدا، الفنادق قريبة من الأماكن المقدسة كما وعدوا. أنصح بشدة بـ Millenium Travel.",
    source: "google",
    verifiedClient: true,
    createdAt: "2026-04-02",
  },
  {
    id: "rev-3",
    packId: "pack-dubai-shopping",
    authorName: "Imane K.",
    rating: 4,
    commentFr: "Très bon rapport qualité-prix, le safari désert était le point fort du séjour. Un petit bémol sur le timing des transferts.",
    commentAr: "جودة جيدة مقابل السعر، رحلة السفاري كانت أفضل ما في الإقامة. ملاحظة بسيطة حول توقيت النقل.",
    source: "site",
    verifiedClient: true,
    createdAt: "2026-03-20",
  },
  {
    id: "rev-4",
    packId: "pack-marrakech-weekend",
    authorName: "Youssef B.",
    rating: 5,
    commentFr: "Week-end réservé en agence à Maarif en 20 minutes, tout s'est déroulé sans accroc. On recommence !",
    commentAr: "حجزنا عطلة نهاية الأسبوع بالوكالة في المعاريف خلال 20 دقيقة، كل شيء سار على ما يرام. سنكرر التجربة!",
    source: "facebook",
    verifiedClient: true,
    createdAt: "2026-06-01",
  },
  {
    id: "rev-5",
    authorName: "Fatima Zahra L.",
    rating: 5,
    commentFr: "Agence sérieuse, conseillers à l'écoute. J'ai eu mon devis WhatsApp en moins d'une heure.",
    commentAr: "وكالة جادة ومستشارون منصتون. حصلت على عرض السعر عبر واتساب في أقل من ساعة.",
    source: "google",
    verifiedClient: true,
    createdAt: "2026-02-18",
  },
  {
    id: "rev-6",
    packId: "pack-cappadoce-istanbul",
    authorName: "Karim T.",
    rating: 5,
    commentFr: "Le combiné Cappadoce/Istanbul est magique. Le vol en montgolfière restera un souvenir inoubliable.",
    commentAr: "الجمع بين الكابادوكيا وإسطنبول رائع. رحلة المنطاد ستبقى ذكرى لا تنسى.",
    source: "site",
    verifiedClient: true,
    createdAt: "2026-05-29",
  },
  {
    id: "rev-7",
    packId: "pack-andalousie",
    authorName: "Salma R.",
    rating: 4,
    commentFr: "Beau circuit, guide francophone très compétent. Les journées étaient parfois un peu chargées.",
    commentAr: "جولة جميلة، مرشد ناطق بالفرنسية كفؤ جدا. الأيام كانت مزدحمة قليلا أحيانا.",
    source: "site",
    verifiedClient: true,
    createdAt: "2026-06-15",
  },
  {
    id: "rev-8",
    authorName: "Anas H.",
    rating: 5,
    commentFr: "Deuxième réservation avec Millenium Travel, toujours aussi professionnel. L'agence à Maarif est facile d'accès.",
    commentAr: "الحجز الثاني مع Millenium Travel، دائما بنفس الاحترافية. الوكالة بالمعاريف سهلة الوصول إليها.",
    source: "google",
    verifiedClient: true,
    createdAt: "2026-01-25",
  },
];

export function getReviewsByPack(packId: string) {
  return reviews.filter((r) => r.packId === packId);
}

export function getRatingSummary(filteredReviews: Review[] = reviews) {
  const count = filteredReviews.length;
  const avg = count === 0 ? 0 : filteredReviews.reduce((sum, r) => sum + r.rating, 0) / count;
  const distribution = [5, 4, 3, 2, 1].map((stars) => ({
    stars,
    count: filteredReviews.filter((r) => r.rating === stars).length,
  }));
  return { count, avg: Math.round(avg * 10) / 10, distribution };
}
