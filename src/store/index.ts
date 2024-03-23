import { configureStore } from '@reduxjs/toolkit';
import { offersSlice } from './slice/offers';
import { createAPI } from '../services/api';

export const api = createAPI();

export const store = configureStore({
  reducer: {
    [offersSlice.name]: offersSlice.reducer,
  },
  middleware: (getDefaulMiddleware) =>
    getDefaulMiddleware({
      thunk: {
        extraArgument: api,
      },
    }),
});
