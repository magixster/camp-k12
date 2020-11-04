import { call, put, takeLatest, select } from "redux-saga/effects";
import request from "../../utils/request";
<<<<<<< HEAD
=======
import { shuffle } from 'lodash';
>>>>>>> f5bc3019907e3d6451d28bad6a91b0fff37d0600
import {
  GET_USER_FEED,
  getUserFeedSuccess,
  getUserFeedFailed,
  CREATE_NEW_POST,
  createPostSuccess,
  createPostFailed,
} from "./modules";
<<<<<<< HEAD
=======
import { timeSince } from "../../utils";
>>>>>>> f5bc3019907e3d6451d28bad6a91b0fff37d0600

export const getLoggedInUserSelector = (state) => state.user.user
export const getAllPostsSelector = (state) => state.feeds.userFeeds.feeds;

function* getUserFeeds() {
  try {
    const posts = yield call(request, "posts");
<<<<<<< HEAD
    yield put(getUserFeedSuccess(posts));
=======
    yield put(getUserFeedSuccess(shuffle(posts)));
>>>>>>> f5bc3019907e3d6451d28bad6a91b0fff37d0600
  } catch (e) {
    yield put(getUserFeedFailed(e));
  }
}

function* createNewPost(action) {
  try {
    let user = yield select(getLoggedInUserSelector);
    const posts = yield select(getAllPostsSelector);
    const body = JSON.stringify({
      title: "foo",
      body: action.post,
      userId: user.id,
    });
<<<<<<< HEAD
    const newPost = yield call(request, "posts",  "POST", { body });
=======
    const post = yield call(request, "posts",  "POST", { body });
    const newPost = { ...post, last_updated: timeSince(new Date()), userId: 1 }
>>>>>>> f5bc3019907e3d6451d28bad6a91b0fff37d0600
    yield put(getUserFeedSuccess([newPost, ...posts]));
    yield put(createPostSuccess());
  } catch (e) {
    yield put(createPostFailed(e));
  }
}

export const feedsSagas = [
  takeLatest(GET_USER_FEED, getUserFeeds),
  takeLatest(CREATE_NEW_POST, createNewPost),
];
