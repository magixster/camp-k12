import { all } from 'redux-saga/effects';

// Sagas
import { feedsSagas } from '../pages/Feed/sagas';
import { HomePageSagas } from '../pages/Home/sagas'


function *rootSaga() {
  yield all([
    ...feedsSagas,
    ...HomePageSagas
  ])
}

export default rootSaga;
