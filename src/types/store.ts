import { AxiosInstance } from 'axios';
import { store } from '../store';

type RootState = ReturnType<typeof store.getState>;
type AppDispatch = typeof store.dispatch;
type ThunkApi = {
  dispatch: AppDispatch;
  state: RootState;
  extra: AxiosInstance;
}

export type { AppDispatch, RootState, ThunkApi };
