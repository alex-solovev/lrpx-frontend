import { SagaIterator } from 'redux-saga';
import { all, call } from 'redux-saga/effects';
import appSaga from 'app/sagas';
import authSaga from 'features/Auth/sagas';

function* rootSaga(): SagaIterator {
  yield all([call(appSaga), call(authSaga)]);
}

export default rootSaga;
