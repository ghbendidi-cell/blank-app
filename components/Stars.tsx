export default function Stars({ rating, size = 16 }: { rating: number; size?: number }) {
  const stars = [1, 2, 3, 4, 5];

  return (
    <span className="inline-flex items-center gap-0.5" aria-label={`${rating} / 5`}>
      {stars.map((star) => {
        const filled = star <= Math.round(rating);
        return (
          <svg
            key={star}
            width={size}
            height={size}
            viewBox="0 0 20 20"
            fill={filled ? "#b1725e" : "none"}
            stroke="#b1725e"
            strokeWidth="1"
          >
            <path d="M10 1.5l2.6 5.27 5.82.85-4.21 4.1 1 5.8L10 14.9l-5.21 2.74 1-5.8-4.21-4.1 5.82-.85z" />
          </svg>
        );
      })}
    </span>
  );
}
