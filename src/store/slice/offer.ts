import { createSlice } from '@reduxjs/toolkit';
import { FullOffer, ServerOffer } from '../../types/offer';
import { fetchNearBy, fetchOffer } from '../thunk/offers';
import { RequstStatus } from '../../const';

type OfferState = {
  info: FullOffer | null;
  nearby: ServerOffer[];
  status: RequstStatus;
};

const initialState: OfferState = {
  info: null,
  nearby: [],
  status: RequstStatus.Idle
};

const offerSlice = createSlice({
  name: 'offer',
  initialState,
  reducers: {
    clear(state) {
      state.info = null;
      state.nearby = [];
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchOffer.fulfilled, (state, action) => {
        state.info = action.payload;
        state.status = RequstStatus.Success;
      })
      .addCase(fetchOffer.rejected, (state) => {
        state.status = RequstStatus.Failed;
      })
      .addCase(fetchOffer.pending, (state) => {
        state.status = RequstStatus.Loading;
      })
      .addCase(fetchNearBy.fulfilled, (state, action) => {
        state.nearby = action.payload;
      });
  },
  selectors: {
    offer: (state) => state.info,
    nearByOffers: (state) => state.nearby,
    offerStatus: (state) => state.status
  }
});

const offerActions = {...offerSlice.actions, fetchNearBy, fetchOffer};
const offerSelector = offerSlice.selectors;

export { offerActions, offerSelector };
