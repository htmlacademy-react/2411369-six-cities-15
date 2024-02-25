import { faker } from '@faker-js/faker';
import { ListOffers, City, Location } from '../types/offer';
import { CITIES, OFFER_TYPE, OfferType } from '../const';

const OFFER_COUNT = 5;

const getMockLocation = (): Location => ({
  latitude: faker.location.latitude(),
  longitude: faker.location.longitude(),
  zoom: faker.number.int({ min: 1, max: 10 }),
});

const getMockCity = (): City => ({
  name: faker.helpers.arrayElement(CITIES).name,
  location: getMockLocation()
});

export const getMockOffer = (): ListOffers => ({
  id: faker.string.uuid(),
  title: faker.location.streetAddress({ useFullAddress: true }),
  type: faker.helpers.arrayElement<OfferType>(OFFER_TYPE),
  price: faker.number.int({ min: 10, max: 100 }),
  city: getMockCity(),
  location: getMockLocation(),
  isFavorite: faker.datatype.boolean(0.3),
  isPremium: faker.datatype.boolean(0.3),
  rating: faker.number.int({ min: 0, max: 5 }),
  previewImage: faker.image.urlLoremFlickr({ width: 260, height: 200, category: 'apartment' }),
});

export const OFFERS: ListOffers[] = faker.helpers.multiple(getMockOffer, {
  count: OFFER_COUNT,
});
