import { createSlice } from '@reduxjs/toolkit';
import { FullOffer, ServerOffer } from '../../types/offer';
import { fetchNearBy, fetchOffer } from '../thunk/offers';
import { RequestStatus } from '../../const';
import { postFavorite } from '../thunk/favorites';

type OfferState = {
  info: FullOffer | null;
  nearby: ServerOffer[];
  status: RequestStatus;
};

const initialState: OfferState = {
  info: null,
  nearby: [],
  status: RequestStatus.Idle
};

const offerSlice = createSlice({
  name: 'offer',
  initialState,
  reducers: {
    clearOffer(state) {
      state.info = null;
      state.nearby = [];
      state.status = RequestStatus.Idle;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchOffer.fulfilled, (state, action) => {
        state.info = action.payload;
        state.status = RequestStatus.Success;
      })
      .addCase(fetchOffer.rejected, (state) => {
        state.status = RequestStatus.Failed;
      })
      .addCase(fetchOffer.pending, (state) => {
        state.status = RequestStatus.Loading;
      })
      .addCase(fetchNearBy.fulfilled, (state, action) => {
        state.nearby = action.payload;
      })
      // postFavorite fullfilled
      .addCase(postFavorite.fulfilled, (state, action) => {
        const changedOffer = action.payload;

        if (state.info?.id === changedOffer.id) {
          state.info.isFavorite = changedOffer.isFavorite;
        }
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

export { offerActions, offerSelector, offerSlice };
