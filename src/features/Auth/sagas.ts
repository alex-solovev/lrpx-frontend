import { SagaIterator } from 'redux-saga';
import { takeLatest, call, put } from 'redux-saga/effects';
import { MutationLogInArgs, MutationSignUpArgs } from 'generated/graphqlTypes';
import client, { GraphQLResult } from 'helpers/client';
import { appActions } from 'app/state';
import * as actions from './actions';
import * as queries from './queries';

function* handleLogIn(args: MutationLogInArgs): SagaIterator<void> {
  try {
    const {
      data: { logIn: user },
    }: GraphQLResult = yield call(client.mutate, {
      mutation: queries.logIn,
      variables: args,
    });

    if (user) {
      yield put(appActions.setAppUser(user));
    } else {
      yield put(appActions.setAppError('Failed to log in'));
    }
  } catch (e) {
    yield put(appActions.setAppError(e.toString()));
  }
}

function* handleSingUp(args: MutationSignUpArgs): SagaIterator<void> {
  try {
    const {
      data: { signUp: user },
    }: GraphQLResult = yield call(client.mutate, {
      mutation: queries.signUp,
      variables: args,
    });

    if (user) {
      yield put(appActions.setAppUser(user));
    } else {
      yield put(appActions.setAppError('Failed to sign up'));
    }
  } catch (e) {
    yield put(appActions.setAppError(e.toString()));
  }
}

function* handleLogOut(): SagaIterator<void> {
  try {
    const {
      data: { logOut: user },
    }: GraphQLResult = yield call(client.mutate, {
      mutation: queries.logOut,
    });

    if (user) {
      yield put(appActions.setAppUser(null));
    } else {
      yield put(appActions.setAppError('Failed to log out'));
    }
  } catch (e) {
    yield put(appActions.setAppError(e.toString()));
  }
}

function* authSaga(): SagaIterator {
  yield takeLatest(actions.logIn, (action) => handleLogIn(action.payload));
  yield takeLatest(actions.signUp, (action) => handleSingUp(action.payload));
  yield takeLatest(actions.logOut, handleLogOut);
}

export default authSaga;
