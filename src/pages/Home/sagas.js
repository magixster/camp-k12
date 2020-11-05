import { put, takeLatest } from "redux-saga/effects";
import {
  userSignUpSuccess,
  userSignUpFailed,
  USER_SIGN_UP,
} from "./modules";

function* signUpUser(action) {
  try {
    yield put(userSignUpSuccess(action.data));
  } catch (e) {
    yield put(userSignUpFailed(e));
  }
}

export const HomePageSagas = [
  takeLatest(USER_SIGN_UP, signUpUser),
];
