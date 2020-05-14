import { createSlice, createSelector, PayloadAction } from '@reduxjs/toolkit';
import { AppState } from './types';

export const initialState: AppState = {
  user: null,
  error: null,
  loading: false,
};

export const { reducer: appReducer, actions: appActions } = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setAppUser(state, action: PayloadAction<AppState['user']>) {
      state.user = action.payload;
    },

    setAppError(state, action: PayloadAction<AppState['error']>) {
      state.error = action.payload;
    },

    fetchCurrentUserStart(state) {
      state.error = null;
      state.loading = true;
    },
    fetchCurrentUserOK(state, action: PayloadAction<AppState['user']>) {
      state.user = action.payload;
      state.loading = false;
    },
    fetchCurrentUserFail(state, action: PayloadAction<AppState['error']>) {
      state.error = action.payload;
      state.loading = false;
    },
  },
});

// TODO: think of workaround with cyclic deps.
type RootStatePart = { app: AppState };

export const selectAppUser = (state: RootStatePart) => state.app.user;
export const selectAppError = (state: RootStatePart) => state.app.error;
export const selectAppLoading = (state: RootStatePart) => state.app.loading;
export const selectIsAutenticated = createSelector([selectAppUser], (user) => !!user);
