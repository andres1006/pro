import React from "react";
import { Star } from "lucide-react";

interface StarRatingDisplayProps {
  rating: number; // Número de estrellas llenas (ej: 4)
  maxRating?: number; // Total de estrellas a mostrar (ej: 5)
}

export function StarRatingDisplay({
  rating,
  maxRating = 5,
}: StarRatingDisplayProps) {
  const stars = [];
  for (let i = 1; i <= maxRating; i++) {
    stars.push(
      <Star
        key={i}
        className={`h-4 w-4 ${
          i <= rating
            ? "fill-primary/80 text-primary/80 dark:fill-purple-400 dark:text-purple-400"
            : "fill-muted text-muted dark:fill-gray-600 dark:text-gray-600"
        }`}
      />
    );
  }

  return <div className="flex items-center space-x-1">{stars}</div>;
}
