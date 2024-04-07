import { APIRoute } from '../../const';
import { createAppAsyncThunk } from '../../hooks/store';
import { FavoriteData } from '../../types/favorites';
import { FullOffer, ServerOffer } from '../../types/offer';

export const fetchFavorites = createAppAsyncThunk<ServerOffer[], undefined>(
  'favorites/fetch',
  async (_arg, { extra: api }) => {
    const { data } = await api.get<ServerOffer[]>(APIRoute.Favorites);
    return data;
  }
);

export const postFavorite = createAppAsyncThunk<ServerOffer, FavoriteData>(
  'favorite/post',
  async ({ id, isFavorite }, { extra: api }) => {
    const numberFavorite = Number(isFavorite);
    const { data } = await api.post<FullOffer>(`${APIRoute.Favorites}/${id}/${numberFavorite}`, { numberFavorite });
    return data;
  }
);
