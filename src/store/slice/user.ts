import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { AuthorizationStatus, RequestStatus } from '../../const';
import { UserData } from '../../types/user';
import { checkAuthorization, login, logout } from '../thunk/user';

type UserState = {
  requestStatus: RequestStatus;
  authorizationStatus: AuthorizationStatus;
  userData: UserData | null;
};

const initialState: UserState = {
  requestStatus: RequestStatus.Idle,
  authorizationStatus: AuthorizationStatus.Unknown,
  userData: null
};

function processSuccess(state: UserState, action: PayloadAction<UserData>) {
  state.requestStatus = RequestStatus.Success;
  state.authorizationStatus = AuthorizationStatus.Auth;
  state.userData = action.payload;
}

function processFailed(state: UserState) {
  state.requestStatus = RequestStatus.Failed;
  state.authorizationStatus = AuthorizationStatus.NoAuth;
}

function processLoading(state: UserState) {
  state.requestStatus = RequestStatus.Loading;
}


const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(checkAuthorization.fulfilled, processSuccess)
      .addCase(checkAuthorization.rejected, processFailed)
      .addCase(checkAuthorization.pending, processLoading)
      .addCase(login.fulfilled, processSuccess)
      .addCase(login.rejected, processFailed)
      .addCase(login.pending, processLoading)
      .addCase(logout.fulfilled, (state) => {
        state.userData = null;
        state.authorizationStatus = AuthorizationStatus.NoAuth;
      });
  },
  selectors: {
    authorizationStatus: (state) => state.authorizationStatus,
    userData: (state) => state.userData
  }
});

const userActions = {...userSlice.actions, checkAuthorization, login, logout};
const userSelectors = userSlice.selectors;

export { userSlice, userActions, userSelectors };

