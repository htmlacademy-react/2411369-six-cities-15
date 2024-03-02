const enum Default {
  ScalingFactor = 100 / 5
}

export function formatRating(rating: number) {
  return `${Math.round(Default.ScalingFactor * rating)}%`;
}
