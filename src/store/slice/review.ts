import { createSlice } from '@reduxjs/toolkit';
import { RequstStatus } from '../../const';
import { Review } from '../../types/review';
import { fetchReviews, postReview } from '../thunk/reviews';

type ReviewState = {
  items: Review[];
  status: RequstStatus;
};

const initialState: ReviewState = {
  items: [],
  status: RequstStatus.Idle
};

const reviewsSlice = createSlice({
  name: 'reviews',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchReviews.fulfilled, (state, action) => {
        state.items = action.payload;
        state.status = RequstStatus.Success;
      })
      .addCase(fetchReviews.rejected, (state) => {
        state.status = RequstStatus.Failed;
      })
      .addCase(fetchReviews.pending, (state) => {
        state.status = RequstStatus.Loading;
      })
      .addCase(postReview.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })
      .addCase(postReview.rejected, (state) => {
        state.status = RequstStatus.Failed;
      })
      .addCase(postReview.pending, (state) => {
        state.status = RequstStatus.Loading;
      });
  },
  selectors: {
    reviews: (state) => state.items,
    reviewStatus: (state: ReviewState) => state.status
  }
});

const reviewsActions = {...reviewsSlice.actions, fetchComments: fetchReviews, postComment: postReview};
const reviewsSelector = reviewsSlice.selectors;

export { reviewsActions, reviewsSelector, reviewsSlice };
