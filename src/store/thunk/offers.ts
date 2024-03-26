import { FullOffer, ServerOffer } from '../../types/offer';
import { APIRoute } from '../../const';
import { createAppAsyncThunk } from '../../hooks/store';

export const fetchAllOffers = createAppAsyncThunk<ServerOffer[], undefined>(
  'fetchOffers/all',
  async (_arg, { extra: api }) => {
    const { data } = await api.get<ServerOffer[]>(APIRoute.Offers);
    return data;
  },
);

export const fetchOffer = createAppAsyncThunk<FullOffer, string>(
  'fetchOffers/one',
  async (offerId, { extra: api }) => {
    const { data } = await api.get<FullOffer>(`${APIRoute.Offers}/${offerId}`);
    return data;
  },
);

export const fetchNearBy = createAppAsyncThunk<ServerOffer[], string>(
  'fetchOffers/near',
  async (offerId, { extra: api }) => {
    const { data } = await api.get<ServerOffer[]>(`${APIRoute.Offers}/${offerId}/nearby`);
    return data;
  },
);
