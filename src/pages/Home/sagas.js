import { put, takeLatest, select } from "redux-saga/effects";
import fs from 'file-system';
import {
  userSignUpSuccess,
  userSignUpFailed,
  USER_SIGN_UP,
} from "./modules";
import { USER_LIST } from "../../devData/users";

export const newUserSelector = (state) => state.user.newUser;
export const getAllPostsSelector = (state) => state.feeds.userFeeds.feeds;

function* signUpUser() {
  try {
    let newUser = yield select(newUserSelector);
    const allUsers = [...USER_LIST, { ...USER_LIST[0], ...newUser }];
    debugger;
    fs.writeFileSync('../../devData/users.js', allUsers);
    yield put(userSignUpSuccess(newUser));
  } catch (e) {
    yield put(userSignUpFailed(e));
  }
}

export const HomePageSagas = [
  takeLatest(USER_SIGN_UP, signUpUser),
];
