import { faker } from '@faker-js/faker';
import { Review, UserReview } from '../types/review';

const REVIEW_COUNT = faker.number.int({ min: 0, max: 3 });

const getMockUser = (): UserReview => ({
  avatarUrl: faker.image.avatarGitHub(),
  isPro: faker.datatype.boolean(0.3),
  name: faker.person.firstName()
});

const getMockReview = (): Review => ({
  id: faker.string.uuid(),
  date: new Date(faker.date.recent({ days: 10 })).toString(),
  user: getMockUser(),
  comment: faker.lorem.words({ min: 3, max: 10 }),
  rating: faker.number.int({ min: 0, max: 5 })
});

export const reviews: Review[] = Array.from({ length: REVIEW_COUNT }, () => getMockReview());
