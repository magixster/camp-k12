import { USER_LIST } from "../../devData/users";

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
  allUsers: {
    allUsers: USER_LIST
  },
};

// User Sign up
const USER_SIGN_UP = "USER/SIGN_UP";
const USER_SIGN_UP_SUCCESS = "USER/SIGN_UP/SIGN_UP_SUCCESS";
const USER_SIGN_UP_FAILED = "USER/SIGN_UP/SIGN_UP_FAILED";

const userSignUp = (data) => ({
  type: USER_SIGN_UP,
  data,
});

const userSignUpSuccess = (data) => ({
  type: USER_SIGN_UP_SUCCESS,
  data,
});

const userSignUpFailed = (err) => ({
  type: USER_SIGN_UP_FAILED,
  err,
});

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

const newUserReducer = (state, action) => {
  switch (action.type) {
    case USER_SIGN_UP:
      return {
        ...state,
        loading: true,
      };
    case USER_SIGN_UP_SUCCESS:
      return {
        ...state,
        allUsers: [...USER_LIST, {
          ...USER_LIST[0],
          id: USER_LIST[USER_LIST.length - 1].id + 1,
          ...action.data }],
        loading: false,
      };
    case USER_SIGN_UP_FAILED:
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
    case USER_SIGN_UP:
    case USER_SIGN_UP_SUCCESS:
    case USER_SIGN_UP_FAILED:
      return {
        ...state,
        allUsers: newUserReducer(state.allUsers, action),
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

export {
  USER_SIGN_UP,
  userSignUp,
  userSignUpSuccess,
  userSignUpFailed,
  userSignIn,
  userSignInSuccess,
  userSignInFailed,
  userSignout,
};
