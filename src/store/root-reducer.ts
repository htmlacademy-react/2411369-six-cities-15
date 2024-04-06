import { combineReducers } from '@reduxjs/toolkit';
import { offersSlice } from './slice/offers';
import { offerSlice } from './slice/offer';
import { userSlice } from './slice/user';
import { reviewsSlice } from './slice/review';
import { favoritesSlice } from './slice/favorites';

export const rootReducer = combineReducers({
  [offersSlice.name]: offersSlice.reducer,
  [offerSlice.name]: offerSlice.reducer,
  [userSlice.name]: userSlice.reducer,
  [reviewsSlice.name]: reviewsSlice.reducer,
  [favoritesSlice.name]: favoritesSlice.reducer
});
