import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { offers } from '../../mocks/offers';
import { Offer } from '../../types/offer';

type OffersState = {
  activeId?: Offer['id'];
  offers: Offer[];
};

const initialState: OffersState = {
  activeId: undefined,
  offers,
};

const offersSlice = createSlice({
  initialState,
  name: 'offers',
  reducers: {
    setActiveId(state, action: PayloadAction<Offer['id'] | undefined>) {
      state.activeId = action.payload;
    }
  },
  selectors: {
    activeId: (state) => state.activeId,
    offers: (state) => state.offers,
  },
});

const offersActions = offersSlice.actions;
const offersSelectors = offersSlice.selectors;

export { offersSlice, offersActions, offersSelectors };
