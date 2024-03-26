import { createSlice } from '@reduxjs/toolkit';
import { RequstStatus } from '../../const';
import { Review } from '../../types/review';
import { commentsThunks } from '../thunk/comments';

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
      .addCase(commentsThunks.fetchComments.fulfilled, (state, action) => {
        state.items = action.payload;
        state.status = RequstStatus.Success;
      })
      .addCase(commentsThunks.fetchComments.rejected, (state) => {
        state.status = RequstStatus.Failed;
      })
      .addCase(commentsThunks.fetchComments.pending, (state) => {
        state.status = RequstStatus.Loading;
      })
      .addCase(commentsThunks.postComment.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })
      .addCase(commentsThunks.postComment.rejected, (state) => {
        state.status = RequstStatus.Failed;
      })
      .addCase(commentsThunks.postComment.pending, (state) => {
        state.status = RequstStatus.Loading;
      });
  },
  selectors: {
    reviews: (state) => state.items,
    reviewsStatus: (state: ReviewState) => state.status
  }
});

const reviewsActions = {...reviewsSlice.actions, ...commentsThunks};
const reviewsSelector = reviewsSlice.selectors;

export { reviewsActions, reviewsSelector };
