import { offers } from './mocks/offers';
import { Offers } from './types/offer';

const enum Default {
  ScalingFactor = 100 / 5
}

export function formatRating(rating: number) {
  return `${Math.round(Default.ScalingFactor * rating)}%`;
}

const MAX_NEAR_OFFERS = 3;

export const getNearOffers = (offer: Offers): Offers[] => {
  const nearOffers = [];

  for (let i = 0; i < offers.length; i++) {
    if (offers[i].id !== offer.id && offers[i].city.name === offer.city.name) {
      nearOffers.push(offers[i]);
    }

    if (nearOffers.length >= MAX_NEAR_OFFERS) {
      break;
    }
  }

  return nearOffers;
};

export function formatDate(date: string) {
  return new Intl.DateTimeFormat('en-US', { month: 'long', year: 'numeric' }).format(new Date(date));
}
