import { configureStore } from '@reduxjs/toolkit';
import { offersSlice } from './slice/offers';


export const store = configureStore({
  reducer: offersSlice.reducer,
});
