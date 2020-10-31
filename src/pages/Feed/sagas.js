import { call, put, takeLatest } from "redux-saga/effects";
import request from "../../utils/request";
import { GET_USER_FEED, getUserFeedSuccess, getUserFeedFailed } from "./modules";

function* getUserFeeds(action) {
  try {
    const feeds = yield call(request, 'posts');
    yield put(getUserFeedSuccess(feeds));
  } catch (e) {
    yield put(getUserFeedFailed(e));
  }
}

export const feedsSagas = [
  takeLatest(GET_USER_FEED, getUserFeeds),
]
