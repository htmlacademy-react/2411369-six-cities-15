import { createSelector, createSlice } from '@reduxjs/toolkit';
import { PayloadAction } from '@reduxjs/toolkit';
import { CITIES, CityName } from '../../const';
import { offers } from '../../mocks/offers';
import { Offer } from '../../types/offer';

type OffersState = {
  city: CityName;
  offers: Offer[];
};

const initialState: OffersState = {
  city: CITIES[0].name,
  offers,
};

const offersSlice = createSlice({
  initialState,
  name: 'offers',
  reducers: {
    setCity: (state, action: PayloadAction<CityName>) => {
      state.city = action.payload;
    },
  },
  selectors: {
    city: (state) => state.city,
    offers: (state) => state.offers,
  },
});

const offersActions = offersSlice.actions;
const offersSelectors = {
  ...offersSlice.selectors,
  cityOffers: createSelector(
    offersSlice.selectors.offers,
    offersSlice.selectors.city,
    (allOffers, city) => allOffers.filter((offer) => offer.city.name === city)
  ),
};

export { offersSlice, offersActions, offersSelectors };
