import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { FullOffer, ServerOffer } from '../../types/offer';
import { fetchAllOffers } from '../thunk/offers';
import { RequestStatus } from '../../const';
import { postFavorite } from '../thunk/favorites';
import { logout } from '../thunk/user';

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
      })
      .addCase(postFavorite.fulfilled, (state, action) => {
        const changedOffer = action.payload;

        for (const offer of state.offers) {
          if (offer.id === changedOffer.id) {
            offer.isFavorite = changedOffer.isFavorite;

            return;
          }
        }
      })
      .addCase(logout.fulfilled, () => initialState);
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
