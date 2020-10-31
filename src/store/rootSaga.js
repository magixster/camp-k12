import { all } from 'redux-saga/effects';

// Sagas
import { feedsSagas } from '../pages/Feed/sagas';


function *rootSaga() {
  yield all([
    ...feedsSagas,
  ])
}

export default rootSaga;
