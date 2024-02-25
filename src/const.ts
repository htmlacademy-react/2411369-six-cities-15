export const Setting = {
  offersCount: 300
};

export const APP_NAME = '6 cities';

export const CITIES = [
  {name: 'Paris', slug: 'paris'},
  {name: 'Cologne', slug: 'cologne'},
  {name: 'Brussels', slug: 'brussels'},
  {name: 'Amsterdam', slug: 'amsterdam'},
  {name: 'Hamburg', slug: 'hamburg'},
  {name: 'Dusseldorf', slug: 'dusseldorf'},
] as const;

export type CityName = typeof CITIES[number]['name'];

export const OFFER_TYPE = [
  'Apartment',
  'Room',
  'House',
  'Hotel'
] as const;

export type OfferType = typeof OFFER_TYPE[number];

export enum AppRoute {
  Main = '/',
  Login = '/login',
  Favorites = '/favorites',
  Offer = '/offer/:id'
}

export enum AuthorizationStatus {
  Auth = 'AUTH',
  NoAuth = 'NO_AUTH',
  Unknown = 'UNKNOWN'
}
