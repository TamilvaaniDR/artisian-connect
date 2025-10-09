import React from "react";

export default function RatingStars({ value = 0, size = 14 }) {
  const full = Math.floor(value);
  const half = value - full >= 0.5;
  const stars = Array.from({ length: 5 }).map((_, i) => {
    if (i < full) return "full";
    if (i === full && half) return "half";
    return "empty";
  });
  return (
    <div className="flex items-center" aria-label={`Rating ${value} of 5`}>
      {stars.map((t, i) => (
        <svg key={i} width={size} height={size} viewBox="0 0 24 24" className={t !== "empty" ? "text-amber-500" : "text-gray-300"} fill="currentColor">
          {t === "half" ? (
            <defs>
              <linearGradient id={`half-${i}`} x1="0" x2="100%">
                <stop offset="50%" stopColor="currentColor" />
                <stop offset="50%" stopColor="transparent" />
              </linearGradient>
            </defs>
          ) : null}
          <path fill={t === "half" ? `url(#half-${i})` : "currentColor"} d="M12 .587l3.668 7.431 8.2 1.192-5.934 5.787 1.402 8.168L12 18.896 4.664 23.165l1.402-8.168L.132 9.21l8.2-1.192z"/>
        </svg>
      ))}
    </div>
  );
}
