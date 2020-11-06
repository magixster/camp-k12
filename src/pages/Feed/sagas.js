import { call, put, takeLatest, select } from "redux-saga/effects";
import request from "../../utils/request";
import { shuffle } from "lodash";
import {
  GET_USER_FEED,
  getUserFeedSuccess,
  getUserFeedFailed,
  CREATE_NEW_POST,
  createPostSuccess,
  createPostFailed,
} from "./modules";

export const getLoggedInUserSelector = (state) => state.user.user;
export const getAllPostsSelector = (state) => state.feeds.userFeeds.feeds;

function* getUserFeeds() {
  try {
    const posts = yield call(request, "posts");
    const savedPosts = yield select(getAllPostsSelector);
    yield put(getUserFeedSuccess([...savedPosts, ...shuffle(posts)]));
  } catch (e) {
    yield put(getUserFeedFailed(e));
  }
}

function* createNewPost(action) {
  try {
    let user = yield select(getLoggedInUserSelector);
    const posts = yield select(getAllPostsSelector);
    const body = JSON.stringify({
      title: "Test Title",
      body: action.post,
      userId: user.data.id,
    });
    const post = yield call(request, "posts", "POST", { body });
    const newPost = {
      ...post,
      id: Date.now(),
      last_updated: Date.now(),
    };
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
