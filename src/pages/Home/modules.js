// UserFeed
const USER_SIGN_IN = "USER/SIGN_IN";
const USER_SIGN_IN_SUCCESS = "USER/SIGN_IN/SIGN_IN_SUCCESS";
const USER_SIGN_IN_FAILED = "USER/SIGN_IN/SIGN_IN_FAILED";

const USER_SIGN_OUT = "USER/SIGN_OUT";

const userSignIn = () => ({
  type: USER_SIGN_IN,
});

const userSignInSuccess = (data) => ({
  type: USER_SIGN_IN_SUCCESS,
  data,
});

const userSignInFailed = (err) => ({
  type: USER_SIGN_IN_FAILED,
  err,
});

const userSignout = () => ({
  type: USER_SIGN_OUT,
});

const INITIAL_STATE = {
  loading: false,
  user: {},
};

const PlatFormUserReducer = (state, action) => {
  switch (action.type) {
    case USER_SIGN_IN:
      return {
        ...state,
        loading: true,
      };
    case USER_SIGN_IN_SUCCESS:
      return {
        ...state,
        data: action.data,
        loading: false,
      };
    case USER_SIGN_IN_FAILED:
      return {
        ...state,
        loading: false,
        err: action.err,
      };
    default:
      return state;
  }
};

const UserReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case USER_SIGN_IN:
    case USER_SIGN_IN_SUCCESS:
    case USER_SIGN_IN_FAILED:
      return {
        ...state,
        user: PlatFormUserReducer(state.user, action),
      };
    case USER_SIGN_OUT:
      return {
        ...state,
        user: {},
      };
    default:
      return state;
  }
};

export default UserReducer;

export { userSignIn, userSignInSuccess, userSignInFailed, userSignout };
