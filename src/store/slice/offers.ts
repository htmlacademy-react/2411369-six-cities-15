import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { FullOffer, ServerOffer } from '../../types/offer';
import { fetchAllOffers } from '../thunk/offers';
import { RequestStatus } from '../../const';

type OffersState = {
  activeId?: FullOffer['id'] | null;
  offers: ServerOffer[];
  status: RequestStatus;
};

const initialState: OffersState = {
  activeId: null,
  offers: [],
  status: RequestStatus.Idle
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
        state.status = RequestStatus.Loading;
      })
      .addCase(fetchAllOffers.fulfilled, (state, action) => {
        state.status = RequestStatus.Success;
        state.offers = action.payload;
      })
      .addCase(fetchAllOffers.rejected, (state) => {
        state.status = RequestStatus.Failed;
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
