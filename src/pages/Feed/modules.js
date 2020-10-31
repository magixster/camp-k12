// UserFeed
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

// Create New Post
const CREATE_NEW_POST = "USER/NEW/POST";
const CREATE_NEW_POST_SUCCESS = "USER/NEW/POST_SUCCESS";
const CREATE_NEW_POST_FAILED = "USER/NEW/POST_FAILED";

const createPost = (post) => ({
  type: CREATE_NEW_POST,
  post,
});

const createPostSuccess = () => ({
  type: CREATE_NEW_POST_SUCCESS,
});

const createPostFailed = (err) => ({
  type: CREATE_NEW_POST_FAILED,
  err,
});

const INITIAL_STATE = {
  loading: false,
  userFeeds: {
    feeds: [],
    loading: false,
    err: false,
  },
  newPost: {
    post: '',
    loading: false,
    err: false,
  }
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

const NewPostReducer = (state, action) => {
  switch (action.type) {
    case CREATE_NEW_POST:
      return {
        ...state,
        loading: true,
        post: action.post,
      };
    case CREATE_NEW_POST_SUCCESS:
      return {
        ...state,
        loading: false,
      };
    case CREATE_NEW_POST_FAILED:
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
      case CREATE_NEW_POST:
      case CREATE_NEW_POST_SUCCESS:
      case CREATE_NEW_POST_FAILED:
          return {
            ...state,
            newPost: NewPostReducer(state.newPost, action),
          };
    default:
      return state;
  }
};

export default FeedsReducer;

export {
  getUserFeed,
  getUserFeedSuccess,
  getUserFeedFailed,
  createPost,
  createPostSuccess,
  createPostFailed,
};

export { GET_USER_FEED, CREATE_NEW_POST };
