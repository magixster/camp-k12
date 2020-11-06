import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import FeedsReducer from "../pages/Feed/modules";
import UserReducer from "../pages/Home/modules";

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['user', 'feeds'],
};

const rootReducer = combineReducers({
  feeds: FeedsReducer,
  user: UserReducer,
});

export default persistReducer(persistConfig, rootReducer);