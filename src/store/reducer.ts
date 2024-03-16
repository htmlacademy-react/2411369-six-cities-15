import { CITIES, CityName } from '../const';
import { Offer } from '../types/offer';
import { offers } from '../mocks/offers';
import { createAction, createReducer } from '@reduxjs/toolkit';

type OffersState = {
  city: CityName;
  offers: Offer[];
};

const initialState: OffersState = {
  city: CITIES[0].name,
  offers,
};

// Actions
const setCity = createAction<CityName>('offers/setCity');

// Reducer
const reducer = createReducer(initialState,
  (builder) => {
    builder
      .addCase(setCity, (state, action) => {
        state.city = action.payload;
      });
  });

export { reducer, setCity };
