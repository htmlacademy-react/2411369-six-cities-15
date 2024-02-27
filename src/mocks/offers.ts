import { faker } from '@faker-js/faker';
import { ListOffers, City, Location } from '../types/offer';
import { CITIES, OFFER_TYPE, OfferType } from '../const';

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

const getMockLocation = (): Location => ({
  latitude: faker.location.latitude(),
  longitude: faker.location.longitude(),
  zoom: faker.number.int({ min: 1, max: 10 }),
});

const getMockCity = (): City => ({
  name: faker.helpers.arrayElement(CITIES).name,
  location: getMockLocation()
});

export const getMockOffer = (): ListOffers => {
  const randomImagesCount = faker.number.int({ min: 1, max: 6 });
  const images: string[] = Array.from({ length: randomImagesCount }, () =>
    faker.image.urlLoremFlickr({ category: 'apartment' })
  );

  return ({
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
