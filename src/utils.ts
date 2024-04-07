import { SortOption } from './components/sort';
import { ServerOffer } from './types/offer';
import { Review } from './types/review';

const enum Default {
  ScalingFactor = 100 / 5
}

export function formatRating(rating: number) {
  return `${Math.round(rating) * Default.ScalingFactor}%`;
}

export function formatDate(date: string) {
  return new Intl.DateTimeFormat('en-US', { month: 'long', year: 'numeric' }).format(new Date(date));
}

export function sortReviewsDate(a: Review, b: Review) {
  return new Date(b.date).getTime() - new Date(a.date).getTime();
}

export function sortOffers(allOffers: ServerOffer[], sortOption: SortOption) {
  switch (sortOption) {
    case SortOption.PriceLowToHigh:
      return allOffers.toSorted((a, b) => a.price - b.price);
    case SortOption.PriceHighToLow:
      return allOffers.toSorted((a, b) => b.price - a.price);
    case SortOption.TopRatedFirst:
      return allOffers.toSorted((a, b) => b.rating - a.rating);
    default:
      return allOffers;
  }
}

export const ucFirst = (string: string) => {
  if (!string) {
    return string;
  }

  return string.charAt(0).toUpperCase() + string.slice(1);
};

const getRandomInteger = (min: number, max: number) => {
  const lower = Math.ceil(Math.min(min, max));
  const upper = Math.floor(Math.max(min, max));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

export const getRandomArrayElement = <Element>(array: Element[] | readonly Element[]) =>
  array[getRandomInteger(0, array.length - 1)];
