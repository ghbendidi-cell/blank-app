import type { Review } from "@/lib/types";

// Aucun avis vérifiable publiquement n'a été trouvé au moment de la mise en ligne
// (Google Maps et Facebook ne sont pas accessibles en lecture automatisée).
// Les avis réels soumis via le formulaire du site (ou fournis par l'agence)
// doivent être ajoutés ici après vérification.
export const reviews: Review[] = [];

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
