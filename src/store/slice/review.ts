import { createSelector, createSlice } from '@reduxjs/toolkit';
import { RequestStatus } from '../../const';
import { Review } from '../../types/review';
import { fetchReviews, postReview } from '../thunk/reviews';
import { sortReviewsDate } from '../../utils';

type ReviewState = {
  items: Review[];
  status: RequestStatus;
};

const initialState: ReviewState = {
  items: [],
  status: RequestStatus.Idle
};

const reviewsSlice = createSlice({
  name: 'reviews',
  initialState,
  reducers: {
    clear: (state) => {
      state.items = [];
      state.status = RequestStatus.Idle;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchReviews.fulfilled, (state, action) => {
        state.items = action.payload;
        state.status = RequestStatus.Success;
      })
      .addCase(fetchReviews.rejected, (state) => {
        state.status = RequestStatus.Failed;
      })
      .addCase(fetchReviews.pending, (state) => {
        state.status = RequestStatus.Loading;
      })
      .addCase(postReview.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })
      .addCase(postReview.rejected, (state) => {
        state.status = RequestStatus.Failed;
      })
      .addCase(postReview.pending, (state) => {
        state.status = RequestStatus.Loading;
      });
  },
  selectors: {
    reviews: (state) => state.items,
    reviewStatus: (state: ReviewState) => state.status
  }
});

const reviewsActions = {...reviewsSlice.actions, fetchReviews, postReview};
const reviewsSelector = {
  ...reviewsSlice.selectors,
  lastReviews: createSelector(reviewsSlice.selectors.reviews, (reviews) => reviews.toSorted(sortReviewsDate))
};

export { reviewsActions, reviewsSelector, reviewsSlice };
