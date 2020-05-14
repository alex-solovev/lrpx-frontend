import { call, takeLatest, put } from 'redux-saga/effects';
import { SagaIterator } from 'redux-saga';
import client, { GraphQLResult } from 'helpers/client';
import { appActions } from './state';
import * as queries from './queries';

function* fetchCurrentUser(): SagaIterator<void> {
  try {
    const {
      data: { currentUser: user },
    }: GraphQLResult = yield call(client.query, {
      query: queries.currentUser,
    });

    if (user) {
      yield put(appActions.fetchCurrentUserOK(user));
    } else {
      yield put(appActions.fetchCurrentUserOK(null));
    }
  } catch (e) {
    yield put(appActions.fetchCurrentUserFail(e.toString()));
  }
}

export default function* appSaga(): SagaIterator<void> {
  yield takeLatest(appActions.fetchCurrentUserStart, fetchCurrentUser);
}
