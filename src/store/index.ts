import { configureStore } from '@reduxjs/toolkit';
import { offersSlice } from './slice/offers';
import { createAPI } from '../services/api';
import { userSlice } from './slice/user';

export const api = createAPI();

export const store = configureStore({
  reducer: {
    [offersSlice.name]: offersSlice.reducer,
    [userSlice.name]: userSlice.reducer,
  },
  middleware: (getDefaulMiddleware) =>
    getDefaulMiddleware({
      thunk: {
        extraArgument: api,
      },
    }),
});
