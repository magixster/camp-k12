const GET_USER_FEED = "USER/GET/FEED";
const GET_USER_FEED_SUCCESS = "USER/GET/FEED_SUCCESS";
const GET_USER_FEED_FAILED = "USER/GET/FEED_FAILED";

const getUserFeed = () => ({
  type: GET_USER_FEED,
});

const getUserFeedSuccess = (data) => ({
  type: GET_USER_FEED_SUCCESS,
  data,
});

const getUserFeedFailed = (err) => ({
  type: GET_USER_FEED_FAILED,
  err,
});

const INITIAL_STATE = {
  loading: false,
  userFeeds: {
    feeds: [],
    loading: false,
    err: false,
  },
};

const UserFeedReducer = (state, action) => {
  switch (action.type) {
    case GET_USER_FEED:
      return {
        ...state,
        loading: true,
      };
    case GET_USER_FEED_SUCCESS:
      return {
        ...state,
        feeds: action.data,
        loading: false,
      };
    case GET_USER_FEED_FAILED:
      return {
        ...state,
        loading: false,
        err: action.err,
      };
    default:
      return state;
  }
};

const FeedsReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_USER_FEED:
    case GET_USER_FEED_SUCCESS:
    case GET_USER_FEED_FAILED:
      return {
        ...state,
        userFeeds: UserFeedReducer(state.userFeeds, action),
      };
    default:
      return state;
  }
};

export default FeedsReducer;

export { getUserFeed, getUserFeedSuccess, getUserFeedFailed };

export { GET_USER_FEED };
