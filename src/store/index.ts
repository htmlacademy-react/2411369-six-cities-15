import { configureStore } from '@reduxjs/toolkit';
import { offersSlice } from './slice/offers';
import { createAPI } from '../services/api';
import { userSlice } from './slice/user';
import { reviewsSlice } from './slice/review';
import { offerSlice } from './slice/offer';

export const api = createAPI();

export const store = configureStore({
  reducer: {
    [offersSlice.name]: offersSlice.reducer,
    [offerSlice.name]: offerSlice.reducer,
    [userSlice.name]: userSlice.reducer,
    [reviewsSlice.name]: reviewsSlice.reducer
  },
  middleware: (getDefaulMiddleware) =>
    getDefaulMiddleware({
      thunk: {
        extraArgument: api,
      },
    }),
});
