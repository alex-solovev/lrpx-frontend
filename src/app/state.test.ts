import { AnyAction } from 'redux';
import { User } from 'generated/graphqlTypes';
import { RootState } from 'store/types';
import {
  appReducer,
  appActions,
  initialState,
  selectAppUser,
  selectAppError,
  selectAppLoading,
} from './state';

describe('app state', () => {
  it('should be initialized with no user, error, and loading set to false', () => {
    const expectedState = initialState;
    const result = appReducer(undefined, {} as AnyAction);

    expect(result).toEqual(expectedState);
  });

  it('should set the user when setAppUser action being called', () => {
    const user: User = {
      id: 'someid',
      email: 'some@email.com',
      password: 'somepassword', // TODO: remove
    };
    const expectedState = appReducer(initialState, appActions.setAppUser(user));
    const rootState = { app: expectedState } as RootState;

    expect(selectAppUser(rootState)).toEqual(user);
    expect(selectAppError(rootState)).toBe(null);
    expect(selectAppLoading(rootState)).toBe(false);
  });

  it('should properly set loading on fetchCurrentUserStart', () => {
    const appState = appReducer(initialState, appActions.fetchCurrentUserStart());
    const rootState = { app: appState } as RootState;

    expect(selectAppError(rootState)).toBe(null);
    expect(selectAppLoading(rootState)).toBe(true);
  });

  it('should properly set user, error and loading on fetchCurrentUserFail', () => {
    const error = 'error';
    const appState = appReducer(initialState, appActions.fetchCurrentUserFail(error));
    const rootState = { app: appState } as RootState;

    expect(selectAppUser(rootState)).toBe(null);
    expect(selectAppError(rootState)).toBe(error);
    expect(selectAppLoading(rootState)).toBe(false);
  });

  it('should properly set user, error and loading on fetchCurrentUserOK', () => {
    const user: User = {
      id: 'someid',
      email: 'some@email.com',
      password: 'somepassword', // TODO: remove
    };
    const appState = appReducer(initialState, appActions.fetchCurrentUserOK(user));
    const rootState = { app: appState } as RootState;

    expect(selectAppUser(rootState)).toEqual(user);
    expect(selectAppError(rootState)).toBe(null);
    expect(selectAppLoading(rootState)).toBe(false);
  });
});
