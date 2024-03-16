import { createSlice } from '@reduxjs/toolkit';
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
});

const offersActions = offersSlice.actions;

export { offersSlice, offersActions };
