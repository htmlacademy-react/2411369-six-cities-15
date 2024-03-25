import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { Offer } from '../../types/offer';
import { fetchOffers } from '../thunk/offers';
import { RequstStatus } from '../../const';

type OffersState = {
  activeId?: Offer['id'];
  offers: Offer[];
  status: RequstStatus;
};

const initialState: OffersState = {
  activeId: undefined,
  offers: [],
  status: RequstStatus.Idle
};

const offersSlice = createSlice({
  name: 'offers',
  initialState,
  reducers: {
    setActiveId(state, action: PayloadAction<Offer['id'] | undefined>) {
      state.activeId = action.payload;
    }
  },
  selectors: {
    activeId: (state) => state.activeId,
    offers: (state) => state.offers,
    status: (state) => state.status
  },
  extraReducers: (build) => {
    build.addCase(fetchOffers.pending, (state) => {
      state.status = RequstStatus.Loading;
    });
    build.addCase(fetchOffers.fulfilled, (state, action) => {
      state.offers = action.payload;
      state.status = RequstStatus.Succeeded;
    });
  }
});

const offersActions = {...offersSlice.actions, fetchOffers};
const offersSelectors = offersSlice.selectors;

export { offersSlice, offersActions, offersSelectors };
