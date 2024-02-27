import { faker } from '@faker-js/faker';
import { Review, UserReview } from '../types/review';

const getMockUser = (): UserReview => ({
  avatarUrl: faker.image.avatarGitHub(),
  isPro: faker.datatype.boolean(0.3),
  name: faker.person.firstName()
});

export const getMockReview = (): Review => ({
  id: faker.string.uuid(),
  date: new Date(faker.date.recent({ days: 10 })).toString(),
  user: getMockUser(),
  comment: faker.lorem.words({ min: 3, max: 10 }),
  rating: faker.number.int({ min: 0, max: 5 })
});
