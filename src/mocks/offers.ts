import { faker } from '@faker-js/faker';
import { Location, Offer } from '../types/offer';
import { CITY_LOCATIONS, OFFER_TYPE, OfferType } from '../const';

const GOODS = [
  'Wi-Fi',
  'Washing machine',
  'Towels',
  'Heating',
  'Coffee machine',
  'Baby seat',
  'Kitchen',
  'Dishwasher',
  'Cabel TV',
  'Fridge'
];

const OFFER_COUNT = faker.number.int({ min: 10, max: 30 });

const getMockLocation = (city: Location): Location => ({
  latitude: faker.location.latitude({
    max: city.latitude + 0.01,
    min: city.latitude - 0.01,
  }),
  longitude: faker.location.longitude({
    max: city.longitude + 0.01,
    min: city.longitude - 0.01,
  }),
  zoom: faker.number.int({ min: 1, max: 10 }),
});

export const getMockOffer = (): Offer => {
  const randomImagesCount = faker.number.int({ min: 1, max: 6 });
  const images: string[] = Array.from({ length: randomImagesCount }, () =>
    faker.image.urlLoremFlickr({ category: 'apartment' })
  );

  const city = faker.helpers.arrayElement(CITY_LOCATIONS);

  return ({
    id: faker.string.uuid(),
    title: faker.location.streetAddress({ useFullAddress: true }),
    type: faker.helpers.arrayElement<OfferType>(OFFER_TYPE),
    price: faker.number.int({ min: 10, max: 100 }),
    city,
    location: getMockLocation(city.location),
    isFavorite: faker.datatype.boolean(0.3),
    isPremium: faker.datatype.boolean(0.3),
    rating: faker.number.int({ min: 0, max: 5 }),
    previewImage: faker.image.urlLoremFlickr({ width: 260, height: 200, category: 'apartment' }),
    description: faker.lorem.words({ min: 10, max: 25 }),
    bedrooms: faker.number.int({ min: 1, max: 3 }),
    goods: faker.helpers.arrayElements(GOODS, { min: 1, max: 10 }),
    host: {
      name: faker.person.fullName(),
      avatarUrl: faker.image.avatarGitHub(),
      isPro: faker.datatype.boolean(0.3)
    },
    images: images,
    maxAdults: faker.number.int({ min: 1, max: 4 })
  });
};

export const offers: Offer[] = Array.from({ length: OFFER_COUNT }, () => getMockOffer());
