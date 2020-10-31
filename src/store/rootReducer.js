import { combineReducers } from "redux";
import FeedsReducer from "../pages/Feed/modules";
import UserReducer from "../pages/Home/modules";

export default combineReducers({
  feeds: FeedsReducer,
  user: UserReducer,
});