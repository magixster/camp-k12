import { combineReducers } from "redux";
import FeedsReducer from "../pages/Feed/modules";

export default combineReducers({
  feeds: FeedsReducer,
});