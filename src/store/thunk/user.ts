import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkApi } from '../../types/store';
import { APIRoute } from '../../const';
import { AuthData, UserData } from '../../types/user';
// import { dropToken, saveToken } from '../../services/token';

export const checkAuthorization = createAsyncThunk<UserData, undefined, ThunkApi>(
  'user/ckeckAuthorization',
  async (_arg, { extra: api }) => {
    const { data } = await api.get<UserData>(APIRoute.Login);
    return data;
  }
);

export const login = createAsyncThunk<UserData, AuthData, ThunkApi>(
  'user/login',
  async ({ email, password }, { extra: api }) => {
    const { data: loginData } = await api.post<UserData>(APIRoute.Login, { email, password });
    // saveToken(loginData.token);
    return loginData;
  }
);

export const logout = createAsyncThunk<void, undefined, ThunkApi>(
  'user/logout',
  async (_arg, { extra: api }) => {
    // dropToken();
    await api.delete(APIRoute.Logout);
  }
);
