import { createAsyncThunk } from '@reduxjs/toolkit';
import { Offer } from '../../types/offer';
import { ThunkApi } from '../../types/store';
import { APIRoute } from '../../const';

export const fetchOffers = createAsyncThunk<Offer[], undefined, ThunkApi>(
  'data/fetchOffers',
  async (_arg, { extra: api }) => {
    const { data } = await api.get<Offer[]>(APIRoute.Offers);
    return data;
  },
);
