import { RATING_STARS_WIDTH_FACTOR } from './const';


export function getRating(rating: number): string {
  return `${RATING_STARS_WIDTH_FACTOR * rating}%`;
}
