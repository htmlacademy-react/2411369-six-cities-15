import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { FullOffer, ServerOffer } from '../../types/offer';
import { fetchAllOffers } from '../thunk/offers';
import { RequstStatus } from '../../const';

type OffersState = {
  activeId?: FullOffer['id'] | null;
  offers: ServerOffer[];
  status: RequstStatus;
};

const initialState: OffersState = {
  activeId: null,
  offers: [],
  status: RequstStatus.Idle
};

const offersSlice = createSlice({
  name: 'offers',
  initialState,
  reducers: {
    setActiveId(state, action: PayloadAction<ServerOffer['id'] | undefined>) {
      state.activeId = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllOffers.pending, (state) => {
        state.status = RequstStatus.Loading;
      })
      .addCase(fetchAllOffers.fulfilled, (state, action) => {
        state.status = RequstStatus.Success;
        state.offers = action.payload;
      })
      .addCase(fetchAllOffers.rejected, (state) => {
        state.status = RequstStatus.Failed;
      });
  },
  selectors: {
    activeId: (state) => state.activeId,
    offers: (state) => state.offers,
    status: (state) => state.status
  }
});

const offersActions = {...offersSlice.actions, fetchAllOffers};
const offersSelectors = offersSlice.selectors;

export { offersSlice, offersActions, offersSelectors };
