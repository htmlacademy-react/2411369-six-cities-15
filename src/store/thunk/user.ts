import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkApi } from '../../types/store';
import { APIRoute } from '../../const';
import { AuthData, UserData } from '../../types/user';

export const checkAuthorization = createAsyncThunk<UserData, undefined, ThunkApi>(
  'user/ckeckAuthorization',
  async (_arg, { extra: api }) => {
    const { data } = await api.get<UserData>(APIRoute.Login);
    return data;
  }
);

export const login = createAsyncThunk<UserData, AuthData, ThunkApi>(
  'user/login',
  async ({ login: email, password }, { extra: api }) => {
    const response = await api.post<UserData>(APIRoute.Login, { email, password });
    return response.data;
  }
);

export const logout = createAsyncThunk<void, undefined, ThunkApi>(
  'user/logout',
  async (_arg, { extra: api }) => {
    await api.delete(APIRoute.Logout);
  }
);
