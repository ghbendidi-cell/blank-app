import type { Review } from "@/lib/types";
import ReviewCard from "./ReviewCard";

export default function TestimonialCarousel({ reviews }: { reviews: Review[] }) {
  return (
    <div className="-mx-4 flex snap-x gap-4 overflow-x-auto px-4 pb-2">
      {reviews.map((review) => (
        <div key={review.id} className="w-72 shrink-0 snap-start">
          <ReviewCard review={review} />
        </div>
      ))}
    </div>
  );
}
