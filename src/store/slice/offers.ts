import { createSlice } from '@reduxjs/toolkit';
import { offers } from '../../mocks/offers';
import { Offer } from '../../types/offer';

type OffersState = {
  offers: Offer[];
};

const initialState: OffersState = {
  offers,
};

const offersSlice = createSlice({
  initialState,
  name: 'offers',
  reducers: {},
  selectors: {
    offers: (state) => state.offers,
  },
});

const offersActions = offersSlice.actions;
const offersSelectors = offersSlice.selectors;

export { offersSlice, offersActions, offersSelectors };
