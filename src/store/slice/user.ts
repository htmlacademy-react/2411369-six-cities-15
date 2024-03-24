import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { AuthorizationStatus } from '../../const';
import { UserData } from '../../types/user';
import { checkAuthorization, login, logout } from '../thunk/user';
import { dropToken, saveToken } from '../../services/token';

type UserState = {
  authorizationStatus: AuthorizationStatus;
  userData: UserData | null;
};

const initialState: UserState = {
  authorizationStatus: AuthorizationStatus.Unknown,
  userData: null
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setAuthorization(state, action: PayloadAction<AuthorizationStatus>) {
      state.authorizationStatus = action.payload;
    },
    setUnAuth: (state) => {
      state.authorizationStatus = AuthorizationStatus.NoAuth;
    }
  },
  selectors: {
    authorizationStatus: (state) => state.authorizationStatus,
    userData: (state) => state.userData
  },
  extraReducers: (build) => {
    build.addCase(checkAuthorization.fulfilled, (state, action) => {
      state.authorizationStatus = AuthorizationStatus.Auth;
      state.userData = action.payload;
    });
    build.addCase(checkAuthorization.rejected, (state) => {
      state.authorizationStatus = AuthorizationStatus.NoAuth;
    });
    build.addCase(login.fulfilled, (state, action) => {
      saveToken(action.payload.token);
      state.authorizationStatus = AuthorizationStatus.Auth;
      state.userData = action.payload;
    });
    build.addCase(logout.fulfilled, (state) => {
      dropToken();
      state.authorizationStatus = AuthorizationStatus.NoAuth;
    });
  }
});

const userActions = {...userSlice.actions, checkAuthorization, login, logout};
const userSelectors = userSlice.selectors;

export { userSlice, userActions, userSelectors };

