import { APIRoute } from '../../const';
import { AuthData, UserData } from '../../types/user';
import { createAppAsyncThunk } from '../../hooks/store';

export const checkAuthorization = createAppAsyncThunk<UserData, undefined>(
  'user/ckeckAuthorization',
  async (_arg, { extra: api }) => {
    const { data } = await api.get<UserData>(APIRoute.Login);
    return data;
  }
);

export const login = createAppAsyncThunk<UserData, AuthData>(
  'user/login',
  async ({ email, password }, { extra: api }) => {
    const { data: loginData } = await api.post<UserData>(APIRoute.Login, { email, password });
    return loginData;
  }
);

export const logout = createAppAsyncThunk<void, undefined>(
  'user/logout',
  async (_arg, { extra: api }) => {
    await api.delete(APIRoute.Logout);
  }
);
