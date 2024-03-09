import { faker } from '@faker-js/faker';
import { Offers, City, Location } from '../types/offer';
import { CITIES, CityLocation, OFFER_TYPE, OfferType } from '../const';

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

// const getMockLocation = (): Location => ({
//   latitude: faker.location.latitude(),
//   longitude: faker.location.longitude(),
//   zoom: faker.number.int({ min: 1, max: 10 }),
// });

// const getMockCity = (): City => ({
//   name: faker.helpers.arrayElement(CITIES),
//   location: getMockLocation()
// });

export const getMockOffer = (): Offers => {
  const randomImagesCount = faker.number.int({ min: 1, max: 6 });
  const images: string[] = Array.from({ length: randomImagesCount }, () =>
    faker.image.urlLoremFlickr({ category: 'apartment' })
  );

  return ({
    id: faker.string.uuid(),
    title: faker.location.streetAddress({ useFullAddress: true }),
    type: faker.helpers.arrayElement<OfferType>(OFFER_TYPE),
    price: faker.number.int({ min: 10, max: 100 }),
    city: faker.helpers.arrayElement(CityLocation),
    location: {
      latitude: 48.862610000000004,
      longitude: 2.369499,
      zoom: 16
    },
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

export const offers: Offers[] = Array.from({ length: OFFER_COUNT }, () => getMockOffer());
