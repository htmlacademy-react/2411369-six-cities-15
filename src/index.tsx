import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/app/app';
import { Setting } from './const';

import { getMockOffer } from './mocks/offers';
import { getMockReview } from './mocks/reviews';
import { ListOffers } from './types/offer';
import { Review } from './types/review';

import { faker } from '@faker-js/faker';

const REVIEW_COUNT = faker.number.int({ min: 0, max: 3 });
const OFFER_COUNT = faker.number.int({ min: 2, max: 6 });

const offers: ListOffers[] = Array.from({ length: OFFER_COUNT }, () => getMockOffer());
const reviews: Review[] = Array.from({ length: REVIEW_COUNT }, () => getMockReview());

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <App
      offersCount = {Setting.offersCount}
      offers = {offers}
      reviews = {reviews}
    />
  </React.StrictMode>
);
